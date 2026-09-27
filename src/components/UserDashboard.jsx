import React from 'react';
import { PlusCircle, ArrowRight, MapPin, Calendar, Leaf } from 'lucide-react';
import { StatusBadge, CategoryIcon } from './StatusBadge';
import { EcoImpactCard, GreenPointsCard, CategoryImpactChart, PickupProgress } from './EcoImpact';

export default function UserDashboard({ requests, setActiveTab, onSelectRequest }) {
  const completedCount = requests.filter(r => r.status === 'Completed').length;
  const activeCount = requests.filter(r => r.status !== 'Completed').length;
  const totalWeight = requests.reduce((acc, curr) => acc + (curr.quantityValue || 5), 0);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">User Dashboard</span>
          <h2 className="text-2xl font-bold mt-1">My Waste Collection Activity</h2>
          <p className="text-xs text-emerald-100 mt-1">View your booking history, active requests, and recycling contribution.</p>
        </div>
        <button
          onClick={() => setActiveTab('request')}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-white text-emerald-800 font-bold hover:bg-emerald-50 text-xs flex items-center gap-2 cursor-pointer shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Pickup</span>
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Active Requests</div>
          <div className="text-2xl font-bold text-blue-600 mt-1">{activeCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Awaiting or in collection</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Completed Pickups</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{completedCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Recycled successfully</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Estimated Waste Diverted</div>
          <div className="text-2xl font-bold text-slate-800 mt-1">~{totalWeight} kg</div>
          <p className="text-[11px] text-emerald-600 mt-0.5 flex items-center gap-1">
            <Leaf className="w-3 h-3" /> Diverted from municipal landfill
          </p>
        </div>
      </div>


      {/* Eco Impact + Green Points */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <EcoImpactCard requests={requests} className="lg:col-span-2" />
        <GreenPointsCard requests={requests} />
      </div>

      {/* Waste collected by category chart */}
      <CategoryImpactChart requests={requests} />

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Pickup History ({requests.length})</h3>
          <span className="text-xs text-slate-400">Sorted by recent requests</span>
        </div>

        <div className="divide-y divide-slate-100">
          {requests.map((req) => (
            <div key={req.id} className="p-4 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CategoryIcon category={req.category} className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-slate-900 text-sm">{req.id}</span>
                    <span className="text-xs font-semibold text-slate-700">• {req.category}</span>
                    <span className="text-xs text-slate-500">({req.quantity})</span>
                    <StatusBadge status={req.status} />
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="max-w-xs truncate">{req.pickupLocation}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{req.pickupDate} ({req.pickupTime})</span>
                    </span>
                  </div>
                  <PickupProgress status={req.status} className="mt-2" />
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => onSelectRequest(req.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}