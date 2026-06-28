import { Bike, Booking } from './types';

// Import images as ES modules so Vite can bundle and hash them correctly
import vintageVespaImg from './assets/images/vintage_vespa_1782636799449.jpg';
import classicBulletImg from './assets/images/classic_bullet_1782636815861.jpg';
import sportsScooterImg from './assets/images/sports_scooter_1782636834267.jpg';
import commuterBicycleImg from './assets/images/commuter_bicycle_1782636850113.jpg';
import layaLogoImg from './assets/images/laya_logo_1782636781348.jpg';

export const INITIAL_BIKES: Bike[] = [
  {
    id: 'vespa-classic',
    name: 'Vespa Elegante 150 (French Mint)',
    type: 'scooter',
    pricePerHour: 80,
    pricePerDay: 580,
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    specs: ['Retro Italian Styling', 'Plush Leather Seats', 'Full Chrome Detailing', 'Comfortable for Two Riders'],
    description: 'Perfect for gliding along Pondicherry’s charming French Quarter and coastal lanes with premium retro elegance.'
  },
  {
    id: 're-classic-350',
    name: 'Royal Enfield Hunter 350 (Metro Dapper)',
    type: 'motorcycle',
    pricePerHour: 130,
    pricePerDay: 950,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    specs: ['High-Torque 349cc Engine', 'Retro-Metro Exhaust Note', 'Dual-Channel ABS Safety', 'Ideal for ECR Coastal Highways'],
    description: 'Modern sporty posture combined with the iconic thumping legacy for cruising in complete comfort.'
  },
  {
    id: 'burgman-sports',
    name: 'Ather 450X Gen 4 (Smart Electric)',
    type: 'scooter',
    pricePerHour: 90,
    pricePerDay: 650,
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=800',
    status: 'Booked',
    specs: ['100% Zero-Emission Electric', 'Google Maps TFT Dashboard', 'Warp Mode: 0-40 in 3.3s', 'Complimentary Charging Access'],
    description: 'The absolute pinnacle of modern smart mobility. Eco-friendly, hyper-responsive, and incredibly stylish.'
  },
  {
    id: 'vintage-cruiser',
    name: 'Specialized Sirrus City Hybrid',
    type: 'bicycle',
    pricePerHour: 30,
    pricePerDay: 180,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    status: 'Available',
    specs: ['Superlight Alloy Frame', 'Ergonomic Grips & Saddle', 'Front/Back LED Safety Lights', 'Anti-Rust Specialized Chain'],
    description: 'Paddle effortlessly through the narrow cobblestone French Quarter and serene Heritage paths.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'LYB-89312',
    bikeId: 'burgman-sports',
    bikeName: 'Suzuki Burgman Street 125',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    startDate: '2026-06-28',
    endDate: '2026-06-30',
    totalDays: 2,
    totalAmount: 960,
    paymentStatus: 'Paid (Razorpay Advance)',
    bookingStatus: 'Confirmed',
    timestamp: '2026-06-27T14:30:00Z'
  },
  {
    id: 'LYB-74129',
    bikeId: 're-classic-350',
    bikeName: 'Royal Enfield Classic 350',
    customerName: 'Priya Patel',
    customerPhone: '+91 91234 56789',
    startDate: '2026-06-25',
    endDate: '2026-06-26',
    totalDays: 1,
    totalAmount: 900,
    paymentStatus: 'Paid (Razorpay Advance)',
    bookingStatus: 'Completed',
    timestamp: '2026-06-25T09:15:00Z'
  }
];

export const LOGO_IMAGE = layaLogoImg;
export const BUSINESS_NAME = 'Laya Bike Rental';
