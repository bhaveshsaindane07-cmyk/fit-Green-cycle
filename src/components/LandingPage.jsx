import React from 'react';
import { ArrowRight, Recycle, Sparkles, ShieldCheck } from 'lucide-react';
import { WASTE_CATEGORIES } from '../mockData';
import { CategoryIcon } from './StatusBadge';

export default function LandingPage({ setActiveTab, stats, onSelectCategory }) {
  const handleCategoryClick = (catName) => {
    if (onSelectCategory) onSelectCategory(catName);
    setActiveTab('request');
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="text-center pt-8 pb-10 bg-gradient-to-b from-emerald-50 to-white rounded-3xl p-6 border border-emerald-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          Smart Waste Collection & Recycling MVP
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Smart Waste Collection &amp; <span className="text-emerald-600">Recycling Platform</span>
        </h1>
        <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          Schedule convenient doorstep pickups for segregated recyclables. Track your waste journey in real-time from your doorstep to certified recycling facilities.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTab('request')}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 shadow-sm flex items-center gap-2 text-sm cursor-pointer"
          >
            <span>Book Waste Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className="px-5 py-2.5 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 border border-slate-300 text-sm cursor-pointer"
          >
            Track Status
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 flex items-center gap-2 text-sm cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Admin Portal</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-slate-500">Total Pickups</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
            <div className="text-xs text-slate-500">Pending</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">{stats.scheduled + stats.inProgress}</div>
            <div className="text-xs text-slate-500">In Routing</div>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-emerald-600">{stats.completed}</div>
            <div className="text-xs text-slate-500">Recycled</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Waste Categories</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Select any category to schedule a collection request</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {WASTE_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <CategoryIcon category={cat.name} className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${cat.badgeColor}`}>
                    Recycle
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{cat.description}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-medium">
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-center mb-6">4-Step Seamless Process</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-emerald-800/60 p-4 rounded-xl border border-emerald-700">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
            <h4 className="font-semibold text-sm">Select Category</h4>
            <p className="text-xs text-emerald-200 mt-1">Plastic, Paper, Glass, Metal, E-Waste, Organic or Mixed.</p>
          </div>
          <div className="bg-emerald-800/60 p-4 rounded-xl border border-emerald-700">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
            <h4 className="font-semibold text-sm">Location &amp; Time</h4>
            <p className="text-xs text-emerald-200 mt-1">Provide pickup address, approximate quantity, date and time.</p>
          </div>
          <div className="bg-emerald-800/60 p-4 rounded-xl border border-emerald-700">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
            <h4 className="font-semibold text-sm">Get Unique ID</h4>
            <p className="text-xs text-emerald-200 mt-1">Instant generated tracking ID (e.g. SWC-9281) for live monitoring.</p>
          </div>
          <div className="bg-emerald-800/60 p-4 rounded-xl border border-emerald-700">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center mb-2">4</span>
            <h4 className="font-semibold text-sm">Pickup &amp; Recycle</h4>
            <p className="text-xs text-emerald-200 mt-1">Our certified team collects and delivers waste to processing centers.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
