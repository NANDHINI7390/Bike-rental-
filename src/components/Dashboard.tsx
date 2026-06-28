import React, { useState } from 'react';
import { Bike, Booking } from '../types';
import { Database, ShieldAlert, BadgePlus, RefreshCw, Smartphone, TrendingUp, CheckCircle, Clock, Trash2, ShieldCheck, HelpCircle, Plus, Edit2, Trash, X, Save } from 'lucide-react';
import { BUSINESS_NAME } from '../data';

interface DashboardProps {
  bikes: Bike[];
  bookings: Booking[];
  onUpdateBikeStatus: (bikeId: string, newStatus: Bike['status']) => void;
  onDeleteBooking: (bookingId: string) => void;
  onResetData: () => void;
  onAddBike: (newBike: Bike) => void;
  onEditBike: (updatedBike: Bike) => void;
  onDeleteBike: (bikeId: string) => void;
}

export default function Dashboard({ bikes, bookings, onUpdateBikeStatus, onDeleteBooking, onResetData, onAddBike, onEditBike, onDeleteBike }: DashboardProps) {
  const [editingBikeId, setEditingBikeId] = useState<string | null>(null);

  const [isAddingBike, setIsAddingBike] = useState(false);
  const [editingBike, setEditingBike] = useState<Bike | null>(null);

  // Form states for adding/editing a bike
  const [bikeName, setBikeName] = useState('');
  const [bikeType, setBikeType] = useState<'scooter' | 'motorcycle' | 'bicycle'>('scooter');
  const [bikePricePerDay, setBikePricePerDay] = useState(399);
  const [bikePricePerHour, setBikePricePerHour] = useState(49);
  const [bikeDescription, setBikeDescription] = useState('');
  const [bikeImage, setBikeImage] = useState('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800');
  const [bikeSpecs, setBikeSpecs] = useState('Helmets Included, Clean & Sanitized, Heavy Duty Disc Lock');

  const handleStartAddBike = () => {
    setBikeName('');
    setBikeType('scooter');
    setBikePricePerDay(399);
    setBikePricePerHour(49);
    setBikeDescription('');
    setBikeImage('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800');
    setBikeSpecs('Helmets Included, Clean & Sanitized, Heavy Duty Disc Lock');
    setIsAddingBike(true);
    setEditingBike(null);
  };

  const handleStartEditBike = (bike: Bike) => {
    setEditingBike(bike);
    setBikeName(bike.name);
    setBikeType(bike.type);
    setBikePricePerDay(bike.pricePerDay);
    setBikePricePerHour(bike.pricePerHour);
    setBikeDescription(bike.description);
    setBikeImage(bike.image);
    setBikeSpecs(bike.specs.join(', '));
    setIsAddingBike(false);
  };

  const handleSaveBike = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bikeName.trim()) return;

    const specsArray = bikeSpecs.split(',').map(s => s.trim()).filter(Boolean);

    if (editingBike) {
      // Edit mode
      const updated: Bike = {
        ...editingBike,
        name: bikeName,
        type: bikeType,
        pricePerDay: Number(bikePricePerDay),
        pricePerHour: Number(bikePricePerHour),
        description: bikeDescription,
        image: bikeImage,
        specs: specsArray
      };
      onEditBike(updated);
      setEditingBike(null);
    } else {
      // Add mode
      const newBike: Bike = {
        id: `re-${Date.now()}`,
        name: bikeName,
        type: bikeType,
        pricePerDay: Number(bikePricePerDay),
        pricePerHour: Number(bikePricePerHour),
        description: bikeDescription,
        image: bikeImage,
        status: 'Available',
        specs: specsArray
      };
      onAddBike(newBike);
      setIsAddingBike(false);
    }
  };

  // Calculate metrics
  const totalFleet = bikes.length;
  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'Confirmed').length;
  const availableBikesCount = bikes.filter(b => b.status === 'Available').length;
  
  const totalRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

  // Status tag helper style
  const getBikeStatusClass = (status: Bike['status']) => {
    switch (status) {
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Booked':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Rented':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Service':
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getBookingStatusClass = (status: Booking['bookingStatus']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Collected':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-600 border border-gray-300';
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-brand-charcoal">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Dashboard Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-brand-olive/15 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow"></span>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-olive-dark">
                Owner Administration Panel
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-brand-charcoal/70">
              Live simulation metrics, status controllers, and booking logs for {BUSINESS_NAME}.
            </p>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              id="btn-admin-add-ride"
              onClick={handleStartAddBike}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-yellow hover:bg-brand-yellow-dark text-brand-charcoal text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-brand-olive"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Ride
            </button>
            <button
              id="btn-admin-reset-data"
              onClick={onResetData}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-brand-olive/20 hover:bg-white text-xs font-bold text-brand-charcoal uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              title="Reset metrics back to starting defaults"
            >
              <RefreshCw className="w-3.5 h-3.5 text-brand-olive" />
              Reset Demo Data
            </button>
          </div>
        </div>

        {/* METRICS STATS BLOCKS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Box 1 */}
          <div className="bg-white rounded-2xl border border-brand-olive/15 p-5 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/50 block tracking-wider">Total Fleet</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-extrabold text-brand-charcoal">{totalFleet}</span>
              <span className="text-xs text-brand-charcoal/40">registered rides</span>
            </div>
            <div className="text-[10px] text-brand-olive font-semibold flex items-center gap-1">
              <span>● 3 Gearless Scooters</span>
              <span>•</span>
              <span>1 Vintage Cycle</span>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-2xl border border-brand-olive/15 p-5 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/50 block tracking-wider">Active Bookings</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-extrabold text-brand-olive">{activeBookingsCount}</span>
              <span className="text-xs text-brand-charcoal/40">awaiting pickup</span>
            </div>
            <div className="text-[10px] text-brand-olive-light font-semibold">
              Instant Razorpay authorized bookings
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-2xl border border-brand-olive/15 p-5 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/50 block tracking-wider">Available Now</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-extrabold text-emerald-600">{availableBikesCount}</span>
              <span className="text-xs text-brand-charcoal/40">ready in yard</span>
            </div>
            <div className="text-[10px] text-brand-charcoal/55">
              Available for immediate catalog booking
            </div>
          </div>

          {/* Box 4 */}
          <div className="bg-white rounded-2xl border border-brand-olive/15 p-5 shadow-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-charcoal/50 block tracking-wider">Total Revenue (Demo)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-display font-extrabold text-brand-olive-dark">₹{totalRevenue}</span>
              <span className="text-xs text-brand-charcoal/40">advance paid</span>
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Simulated Sandbox funds</span>
            </div>
          </div>
        </div>

        {/* ADD OR EDIT BIKE FORM CONTAINER */}
        {(isAddingBike || editingBike) && (
          <form 
            onSubmit={handleSaveBike}
            className="bg-white rounded-2xl border-2 border-brand-yellow p-6 shadow-md space-y-5"
          >
            <div className="flex items-center justify-between border-b border-brand-olive/15 pb-3">
              <h3 className="font-display font-black text-lg text-brand-olive-dark flex items-center gap-2">
                {editingBike ? <Edit2 className="w-5 h-5 text-brand-yellow" /> : <Plus className="w-5 h-5 text-brand-yellow" />}
                {editingBike ? `Edit Ride Details: ${editingBike.name}` : 'Add New Ride to Catalog'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsAddingBike(false);
                  setEditingBike(null);
                }}
                className="p-1.5 text-brand-charcoal/40 hover:text-red-500 rounded-lg transition-colors hover:bg-brand-cream/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Bike Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Ride Name</label>
                <input
                  type="text"
                  required
                  value={bikeName}
                  onChange={(e) => setBikeName(e.target.value)}
                  placeholder="e.g. Vespa VXL 150 Classic"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Category</label>
                <select
                  value={bikeType}
                  onChange={(e) => setBikeType(e.target.value as any)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                >
                  <option value="scooter">Scooter</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bicycle">Bicycle</option>
                </select>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Image URL</label>
                <input
                  type="url"
                  required
                  value={bikeImage}
                  onChange={(e) => setBikeImage(e.target.value)}
                  placeholder="Paste direct Unsplash image link"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold font-mono text-xs"
                />
              </div>

              {/* Price Per Day */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Rate Per Day (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bikePricePerDay}
                  onChange={(e) => setBikePricePerDay(Number(e.target.value))}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                />
              </div>

              {/* Price Per Hour */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Rate Per Hour (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bikePricePerHour}
                  onChange={(e) => setBikePricePerHour(Number(e.target.value))}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                />
              </div>

              {/* Specifications */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Specs (comma-separated)</label>
                <input
                  type="text"
                  required
                  value={bikeSpecs}
                  onChange={(e) => setBikeSpecs(e.target.value)}
                  placeholder="Helmets, Full Tank, Safety Lock"
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 md:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-brand-charcoal/70 uppercase">Ride Description</label>
                <textarea
                  rows={2}
                  required
                  value={bikeDescription}
                  onChange={(e) => setBikeDescription(e.target.value)}
                  placeholder="Provide a premium, enticing ride summary..."
                  className="w-full text-sm px-4 py-2.5 rounded-xl border-2 border-brand-olive/15 focus:border-brand-yellow outline-hidden bg-brand-cream/20 transition-all font-semibold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-brand-olive/10">
              <button
                type="button"
                onClick={() => {
                  setIsAddingBike(false);
                  setEditingBike(null);
                }}
                className="px-5 py-2.5 rounded-xl border border-brand-olive/25 hover:bg-brand-cream/30 text-xs font-bold text-brand-charcoal uppercase tracking-wider transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-yellow hover:bg-brand-yellow-dark text-brand-charcoal font-black text-xs uppercase tracking-wider transition-all shadow-md border border-brand-olive"
              >
                <Save className="w-4 h-4" />
                {editingBike ? 'Save Changes' : 'Publish Ride'}
              </button>
            </div>
          </form>
        )}

        {/* ROW 1: BIKES FLEET CONTROLLER */}
        <div className="bg-white rounded-2xl border border-brand-olive/15 shadow-xs overflow-hidden">
          <div className="bg-brand-olive px-6 py-4 flex justify-between items-center text-brand-cream">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-brand-yellow" />
              <h2 className="font-display font-bold text-base sm:text-lg">Bikes Fleet Controller</h2>
            </div>
            <span className="bg-white/10 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-mono text-brand-yellow font-bold">
              Click Status Tag to Override
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-cream border-b border-brand-olive/10 text-brand-charcoal/60 text-[10px] uppercase tracking-wider font-semibold">
                  <th className="px-6 py-3">Ride ID & Photo</th>
                  <th className="px-6 py-3">Ride Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Daily Rate</th>
                  <th className="px-6 py-3 text-center">Interactive Status Controller</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-olive/10 text-xs sm:text-sm">
                {bikes.map((bike) => (
                  <tr key={bike.id} className="hover:bg-brand-cream/35 transition-colors">
                    {/* ID & Photo */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={bike.image}
                          alt={bike.name}
                          className="w-12 h-9 rounded-md object-cover border border-brand-olive/10"
                          referrerPolicy="no-referrer"
                        />
                        <span className="font-mono text-[10px] font-bold text-brand-charcoal/40 uppercase">
                          {bike.id.replace('re-', 'LY-')}
                        </span>
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 font-semibold text-brand-olive-dark">
                      {bike.name}
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 uppercase font-mono text-[10px] font-bold text-brand-charcoal/60">
                      {bike.type}
                    </td>

                    {/* Rates */}
                    <td className="px-6 py-4 font-medium">
                      ₹{bike.pricePerDay}/day
                      <span className="text-brand-charcoal/40 text-[10px] block font-normal">₹{bike.pricePerHour}/hr</span>
                    </td>

                    {/* Interactive Status Dropdown Selector */}
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block relative">
                        <select
                          id={`select-status-${bike.id}`}
                          value={bike.status}
                          onChange={(e) => onUpdateBikeStatus(bike.id, e.target.value as Bike['status'])}
                          className={`appearance-none text-xs font-bold px-4 py-2 pr-8 rounded-full border text-center font-sans cursor-pointer outline-hidden focus:ring-1 focus:ring-brand-olive transition-colors ${getBikeStatusClass(bike.status)}`}
                        >
                          <option value="Available">Available</option>
                          <option value="Booked">Booked</option>
                          <option value="Rented">Rented</option>
                          <option value="In Service">In Service</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-charcoal/50">
                          ▼
                        </div>
                      </div>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          id={`btn-edit-bike-${bike.id}`}
                          onClick={() => handleStartEditBike(bike)}
                          className="p-1.5 text-brand-charcoal/40 hover:text-brand-olive hover:bg-brand-cream/50 rounded-lg transition-all cursor-pointer"
                          title="Edit ride details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          id={`btn-delete-bike-${bike.id}`}
                          onClick={() => {
                            if (confirm(`Are you sure you want to retire "${bike.name}" from active fleet?`)) {
                              onDeleteBike(bike.id);
                            }
                          }}
                          className="p-1.5 text-brand-charcoal/40 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Decommission ride"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 2: RECENT BOOKINGS TABLE */}
        <div className="bg-white rounded-2xl border border-brand-olive/15 shadow-xs overflow-hidden">
          <div className="bg-brand-charcoal px-6 py-4 flex justify-between items-center text-brand-cream">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-brand-yellow" />
              <h2 className="font-display font-bold text-base sm:text-lg">Recent Bookings History</h2>
            </div>
            <span className="bg-brand-yellow text-brand-charcoal text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md font-semibold">
              {bookings.length} Total Bookings
            </span>
          </div>

          <div className="overflow-x-auto">
            {bookings.length === 0 ? (
              <div className="py-12 px-6 text-center text-brand-charcoal/50">
                No recent bookings recorded in the demo session. Click "Book Now" on any bike to generate logs!
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-cream border-b border-brand-olive/10 text-brand-charcoal/60 text-[10px] uppercase tracking-wider font-semibold">
                    <th className="px-6 py-3">Ref ID</th>
                    <th className="px-6 py-3">Reserved Bike</th>
                    <th className="px-6 py-3">Rider Contact</th>
                    <th className="px-6 py-3">Rental Duration</th>
                    <th className="px-6 py-3">Advance Status</th>
                    <th className="px-6 py-3 text-right">Refund Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-olive/10 text-xs sm:text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-brand-cream/35 transition-colors">
                      {/* Ref ID */}
                      <td className="px-6 py-4 font-mono font-bold text-brand-olive">
                        {booking.id}
                      </td>

                      {/* Bike Name */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-brand-charcoal block">{booking.bikeName}</span>
                        <span className="text-[10px] text-brand-charcoal/40 font-mono">ID: {booking.bikeId}</span>
                      </td>

                      {/* Customer Info */}
                      <td className="px-6 py-4">
                        <span className="font-medium text-brand-charcoal block">{booking.customerName}</span>
                        <span className="text-[10px] text-brand-charcoal/50 block mt-0.5">{booking.customerPhone}</span>
                      </td>

                      {/* Dates */}
                      <td className="px-6 py-4 text-xs font-medium">
                        <div>{booking.startDate}</div>
                        {booking.endDate !== bookingDetailsStringHelper(booking.startDate, booking.endDate) && (
                          <div className="text-brand-charcoal/40 text-[10px]">to {booking.endDate}</div>
                        )}
                        <span className="inline-block mt-1 bg-brand-cream border border-brand-olive/15 px-1.5 py-0.5 rounded-md text-[9px] font-bold text-brand-charcoal/60 uppercase">
                          {booking.totalDays > 0 ? `${booking.totalDays} days` : 'hourly'}
                        </span>
                      </td>

                      {/* Amount & Status */}
                      <td className="px-6 py-4">
                        <span className="font-bold text-brand-olive block">₹{booking.totalAmount}</span>
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase mt-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          Advance Paid
                        </span>
                      </td>

                      {/* Delete Button */}
                      <td className="px-6 py-4 text-right">
                        <button
                          id={`btn-delete-booking-${booking.id}`}
                          onClick={() => onDeleteBooking(booking.id)}
                          className="p-2 text-brand-charcoal/30 hover:text-red-600 transition-colors focus:outline-hidden"
                          title="Cancel booking and simulate refund"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Internal helper for rendering clean dates
function bookingDetailsStringHelper(start: string, end: string) {
  if (end && end.includes('(')) {
    return start; // hourly representation
  }
  return end;
}
