import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  MapPin, 
  Compass, 
  ArrowRight, 
  Heart, 
  MessageSquare, 
  Phone, 
  Navigation, 
  Map, 
  ExternalLink, 
  Smile, 
  Send, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { LOGO_IMAGE, BUSINESS_NAME } from '../data';
import LayaLogo from './LayaLogo';

// Import local images as ES modules to guarantee dynamic background images resolve in production
import happyCoupleImg from '../assets/images/happy_couple_scooter_1782638089371.jpg';
import beachRideImg from '../assets/images/beach_ride_scooter_1782638106287.jpg';
import friendsBicyclesImg from '../assets/images/friends_bicycles_town_1782638121375.jpg';
import soloTravelerImg from '../assets/images/solo_traveler_vespa_1782638136640.jpg';
import vintageVespaImg from '../assets/images/vintage_vespa_1782636799449.jpg';
import commuterBicycleImg from '../assets/images/commuter_bicycle_1782636850113.jpg';

const routesData = {
  cafe: {
    title: "French Quarter Cafe Hop",
    distance: "3.5 km",
    duration: "15-20 mins",
    intensity: "Easy Breezy Riding",
    spots: [
      { name: "Baker Street", desc: "Start with warm French croissants & fresh espresso." },
      { name: "Villa Shanti", desc: "Snap beautiful photos against iconic mustard-yellow walls." },
      { name: "Cafe Des Arts", desc: "Enjoy organic iced tea surrounded by vintage bohemian art." }
    ],
    mapTip: "Perfect for vintage cruiser bicycles and retro Vespas! Very quiet, shade-filled avenues.",
    funFact: "Pondicherry's French Quarter has a perfect grid-style layout, making it impossible to get lost!",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
  },
  coast: {
    title: "Promenade Coastal Cruise",
    distance: "5.2 km",
    duration: "25-30 mins",
    intensity: "Scenic & Refreshing",
    spots: [
      { name: "Gandhi Statue", desc: "Ride along the wide, traffic-free coastal boulevard." },
      { name: "Old Lighthouse", desc: "A historic 19th-century landmark standing right by the waves." },
      { name: "Le Cafe", desc: "24/7 seaside cafe where you can sit right next to breaking ocean waves." }
    ],
    mapTip: "The sea breeze feels amazing! We recommend doing this cruise during sunset (4:30 PM - 6:30 PM).",
    funFact: "Vehicles are completely closed on Beach Road after 6 PM, creating a wonderful walker/cyclist-only paradise!",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
  },
  spiritual: {
    title: "Auroville Scenic Trail",
    distance: "12.8 km",
    duration: "35-45 mins",
    intensity: "Spirited Adventure",
    spots: [
      { name: "East Coast Road (ECR)", desc: "A scenic palm-lined highway stretch with smooth, wide roads." },
      { name: "Matrimandir Viewing Point", desc: "The breathtaking golden globe spiritual sanctuary at the heart of Auroville." },
      { name: "Marc's Cafe / Solitude Farm", desc: "Fabulous gourmet coffees and organic farm-to-table lunch stops." }
    ],
    mapTip: "Best experienced with our gearless Vespas or sportier motorcycles. Ensure your helmet is securely strapped!",
    funFact: "Auroville was founded in 1968 and is home to over 3,000 residents from over 50 different countries!",
    image: "https://images.unsplash.com/photo-1582208225574-897db6743b17?auto=format&fit=crop&q=80&w=800"
  }
};

interface HomeViewProps {
  onBrowseBikes: () => void;
}

