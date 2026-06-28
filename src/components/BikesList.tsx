import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bike } from '../types';
import { Clock, Calendar, Check, AlertCircle, Sparkles, SlidersHorizontal } from 'lucide-react';

interface BikesListProps {
  bikes: Bike[];
  onSelectBike: (bike: Bike) => void;
}

type FilterType = 'all' | 'scooter' | 'motorcycle' | 'bicycle';

export default function BikesList({ bikes, onSelectBike }: BikesListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredBikes = bikes.filter(bike => {
    if (filter === 'all') return true;
    return bike.type === filter;
  });

  const getStatusBadge = (status: Bike['status']) => {
    switch (status) {
      case 'Available':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Available
          </span>
        );
      case 'Booked':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
            Reserved Today
          </span>
        );
      case 'Rented':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            Active Ride
          </span>
        );
      case 'In Service':
        return (
          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-700 border border-gray-200 px-2.5 py-1 rounded-full text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
            Maintenance
          </span>
        );
    }
  };

  // Track wiping simulations for individual bikes
  const [wipingBikes, setWipingBikes] = useState<Record<string, boolean>>({});
  const [fullyWiped, setFullyWiped] = useState<Record<string, boolean>>({});

  const handleWipeAndPolish = (bikeId: string) => {
    setWipingBikes(prev => ({ ...prev, [bikeId]: true }));
    
    // Trigger complete shiny glow state after the wipe sweeps across
    setTimeout(() => {
      setWipingBikes(prev => ({ ...prev, [bikeId]: false }));
      setFullyWiped(prev => ({ ...prev, [bikeId]: true }));
      
      // Auto-cool down the premium shiny state after 4 seconds
      setTimeout(() => {
        setFullyWiped(prev => ({ ...prev, [bikeId]: false }));
      }, 4000);
    }, 1800);
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs tracking-widest text-brand-olive font-bold uppercase block">
            Pondy Ride Explorers
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-brand-olive-dark">
            Our Premium Two-Wheel Fleet
          </h1>
          <p className="font-sans text-brand-charcoal/80 text-sm sm:text-base leading-relaxed">
            Select the perfect ride to glide through Pondicherry's French avenues or take an eco-friendly paddle through the historical center. Now featuring interactive "Wipe & Polish" status tests to prove immaculate cleanliness!
          </p>
        </div>

        {/* Dynamic Filters & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-brand-olive/10 pb-6 gap-4">
          <div className="flex items-center gap-2 text-brand-charcoal/70 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal className="w-4 h-4 text-brand-olive" />
            <span>Filter Category:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {(['all', 'scooter', 'motorcycle', 'bicycle'] as const).map((type) => (
              <button
                id={`filter-tab-${type}`}
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-sans font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  filter === type
                    ? 'bg-brand-olive text-brand-yellow shadow-md scale-102'
                    : 'bg-white hover:bg-brand-gray-light text-brand-charcoal border border-brand-charcoal/10'
                }`}
              >
                {type === 'all' ? 'All Rides' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        {/* Bike Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredBikes.map((bike) => {
            const isWiping = wipingBikes[bike.id];
            const isShiny = fullyWiped[bike.id];

            return (
              <motion.div
                id={`bike-card-${bike.id}`}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.4 }}
                key={bike.id}
                className={`bg-white rounded-3xl overflow-hidden border-2 transition-all duration-500 flex flex-col h-full group relative ${
                  isShiny 
                    ? 'border-brand-yellow shadow-xl ring-2 ring-brand-yellow/30' 
                    : 'border-brand-olive/15 shadow-sm hover:shadow-xl'
                }`}
              >
                {/* Visual Wipe Microfiber Action Animation */}
                <AnimatePresence>
                  {isWiping && (
                    <motion.div 
                      initial={{ left: '-100%' }}
                      animate={{ left: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                      className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-brand-yellow/50 to-transparent z-30 pointer-events-none skew-x-12 flex items-center justify-center"
                    >
                      <div className="bg-brand-charcoal text-brand-yellow px-2 py-1 rounded-md text-[10px] font-mono whitespace-nowrap shadow-md uppercase font-black flex items-center gap-1">
                        <Sparkles className="w-3 h-3 animate-spin" /> Wiping...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Floating Erupting Sparkles */}
                {isShiny && (
                  <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <span className="absolute bottom-1/4 left-1/3 text-lg animate-bounce duration-700">✨</span>
                    <span className="absolute top-1/3 right-1/4 text-xl animate-pulse">🌟</span>
                    <span className="absolute bottom-1/2 right-1/3 text-sm animate-bounce">✨</span>
                  </div>
                )}

                {/* Card Header Media: Circular layout with spinning wheel alloy rim */}
                <div className="relative pt-8 pb-4 bg-brand-cream/40 flex flex-col items-center justify-center overflow-hidden border-b border-brand-olive/5">
                  
                  {/* Outer spinning brake/alloy outline */}
                  <div className={`absolute w-52 h-52 rounded-full border-2 border-dashed transition-all duration-1000 ${
                    isWiping 
                      ? 'border-brand-yellow animate-spin-slow scale-105' 
                      : 'border-brand-olive/20 group-hover:border-brand-olive/40 animate-spin-slow'
                  }`} />

                  {/* Circle Image Wrapper */}
                  <div className={`relative w-48 h-48 rounded-full overflow-hidden border-4 transition-all duration-500 z-10 ${
                    isShiny 
                      ? 'border-brand-yellow scale-102 shadow-lg shadow-brand-yellow/20' 
                      : 'border-brand-olive group-hover:border-brand-olive-light group-hover:scale-105 shadow-md'
                  }`}>
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />

                    {/* Shininess Reflection Swipe Glass Sweeper on hover */}
                    <div className="shine-effect pointer-events-none" />

                    {/* Shiny green glass overlay when wiped successfully */}
                    <AnimatePresence>
                      {isShiny && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.15 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-brand-yellow pointer-events-none mix-blend-color-dodge"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Floating category text tag */}
                  <div className="absolute top-4 right-4 z-10 bg-brand-charcoal text-brand-yellow text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm shadow-xs uppercase tracking-widest">
                    {bike.type}
                  </div>

                  {/* Float status badges */}
                  <div className="absolute top-4 left-4 z-10">
                    {isShiny ? (
                      <span className="inline-flex items-center gap-1 bg-brand-yellow text-brand-charcoal px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md border border-brand-olive animate-pulse">
                        ✨ Pristine Clean
                      </span>
                    ) : (
                      getStatusBadge(bike.status)
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display font-black text-lg sm:text-xl text-brand-charcoal leading-tight transition-colors duration-300 group-hover:text-brand-olive">
                      {bike.name}
                    </h3>

                    <p className="text-brand-charcoal/75 text-xs sm:text-xs leading-relaxed">
                      {bike.description}
                    </p>

                    {/* Specifications / Features Grid */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {bike.specs.map((spec, idx) => (
                        <span
                          key={idx}
                          className="bg-brand-cream border border-brand-olive/10 text-brand-olive-light text-[9px] font-semibold px-2 py-0.5 rounded-md"
                        >
                          ✓ {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Footer: Pricing, Wipe & Book Action */}
                  <div className="pt-4 border-t border-brand-olive/10 flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-bold text-brand-charcoal/50 block tracking-wide">
                          Rental Pricing
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-extrabold font-display text-brand-olive">
                            ₹{bike.pricePerDay}
                            <span className="text-[10px] font-normal text-brand-charcoal/60 font-sans">/day</span>
                          </span>
                          <span className="text-xs text-brand-charcoal/40">•</span>
                          <span className="text-xs font-bold font-sans text-brand-charcoal/70">
                            ₹{bike.pricePerHour}
                            <span className="text-[10px] font-normal text-brand-charcoal/55">/hr</span>
                          </span>
                        </div>
                      </div>

                      {/* Interactive Wipe & Shine Button */}
                      <button
                        onClick={() => handleWipeAndPolish(bike.id)}
                        disabled={isWiping}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-black tracking-wider uppercase border transition-all cursor-pointer ${
                          isWiping
                            ? 'bg-brand-gray-light text-brand-charcoal/40 border-transparent cursor-not-allowed'
                            : 'bg-white hover:bg-brand-yellow hover:text-brand-charcoal text-brand-olive border-brand-olive shadow-xs'
                        }`}
                        title="Simulate microfiber polishing to restore show-room glow!"
                      >
                        {isWiping ? 'Wiping... 🧹' : 'Wipe & Shine ✨'}
                      </button>
                    </div>

                    <button
                      id={`btn-book-${bike.id}`}
                      onClick={() => onSelectBike(bike)}
                      disabled={bike.status === 'In Service'}
                      className={`w-full py-3 rounded-xl font-sans font-bold text-sm tracking-wide transition-all cursor-pointer ${
                        bike.status === 'In Service'
                          ? 'bg-brand-gray-light text-brand-charcoal/35 cursor-not-allowed border border-brand-charcoal/10'
                          : 'bg-brand-olive hover:bg-brand-olive-light text-brand-yellow hover:scale-[1.01] shadow-md hover:shadow-lg'
                      }`}
                    >
                      {bike.status === 'In Service' ? 'In Service' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
