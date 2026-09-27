import React from 'react';
import { Recycle, Heart } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
              <Recycle className="w-5 h-5" />
            </div>
            <span className="font-bold text-white text-base">GreenCycle Platform</span>
            <span className="text-xs bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">Hackathon MVP</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <button onClick={() => setActiveTab('landing')} className="hover:text-white transition cursor-pointer">
              Home
            </button>
            <button onClick={() => setActiveTab('request')} className="hover:text-white transition cursor-pointer">
              Schedule Pickup
            </button>
            <button onClick={() => setActiveTab('track')} className="hover:text-white transition cursor-pointer">
              Track Status
            </button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-white transition cursor-pointer">
              Admin Portal
            </button>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for clean, sustainable smart cities
          </p>
        </div>
      </div>
    </footer>
  );
}

