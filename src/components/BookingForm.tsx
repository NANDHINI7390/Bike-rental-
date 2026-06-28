import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bike, Booking } from '../types';
import { BUSINESS_NAME } from '../data';
import { ArrowLeft, Calendar, User, Phone, ShieldCheck, CreditCard, ChevronLeft, ChevronRight, X, Sparkles, Receipt, Camera } from 'lucide-react';

interface BookingFormProps {
  selectedBike: Bike;
  onBack: () => void;
  onSubmitBooking: (booking: Booking) => void;
}

export default function BookingForm({ selectedBike, onBack, onSubmitBooking }: BookingFormProps) {
  // Gallery active image state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Define gallery images based on bike type and id
  const getBikeGallery = (bike: Bike): string[] => {
    const scooterGallery = [
      bike.image,
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'
    ];

    const motorcycleGallery = [
      bike.image,
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'
    ];

    const bicycleGallery = [
      bike.image,
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800'
    ];

    if (bike.id === 'vespa-classic') {
      return [
        bike.image,
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800', // vintage dashboard
        'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800', // yellow vespa
        'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800'  // mint vespa front
      ];
    }

    if (bike.id === 're-classic-350') {
      return [
        bike.image,
        'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800', // coastal ride
        'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=800', // engine thumping
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800'  // handlebars closeup
      ];
    }

    if (bike.id === 'burgman-sports') {
      return [
        bike.image,
        'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800', // smart console
        'https://images.unsplash.com/photo-1517524008436-bbdb61998520?auto=format&fit=crop&q=80&w=800', // charging / detail
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'  // side angle retro
      ];
    }

    if (bike.id === 'vintage-cruiser') {
      return [
        bike.image,
        'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=800', // gears
        'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=800', // active cruise cycle
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800'  // handle grips
      ];
    }

    // Default by type
    if (bike.type === 'scooter') return scooterGallery;
    if (bike.type === 'motorcycle') return motorcycleGallery;
    return bicycleGallery;
  };

  const galleryImages = getBikeGallery(selectedBike);

  // Booking parameters state
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingMode, setBookingMode] = useState<'daily' | 'hourly'>('daily');
  
  // Default dates: Today is 2026-06-28
  const [startDate, setStartDate] = useState('2026-06-28');
  const [endDate, setEndDate] = useState('2026-06-29');
  const [startTime, setStartTime] = useState('09:00');
  const [durationHours, setDurationHours] = useState(4); // default 4 hours for hourly mode

  const [totalDays, setTotalDays] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Error validations
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');

  // Razorpay Checkout Modal state
  const [showRazorpay, setShowRazorpay] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // Calculate prices dynamically
  useEffect(() => {
    if (bookingMode === 'daily') {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (isNaN(diffDays) || diffDays < 1) {
        diffDays = 1;
      }
      setTotalDays(diffDays);
      setTotalAmount(diffDays * selectedBike.pricePerDay);
    } else {
      setTotalDays(0);
      setTotalAmount(durationHours * selectedBike.pricePerHour);
    }
  }, [startDate, endDate, bookingMode, durationHours, selectedBike]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerPhone(val);
    if (val && !/^[0-9+\s-]{8,15}$/.test(val)) {
      setPhoneError('Please enter a valid phone number');
    } else {
      setPhoneError('');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerName(val);
    if (val.trim().length < 2) {
      setNameError('Please enter your full name');
    } else {
      setNameError('');
    }
  };

  const isFormValid = () => {
    if (!customerName.trim() || customerName.trim().length < 2) return false;
    if (!customerPhone.trim() || phoneError) return false;
    if (bookingMode === 'daily' && new Date(endDate) <= new Date(startDate)) return false;
    return true;
  };

  const handlePayClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setShowRazorpay(true);
  };

  const handleSimulatePaymentSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpay(false);

      // Create a unique booking reference
      const randomRef = 'LYB-' + Math.floor(10000 + Math.random() * 90000);
      
      const newBooking: Booking = {
        id: randomRef,
        bikeId: selectedBike.id,
        bikeName: selectedBike.name,
        customerName: customerName,
        customerPhone: customerPhone,
        startDate: startDate,
        endDate: bookingMode === 'daily' ? endDate : `${startDate} (${startTime}, ${durationHours} hrs)`,
        totalDays: bookingMode === 'daily' ? totalDays : parseFloat((durationHours / 24).toFixed(1)),
        totalAmount: totalAmount,
        paymentStatus: 'Paid (Razorpay Advance)',
        bookingStatus: 'Confirmed',
        timestamp: new Date().toISOString()
      };

      onSubmitBooking(newBooking);
    }, 1800); // realistic payment loading time
  };

  return (
    <div className="bg-brand-cream min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-brand-charcoal">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Link */}
        <button
          id="btn-back-to-fleet"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-brand-olive hover:text-brand-olive-light cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Fleet Selection
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bike Info & Pricing Review */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-brand-olive/15 overflow-hidden shadow-xs p-6 space-y-5">
              <span className="bg-brand-yellow/20 text-brand-olive-dark text-[10px] font-bold font-mono px-2.5 py-1 rounded-full uppercase inline-block">
                Selected Ride
              </span>
              
              {/* Interactive Multi-Image Showroom Gallery */}
              <div className="space-y-3">
                <div className="aspect-video rounded-xl overflow-hidden bg-brand-charcoal border border-brand-olive/15 relative group shadow-lg">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImageIndex}
                      src={galleryImages[activeImageIndex]} 
                      alt={`${selectedBike.name} view ${activeImageIndex + 1}`} 
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.25 }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                  
                  {/* Subtle vignette/shine */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="shine-effect pointer-events-none" />

                  {/* Left Navigation Chevron Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-charcoal p-1.5 rounded-full shadow-md border border-brand-olive/10 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {/* Right Navigation Chevron Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-charcoal p-1.5 rounded-full shadow-md border border-brand-olive/10 hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                    title="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Badges Overlay */}
                  <span className="absolute bottom-2 left-2 bg-brand-olive text-brand-yellow text-[9px] font-black px-2.5 py-1 rounded-md shadow-md uppercase tracking-widest flex items-center gap-1 border border-brand-yellow/30">
                    <span>✨</span> Pristine Wiped Guarantee
                  </span>

                  <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Camera className="w-3 h-3 text-brand-yellow" />
                    <span>{activeImageIndex + 1} / {galleryImages.length}</span>
                  </span>
                </div>

                {/* Grid of Thumbnails */}
                <div className="grid grid-cols-4 gap-2.5">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-102 cursor-pointer shadow-xs ${
                        activeImageIndex === idx 
                          ? 'border-brand-yellow ring-2 ring-brand-yellow/30 scale-102' 
                          : 'border-brand-olive/15 opacity-70 hover:opacity-100 hover:border-brand-olive/40'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="Thumbnail" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {activeImageIndex === idx && (
                        <div className="absolute inset-0 bg-brand-yellow/10" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-display font-bold text-2xl text-brand-charcoal">{selectedBike.name}</h2>
                <p className="text-xs text-brand-charcoal/60 mt-1 uppercase tracking-wider font-semibold">{selectedBike.type} rental</p>
              </div>

              <p className="text-brand-charcoal/75 text-sm leading-relaxed border-t border-brand-olive/10 pt-4">
                {selectedBike.description}
              </p>

              {/* Price rate sheet */}
              <div className="bg-brand-cream rounded-xl p-4 space-y-3 border border-brand-olive/10">
                <h4 className="font-sans font-bold text-xs uppercase text-brand-charcoal/65 tracking-wide">Standard Rates</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-brand-charcoal/50 block">Daily Rate</span>
                    <span className="text-base font-bold text-brand-olive font-display">₹{selectedBike.pricePerDay}/day</span>
                  </div>
                  <div>
                    <span className="text-xs text-brand-charcoal/50 block">Hourly Rate</span>
                    <span className="text-base font-bold text-brand-olive font-display">₹{selectedBike.pricePerHour}/hour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety & Checklist block */}
            <div className="bg-brand-olive text-brand-cream rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-display font-semibold text-lg text-brand-yellow flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Security Guarantee
              </h3>
              <ul className="space-y-2.5 text-xs text-brand-cream/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow font-bold text-sm leading-none">•</span>
                  <span><strong>No Deposit Required:</strong> Fully trust-based verification. Save your security deposit cash!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow font-bold text-sm leading-none">•</span>
                  <span><strong>Original ID Verification:</strong> Please bring your original Aadhaar card, Passport, or Voter ID upon pickup.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-yellow font-bold text-sm leading-none">•</span>
                  <span><strong>Active License Mandatory:</strong> A valid driving license is required for all scooters and motorcycles.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Checkout Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-brand-olive/15 shadow-sm p-6 sm:p-8">
              <h3 className="font-display font-bold text-2xl text-brand-olive-dark mb-6">Booking Details</h3>
              
              <form onSubmit={handlePayClick} className="space-y-6">
                {/* Mode Selector Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wide text-brand-charcoal/60 block">Rental Mode</label>
                  <div className="grid grid-cols-2 gap-2 bg-brand-cream p-1 rounded-xl border border-brand-olive/10">
                    <button
                      id="btn-mode-daily"
                      type="button"
                      onClick={() => setBookingMode('daily')}
                      className={`py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        bookingMode === 'daily'
                          ? 'bg-brand-olive text-brand-yellow shadow-xs'
                          : 'text-brand-charcoal/75 hover:bg-brand-gray-light'
                      }`}
                    >
                      Daily Rental
                    </button>
                    <button
                      id="btn-mode-hourly"
                      type="button"
                      onClick={() => setBookingMode('hourly')}
                      className={`py-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        bookingMode === 'hourly'
                          ? 'bg-brand-olive text-brand-yellow shadow-xs'
                          : 'text-brand-charcoal/75 hover:bg-brand-gray-light'
                      }`}
                    >
                      Hourly Rental
                    </button>
                  </div>
                </div>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-brand-charcoal/60 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      Full Name
                    </label>
                    <input
                      id="input-customer-name"
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={handleNameChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 focus:border-brand-olive focus:ring-1 focus:ring-brand-olive outline-hidden font-sans text-sm transition-all"
                    />
                    {nameError && <p className="text-xs text-red-600 font-semibold">{nameError}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-brand-charcoal/60 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      Phone Number (+91)
                    </label>
                    <input
                      id="input-customer-phone"
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={handlePhoneChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-brand-charcoal/15 focus:border-brand-olive focus:ring-1 focus:ring-brand-olive outline-hidden font-sans text-sm transition-all"
                    />
                    {phoneError && <p className="text-xs text-red-600 font-semibold">{phoneError}</p>}
                  </div>
                </div>

                {/* Date Selection Controls */}
                <div className="bg-brand-cream/50 p-5 rounded-xl border border-brand-olive/10 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-brand-olive-light" />
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-charcoal/70">Rental Timeline</span>
                  </div>

                  {bookingMode === 'daily' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Daily mode start */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-brand-charcoal/60 block">Pickup Date</label>
                        <input
                          id="input-start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-charcoal/15 bg-white font-sans text-sm"
                        />
                      </div>
                      {/* Daily mode end */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-brand-charcoal/60 block">Return Date</label>
                        <input
                          id="input-end-date"
                          type="date"
                          value={endDate}
                          min={startDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-charcoal/15 bg-white font-sans text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Hourly mode date */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-brand-charcoal/60 block">Rental Date</label>
                        <input
                          id="input-hourly-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-charcoal/15 bg-white font-sans text-xs"
                        />
                      </div>
                      {/* Hourly mode time */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-brand-charcoal/60 block">Pickup Time</label>
                        <input
                          id="input-hourly-time"
                          type="time"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-charcoal/15 bg-white font-sans text-xs"
                        />
                      </div>
                      {/* Hourly duration selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase text-brand-charcoal/60 block">Duration (Hours)</label>
                        <select
                          id="input-hourly-duration"
                          value={durationHours}
                          onChange={(e) => setDurationHours(parseInt(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-brand-charcoal/15 bg-white font-sans text-xs outline-hidden"
                        >
                          {[2, 3, 4, 6, 8, 12, 18, 24].map((h) => (
                            <option key={h} value={h}>{h} Hours</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {bookingMode === 'daily' && new Date(endDate) <= new Date(startDate) && (
                    <p className="text-xs text-red-600 font-semibold pt-1">Return date must be after pickup date!</p>
                  )}
                </div>

                {/* Summary / Price calculation sheet */}
                <div className="border-t border-brand-olive/15 pt-5 space-y-3">
                  <h4 className="font-display font-semibold text-sm text-brand-charcoal">Fare Breakdown</h4>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-charcoal/60">
                        {selectedBike.name} (Rent rate)
                      </span>
                      <span className="font-medium">
                        {bookingMode === 'daily' 
                          ? `₹${selectedBike.pricePerDay} × ${totalDays} Days`
                          : `₹${selectedBike.pricePerHour} × ${durationHours} Hours`
                        }
                      </span>
                    </div>

                    <div className="flex justify-between text-emerald-700">
                      <span>Heritage Hub Promotion Discount</span>
                      <span>-₹0</span>
                    </div>

                    <div className="flex justify-between border-b border-brand-olive/10 pb-2">
                      <span className="text-brand-charcoal/60">Security Refundable Deposit</span>
                      <span className="font-bold text-emerald-600">₹0 (FREE)</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-2">
                      <span className="font-display font-bold text-base text-brand-charcoal">Total Amount Payable</span>
                      <span className="font-display font-extrabold text-2xl text-brand-olive">
                        ₹{totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Razorpay Call to Action Button */}
                <button
                  id="btn-trigger-payment"
                  type="submit"
                  disabled={!isFormValid()}
                  className={`w-full py-4 rounded-xl font-sans font-bold text-base tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    isFormValid()
                      ? 'bg-brand-olive text-brand-yellow hover:bg-brand-olive-light hover:scale-[1.01]'
                      : 'bg-brand-gray-light text-brand-charcoal/30 cursor-not-allowed border border-brand-charcoal/10'
                  }`}
                >
                  <Receipt className="w-5 h-5" />
                  Pay Advance via Razorpay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* RAZORPAY SIMULATION OVERLAY MODAL */}
      <AnimatePresence>
        {showRazorpay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { if(!isProcessing) setShowRazorpay(false); }}
              className="absolute inset-0 bg-brand-charcoal/80 backdrop-blur-xs"
            ></motion.div>

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-blue-100 z-10 flex flex-col font-sans"
            >
              {/* Razorpay Banner Header */}
              <div className="bg-[#0b1426] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-display font-black text-sm italic tracking-tighter">
                    R
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-blue-400 uppercase tracking-widest leading-none">Razorpay Secured</h4>
                    <span className="font-display font-bold text-sm text-white block mt-0.5">{BUSINESS_NAME}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block uppercase font-bold">Pay Amount</span>
                  <span className="font-display font-bold text-lg text-brand-yellow">₹{totalAmount}</span>
                </div>
              </div>

              {/* Progress State or Options */}
              {isProcessing ? (
                <div className="py-16 px-6 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h3 className="font-display font-semibold text-lg text-brand-charcoal">Authorizing Secure Transaction</h3>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">Connecting to Razorpay API gateway securely. Please do not close this modal or refresh the page.</p>
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  {/* Alert Tag */}
                  <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs rounded-xl p-3 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-brand-yellow-dark shrink-0 mt-0.5" />
                    <span><strong>Client Demo Sandbox:</strong> Razorpay simulation is active. No real funds or credit card limits will be touched.</span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wide font-bold text-gray-400 block">Choose Payment Method</span>
                    <div className="space-y-2">
                      <button
                        id="btn-pay-upi"
                        onClick={() => setSelectedPaymentMethod('upi')}
                        className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${
                          selectedPaymentMethod === 'upi'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                            : 'border-gray-200 hover:bg-gray-50 text-brand-charcoal'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] bg-white">⚡</span>
                          UPI App (GPay, PhonePe, BHIM)
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>

                      <button
                        id="btn-pay-card"
                        onClick={() => setSelectedPaymentMethod('card')}
                        className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${
                          selectedPaymentMethod === 'card'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                            : 'border-gray-200 hover:bg-gray-50 text-brand-charcoal'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-gray-500" />
                          Credit / Debit / ATM Card
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>

                      <button
                        id="btn-pay-netbanking"
                        onClick={() => setSelectedPaymentMethod('netbanking')}
                        className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-sm font-semibold transition-all cursor-pointer ${
                          selectedPaymentMethod === 'netbanking'
                            ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                            : 'border-gray-200 hover:bg-gray-50 text-brand-charcoal'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-[10px] bg-white">🏦</span>
                          Net Banking (SBI, HDFC, ICICI)
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </button>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button
                      id="btn-payment-cancel"
                      onClick={() => setShowRazorpay(false)}
                      className="py-3 px-4 rounded-xl border border-gray-200 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      id="btn-payment-simulate"
                      onClick={handleSimulatePaymentSuccess}
                      className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                    >
                      Success Payment
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
