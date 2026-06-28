import React, { useState } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import BikesList from './components/BikesList';
import BookingForm from './components/BookingForm';
import Confirmation from './components/Confirmation';
import Dashboard from './components/Dashboard';

import { Bike, Booking } from './types';
import { INITIAL_BIKES, INITIAL_BOOKINGS } from './data';
import { motion } from 'motion/react';

export default function App() {
  // Navigation and State
  const [currentView, setCurrentView] = useState<string>('home');
  const [bikes, setBikes] = useState<Bike[]>(INITIAL_BIKES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

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
      
      {/* Immersive Ambient Background Overlay: Drifting Bougainvillea Petals (French Vibe) */}
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

      {/* Sticky Header shared across views */}
      <Header currentView={currentView} onNavigate={handleNavigate} />
      
      {/* Dynamic Screen Area */}
      <main className="flex-1">
        {renderView()}
      </main>

    </div>
  );
}
