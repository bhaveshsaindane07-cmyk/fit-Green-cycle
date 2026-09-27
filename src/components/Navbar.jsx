import React from 'react';
import { 
  Recycle, 
  LayoutDashboard, 
  ShieldCheck, 
  PlusCircle, 
  Search,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, pendingCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg sm:text-xl text-slate-800 tracking-tight">GreenCycle</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">MVP</span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">Smart Waste Collection & Recycling Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'landing'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab('request')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'request'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Pickup</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'track'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Track Status</span>
              <span className="sm:hidden">Track</span>
            </button>

            <button
              onClick={() => setActiveTab('userDashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'userDashboard'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">My Activity</span>
              <span className="sm:hidden">Activity</span>
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 border ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Admin Portal</span>
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
