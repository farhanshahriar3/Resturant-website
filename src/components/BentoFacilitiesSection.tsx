import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Wifi,
  Accessibility,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';

interface BentoFacilitiesSectionProps {
  onOpenWiFiModal: () => void;
  onOpenReservation: () => void;
}

const AMBIENCE_PHOTOS = [
  {
    title: 'Modern Comfort',
    subtitle: 'Aesthetic interiors meeting cozy functionality.',
    tag: 'Main Dining Hall',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1600&q=80'
  },
  {
    title: 'Al Fresco Patio',
    subtitle: 'Breezy evening dining under fairy lights.',
    tag: 'Outdoor Courtyard',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80'
  },
  {
    title: 'Artisan Brew Bar',
    subtitle: 'Where coffee beans are freshly ground & brewed.',
    tag: 'Espresso Lounge',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1600&q=80'
  }
];

export const BentoFacilitiesSection: React.FC<BentoFacilitiesSectionProps> = ({
  onOpenWiFiModal,
  onOpenReservation
}) => {
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % AMBIENCE_PHOTOS.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + AMBIENCE_PHOTOS.length) % AMBIENCE_PHOTOS.length);
  };

  const currentAmbience = AMBIENCE_PHOTOS[currentPhotoIdx];

  return (
    <section className="bg-[#121212] w-full text-white px-6 sm:px-8 md:px-20 py-20 md:py-32 border-b border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] bg-white text-[#121212] px-2.5 py-1">
              Atmosphere & Space
            </span>
            <span className="w-10 h-[1px] bg-white/20"></span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter font-jakarta leading-[0.95] mb-4">
            Designed for <br className="hidden sm:inline" />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.85)' }}>
              Connection.
            </span>
          </h2>
          <p className="text-white/60 text-sm sm:text-base font-light max-w-lg font-geist leading-relaxed">
            Whether you need a quiet corner to work or a large table for
            celebration, our space adapts with intentional restraint.
          </p>
        </div>
        <button
          onClick={onOpenReservation}
          className="px-6 py-3 bg-white text-[#121212] hover:bg-[#EAE8E2] text-[10px] uppercase tracking-[0.2em] font-bold font-geist shadow-xl transition-all cursor-pointer"
        >
          Book For Groups / Events
        </button>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-8">
        {/* Card 1: Services (Tall) */}
        <div className="md:col-span-2 relative bg-[#181818] p-8 border border-white/10 flex flex-col justify-between min-h-[380px] shadow-2xl group hover:border-white/30 transition-all">
          <div>
            <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center mb-6">
              <Bell className="w-4 h-4" />
            </div>
            <div className="mb-6">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold block mb-1">
                Hospitality 01
              </span>
              <h3 className="text-xl font-bold uppercase tracking-tight font-jakarta">
                Premium Services
              </h3>
            </div>
            <ul className="space-y-4">
              {[
                { title: 'Table Service', desc: 'Attentive, discreet hospitality' },
                { title: 'Curbside Pickup', desc: 'Fresh packed sweets & meals' },
                { title: 'Event Catering', desc: 'Custom menus for special occasions' },
                { title: 'Private Booking', desc: 'Celebrations & intimate gatherings' }
              ].map((service, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-white/70 font-geist text-xs group-hover:text-white transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white uppercase tracking-wider text-[11px] block">{service.title}</span>
                    <span className="text-[10px] text-white/50">{service.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-[9px] text-white/40 font-geist uppercase tracking-[0.2em] font-bold">
              Sanawad, MP
            </span>
            <span className="text-[10px] text-white font-bold tracking-widest uppercase">
              ★ 4.9 Verified
            </span>
          </div>
        </div>

        {/* Card 2: Visual Ambience (Wide with interactive switcher) */}
        <div className="md:col-span-4 relative bg-[#181818] overflow-hidden p-8 sm:p-10 group border border-white/10 min-h-[360px] flex flex-col justify-between shadow-2xl">
          <img
            src={currentAmbience.image}
            alt={currentAmbience.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent"></div>

          {/* Top Bar of Ambience Card */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-white text-[#121212] text-[9px] tracking-[0.2em] uppercase font-bold">
                Ambience
              </span>
              <span className="px-2.5 py-1 bg-black/70 text-[9px] text-white uppercase tracking-[0.2em] font-geist border border-white/10 font-bold">
                {currentAmbience.tag}
              </span>
            </div>

            {/* Switcher Arrows - Square Architectural Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevPhoto}
                className="w-9 h-9 bg-[#121212] hover:bg-white hover:text-[#121212] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextPhoto}
                className="w-9 h-9 bg-[#121212] hover:bg-white hover:text-[#121212] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer"
                title="Next photo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Info of Ambience Card */}
          <div className="relative z-10 pt-16">
            <h3 className="text-2xl sm:text-3xl font-black uppercase font-jakarta tracking-tight mb-2 text-white">
              {currentAmbience.title}
            </h3>
            <p className="text-white/70 font-geist text-xs sm:text-sm max-w-md">
              {currentAmbience.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-4">
              {AMBIENCE_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPhotoIdx(i)}
                  className={`h-1 transition-all cursor-pointer ${
                    i === currentPhotoIdx ? 'w-8 bg-white' : 'w-2 bg-white/30'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Free High-Speed WiFi */}
        <div
          onClick={onOpenWiFiModal}
          className="md:col-span-3 bg-[#181818] p-8 border border-white/10 flex flex-col justify-between hover:border-white/40 transition-all cursor-pointer group shadow-xl"
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center">
              <Wifi className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 bg-white/10 text-white text-[9px] font-bold uppercase tracking-[0.2em] font-geist border border-white/15">
              Fiber 5G
            </span>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-bold uppercase tracking-wider font-jakarta text-white group-hover:text-amber-200 transition-colors">
              High-Speed Wi-Fi
            </h4>
            <p className="text-xs text-white/60 mt-1 font-geist">
              Unlimited high-speed fiber internet for work, studies & meetings.
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-white uppercase tracking-[0.15em] font-bold font-geist mt-4">
              <Eye className="w-3.5 h-3.5" />
              View Wi-Fi Access details
            </span>
          </div>
        </div>

        {/* Card 4: 100% Accessible */}
        <div className="md:col-span-3 bg-[#181818] p-8 border border-white/10 flex flex-col justify-between shadow-xl">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center">
              <Accessibility className="w-4 h-4" />
            </div>
            <span className="px-2 py-0.5 bg-white/10 text-white text-[9px] font-bold uppercase tracking-[0.2em] font-geist border border-white/15">
              100% Accessible
            </span>
          </div>
          <div className="mt-6">
            <h4 className="text-lg font-bold uppercase tracking-wider font-jakarta text-white">
              Inclusive Space
            </h4>
            <p className="text-xs text-white/60 mt-1 font-geist">
              Step-free ramp entry, wide corridors, and comfortable seating for everyone.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[10px] uppercase tracking-wider text-white/50 font-geist font-medium">
              <span className="w-1.5 h-1.5 bg-white"></span>
              Wheelchair friendly & Senior citizen priority
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
