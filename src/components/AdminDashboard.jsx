import React, { useState, useMemo } from 'react';
import { ShieldCheck, Search, Filter, RefreshCw, CheckCircle2, X } from 'lucide-react';
import { STATUS_FLOW, WASTE_CATEGORIES } from '../mockData';
import { StatusBadge, CategoryIcon } from './StatusBadge';

export default function AdminDashboard({ requests, onUpdateStatus, onResetMockData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'Pending').length;
    const scheduled = requests.filter(r => r.status === 'Scheduled').length;
    const inProgress = requests.filter(r => r.status === 'In Progress').length;
    const completed = requests.filter(r => r.status === 'Completed').length;
    const totalKg = requests.reduce((acc, curr) => acc + (curr.quantityValue || 5), 0);
    return { total, pending, scheduled, inProgress, completed, totalKg };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch =
        req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = selectedStatus === 'ALL' || req.status === selectedStatus;
      const matchesCategory = selectedCategory === 'ALL' || req.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [requests, searchTerm, selectedStatus, selectedCategory]);


  const handleStatusChange = (requestId, nextStatus) => {
    onUpdateStatus(requestId, nextStatus);
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: nextStatus }));
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Admin Operations Control Center
          </div>
          <h2 className="text-2xl font-bold mt-1">Smart Waste Dispatch & Management</h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor, assign routes, filter waste streams, and transition request statuses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onResetMockData && (
            <button
              onClick={onResetMockData}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
              title="Reset mock data to initial state"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Total Requests</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40">
          <div className="text-xs text-amber-700 font-medium">Pending</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/40">
          <div className="text-xs text-blue-700 font-medium">Scheduled</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{stats.scheduled}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-200 bg-purple-50/40">
          <div className="text-xs text-purple-700 font-medium">In Progress</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">{stats.inProgress}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40">
          <div className="text-xs text-emerald-700 font-medium">Completed</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Collected Vol-</div>
          <div className="text-2xl font-bold text-emerald-700 mt-1">{stats.totalKg} kg</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Request ID, user, location or category..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Status:</span>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
          >
            <option value="ALL">All Statuses ({requests.length})</option>
            {STATUS_FLOW.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 ml-1">
            <span className="hidden sm:inline">Category:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700"
          >
            <option value="ALL">All Categories</option>
            {WASTE_CATEGORIES.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">
            Requests Records ({filteredRequests.length} of {requests.length})
          </h3>
          <span className="text-xs text-slate-400">Click any row to manage details</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Category & Qty</th>
                <th className="py-3 px-4">Pickup Date & Slot</th>
                <th className="py-3 px-4">Address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No requests match your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredRequests.map((req) => (
                  <tr
                    key={req.id}
                    onClick={() => setSelectedRequest(req)}
                    className="hover:bg-slate-50/80 transition cursor-pointer"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {req.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{req.userName}</div>
                      <div className="text-[11px] text-slate-400">{req.userPhone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <CategoryIcon category={req.category} className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{req.category}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{req.quantity}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 font-medium">{req.pickupDate}</div>
                      <div className="text-[11px] text-slate-400">{req.pickupTime}</div>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                      {req.pickupLocation}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={req.status}
                        onChange={(e) => handleStatusChange(req.id, e.target.value)}
                        className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] font-semibold text-slate-700 cursor-pointer hover:border-emerald-500"
                      >
                        {STATUS_FLOW.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-slate-900">{selectedRequest.id}</span>
                <StatusBadge status={selectedRequest.status} />
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Change Lifecycle Status:</label>
              <div className="grid grid-cols-2 gap-2">
                {STATUS_FLOW.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleStatusChange(selectedRequest.id, s)}
                    className={`p-2 rounded-lg border text-xs font-semibold cursor-pointer transition flex items-center justify-between ${
                      selectedRequest.status === s
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{s}</span>
                    {selectedRequest.status === s && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Resident / User:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Contact Phone:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.userPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category & Qty:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.category} ({selectedRequest.quantity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Date & Slot:</span>
                <span className="font-semibold text-slate-800">{selectedRequest.pickupDate} ({selectedRequest.pickupTime})</span>
              </div>
              <div>
                <span className="text-slate-500 block">Address:</span>
                <span className="font-medium text-slate-800">{selectedRequest.pickupLocation}</span>
              </div>
              {selectedRequest.notes && (
                <div>
                  <span className="text-slate-500 block">Notes:</span>
                  <span className="text-slate-700 italic">&quot;{selectedRequest.notes}&quot;</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRequest(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}