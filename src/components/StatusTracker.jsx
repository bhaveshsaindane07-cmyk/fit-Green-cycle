import React, { useState } from 'react';
import { Search, CheckCircle2, MapPin, Calendar } from 'lucide-react';
import { STATUS_FLOW } from '../mockData';
import { StatusBadge, CategoryIcon } from './StatusBadge';

export default function StatusTracker({ requests, initialSearchId = '', onSelectRequest }) {
  const [searchInput, setSearchInput] = useState(initialSearchId);
  const [activeReqId, setActiveReqId] = useState(initialSearchId || (requests[0] ? requests[0].id : ''));

  const currentRequest = requests.find(req => req.id.toLowerCase() === (activeReqId || '').toLowerCase()) || null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = requests.find(req => req.id.toLowerCase() === searchInput.trim().toLowerCase());
    if (found) {
      setActiveReqId(found.id);
    }
  };

  const getStepStatus = (stepName) => {
    if (!currentRequest) return 'pending';
    const currentIndex = STATUS_FLOW.indexOf(currentRequest.status);
    const stepIndex = STATUS_FLOW.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Real-Time Pickup Tracker</h2>
        <p className="text-xs text-slate-500 mt-1">
          Search by your unique Request ID to trace collection milestone updates.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter Tracking ID (SWC-1001, SWC-1002)..."
            className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition cursor-pointer"
        >
          Track
        </button>
      </form>

      <div className="flex items-center gap-2 overflow-x-auto py-1">
        <span className="text-xs text-slate-400 whitespace-nowrap">Quick Select:</span>
        {requests.map((r) => (
          <button
            key={r.id}
            onClick={() => {
              setActiveReqId(r.id);
              setSearchInput(r.id);
            }}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-md border transition whitespace-nowrap cursor-pointer ${activeReqId === r.id ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
          >
            {r.id}
          </button>
        ))}
      </div>

      {currentRequest ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl font-bold text-slate-900">{currentRequest.id}</span>
                <StatusBadge status={currentRequest.status} />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Created on {currentRequest.createdAt} â€¢ Booked by {currentRequest.userName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CategoryIcon category={currentRequest.category} className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">{currentRequest.category}</div>
                <div className="text-[11px] text-slate-500">{currentRequest.quantity}</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50/50 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-6">Collection Lifecycle</h4>
            <div className="relative">
              <div className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 bg-slate-200 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-2 relative z-10">
                {STATUS_FLOW.map((step, idx) => {
                  const state = getStepStatus(step);
                  return (
                    <div key={step} className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          state === 'completed'
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-50'
                            : state === 'current'
                            ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}
                      >
                        {state === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <div>
                        <div
                          className={`text-xs font-bold ${
                            state === 'completed'
                              ? 'text-emerald-700'
                              : state === 'current'
                              ? 'text-amber-800'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                          {step === 'Pending' && 'Queued for dispatch'}
                          {step === 'Scheduled' && 'Truck assigned'}
                          {step === 'In Progress' && 'Driver on route'}
                          {step === 'Completed' && 'Delivered to center'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Pickup Address:</span>
                  <span>{currentRequest.pickupLocation}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Slot & Date:</span>
                  <span>{currentRequest.pickupDate} ({currentRequest.pickupTime})</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Estimated Volume:</span>
                <span className="font-bold text-slate-800">{currentRequest.quantity}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Resident:</span>
                <span className="font-semibold text-slate-800">{currentRequest.userName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Assigned Facility:</span>
                <span className="text-emerald-700 font-medium">Metro Eco-Sorting Hub #4</span>
              </div>
              {currentRequest.notes && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-slate-500 block">Resident Notes:</span>
                  <span className="italic text-slate-700">&quot;{currentRequest.notes}&quot;</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
          <p className="font-medium text-slate-700">No matching request found for &quot;{searchInput}&quot;</p>
          <p className="text-xs text-slate-400">Please verify your tracking code or select one from the quick select list above.</p>
        </div>
      )}
    </div>
  );
}