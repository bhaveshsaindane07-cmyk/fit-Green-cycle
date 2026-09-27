import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import RequestPickupForm from './components/RequestPickupForm';
import StatusTracker from './components/StatusTracker';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import { INITIAL_REQUESTS } from './mockData';
import {
  subscribeToRequests,
  createRequest,
  updateRequestStatus,
  replaceAllRequests,
} from './lib/requestsApi';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [trackerSearchId, setTrackerSearchId] = useState('');

  // Firestore is the single source of truth for pickup requests.
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToRequests(
      (items) => setRequests(items),
      (error) => console.error('Failed loading requests from Firestore', error)
    );
    return unsubscribe;
  }, []);

  // Global statistics
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'Pending').length;
    const scheduled = requests.filter(r => r.status === 'Scheduled').length;
    const inProgress = requests.filter(r => r.status === 'In Progress').length;
    const completed = requests.filter(r => r.status === 'Completed').length;
    return { total, pending, scheduled, inProgress, completed };
  }, [requests]);

  // Create new request handler with unique ID generation
  const handleCreateRequest = (newRequestData) => {
    // Generate clean unique ID e.g. SWC-4932
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const uniqueId = `SWC-${randomNum}`;

    const now = new Date();
    const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const fullRecord = {
      id: uniqueId,
      ...newRequestData,
      status: 'Pending',
      createdAt: timeString,
      createdAtMs: now.getTime()
    };

    // Persist to Firestore - the live subscription refreshes the UI with the saved record.
    createRequest(fullRecord).catch((error) => {
      console.error('Failed saving request to Firestore', error);
    });

    return fullRecord;
  };

  // Status transition handler for admin (persisted to Firestore)
  const handleUpdateStatus = (requestId, nextStatus) => {
    updateRequestStatus(requestId, nextStatus).catch((error) => {
      console.error('Failed updating request in Firestore', error);
    });
  };

  // Reset to initial demo data (written back into Firestore)
  const handleResetMockData = () => {
    if (window.confirm('Reset requests back to original demo data?')) {
      const demoRecords = INITIAL_REQUESTS.map((record, index) => ({
        ...record,
        createdAtMs: Date.now() - index,
      }));
      replaceAllRequests(demoRecords).catch((error) => {
        console.error('Failed resetting requests in Firestore', error);
      });
    }
  };

  const handleTrackRequest = (requestId) => {
    setTrackerSearchId(requestId);
    setActiveTab('track');
  };

  const handleSelectCategoryFromLanding = (categoryName) => {
    setSelectedCategory(categoryName);
    setActiveTab('request');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={stats.pending} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'landing' && (
          <LandingPage 
            setActiveTab={setActiveTab} 
            stats={stats}
            onSelectCategory={handleSelectCategoryFromLanding}
          />
        )}

        {activeTab === 'request' && (
          <RequestPickupForm 
            onSubmitRequest={handleCreateRequest}
            initialCategory={selectedCategory}
            onTrackRequest={handleTrackRequest}
          />
        )}

        {activeTab === 'track' && (
          <StatusTracker 
            requests={requests}
            initialSearchId={trackerSearchId}
            onSelectRequest={handleTrackRequest}
          />
        )}

        {activeTab === 'userDashboard' && (
          <UserDashboard 
            requests={requests}
            setActiveTab={setActiveTab}
            onSelectRequest={handleTrackRequest}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            requests={requests}
            onUpdateStatus={handleUpdateStatus}
            onResetMockData={handleResetMockData}
          />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

