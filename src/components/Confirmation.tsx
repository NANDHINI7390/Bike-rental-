import React from 'react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import { CheckCircle, Calendar, Shield, MapPin, ArrowRight, Download, ArrowUpRight } from 'lucide-react';
import { BUSINESS_NAME } from '../data';

interface ConfirmationProps {
  bookingDetails: Booking;
  onExploreMore: () => void;
  onGoToDashboard: () => void;
}

export default function Confirmation({ bookingDetails, onExploreMore, onGoToDashboard }: ConfirmationProps) {
  return (
    <div className="bg-brand-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-brand-charcoal">
      <div className="max-w-2xl mx-auto">
        
        {/* Animated Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl border border-brand-olive/15 overflow-hidden shadow-md"
        >
          {/* Success Banner */}
          <div className="bg-brand-olive text-center py-10 px-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-full translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-yellow/10 rounded-full -translate-x-8 translate-y-8"></div>
            
            {/* Visual Checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow text-brand-charcoal mb-4 shadow-md"
            >
              <CheckCircle className="w-10 h-10" />
            </motion.div>

            <h1 className="font-display font-black text-2xl sm:text-3xl text-brand-cream">
              Booking Confirmed!
            </h1>
            <p className="font-mono text-xs text-brand-yellow font-bold uppercase tracking-widest mt-1.5">
              Reference: {bookingDetails.id}
            </p>
          </div>

          {/* Core instructions as requested */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 sm:p-5 flex gap-3">
              <Shield className="w-5 h-5 text-brand-yellow-dark shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-brand-olive-dark">Mandatory Verification Required</h4>
                <p className="font-sans text-xs text-brand-charcoal/85 leading-relaxed">
                  Please bring your <strong>original ID (Aadhaar Card, Passport, or Voter ID)</strong> and your <strong>original Driving License</strong> when you arrive to collect the bike. Photos or photocopies will not be accepted.
                </p>
              </div>
            </div>

            {/* Structured details table */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-brand-olive border-b border-brand-olive/10 pb-2">
                Booking Summary
              </h3>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-xs sm:text-sm">
                <div>
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Rider Name</span>
                  <span className="font-semibold">{bookingDetails.customerName}</span>
                </div>
                <div>
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Contact Phone</span>
                  <span className="font-semibold">{bookingDetails.customerPhone}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Reserved Ride</span>
                  <span className="font-display font-bold text-brand-olive text-base mt-0.5 block">{bookingDetails.bikeName}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Rental Period / Dates</span>
                  <span className="font-medium flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-4 h-4 text-brand-olive-light" />
                    {bookingDetails.startDate} {bookingDetails.endDate !== bookingDetails.startDate ? `to ${bookingDetails.endDate}` : ''}
                    <span className="bg-brand-gray-light text-[10px] font-bold text-brand-charcoal/60 px-2 py-0.5 rounded-md">
                      {bookingDetails.totalDays > 0 ? `${bookingDetails.totalDays} Days` : ''}
                    </span>
                  </span>
                </div>
                <div>
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Advance Paid</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    ₹{bookingDetails.totalAmount}
                  </span>
                </div>
                <div>
                  <span className="text-brand-charcoal/50 text-[10px] uppercase font-bold tracking-wide block">Payment Status</span>
                  <span className="bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-md border border-emerald-200 inline-block uppercase tracking-wider">
                    Razorpay Success
                  </span>
                </div>
              </div>
            </div>

            {/* Address Location block */}
            <div className="bg-brand-cream rounded-2xl p-4 sm:p-5 border border-brand-olive/10 flex gap-3">
              <MapPin className="w-5 h-5 text-brand-olive-light shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xs text-brand-charcoal">Pickup Location Hub</h4>
                <p className="font-sans text-[11px] text-brand-charcoal/70 leading-normal">
                  <strong>Laya Bike Rental Hub</strong>: 14, Romain Rolland Street, Heritage Town, Pondicherry (Near Promenade Beach Road).
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-olive/10">
              <button
                id="btn-confirm-explore-more"
                onClick={onExploreMore}
                className="py-3.5 px-6 rounded-xl border border-brand-olive/20 text-brand-olive font-sans font-bold text-sm tracking-wide hover:bg-brand-olive/5 cursor-pointer text-center"
              >
                Browse Other Rides
              </button>
              
              <button
                id="btn-confirm-check-admin"
                onClick={onGoToDashboard}
                className="py-3.5 px-6 rounded-xl bg-brand-charcoal text-brand-yellow font-sans font-bold text-sm tracking-wide hover:bg-brand-charcoal/90 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
              >
                Verify in Admin Table
                <ArrowUpRight className="w-4 h-4 text-brand-yellow" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