export default function HomeView({ onBrowseBikes }: HomeViewProps) {
  const [showWhatsappChat, setShowWhatsappChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'support', text: string, time: string }>>([
    { sender: 'support', text: "Bonjour! 🌴 Laya Support here. How can we help you explore Pondicherry today?", time: "Just now" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Custom Interactive Feature States
  const [activeFeature, setActiveFeature] = useState<'deposit' | 'fleet' | 'support' | 'helmets'>('fleet');
  const [selectedRoute, setSelectedRoute] = useState<'cafe' | 'coast' | 'spiritual'>('cafe');
  const [helmetColor, setHelmetColor] = useState<'mint' | 'yellow' | 'charcoal'>('mint');
  const [helmetSize, setHelmetSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [depositDays, setDepositDays] = useState(3);
  const [depositBikeType, setDepositBikeType] = useState<'scooter' | 'motorcycle' | 'bicycle'>('scooter');
  const [supportSignalStatus, setSupportSignalStatus] = useState<'idle' | 'checking' | 'active'>('idle');
  const [supportLocation, setSupportLocation] = useState('White Town French Quarter');

  const handleSendChat = (textToSend?: string) => {
    const message = textToSend || chatInput;
    if (!message.trim()) return;

    // Add user message
    const userMsg = { sender: 'user' as const, text: message, time: "Just now" };
    setChatHistory(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput("");

    // Simulate supportive automated reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Awesome! We have premium gearless Vespas & heritage bicycles ready for immediate pickup with ₹0 deposit. Would you like to check our available models?";
      
      const lower = message.toLowerCase();
      if (lower.includes('vespa') || lower.includes('scooter') || lower.includes('bike') || lower.includes('rent')) {
        replyText = "Fabulous choice! Our premium fleet starts at just ₹350/day. Two sanitized helmets, raincoats, and phone mount are completely FREE. Click 'Browse Bikes' to choose your model!";
      } else if (lower.includes('deposit') || lower.includes('free') || lower.includes('helmet')) {
        replyText = "Yes, absolute zero cash deposit! Just bring a valid license & Aadhaar/Passport. We include 2 complimentary sanitized helmets and premium locks.";
      } else if (lower.includes('support') || lower.includes('flat') || lower.includes('help')) {
        replyText = "Our roadside team is on active standby 24/7 across Pondicherry, Auroville, and ECR. We'll replace or fix any vehicle in under 20 minutes!";
      }

      setChatHistory(prev => [...prev, { sender: 'support', text: replyText, time: "Just now" }]);
    }, 1200);
  };

  return (
    <div className="bg-brand-yellow min-h-screen text-brand-charcoal overflow-hidden relative bg-[radial-gradient(#354521_12%,transparent_12%)] [background-size:24px_24px] bg-opacity-[0.03]">
      
      {/* Hero Section */}
      <section 
        id="hero-banner-section"
        className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-16 max-w-7xl mx-auto rounded-3xl overflow-hidden mt-6 border-4 border-brand-olive shadow-2xl bg-gradient-to-br from-brand-yellow-light via-brand-yellow to-brand-yellow-light"
      >
        {/* Soft elegant warm ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/30 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-cream/40 rounded-full blur-3xl pointer-events-none z-0" />

        {/* Top Content: Beautiful Brand Badges and Certifications */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-olive text-brand-yellow px-4.5 py-2 rounded-full font-sans font-extrabold text-xs tracking-wider uppercase shadow-md border border-brand-olive-light/20 animate-pulse">
            <Sparkles className="w-4 h-4 text-brand-yellow" />
            Pondicherry’s Premium Fleet
          </div>
          <motion.div 
            animate={{ y: [0, -3, 0], rotate: [-0.5, 0.5, -0.5] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="bg-brand-olive text-brand-yellow px-4.5 py-2 rounded-full border border-brand-olive-light/20 font-sans font-black text-xs tracking-wider uppercase shadow-md flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin-slow" />
            100% PONDICHERRY VIBES
          </motion.div>
        </div>

        {/* Highlighted Images Grid: Storefront at the absolute top, followed by customer polaroids */}
        <div className="relative z-10 max-w-5xl mx-auto mb-12 space-y-6">
          
          {/* Main Storefront Highlight Card (Original Shop Image) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl mx-auto bg-brand-cream p-3 sm:p-4 rounded-2xl shadow-xl border-4 border-brand-olive cursor-pointer group hover:scale-[1.01] transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-xl aspect-[16/10] sm:aspect-[16/9] border border-brand-olive/20">
              <img 
                src="https://i.ibb.co/SDNsg2M3/Screenshot-20260628-185933.jpg" 
                alt="Laya Bike Rental Shop Storefront" 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Highlight Overlay / Badges */}
              <div className="absolute top-3 left-3 bg-brand-yellow border-2 border-brand-olive text-brand-charcoal font-sans font-black text-[10px] sm:text-xs px-3 py-1 rounded-lg shadow-md uppercase tracking-wider">
                12+ Years of Trusted Service
              </div>
              <div className="absolute bottom-3 right-3 bg-brand-olive/90 backdrop-blur-md border border-brand-yellow/30 text-brand-yellow font-sans font-bold text-[9px] sm:text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                <MapPin className="w-3 h-3 text-brand-yellow" /> Belcombe Street, Pondicherry
              </div>
            </div>
            <div className="mt-3 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2 px-1">
              <div>
                <h4 className="font-display font-black text-sm sm:text-base text-brand-charcoal">
                  Our Official Laya Storefront Hub
                </h4>
                <p className="text-xs text-brand-charcoal/70 font-semibold mt-0.5">
                  Walk in and choose from our premium, sanitized, and perfectly maintained fleet!
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-brand-olive text-brand-yellow text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs border border-brand-yellow/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow" /> Primary Shop
              </span>
            </div>
          </motion.div>

          {/* Customer Experience Polaroids Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {/* Polaroid 1: Happy Couple */}
            <motion.div
              id="hero-polaroid-couple"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: -1, zIndex: 10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-brand-cream p-2 sm:p-2.5 pb-5 sm:pb-6 rounded-lg shadow-md border-2 border-brand-olive cursor-pointer rotate-[-2deg] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xs aspect-video sm:aspect-[4/3] border border-brand-olive/10">
                <img 
                  src={happyCoupleImg} 
                  alt="Exploring French Quarter" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-brand-yellow border border-brand-olive text-brand-charcoal text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">White Town</span>
              </div>
              <p className="font-display font-black text-[9px] sm:text-xs text-brand-olive-dark mt-1.5 sm:mt-2 text-center truncate">Sneha & Amit: French Town</p>
            </motion.div>

            {/* Polaroid 2: Promenade Sunset Rider */}
            <motion.div
              id="hero-polaroid-promenade"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 1, zIndex: 10 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="bg-brand-cream p-2 sm:p-2.5 pb-5 sm:pb-6 rounded-lg shadow-md border-2 border-brand-olive cursor-pointer rotate-[1.5deg] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xs aspect-video sm:aspect-[4/3] border border-brand-olive/10">
                <img 
                  src={beachRideImg} 
                  alt="Promenade Beach Cruise" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-brand-olive text-brand-yellow text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">Promenade</span>
              </div>
              <p className="font-display font-black text-[9px] sm:text-xs text-brand-olive-dark mt-1.5 sm:mt-2 text-center truncate">Tanya's Sunset Cruise</p>
            </motion.div>

            {/* Polaroid 3: Friends with Bicycles */}
            <motion.div
              id="hero-polaroid-friends"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: -1, zIndex: 10 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-brand-cream p-2 sm:p-2.5 pb-5 sm:pb-6 rounded-lg shadow-md border-2 border-brand-olive cursor-pointer rotate-[-1deg] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xs aspect-video sm:aspect-[4/3] border border-brand-olive/10">
                <img 
                  src={friendsBicyclesImg} 
                  alt="Friends cycling heritage town" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-brand-yellow border border-brand-olive text-brand-charcoal text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">Heritage</span>
              </div>
              <p className="font-display font-black text-[9px] sm:text-xs text-brand-olive-dark mt-1.5 sm:mt-2 text-center truncate">Squad Goals: Eco Ride</p>
            </motion.div>

            {/* Polaroid 4: Solo Vespa Explorer */}
            <motion.div
              id="hero-polaroid-solo"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-brand-cream p-2 sm:p-2.5 pb-5 sm:pb-6 rounded-lg shadow-md border-2 border-brand-olive cursor-pointer rotate-[2deg] transition-transform duration-300"
            >
              <div className="relative overflow-hidden rounded-xs aspect-video sm:aspect-[4/3] border border-brand-olive/10">
                <img 
                  src={soloTravelerImg} 
                  alt="Solo Explorer Priya" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-brand-yellow border border-brand-olive text-brand-charcoal text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-xs">Auroville</span>
              </div>
              <p className="font-display font-black text-[9px] sm:text-xs text-brand-olive-dark mt-1.5 sm:mt-2 text-center truncate">Priya's Solo Adventure</p>
            </motion.div>
          </div>

        </div>

        {/* Bottom Content: Hero Content Centered (appearing below the images) */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="space-y-4">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-brand-charcoal leading-tight">
              Rent Your Ride, <br className="sm:hidden" />
              <span className="text-brand-olive font-extrabold drop-shadow-xs">
                Explore Pondicherry
              </span>
            </h2>
            
            <p className="text-brand-charcoal/90 font-semibold text-sm sm:text-base max-w-2xl leading-relaxed mx-auto">
              Experience the charming French Quarter, breezy Promenade Beach, and spiritual Auroville on your own terms. Smooth rides, fair pricing, and absolute freedom.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
            <button
              id="btn-hero-browse"
              onClick={onBrowseBikes}
              className="inline-flex items-center justify-center gap-2 bg-brand-olive hover:bg-brand-olive-light text-brand-yellow font-sans font-black text-base px-8 py-4 rounded-xl shadow-lg transition-all hover:scale-[1.03] active:scale-98 cursor-pointer group w-full sm:w-auto border-2 border-brand-charcoal"
            >
              Browse Bikes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-brand-yellow" />
            </button>
            
            <div className="flex items-center gap-3 bg-brand-cream border border-brand-olive/20 px-4 py-3 rounded-xl shadow-sm w-full sm:w-auto justify-center">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-brand-yellow border-2 border-brand-olive flex items-center justify-center text-[10px] font-bold text-brand-charcoal">5★</div>
                <div className="w-8 h-8 rounded-full bg-brand-olive border-2 border-brand-yellow flex items-center justify-center text-[10px] font-bold text-brand-yellow">LY</div>
                <div className="w-8 h-8 rounded-full bg-brand-charcoal border-2 border-brand-yellow flex items-center justify-center text-[10px] font-bold text-white">PD</div>
              </div>
              <div className="text-left text-xs text-brand-charcoal">
                <span className="font-bold text-brand-olive block">1,200+ Happy Explorers</span>
                <span className="text-brand-charcoal/70 font-bold">Average rating of 4.9/5</span>
              </div>
            </div>
          </div>

          {/* Quick trust bullet bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-olive/20 w-full max-w-2xl">
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive block">₹0</span>
              <span className="text-[10px] sm:text-xs text-brand-charcoal/80 font-black">Security Deposit</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive block">2 Helmets</span>
              <span className="text-[10px] sm:text-xs text-brand-charcoal/80 font-black">Free of Charge</span>
            </div>
            <div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-brand-olive block">Unlimited</span>
              <span className="text-[10px] sm:text-xs text-brand-charcoal/80 font-black">Kilometers / Ride</span>
            </div>
          </div>
        </div>
      </section>

      {/* Explorer Stories & Guest Gallery Section */}
      <section className="py-16 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto bg-brand-yellow/15 border-2 border-brand-yellow/30 rounded-[2.5rem] shadow-sm my-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs tracking-widest uppercase text-brand-olive-dark font-extrabold bg-brand-yellow px-3 py-1 rounded-full border border-brand-yellow-dark/30 shadow-xs">
            Guest Moments & Diaries
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal mt-4">
            Pondicherry on Wheels
          </h2>
          <p className="text-brand-olive-dark font-bold mt-3 font-sans text-sm sm:text-base">
            See how our beautiful family of travelers are exploring the colorful corners of French Town, Auroville, and Promenade Beach!
          </p>
        </div>

        {/* Catchy Image Grid with Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              image: happyCoupleImg,
              title: "French Quarter Romance",
              quote: "Exploring the quiet, mustard-yellow French Quarter on our mint scooter was pure magic. Stop, shoot, eat, repeat!",
              author: "Sneha & Amit",
              hometown: "Mumbai",
              ride: "Vespa Classic SXL",
              tags: ["White Town", "Cafes"]
            },
            {
              image: beachRideImg,
              title: "Promenade Sunset Cruise",
              quote: "Riding down Beach Road during the cool evening sunset with the sea breeze splashing was absolutely therapeutic.",
              author: "Tanya Maheshwari",
              hometown: "Bangalore",
              ride: "Suzuki Burgman Street",
              tags: ["Promenade", "Sunset"]
            },
            {
              image: friendsBicyclesImg,
              title: "Eco Heritage Cycling",
              quote: "We spent the afternoon pedaling through the Heritage Town. The bikes are so light, clean, and retro!",
              author: "Rohan & Squad",
              hometown: "Chennai",
              ride: "Heritage Cruiser Cycles",
              tags: ["Eco-Travel", "Heritage"]
            },
            {
              image: soloTravelerImg,
              title: "Auroville Breeze Run",
              quote: "Felt super safe driving alone to Auroville. The rental process was zero deposit and extremely transparent.",
              author: "Priya Sharma",
              hometown: "New Delhi",
              ride: "Vespa Classic SXL",
              tags: ["Auroville", "Solo-Travel"]
            }
          ].map((item, index) => (
            <motion.div
              id={`gallery-story-${index}`}
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-white border-2 border-brand-yellow rounded-[2rem] p-5 shadow-sm hover:shadow-xl hover:border-brand-yellow-dark transition-all duration-300 flex flex-col justify-between text-center relative overflow-hidden group cursor-pointer"
            >
              {/* Highlight background flash on hover */}
              <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div>
                {/* Circular image representing the guest or bike ride */}
                <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-brand-yellow shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 flex items-center justify-center bg-white shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-olive/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Tags below circle */}
                <div className="flex justify-center gap-1 mt-3">
                  {item.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-brand-yellow text-brand-charcoal text-[8px] font-black px-2 py-0.5 rounded-full border border-brand-yellow-dark/30 shadow-xs uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Main Content */}
                <div className="space-y-1.5 mt-3">
                  <div className="text-brand-olive flex items-center justify-center gap-1 font-mono text-[9px] uppercase font-black tracking-wider leading-none">
                    <MapPin className="w-3 h-3 text-brand-olive" />
                    <span>{item.ride}</span>
                  </div>
                  <h3 className="font-display font-black text-sm text-brand-charcoal leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-brand-charcoal/90 text-[11px] italic font-medium leading-relaxed max-w-xs mx-auto">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Verified Badge and Author Footer */}
              <div className="pt-3.5 mt-4 border-t border-brand-yellow/20 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1 bg-brand-yellow text-brand-charcoal border border-brand-yellow-dark/20 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider">
                  Verified Explorer
                </div>
                <span className="font-sans font-extrabold text-xs text-brand-olive-dark block leading-none mt-1">
                  {item.author}
                </span>
                <span className="text-[9px] text-brand-charcoal/70 block font-bold">
                  {item.hometown}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust & Features Section */}
      <section className="bg-brand-gray-light text-brand-charcoal py-16 px-4 sm:px-6 lg:px-8 border-t border-b border-brand-olive/15 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#354521_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-black text-3xl text-brand-olive-dark">
              Why Explore With Laya?
            </h2>
            <p className="text-brand-charcoal/90 font-bold mt-2 font-sans text-xs sm:text-sm">
              We focus on premium, hassle-free scooter and bicycle rentals so you can capture every breeze of Pondicherry stress-free.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
            
            {/* Card 1: Zero Cash Deposit */}
            <motion.div 
              id="feature-card-deposit"
              onClick={() => setActiveFeature('deposit')}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-6 text-center group cursor-pointer border-4 ${
                activeFeature === 'deposit' 
                  ? 'border-brand-yellow ring-8 ring-brand-yellow/20 bg-brand-charcoal text-white' 
                  : 'border-brand-olive hover:border-brand-yellow bg-white text-brand-charcoal'
              }`}
            >
              {/* Background cover image with overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800" 
                  alt="Zero Cash Deposit" 
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-115"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-charcoal/30" />
              </div>

              {/* Glowing Rim / Inner Ring */}
              <div className={`absolute inset-2 rounded-full border border-dashed transition-all duration-1000 ${
                activeFeature === 'deposit' ? 'border-brand-yellow/60 animate-spin-slow' : 'border-brand-olive/20 group-hover:border-brand-yellow/40'
              }`} />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-2.5 px-3">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-charcoal border-2 border-brand-olive flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-brand-olive-dark" />
                </div>

                <h3 className="font-display font-black text-sm tracking-tight uppercase">
                  Zero Cash Deposit
                </h3>

                <p className="font-medium text-[11px] leading-relaxed max-w-[200px] opacity-90">
                  Keep your cash for dining! We don't ask for security deposits. Just bring a valid license & ID.
                </p>

                {/* Micro badge */}
                <span className="text-[9px] bg-brand-yellow text-brand-charcoal px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                  ₹0 Deposit
                </span>
              </div>
            </motion.div>

            {/* Card 2: Pondy Route Guide */}
            <motion.div 
              id="feature-card-fleet"
              onClick={() => setActiveFeature('fleet')}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-6 text-center group cursor-pointer border-4 ${
                activeFeature === 'fleet' 
                  ? 'border-brand-yellow ring-8 ring-brand-yellow/20 bg-brand-charcoal text-white' 
                  : 'border-brand-olive hover:border-brand-yellow bg-white text-brand-charcoal'
              }`}
            >
              {/* Background cover image with overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800" 
                  alt="Scenic Route Guide" 
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-115"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-charcoal/30" />
              </div>

              {/* Glowing Rim / Inner Ring */}
              <div className={`absolute inset-2 rounded-full border border-dashed transition-all duration-1000 ${
                activeFeature === 'fleet' ? 'border-brand-yellow/60 animate-spin-slow' : 'border-brand-olive/20 group-hover:border-brand-yellow/40'
              }`} />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-2.5 px-3">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-charcoal border-2 border-brand-olive flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <Navigation className="w-6 h-6 text-brand-olive-dark" />
                </div>

                <h3 className="font-display font-black text-sm tracking-tight uppercase">
                  Pondy Route Guide
                </h3>

                <p className="font-medium text-[11px] leading-relaxed max-w-[200px] opacity-90">
                  Discover curated self-guided routes for your scooter or bicycle—complete with sights, cafes, and maps.
                </p>

                {/* Micro badge */}
                <span className="text-[9px] bg-brand-yellow text-brand-charcoal px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                  3 Guided Routes
                </span>
              </div>
            </motion.div>

            {/* Card 3: 24/7 Support */}
            <motion.div 
              id="feature-card-support"
              onClick={() => setActiveFeature('support')}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-6 text-center group cursor-pointer border-4 ${
                activeFeature === 'support' 
                  ? 'border-brand-yellow ring-8 ring-brand-yellow/20 bg-brand-charcoal text-white' 
                  : 'border-brand-olive hover:border-brand-yellow bg-white text-brand-charcoal'
              }`}
            >
              {/* Background cover image with overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800" 
                  alt="24/7 Support Desk" 
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-115"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-charcoal/30" />
              </div>

              {/* Glowing Rim / Inner Ring */}
              <div className={`absolute inset-2 rounded-full border border-dashed transition-all duration-1000 ${
                activeFeature === 'support' ? 'border-brand-yellow/60 animate-spin-slow' : 'border-brand-olive/20 group-hover:border-brand-yellow/40'
              }`} />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-2.5 px-3">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-charcoal border-2 border-brand-olive flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6 text-brand-olive-dark" />
                </div>

                <h3 className="font-display font-black text-sm tracking-tight uppercase">
                  24/7 Supporters
                </h3>

                <p className="font-medium text-[11px] leading-relaxed max-w-[200px] opacity-90">
                  Stuck with a flat tire? Ring us! We dispatch an instant mechanic or emergency backup ride.
                </p>

                {/* Micro badge */}
                <span className="text-[9px] bg-brand-yellow text-brand-charcoal px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                  Emergency Support
                </span>
              </div>
            </motion.div>

            {/* Card 4: Free Helmets & Lock */}
            <motion.div 
              id="feature-card-helmets"
              onClick={() => setActiveFeature('helmets')}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col items-center justify-center p-6 text-center group cursor-pointer border-4 ${
                activeFeature === 'helmets' 
                  ? 'border-brand-yellow ring-8 ring-brand-yellow/20 bg-brand-charcoal text-white' 
                  : 'border-brand-olive hover:border-brand-yellow bg-white text-brand-charcoal'
              }`}
            >
              {/* Background cover image with overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=800" 
                  alt="Free Helmets & Lock" 
                  className="w-full h-full object-cover opacity-15 group-hover:opacity-30 transition-all duration-700 group-hover:scale-115"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-charcoal/30" />
              </div>

              {/* Glowing Rim / Inner Ring */}
              <div className={`absolute inset-2 rounded-full border border-dashed transition-all duration-1000 ${
                activeFeature === 'helmets' ? 'border-brand-yellow/60 animate-spin-slow' : 'border-brand-olive/20 group-hover:border-brand-yellow/40'
              }`} />

              <div className="relative z-10 flex flex-col items-center justify-center space-y-2.5 px-3">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-full bg-brand-yellow text-brand-charcoal border-2 border-brand-olive flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-6 h-6 text-brand-olive-dark" />
                </div>

                <h3 className="font-display font-black text-sm tracking-tight uppercase">
                  Helmets & Lock
                </h3>

                <p className="font-medium text-[11px] leading-relaxed max-w-[200px] opacity-90">
                  Safety is non-negotiable. Two sanitized, secure helmets and a steel disc lock are free of charge.
                </p>

                {/* Micro badge */}
                <span className="text-[9px] bg-brand-yellow text-brand-charcoal px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-xs">
                  Free Safety Kit
                </span>
              </div>
            </motion.div>

          </div>

          {/* Interactive Experience Panel Sandbox Container */}
          <motion.div 
            id="interactive-features-panel"
            layout
            className="mt-8 bg-white border-2 border-brand-olive rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden"
          >
            {/* Top wave branding pattern */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-yellow" />

            <AnimatePresence mode="wait">
              {activeFeature === 'fleet' && (
                <motion.div
                  key="fleet-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-brand-olive/10">
                    <div>
                      <span className="bg-brand-yellow text-brand-charcoal text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Self-Guided Adventures
                      </span>
                      <h3 className="font-display font-black text-xl text-brand-olive-dark mt-1 flex items-center gap-2">
                        <Map className="w-5 h-5 text-brand-olive" />
                        Pondicherry Curated Route Planner
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(['cafe', 'coast', 'spiritual'] as const).map((routeKey) => (
                        <button
                          id={`btn-route-tab-${routeKey}`}
                          key={routeKey}
                          onClick={() => setSelectedRoute(routeKey)}
                          className={`py-1.5 px-3 rounded-lg font-sans font-black text-xs uppercase tracking-wider cursor-pointer transition-all border ${
                            selectedRoute === routeKey
                              ? 'bg-brand-olive text-brand-yellow border-brand-olive shadow-xs'
                              : 'bg-brand-gray-light text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-cream/60'
                          }`}
                        >
                          {routeKey === 'cafe' && '☕ Cafe Hop'}
                          {routeKey === 'coast' && '🌊 Coastal'}
                          {routeKey === 'spiritual' && '🧘 Auroville'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Left Info Column */}
                    <div className="lg:col-span-7 space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <h4 className="font-display font-black text-lg text-brand-charcoal">
                            {routesData[selectedRoute].title}
                          </h4>
                          <span className="inline-flex items-center gap-1 bg-brand-yellow/35 text-brand-olive-dark text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                            ⚡ {routesData[selectedRoute].intensity}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 bg-brand-cream/40 p-3 rounded-xl border border-brand-olive/10">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-brand-charcoal/45 block">Total Distance</span>
                            <span className="text-sm font-black text-brand-olive">{routesData[selectedRoute].distance}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-brand-charcoal/45 block">Est. Travel Time</span>
                            <span className="text-sm font-black text-brand-olive">{routesData[selectedRoute].duration}</span>
                          </div>
                        </div>

                        {/* List of recommended spots */}
                        <div className="space-y-3.5">
                          <span className="text-[10px] uppercase font-bold text-brand-charcoal/50 tracking-wider block font-black">Recommended Stops:</span>
                          <div className="space-y-3 border-l-2 border-brand-olive/20 pl-4 ml-1">
                            {routesData[selectedRoute].spots.map((spot, i) => (
                              <div key={i} className="relative">
                                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-olive border border-brand-yellow" />
                                <span className="font-display font-black text-xs text-brand-charcoal block leading-none">{spot.name}</span>
                                <span className="text-xs text-brand-charcoal/70 leading-normal font-medium mt-1 block">{spot.desc}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-brand-olive/5">
                        <button
                          id="btn-route-browse-bikes"
                          onClick={onBrowseBikes}
                          className="bg-brand-olive hover:bg-brand-olive-light text-brand-yellow font-sans font-black text-xs px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer inline-flex items-center gap-1.5"
                        >
                          Choose Ride For This Route
                          <ArrowRight className="w-4 h-4 text-brand-yellow" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column Visual / Card */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                      <div className="relative rounded-2xl overflow-hidden border-2 border-brand-olive shadow-sm h-48 sm:h-52">
                        <img 
                          src={routesData[selectedRoute].image}
                          alt={routesData[selectedRoute].title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 bg-brand-yellow text-brand-charcoal text-[9px] font-mono font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                          📍 Curated Stop Map
                        </div>
                      </div>

                      <div className="bg-brand-yellow/10 border border-brand-olive/20 p-3.5 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-brand-olive-dark block">💡 Riding Pro-Tip:</span>
                        <p className="text-xs text-brand-charcoal/80 leading-relaxed font-semibold">
                          {routesData[selectedRoute].mapTip}
                        </p>
                      </div>

                      <div className="bg-brand-cream border border-brand-olive/10 p-3.5 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-brand-charcoal/45 block">Did You Know?</span>
                        <p className="text-xs text-brand-charcoal/70 leading-relaxed font-medium italic">
                          {routesData[selectedRoute].funFact}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeature === 'deposit' && (
                <motion.div
                  key="deposit-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="pb-4 border-b border-brand-olive/10">
                    <span className="bg-brand-yellow text-brand-charcoal text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Zero Cash Deposit Tracker
                    </span>
                    <h3 className="font-display font-black text-xl text-brand-olive-dark mt-1 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-brand-olive" />
                      ₹0 Security Deposit & Cost Savings Calculator
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-5 bg-brand-cream/40 p-5 rounded-2xl border border-brand-olive/10">
                      <h4 className="font-sans font-extrabold text-xs uppercase text-brand-charcoal/50 tracking-wider">
                        Configure Rental Booking
                      </h4>
                      
                      {/* Bike selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-brand-charcoal/80 block">Choose Ride Category</label>
                        <div className="grid grid-cols-3 gap-2">
                          {(['scooter', 'motorcycle', 'bicycle'] as const).map((type) => (
                            <button
                              id={`calc-type-${type}`}
                              key={type}
                              onClick={() => setDepositBikeType(type)}
                              className={`py-2 px-3 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all border cursor-pointer ${
                                depositBikeType === type
                                  ? 'bg-brand-olive text-brand-yellow border-brand-olive'
                                  : 'bg-white text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-gray-light'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Day Slider */}
                      <div className="space-y-1.5 pt-2">
                        <div className="flex justify-between items-center text-xs font-bold text-brand-charcoal/80">
                          <span>Rental Duration</span>
                          <span className="text-brand-olive">{depositDays} Days</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="14"
                          value={depositDays}
                          onChange={(e) => setDepositDays(parseInt(e.target.value))}
                          className="w-full accent-brand-olive cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] font-bold text-brand-charcoal/40">
                          <span>1 Day</span>
                          <span>7 Days</span>
                          <span>14 Days</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-brand-olive text-brand-cream p-4 rounded-xl border border-brand-olive-dark shadow-xs text-center space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-yellow/80">Laya Deposit</span>
                          <div className="text-3xl font-black font-display text-brand-yellow">₹0</div>
                          <span className="text-[9px] block text-brand-cream/80 font-medium">No Cash Held!</span>
                        </div>
                        <div className="bg-brand-gray-light p-4 rounded-xl border border-brand-charcoal/10 text-center space-y-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-brand-charcoal/45">Local Vendors</span>
                          <div className="text-3xl font-black font-display text-brand-charcoal/80">
                            ₹{depositBikeType === 'motorcycle' ? 3500 : depositBikeType === 'scooter' ? 2000 : 800}
                          </div>
                          <span className="text-[9px] block text-brand-charcoal/50 font-medium">Retained as Security</span>
                        </div>
                      </div>

                      <div className="border border-brand-olive/15 bg-brand-yellow/15 p-4 rounded-xl space-y-1 text-center">
                        <span className="text-xs font-bold text-brand-olive-dark block">💰 Pocket Cash Saved Instantly</span>
                        <p className="text-lg font-black text-brand-charcoal">
                          ₹{depositBikeType === 'motorcycle' ? 3500 : depositBikeType === 'scooter' ? 2000 : 800} Cash Stays with You!
                        </p>
                        <span className="text-[10px] text-brand-charcoal/70 block leading-normal font-medium max-w-xs mx-auto">
                          Keep your cash flow open to spend on legendary pizzas at Cafe Extasi or French croissants at Baker Street!
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeature === 'support' && (
                <motion.div
                  key="support-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="pb-4 border-b border-brand-olive/10">
                    <span className="bg-brand-yellow text-brand-charcoal text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      24/7 Roadside Ingress
                    </span>
                    <h3 className="font-display font-black text-xl text-brand-olive-dark mt-1 flex items-center gap-2">
                      <Compass className="w-5 h-5 text-brand-olive" />
                      Active Standby & Support Dispatch Simulator
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-brand-charcoal/90 text-xs sm:text-sm font-medium leading-relaxed">
                        We have three mechanics on mobile active duty patrolling Pondicherry's key spots. Select your spot below and test our connection ping rate!
                      </p>

                      <div className="space-y-2">
                        <label className="text-xs font-extrabold text-brand-charcoal/80 block">Select Your Simulated Location:</label>
                        <select
                          id="select-support-location"
                          value={supportLocation}
                          onChange={(e) => {
                            setSupportLocation(e.target.value);
                            setSupportSignalStatus('idle');
                          }}
                          className="w-full bg-white border-2 border-brand-olive p-2.5 rounded-lg text-xs font-bold text-brand-charcoal focus:outline-hidden"
                        >
                          <option value="White Town Promenade Beach">White Town Promenade Beach</option>
                          <option value="Auroville Main Visitor Dome">Auroville Main Visitor Dome</option>
                          <option value="Paradise Beach Boat House">Paradise Beach Boat House</option>
                          <option value="East Coast Road Toll Gate">East Coast Road Toll Gate</option>
                        </select>
                      </div>

                      <div>
                        <button
                          id="btn-ping-support"
                          onClick={() => {
                            setSupportSignalStatus('checking');
                            setTimeout(() => {
                              setSupportSignalStatus('active');
                            }, 1200);
                          }}
                          className="bg-brand-olive hover:bg-brand-olive-light text-brand-yellow font-sans font-extrabold text-xs px-5 py-3 rounded-xl shadow-xs transition-all hover:scale-[1.02] cursor-pointer"
                        >
                          {supportSignalStatus === 'checking' ? '📡 Pinging Standby Crew...' : '📡 Test Roadside Standby Connection'}
                        </button>
                      </div>
                    </div>

                    <div className="bg-brand-cream/30 border-2 border-brand-olive/15 rounded-2xl p-5 flex flex-col justify-center items-center text-center space-y-4 relative overflow-hidden h-52">
                      {supportSignalStatus === 'checking' && (
                        <div className="absolute inset-0 bg-brand-olive/5 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border-4 border-brand-yellow border-t-brand-olive animate-spin" />
                        </div>
                      )}

                      {supportSignalStatus === 'idle' && (
                        <div className="space-y-2">
                          <span className="text-4xl">📡</span>
                          <h4 className="font-display font-black text-sm text-brand-charcoal">Signal Idle</h4>
                          <p className="text-[11px] text-brand-charcoal/60 font-medium">Click test above to check standby mechanic coordinates near your area.</p>
                        </div>
                      )}

                      {supportSignalStatus === 'active' && (
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="space-y-2 w-full"
                        >
                          <div className="w-4 h-4 rounded-full bg-green-500 animate-ping mx-auto" />
                          <h4 className="font-display font-black text-sm text-brand-olive-dark">Active Support Standby Connected!</h4>
                          <div className="text-xs bg-white border border-brand-olive/10 p-2.5 rounded-lg text-brand-charcoal space-y-0.5">
                            <p className="font-semibold text-[11px]">Location: {supportLocation}</p>
                            <p className="font-bold text-brand-olive text-[11px]">Standby Crew: Team Pondy-North</p>
                            <p className="text-brand-charcoal/50 text-[10px]">Estimated Arrival Time: <span className="font-black text-brand-charcoal">12-16 Mins</span></p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeFeature === 'helmets' && (
                <motion.div
                  key="helmets-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="pb-4 border-b border-brand-olive/10">
                    <span className="bg-brand-yellow text-brand-charcoal text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Complimentary Safety Kits
                    </span>
                    <h3 className="font-display font-black text-xl text-brand-olive-dark mt-1 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-brand-olive" />
                      Sanitized Safety Kit Fitment Simulator
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-4 bg-brand-cream/30 border border-brand-olive/15 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3 h-48">
                      {/* Interactive CSS Helmet preview representation */}
                      <div className="relative">
                        <span className="text-6xl filter drop-shadow-md block">🪖</span>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white shadow-xs ${
                          helmetColor === 'mint' ? 'bg-[#3b7a57]' : helmetColor === 'yellow' ? 'bg-[#f4c430]' : 'bg-[#404040]'
                        }`}>
                          ✓
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-brand-charcoal uppercase">ISI Standard Helmet</h4>
                        <span className="text-[10px] bg-brand-yellow px-2 py-0.5 rounded-full border border-brand-olive/10 text-brand-charcoal font-black mt-1 inline-block uppercase tracking-wider">
                          Size {helmetSize} • {helmetColor === 'mint' ? 'French Mint' : helmetColor === 'yellow' ? 'Boutique Gold' : 'Carbon Black'}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-8 space-y-4">
                      <p className="text-brand-charcoal/90 text-xs sm:text-sm font-medium leading-relaxed">
                        We provide up to two complimentary helmets with every booking. Every helmet is hand-scrubbed, inner lining sanitised with UV-Sterilizers, and bubble-wrapped for pure freshness.
                      </p>

                      <div className="space-y-3">
                        {/* Color selection */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-brand-charcoal/70 min-w-20">Helmet Color:</span>
                          <div className="flex gap-2">
                            {(['mint', 'yellow', 'charcoal'] as const).map((color) => (
                              <button
                                id={`helmet-color-${color}`}
                                key={color}
                                onClick={() => setHelmetColor(color)}
                                className={`px-3 py-1.5 rounded-md font-sans font-bold text-[10px] uppercase tracking-wider border cursor-pointer transition-all ${
                                  helmetColor === color
                                    ? 'bg-brand-olive text-brand-yellow border-brand-olive'
                                    : 'bg-white text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-gray-light'
                                }`}
                              >
                                {color === 'mint' ? 'Mint' : color === 'yellow' ? 'Boutique Yellow' : 'Carbon Black'}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Size selection */}
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-brand-charcoal/70 min-w-20">Safety Fit Size:</span>
                          <div className="flex gap-1.5">
                            {(['S', 'M', 'L', 'XL'] as const).map((size) => (
                              <button
                                id={`helmet-size-${size}`}
                                key={size}
                                onClick={() => setHelmetSize(size)}
                                className={`w-8 h-8 rounded-lg font-sans font-black text-xs cursor-pointer border flex items-center justify-center transition-all ${
                                  helmetSize === size
                                    ? 'bg-brand-olive text-brand-yellow border-brand-olive shadow-xs'
                                    : 'bg-white text-brand-charcoal border-brand-charcoal/10 hover:bg-brand-gray-light'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          <span className="text-[10px] text-brand-charcoal/50 font-bold italic">
                            ({helmetSize === 'S' ? 'Youth Fit' : helmetSize === 'M' ? 'Standard Fit' : helmetSize === 'L' ? 'Spacious Fit' : 'Grand Tour Fit'})
                          </span>
                        </div>
                      </div>

                      <div className="p-3 bg-brand-cream/30 border border-brand-olive/10 rounded-xl text-[11px] font-bold text-brand-olive flex items-center gap-2">
                        <span>🎯 Safety Lock Pack Included:</span>
                        <span className="text-brand-charcoal/80 font-medium">Includes 1 complimentary hardened steel cable lock pre-loaded under your bike seat.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Guide Block to Pondicherry */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-brand-olive rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 border-2 border-brand-olive-dark">
          <div className="lg:col-span-7 p-8 sm:p-12 text-brand-cream space-y-6 flex flex-col justify-center">
            <span className="font-mono text-xs tracking-wider uppercase text-brand-yellow font-bold">
              Local Pondicherry Insider Tips
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-yellow">
              Pondy is best explored on two wheels!
            </h2>
            <div className="space-y-4 font-sans text-sm sm:text-base text-brand-cream/90 font-medium">
              <p>
                The French Town of Pondicherry features narrow, geometric, quiet grid lanes shaded by golden-yellow compound walls and bougainvillea. Cars are prohibited or hard to park in these areas!
              </p>
              <p>
                A gearless Vespa scooter or a premium vintage bicycle from Laya lets you easily navigate White Town, stop at cute cafes, ride along the Promenade, and take a 20-minute breeze run to Auroville.
              </p>
            </div>
            <div className="pt-2">
              <button
                id="btn-guide-browse"
                onClick={onBrowseBikes}
                className="bg-brand-yellow hover:bg-brand-yellow-light text-brand-charcoal font-bold px-6 py-3 rounded-xl transition-all cursor-pointer inline-flex items-center gap-2 text-sm uppercase tracking-wider shadow-md"
              >
                Choose Your Ride
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 h-64 lg:h-auto min-h-[300px] relative">
            <img 
              src={commuterBicycleImg} 
              alt="Commuter Bicycle in white alley" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Verified Guest Testimonials Section */}
      <section id="homepage-testimonials-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-olive/15">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-brand-olive text-brand-yellow px-3.5 py-1.5 rounded-full font-sans font-extrabold text-[10px] tracking-widest uppercase shadow-xs">
            <Smile className="w-3.5 h-3.5" />
            Guest Love Stories
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-brand-charcoal">
            Why Explorers Choose Laya
          </h2>
          <p className="text-brand-charcoal/70 font-semibold text-sm sm:text-base max-w-xl mx-auto">
            Real stories from global travelers and weekend wanderers who unlocked the true spirit of Pondicherry on our pristine wheels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border-2 border-brand-olive/15 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative"
          >
            <div className="absolute top-6 right-6 text-brand-yellow/30 font-display font-black text-6xl select-none pointer-events-none">
              “
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-1 text-brand-yellow">
                {"★★★★★".split("").map((char, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-brand-charcoal/90 text-sm font-medium leading-relaxed italic">
                "Exploring White Town on Laya's pastel mint Vespa was straight out of a movie! Absolutely loved the zero cash deposit policy—it makes life so much easier for budget travelers. Original helmets were sanitized and fit perfectly."
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-brand-olive/10">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" 
                alt="Anjali Sharma" 
                className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-black text-xs text-brand-charcoal block">Anjali Sharma</span>
                <span className="text-[10px] text-brand-olive-dark font-bold uppercase tracking-wider block">Mumbai, India</span>
                <span className="inline-flex items-center gap-1 text-[9px] text-green-600 font-extrabold mt-0.5">
                  <CheckCircle2 className="w-3 h-3 fill-green-100" /> Verified Rider
                </span>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border-2 border-brand-olive/15 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative"
          >
            <div className="absolute top-6 right-6 text-brand-yellow/30 font-display font-black text-6xl select-none pointer-events-none">
              “
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-1 text-brand-yellow">
                {"★★★★★".split("").map((char, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-brand-charcoal/90 text-sm font-medium leading-relaxed italic">
                "Renting a vintage cruiser bicycle from Laya felt incredibly nostalgic, reminiscent of French villages. Pristine chain alignment, smooth hand-grips, and friendly team. The best way to hop between seaside croissants and cafes."
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-brand-olive/10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" 
                alt="Jean-Luc Dubois" 
                className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-black text-xs text-brand-charcoal block">Jean-Luc Dubois</span>
                <span className="text-[10px] text-brand-olive-dark font-bold uppercase tracking-wider block">Paris, France</span>
                <span className="inline-flex items-center gap-1 text-[9px] text-green-600 font-extrabold mt-0.5">
                  <CheckCircle2 className="w-3 h-3 fill-green-100" /> Verified Rider
                </span>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border-2 border-brand-olive/15 p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative"
          >
            <div className="absolute top-6 right-6 text-brand-yellow/30 font-display font-black text-6xl select-none pointer-events-none">
              “
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex gap-1 text-brand-yellow">
                {"★★★★★".split("").map((char, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
              <p className="text-brand-charcoal/90 text-sm font-medium leading-relaxed italic">
                "Absolute lifesaver with their 24/7 roadside assistance. I got a minor flat tyre near the Auroville road at 8 PM, and the Laya crew dispatched a mechanic within 15 minutes with a brand-new backup scooter. Exceptional support!"
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-brand-olive/10">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120" 
                alt="Rahul Krishnan" 
                className="w-11 h-11 rounded-full object-cover border-2 border-brand-yellow shadow-inner"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="font-display font-black text-xs text-brand-charcoal block">Rahul Krishnan</span>
                <span className="text-[10px] text-brand-olive-dark font-bold uppercase tracking-wider block">Bangalore, India</span>
                <span className="inline-flex items-center gap-1 text-[9px] text-green-600 font-extrabold mt-0.5">
                  <CheckCircle2 className="w-3 h-3 fill-green-100" /> Verified Rider
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Styled Google Map Section */}
      <section id="homepage-map-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-olive/15">
        <div className="bg-white border-4 border-brand-olive rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Map info card */}
          <div className="lg:col-span-4 p-8 bg-brand-gray-light flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-brand-olive">
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-brand-olive font-extrabold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-olive-dark animate-bounce" />
                Laya Hub Location
              </span>
              <h3 className="font-display font-black text-2xl text-brand-charcoal">
                Our Heritage Headquarters
              </h3>
              <p className="text-brand-charcoal/90 text-xs font-semibold leading-relaxed">
                Located right in the center of Pondicherry's Historic Quarter. Hop on, grab your free helmets, and begin exploring in seconds!
              </p>
              
              <div className="space-y-3 pt-2 text-xs font-bold text-brand-charcoal/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-olive text-brand-yellow flex items-center justify-center text-[10px]">1</div>
                  <div>
                    <span className="text-brand-olive-dark block font-black">White Town Quarter</span>
                    <span className="text-[10px] text-brand-charcoal/60">0-min ride • Beautiful yellow cafes</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-olive text-brand-yellow flex items-center justify-center text-[10px]">2</div>
                  <div>
                    <span className="text-brand-olive-dark block font-black">Promenade Coastline</span>
                    <span className="text-[10px] text-brand-charcoal/60">2-min ride • Breezy sunset beach road</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-brand-olive text-brand-yellow flex items-center justify-center text-[10px]">3</div>
                  <div>
                    <span className="text-brand-olive-dark block font-black">Auroville Spiritual Dome</span>
                    <span className="text-[10px] text-brand-charcoal/60">20-min ride • Scenic East Coast Road</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://maps.google.com/?q=White+Town,+Pondicherry"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-brand-olive hover:bg-brand-olive-light text-brand-yellow font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider text-center block transition-all hover:scale-[1.01] shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                Get Live Directions
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Real Google Map iFrame embedded nicely */}
          <div className="lg:col-span-8 h-[360px] lg:h-auto min-h-[350px] relative bg-brand-gray-light">
            <iframe
              title="Laya Bike Rental Pondicherry Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.682855278788!2d79.83151847596826!3d11.927161836934424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53610b784e1b7f%3A0xe54cf17f5b84c79d!2sWhite%20Town%2C%20Puducherry!5e0!3m2!1sen!2sin!4v1700000000000"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-charcoal text-brand-cream/70 py-12 px-4 border-t-2 border-brand-olive relative z-10">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-20 h-20">
              <LayaLogo className="w-full h-full" />
            </div>
            <span className="font-display font-black text-brand-yellow text-xl tracking-wider uppercase">Laya Bike Rental</span>
          </div>
          <p className="text-xs max-w-md mx-auto text-brand-cream/50">
            © 2026 Laya Bike Rental Pondicherry. All rights reserved. Original ID proof is mandatory. Licenses are checked rigorously. Rent safely!
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Interactive Module */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {showWhatsappChat && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-white border-2 border-brand-olive w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden mb-4 flex flex-col h-[400px]"
            >
              {/* WhatsApp Header */}
              <div className="bg-brand-olive text-brand-cream px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full border border-brand-yellow bg-white p-0.5 overflow-hidden flex items-center justify-center">
                      <LayaLogo className="w-full h-full" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-brand-olive animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-brand-cream block leading-tight">Laya Support Desk</h4>
                    <span className="text-[10px] text-brand-yellow/90 block font-semibold">Replies instantly • Online</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowWhatsappChat(false)}
                  className="p-1 hover:bg-white/10 rounded-lg text-brand-cream/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat history */}
              <div className="flex-1 p-4 overflow-y-auto bg-brand-gray-light space-y-3 flex flex-col">
                {chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs font-semibold leading-relaxed shadow-xs ${
                      msg.sender === 'user' 
                        ? 'bg-brand-yellow text-brand-charcoal self-end rounded-br-none border border-brand-olive/30' 
                        : 'bg-white text-brand-charcoal self-start rounded-bl-none border border-brand-olive/15'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[8px] opacity-60 block text-right mt-1">{msg.time}</span>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="bg-white text-brand-charcoal self-start rounded-2xl rounded-bl-none px-4 py-2 text-xs font-semibold border border-brand-olive/15 shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-olive rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-olive rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-olive rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>

              {/* Quick Template Actions */}
              <div className="p-2 bg-white border-t border-brand-olive/15 flex flex-wrap gap-1.5">
                {[
                  "🛵 Book Vespa Classic",
                  "🚲 Rent Heritage Bicycle",
                  "🌴 Tell me about Zero Deposit"
                ].map((tag, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => handleSendChat(tag)}
                    className="text-[10px] bg-brand-gray-light hover:bg-brand-yellow border border-brand-olive/20 hover:border-brand-olive/40 rounded-full px-2.5 py-1 font-bold text-brand-charcoal/90 hover:text-brand-charcoal transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-brand-olive/25 flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  className="flex-1 bg-brand-gray-light border border-brand-olive/20 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-hidden focus:border-brand-olive"
                />
                <button
                  onClick={() => handleSendChat()}
                  className="bg-brand-olive hover:bg-brand-olive-light text-brand-yellow p-2 rounded-xl transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button Bubble */}
        <motion.button
          id="btn-whatsapp-floating"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWhatsappChat(prev => !prev)}
          className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-3.5 shadow-2xl border-2 border-white flex items-center gap-2 cursor-pointer relative transition-colors duration-300"
        >
          {/* Notification Badge if closed */}
          {!showWhatsappChat && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-yellow text-brand-charcoal border border-brand-olive text-[9px] font-black rounded-full flex items-center justify-center animate-bounce">1</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white shrink-0"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.864.001-2.641-1.021-5.122-2.88-6.983-1.859-1.861-4.343-2.885-6.984-2.885-5.438 0-9.863 4.414-9.866 9.865-.001 1.772.475 3.502 1.38 5.045L1.93 22.07l4.717-1.237zM17.476 14.4c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
          <span className="font-sans font-black text-xs hidden sm:inline pr-1">Chat Support</span>
        </motion.button>
      </div>

    </div>
  );
}
