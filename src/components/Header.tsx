import React, { useState } from 'react';
import { Menu, X, ShieldAlert, BookOpen, Clock, MapPin } from 'lucide-react';
import { LOGO_IMAGE, BUSINESS_NAME } from '../data';
import LayaLogo from './LayaLogo';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'Our Fleet', view: 'bikes' },
    { label: 'Admin Panel', view: 'dashboard' },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-cream border-b border-brand-olive/10 shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 grid grid-cols-3 items-center">
        {/* Left Column: Navigation (Desktop) / Mobile Drawer Toggle (Mobile) */}
        <div className="flex items-center justify-start">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                id={`nav-item-${item.view}`}
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`font-sans font-medium text-sm tracking-wide transition-colors cursor-pointer ${
                  currentView === item.view
                    ? 'text-brand-olive border-b-2 border-brand-yellow pb-1'
                    : 'text-brand-charcoal/70 hover:text-brand-olive hover:border-b-2 hover:border-brand-olive/20 pb-1'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 -ml-2 rounded-lg text-brand-charcoal hover:bg-brand-gray-light focus:outline-hidden cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Center Column: Perfectly Centered Brand Logo */}
        <div className="flex justify-center">
          <button
            id="btn-header-logo"
            onClick={() => handleNavClick('home')}
            className="group flex items-center justify-center focus:outline-hidden cursor-pointer"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-3 group-active:scale-95 flex items-center justify-center -my-2">
              <LayaLogo className="w-full h-full object-contain" />
            </div>
          </button>
        </div>

        {/* Right Column: Empty to maintain perfect symmetry and focus */}
        <div className="flex items-center justify-end">
          {/* Symmetrically empty to emphasize center brand identity */}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-t border-brand-olive/10 py-4 px-4 shadow-inner space-y-3">
          {navItems.map((item) => (
            <button
              id={`mobile-nav-item-${item.view}`}
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`block w-full text-left py-2 px-3 rounded-lg font-sans font-medium text-base ${
                currentView === item.view
                  ? 'bg-brand-olive/10 text-brand-olive'
                  : 'text-brand-charcoal/80 hover:bg-brand-gray-light hover:text-brand-charcoal'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
