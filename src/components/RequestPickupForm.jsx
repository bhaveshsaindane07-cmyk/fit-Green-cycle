import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Info, Calendar, Clock, MapPin, Scale, HelpCircle } from 'lucide-react';
import { WASTE_CATEGORIES, TIME_SLOTS } from '../mockData';
import { CategoryIcon } from './StatusBadge';

export default function RequestPickupForm({ onSubmitRequest, initialCategory, onTrackRequest }) {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    pickupLocation: '',
    category: initialCategory || WASTE_CATEGORIES[0].name,
    quantity: '5 - 10 kg',
    quantityValue: 8,
    pickupDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    pickupTime: TIME_SLOTS[0],
    notes: '',
  });

  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const selectedCategoryObj = WASTE_CATEGORIES.find(c => c.name === formData.category) || WASTE_CATEGORIES[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (catName) => {
    setFormData(prev => ({ ...prev, category: catName }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.userName.trim() || !formData.userPhone.trim() || !formData.pickupLocation.trim()) {
      setErrorMsg('Please fill in your name, contact phone number, and pickup address.');
      return;
    }

    const newReq = onSubmitRequest({
      userName: formData.userName,
      userPhone: formData.userPhone,
      pickupLocation: formData.pickupLocation,
      category: formData.category,
      quantity: formData.quantity,
      quantityValue: formData.quantityValue,
      pickupDate: formData.pickupDate,
      pickupTime: formData.pickupTime,
      notes: formData.notes,
    });

    setSubmittedRequest(newReq);
  };

  if (submittedRequest) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-lg text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <h2 className="text-2xl font-bold text-slate-900">Pickup Request Confirmed!</h2>
          <p className="text-xs text-slate-600">
            Thank you for contributing to responsible recycling. Your pickup has been logged into our smart dispatch queue.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 text-left font-mono text-xs space-y-2 border border-slate-200">
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Request ID:</span>
              <span className="font-bold text-emerald-700 text-sm">{submittedRequest.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Waste Category:</span>
              <span className="text-slate-800">{submittedRequest.category} ({submittedRequest.quantity})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Scheduled For:</span>
              <span className="text-slate-800">{submittedRequest.pickupDate} - {submittedRequest.pickupTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-sans">Pickup Location:</span>
              <span className="text-slate-800">{submittedRequest.pickupLocation}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onTrackRequest(submittedRequest.id)}
              className="flex-1 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs transition cursor-pointer"
            >
              Track This Request Now
            </button>
            <button
              onClick={() => setSubmittedRequest(null)}
              className="px-4 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium text-xs transition cursor-pointer"
            >
              Book Another Pickup
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Schedule a Waste & Recycling Pickup</h2>
        <p className="text-xs text-slate-500 mt-1">
          Select your waste material type, specify volume, and pick a convenient collection window.
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center">1</span>
            Select Waste Category
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {WASTE_CATEGORIES.map((cat) => {
              const isSelected = formData.category === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`p-3.5 rounded-xl border text-left transition flex flex-col items-start gap-2 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500 text-emerald-950 font-medium'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <CategoryIcon category={cat.name} className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">{cat.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{cat.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-700">Guideline for {selectedCategoryObj.name}: </span>
              <span>{selectedCategoryObj.description}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center">2</span>
            Pickup Details & Estimated Quantity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-slate-500" />
                Estimated Volume / Weight
              </label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  let numericKg = 8;
                  if (val.includes('< 5')) numericKg = 3;
                  else if (val.includes('5 - 10')) numericKg = 8;
                  else if (val.includes('10 - 25')) numericKg = 18;
                  else if (val.includes('25 - 50')) numericKg = 35;
                  else numericKg = 75;
                  setFormData(prev => ({ ...prev, quantity: val, quantityValue: numericKg }));
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="< 5 kg">&lt; 5 kg (Small bag)</option>
                <option value="5 - 10 kg">5 - 10 kg (Medium bag)</option>
                <option value="10 - 25 kg">10 - 25 kg (Large bin / multiple sacks)</option>
                <option value="25 - 50 kg">25 - 50 kg (Commercial bulk box)</option>
                <option value="50+ kg">50+ kg (Heavy / Appliance)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Pickup Date
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Preferred Time Window
              </label>
              <select
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g. Left behind back gate, ring bell"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] flex items-center justify-center">3</span>
            Resident Contact & Pickup Address
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phone Number</label>
              <input
                type="tel"
                name="userPhone"
                value={formData.userPhone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                Complete Pickup Address
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                placeholder="Street Address, Apartment/Suite, Neighborhood"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition"
          >
            <Send className="w-4 h-4" />
            <span>Confirm & Schedule Pickup</span>
          </button>
        </div>
      </form>
    </div>
  );
}