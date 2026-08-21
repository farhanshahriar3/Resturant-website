import React, { useState } from 'react';
import { MapPin, Car, History, Copy, Check, Navigation, Clock } from 'lucide-react';

interface LocationHoursSectionProps {
  isOpenNow: boolean;
}

export const LocationHoursSection: React.FC<LocationHoursSectionProps> = ({
  isOpenNow
}) => {
  const [copied, setCopied] = useState(false);

  const address = 'Modak-Cafe n Restaurant, Main Road, Sanawad, Khargone District, Madhya Pradesh 451111';

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        'Modak Cafe and Restaurant Sanawad Madhya Pradesh'
      )}`,
      '_blank'
    );
  };

  return (
    <section className="bg-[#F8F7F3] w-full relative overflow-hidden px-6 sm:px-8 md:px-20 py-20 md:py-32 border-b border-[#121212]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
        {/* Location Card */}
        <div className="bg-[#EAE8E2] p-8 sm:p-10 border border-[#121212]/10 shadow-xl flex flex-col justify-between h-full min-h-[340px] hover:border-[#121212]/30 transition-all">
          <div>
            <div className="w-10 h-10 bg-[#121212] text-white flex items-center justify-center mb-6 sm:mb-8">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="mb-3">
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#121212]/50 font-bold block mb-1">
                Sanawad Sanctuary
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#121212] font-jakarta tracking-tighter">
                Visit Us
              </h3>
            </div>
            <p className="text-[#121212]/70 font-geist text-sm sm:text-base leading-relaxed max-w-sm font-normal">
              Modak-Cafe n Restaurant,
              <br />
              Main Road, Sanawad,
              <br />
              Madhya Pradesh 451111
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                onClick={openGoogleMaps}
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#121212] text-white text-[10px] uppercase tracking-[0.2em] font-bold font-geist hover:bg-neutral-800 transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                Get Directions
              </button>

              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#F8F7F3] hover:bg-white text-[#121212] text-[10px] uppercase tracking-[0.15em] font-bold font-geist border border-[#121212]/20 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Address'}
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#121212]/10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#121212]/60 font-geist uppercase tracking-[0.2em]">
              <Car className="w-3.5 h-3.5 text-[#121212]" />
              <span>Valet & Dedicated Parking Available</span>
            </div>
          </div>
        </div>

        {/* Hours Card */}
        <div className="bg-[#181818] text-white p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between h-full min-h-[340px] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center">
                <History className="w-4 h-4" />
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] font-geist border ${
                  isOpenNow
                    ? 'bg-white text-[#121212] border-white'
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                <Clock className="w-3 h-3" />
                {isOpenNow ? 'Open Now' : 'Closed Now'}
              </span>
            </div>

            <div className="mb-2">
              <span className="text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold block mb-1">
                Schedule & Dining
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-jakarta tracking-tighter">
                Opening Hours
              </h3>
            </div>
            <p className="text-white/40 font-geist text-[10px] uppercase tracking-wider mb-8">
              *Kitchen orders close 30 minutes prior to closing
            </p>

            <div className="space-y-4 font-geist text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-white/60 uppercase tracking-wider">Mon - Thu</span>
                <span className="text-white font-bold tracking-wide">8:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-white/60 uppercase tracking-wider">Fri - Sat (Extended)</span>
                <span className="text-amber-200 font-bold tracking-wide">8:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-white/60 uppercase tracking-wider">Sunday</span>
                <span className="text-white font-bold tracking-wide">9:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
