import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import BikesList from './components/BikesList';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard';

import { Bike, Booking } from './types';
import { INITIAL_BIKES, INITIAL_BOOKINGS } from './data';
import { Sparkles, Compass, Gauge, Sunset, Sparkle, RefreshCw, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation and State
  const [currentView, setCurrentView] = useState<string>('home');
  const [bikes, setBikes] = useState<Bike[]>(INITIAL_BIKES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Immersive Ambient Vibe state: Defaults to 'slow' (French Colony Bougainvillea) for instant tourist appeal
  const [vibe, setVibe] = useState<'slow' | 'sport' | 'sunset' | 'none'>('slow');
  const [showVibeMenu, setShowVibeMenu] = useState(false);

  // Navigate to standard views
  const handleNavigate = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bike selection triggers form checkout
  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setCurrentView('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submitting a booking adds to list, reserves the bike and transitions to success
  const handleSubmitBooking = (newBooking: Booking) => {
    // 1. Add to bookings history list
    setBookings((prev) => [newBooking, ...prev]);

    // 2. Change bike status to 'Booked' in the catalog
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === newBooking.bikeId ? { ...bike, status: 'Booked' } : bike
      )
    );

    // 3. Keep confirmation records and shift views
    setConfirmedBooking(newBooking);
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin status changes inside Dashboard
  const handleUpdateBikeStatus = (bikeId: string, newStatus: Bike['status']) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) =>
        bike.id === bikeId ? { ...bike, status: newStatus } : bike
      )
    );
  };

  const handleAddBike = (newBike: Bike) => {
    setBikes((prevBikes) => [...prevBikes, newBike]);
  };

  const handleEditBike = (updatedBike: Bike) => {
    setBikes((prevBikes) =>
      prevBikes.map((bike) => (bike.id === updatedBike.id ? updatedBike : bike))
    );
  };

  const handleDeleteBike = (bikeId: string) => {
    setBikes((prevBikes) => prevBikes.filter((bike) => bike.id !== bikeId));
  };

  // Deleting a booking restores the bike and removes it from list
  const handleDeleteBooking = (bookingId: string) => {
    const bookingToDelete = bookings.find((b) => b.id === bookingId);
    
    if (bookingToDelete) {
      // Revert bike status back to Available if it was Booked
      setBikes((prevBikes) =>
        prevBikes.map((bike) =>
          bike.id === bookingToDelete.bikeId && bike.status === 'Booked'
            ? { ...bike, status: 'Available' }
            : bike
        )
      );
    }

    setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
  };

  // Reset to original starting values
  const handleResetData = () => {
    setBikes(INITIAL_BIKES);
    setBookings(INITIAL_BOOKINGS);
    setSelectedBike(null);
    setConfirmedBooking(null);
  };

  // Render current active view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onBrowseBikes={() => handleNavigate('bikes')} 
          />
        );
      case 'bikes':
        return (
          <BikesList 
            bikes={bikes} 
            onSelectBike={handleSelectBike} 
          />
        );
      case 'book':
        if (!selectedBike) {
          setCurrentView('bikes');
          return null;
        }
        return (
          <BookingForm
            selectedBike={selectedBike}
            onBack={() => handleNavigate('bikes')}
            onSubmitBooking={handleSubmitBooking}
          />
        );
      case 'confirmation':
        if (!confirmedBooking) {
          setCurrentView('home');
          return null;
        }
        return (
          <Confirmation
            bookingDetails={confirmedBooking}
            onExploreMore={() => handleNavigate('bikes')}
            onGoToDashboard={() => handleNavigate('dashboard')}
          />
        );
      case 'dashboard':
        return (
          <Dashboard
            bikes={bikes}
            bookings={bookings}
            onUpdateBikeStatus={handleUpdateBikeStatus}
            onDeleteBooking={handleDeleteBooking}
            onResetData={handleResetData}
            onAddBike={handleAddBike}
            onEditBike={handleEditBike}
            onDeleteBike={handleDeleteBike}
          />
        );
      default:
        return <HomeView onBrowseBikes={() => handleNavigate('bikes')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream selection:bg-brand-yellow selection:text-brand-charcoal relative">
      
      {/* Immersive Ambient Vibe Overlays */}
      {vibe === 'slow' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Drifting Bougainvillea Petals with slight horizontal flutter */}
          <div className="absolute top-0 left-[8%] w-5 h-4 bg-pink-400/70 rounded-tr-2xl rounded-bl-2xl shadow-xs animate-petal-1" />
          <div className="absolute top-0 left-[28%] w-4.5 h-4.5 bg-pink-300/80 rounded-tr-3xl rounded-bl-2xl shadow-xs animate-petal-2" />
          <div className="absolute top-0 left-[55%] w-3.5 h-3.5 bg-rose-400/65 rounded-tr-xl rounded-bl-3xl shadow-xs animate-petal-3" />
          <div className="absolute top-0 left-[76%] w-5.5 h-4.5 bg-pink-400/80 rounded-tr-3xl rounded-bl-xl shadow-xs animate-petal-4" />
          <div className="absolute top-0 left-[92%] w-4 h-3.5 bg-rose-300/70 rounded-tr-2xl rounded-bl-2xl shadow-xs animate-petal-5" />
          {/* Soft French Colony Cream Overlay */}
          <div className="absolute inset-0 bg-amber-500/[0.012] mix-blend-color-burn" />
        </div>
      )}

      {vibe === 'sport' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {/* ECR Sport Speed Lines across edges */}
          <div className="absolute top-[25%] left-0 w-32 h-[1px] bg-brand-yellow/30 animate-speed-1" />
          <div className="absolute top-[55%] left-0 w-48 h-[1.5px] bg-white/45 animate-speed-2" />
          <div className="absolute top-[82%] left-0 w-28 h-[1px] bg-brand-yellow/20 animate-speed-3" />
          {/* Speed Throttle Wind Edge Glow */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-brand-yellow/[0.03] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-brand-yellow/[0.03] to-transparent" />
        </div>
      )}

      {vibe === 'sunset' && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {/* Warm Coastal Sparkles rising from beach */}
          <div className="absolute bottom-0 left-[12%] w-1.5 h-1.5 bg-brand-yellow/50 rounded-full blur-[0.5px] animate-sparkle-1" />
          <div className="absolute bottom-0 left-[42%] w-3 h-3 bg-amber-400/35 rounded-full blur-[1px] animate-sparkle-2" />
          <div className="absolute bottom-0 left-[68%] w-1.5 h-1.5 bg-yellow-300/60 rounded-full animate-sparkle-3" />
          <div className="absolute bottom-0 left-[82%] w-2.5 h-2.5 bg-orange-400/30 rounded-full blur-[1px] animate-sparkle-4" />
          <div className="absolute bottom-0 left-[91%] w-2 h-2 bg-yellow-400/50 rounded-full blur-[0.5px] animate-sparkle-5" />
          {/* Golden Hour Twilight Corner Glow */}
          <div className="absolute top-0 right-0 w-[35vw] h-[35vh] bg-gradient-to-bl from-rose-500/8 via-amber-500/4 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gradient-to-tr from-indigo-900/8 via-rose-500/4 to-transparent blur-3xl" />
        </div>
      )}

      {/* Sticky Header shared across views */}
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      {/* Dynamic Screen Area */}
      <main className="flex-1">
        {renderView()}
      </main>

      {/* FLOATING PONDY VIBE AMBIENT CONTROLLER (Interactive Dashboard Widget) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 select-none">
        <AnimatePresence>
          {showVibeMenu && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              className="bg-brand-charcoal text-brand-cream border border-brand-olive/50 p-4 rounded-2xl shadow-2xl w-64 space-y-3 mb-1"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="font-display font-black text-xs uppercase tracking-wider text-brand-yellow">Pondy Ambient Vibe</span>
                <span className="text-[9px] bg-brand-olive px-1.5 py-0.5 rounded-sm font-mono text-brand-yellow-light uppercase">Active</span>
              </div>
              
              <div className="space-y-1.5">
                {/* Slow Vibe Button */}
                <button
                  onClick={() => setVibe('slow')}
                  className={`w-full flex items-center justify-between text-left p-2 rounded-xl transition-all ${
                    vibe === 'slow'
                      ? 'bg-brand-olive text-brand-yellow border border-brand-yellow/30'
                      : 'hover:bg-white/5 border border-transparent text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-brand-yellow shrink-0 animate-spin-slow" />
                    <div>
                      <p className="text-xs font-bold leading-none">French Quarter</p>
                      <p className="text-[9px] opacity-60 mt-0.5">Gentle bougainvillea breeze</p>
                    </div>
                  </div>
                  {vibe === 'slow' && <span className="text-xs font-bold">🌸</span>}
                </button>

                {/* Sport Vibe Button */}
                <button
                  onClick={() => setVibe('sport')}
                  className={`w-full flex items-center justify-between text-left p-2 rounded-xl transition-all ${
                    vibe === 'sport'
                      ? 'bg-brand-olive text-brand-yellow border border-brand-yellow/30'
                      : 'hover:bg-white/5 border border-transparent text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none">ECR Sport Cruise</p>
                      <p className="text-[9px] opacity-60 mt-0.5">High-speed riding lines</p>
                    </div>
                  </div>
                  {vibe === 'sport' && <span className="text-xs font-bold">⚡</span>}
                </button>

                {/* Sunset Vibe Button */}
                <button
                  onClick={() => setVibe('sunset')}
                  className={`w-full flex items-center justify-between text-left p-2 rounded-xl transition-all ${
                    vibe === 'sunset'
                      ? 'bg-brand-olive text-brand-yellow border border-brand-yellow/30'
                      : 'hover:bg-white/5 border border-transparent text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sunset className="w-4 h-4 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none">Promenade Sunset</p>
                      <p className="text-[9px] opacity-60 mt-0.5">Warm golden hour glow</p>
                    </div>
                  </div>
                  {vibe === 'sunset' && <span className="text-xs font-bold">🌅</span>}
                </button>

                {/* Clear/None Vibe Button */}
                <button
                  onClick={() => setVibe('none')}
                  className={`w-full flex items-center justify-between text-left p-2 rounded-xl transition-all ${
                    vibe === 'none'
                      ? 'bg-brand-olive text-brand-yellow border border-brand-yellow/30'
                      : 'hover:bg-white/5 border border-transparent text-white/80'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <EyeOff className="w-4 h-4 text-brand-yellow shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none">Pristine Clean</p>
                      <p className="text-[9px] opacity-60 mt-0.5">Static content mode</p>
                    </div>
                  </div>
                  {vibe === 'none' && <span className="text-xs font-bold">✨</span>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toggle Bubble */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowVibeMenu(prev => !prev)}
          className="bg-brand-charcoal text-brand-yellow hover:text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer border-2 border-brand-yellow/80 hover:border-white transition-colors duration-300"
        >
          <Sparkles className="w-5 h-5 text-brand-yellow shrink-0 animate-pulse" />
          <span className="font-sans font-black text-xs tracking-wider uppercase pr-1">
            {vibe === 'slow' && 'French Vibe 🌸'}
            {vibe === 'sport' && 'Sport Vibe ⚡'}
            {vibe === 'sunset' && 'Sunset Vibe 🌅'}
            {vibe === 'none' && 'Vibes Off ✨'}
          </span>
        </motion.button>
      </div>

    </div>
  );
}
