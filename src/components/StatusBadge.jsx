import React from 'react';
import { 
  Recycle, 
  FileText, 
  Wine, 
  Boxes, 
  Cpu, 
  Leaf, 
  Trash2,
  HelpCircle
} from 'lucide-react';

export const CategoryIcon = ({ category, className = "w-5 h-5" }) => {
  const norm = (category || '').toLowerCase();
  if (norm.includes('plastic')) return <Recycle className={className} />;
  if (norm.includes('paper')) return <FileText className={className} />;
  if (norm.includes('glass')) return <Wine className={className} />;
  if (norm.includes('metal')) return <Boxes className={className} />;
  if (norm.includes('e-waste') || norm.includes('ewaste')) return <Cpu className={className} />;
  if (norm.includes('organic')) return <Leaf className={className} />;
  if (norm.includes('mixed')) return <Trash2 className={className} />;
  return <HelpCircle className={className} />;
};

export const StatusBadge = ({ status }) => {
  let badgeClasses = 'bg-slate-100 text-slate-700 border-slate-300';
  let dotColor = 'bg-slate-400';

  if (status === 'Pending') {
    badgeClasses = 'bg-amber-50 text-amber-700 border-amber-300';
    dotColor = 'bg-amber-500 animate-pulse';
  } else if (status === 'Scheduled') {
    badgeClasses = 'bg-blue-50 text-blue-700 border-blue-300';
    dotColor = 'bg-blue-500';
  } else if (status === 'In Progress') {
    badgeClasses = 'bg-purple-50 text-purple-700 border-purple-300';
    dotColor = 'bg-purple-500 animate-pulse';
  } else if (status === 'Completed') {
    badgeClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300';
    dotColor = 'bg-emerald-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClasses}`}>
      <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
      {status}
    </span>
  );
};
