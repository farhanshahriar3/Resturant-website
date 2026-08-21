import React from 'react';
import { Star, Wallet, ArrowUpRight, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onOpenReviews: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenMenu,
  onOpenReservation,
  onOpenReviews
}) => {
  return (
    <div className="relative w-full min-h-[88vh] md:h-[92vh] bg-[#121212] overflow-hidden shrink-0 flex flex-col justify-end">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2547&auto=format&fit=crop"
          alt="Modak Cafe Interior"
          className="w-full h-full object-cover object-center opacity-55 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 to-black/30"></div>
        {/* Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full pb-16 md:pb-24 px-6 md:px-16 pt-32">
        <div className="max-w-6xl">
          {/* Artistic Header Badges & Hairline */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] bg-white text-[#121212] px-3 py-1 shadow-sm">
              Artisan Sanctuary
            </span>
            <span className="w-12 h-[1px] bg-white/30 hidden sm:block"></span>
            
            <button
              onClick={onOpenReviews}
              className="flex items-center gap-2 bg-[#121212]/80 backdrop-blur-md text-white px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/20 hover:border-white transition-all cursor-pointer group"
              title="Click to view verified customer reviews"
            >
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>4.9 / 840+ Reviews</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-white/70 text-[9px] uppercase tracking-[0.2em] font-medium">
              <Wallet className="w-3 h-3 text-white/50" />
              <span>Affordable Luxury</span>
            </div>
          </div>

          {/* Headline - Artistic Flair High Contrast & Outlined Stroke */}
          <h1 className="text-white font-jakarta leading-[0.88] max-w-5xl text-6xl sm:text-7xl md:text-[105px] font-black tracking-tighter uppercase mb-8">
            Good Food.
            <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.9)' }}>
              Good Life.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-white/75 font-light mb-10 font-geist">
            A culinary sanctuary in Sanawad dedicated to handcrafted sweets, single-origin brews, and honest bistro comfort. Elevating every moment through obsessive hospitality.
          </p>

          {/* Action Buttons - Geometric Minimalist Style */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenMenu}
              className="bg-white text-[#121212] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 cursor-pointer hover:bg-[#EAE8E2] transition-all flex items-center justify-between sm:justify-center gap-4 shadow-2xl active:scale-95 group"
            >
              <span>Explore Curated Menu</span>
              <div className="w-6 h-6 bg-[#121212] text-white flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </button>

            <button
              onClick={onOpenReservation}
              className="border border-white/40 text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 cursor-pointer hover:bg-white/10 hover:border-white transition-all flex items-center justify-between sm:justify-center gap-3 backdrop-blur-md active:scale-95"
            >
              <span>Reserve a Table</span>
              <Calendar className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
