export const WASTE_CATEGORIES = [
  {
    id: 'plastic',
    name: 'Plastic',
    icon: 'Recycle',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Bottles, containers, wrapping films, HDPE, PET containers',
    ecoImpact: 'Saves oil and prevents marine pollution'
  },
  {
    id: 'paper',
    name: 'Paper',
    icon: 'FileText',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    description: 'Cardboard, newspapers, magazines, office paper, clean cartons',
    ecoImpact: 'Conserves trees and saves fresh water'
  },
  {
    id: 'glass',
    name: 'Glass',
    icon: 'Wine',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    description: 'Glass bottles, jars, unbroken glassware (rinsed clean)',
    ecoImpact: '100% infinitely recyclable without quality loss'
  },
  {
    id: 'metal',
    name: 'Metal',
    icon: 'Boxes',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Aluminum cans, tin containers, copper wires, metal scraps',
    ecoImpact: 'Saves 95% energy compared to raw metal production'
  },
  {
    id: 'e-waste',
    name: 'E-Waste',
    icon: 'Cpu',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    description: 'Old phones, chargers, laptops, cables, batteries, circuit boards',
    ecoImpact: 'Recovers precious metals and prevents toxic soil contamination'
  },
  {
    id: 'organic',
    name: 'Organic',
    icon: 'Leaf',
    badgeColor: 'bg-green-100 text-green-800 border-green-300',
    description: 'Food scraps, garden trimmings, peelings, compostable waste',
    ecoImpact: 'Converts into organic fertilizer & biogas'
  },
  {
    id: 'mixed-waste',
    name: 'Mixed Waste',
    icon: 'Trash2',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    description: 'Non-segregated domestic dry waste and packaging materials',
    ecoImpact: 'Sorted at regional recovery facilities to divert landfill'
  }
];

export const STATUS_FLOW = ['Pending', 'Scheduled', 'In Progress', 'Completed'];

export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '09:00 AM - 11:00 AM',
  '10:00 AM - 12:00 PM',
  '11:00 AM - 01:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '03:00 PM - 05:00 PM',
  '04:00 PM - 06:00 PM'
];

export const STATUS_CONFIG = {
  'Pending': {
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    dotColor: 'bg-amber-500',
    stepIndex: 0,
    desc: 'Request received and awaiting pickup schedule dispatch.'
  },
  'Scheduled': {
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    dotColor: 'bg-blue-500',
    stepIndex: 1,
    desc: 'Driver and team assigned. Scheduled for chosen time window.'
  },
  'In Progress': {
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    dotColor: 'bg-purple-500',
    stepIndex: 2,
    desc: 'Pickup vehicle is on the way or actively collecting waste.'
  },
  'Completed': {
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    dotColor: 'bg-emerald-500',
    stepIndex: 3,
    desc: 'Waste successfully collected and delivered to processing hub.'
  }
};

export const INITIAL_REQUESTS = [
  {
    id: 'SWC-8921',
    userName: 'Aarav Sharma',
    userEmail: 'aarav.sharma@example.com',
    userPhone: '+91 98765 43210',
    category: 'E-Waste',
    quantity: '8 kg',
    quantityValue: 8,
    pickupLocation: 'Flat 402, Green Valley Apts, Sector 14, Gurugram',
    pickupDate: '2026-09-28',
    pickupTime: '10:00 AM - 12:00 PM',
    notes: '2 old desktop monitors and power cables ready in box.',
    status: 'Pending',
    createdAt: '2026-09-27 09:30 AM'
  },
  {
    id: 'SWC-7832',
    userName: 'Priya Patel',
    userEmail: 'priya.patel@example.com',
    userPhone: '+91 98220 11234',
    category: 'Plastic',
    quantity: '15 kg',
    quantityValue: 15,
    pickupLocation: 'B-12, Palm Residency, Whitefield, Bengaluru',
    pickupDate: '2026-09-28',
    pickupTime: '02:00 PM - 04:00 PM',
    notes: 'Segregated plastic bottles and packing wraps.',
    status: 'Scheduled',
    createdAt: '2026-09-26 04:15 PM'
  },
  {
    id: 'SWC-6549',
    userName: 'Rohan Verma',
    userEmail: 'rohan.v@example.com',
    userPhone: '+91 97112 55432',
    category: 'Paper',
    quantity: '25 kg',
    quantityValue: 25,
    pickupLocation: '15/3, Model Town, Civil Lines, Jaipur',
    pickupDate: '2026-09-27',
    pickupTime: '11:00 AM - 01:00 PM',
    notes: 'Old books, newspapers and folded corrugated boxes.',
    status: 'In Progress',
    createdAt: '2026-09-26 11:20 AM'
  },
  {
    id: 'SWC-5210',
    userName: 'Ananya Deshmukh',
    userEmail: 'ananya.d@example.com',
    userPhone: '+91 94001 88765',
    category: 'Metal',
    quantity: '12 kg',
    quantityValue: 12,
    pickupLocation: 'House 88, Sunrise Enclave, Viman Nagar, Pune',
    pickupDate: '2026-09-25',
    pickupTime: '09:00 AM - 11:00 AM',
    notes: 'Clean soda cans and scrap pipes.',
    status: 'Completed',
    createdAt: '2026-09-25 08:00 AM'
  },
  {
    id: 'SWC-4198',
    userName: 'Vikram Sengupta',
    userEmail: 'vikram.s@example.com',
    userPhone: '+91 98301 99281',
    category: 'Glass',
    quantity: '10 kg',
    quantityValue: 10,
    pickupLocation: 'Flat 3B, Lake View Mansions, Salt Lake Sector 2, Kolkata',
    pickupDate: '2026-09-24',
    pickupTime: '03:00 PM - 05:00 PM',
    notes: 'Packed safely in double cardboard carton.',
    status: 'Completed',
    createdAt: '2026-09-24 10:15 AM'
  },
  {
    id: 'SWC-3024',
    userName: 'Meera Nambiar',
    userEmail: 'meera.n@example.com',
    userPhone: '+91 98450 67123',
    category: 'Organic',
    quantity: '30 kg',
    quantityValue: 30,
    pickupLocation: 'Garden View Villa 4, Indiranagar, Bengaluru',
    pickupDate: '2026-09-27',
    pickupTime: '08:00 AM - 10:00 AM',
    notes: 'Horticultural and compostable kitchen waste bags.',
    status: 'In Progress',
    createdAt: '2026-09-26 06:40 PM'
  }
];
