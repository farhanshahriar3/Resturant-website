import React from 'react';
import { ChefHat, Clock, ShoppingBag, Calendar, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenCart: () => void;
  cartItems: CartItem[];
  isOpenNow: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenCart,
  cartItems,
  isOpenNow
}) => {
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 py-6 md:py-8 flex justify-between items-center px-6 md:px-16 transition-all duration-300">
      {/* Brand Logo - Artistic Monolith Style */}
      <a href="#" className="flex items-center gap-3.5 group cursor-pointer">
        <div className="w-10 h-10 md:w-11 md:h-11 bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#121212] transition-all duration-300 shadow-xl">
          <ChefHat className="w-5 h-5 md:w-5 md:h-5" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-white font-jakarta font-black text-lg md:text-xl tracking-tighter uppercase leading-tight drop-shadow-sm">
            MODAK-CAFE
          </span>
          <div className="flex items-center gap-2">
            <span className="text-white/70 font-geist text-[9px] font-bold tracking-[0.25em] uppercase">
              n Restaurant
            </span>
            <span className="w-4 h-[1px] bg-white/30"></span>
            <span className="text-white/50 text-[8px] font-bold tracking-[0.2em] uppercase">EST. 2022</span>
          </div>
        </div>
      </a>

      {/* Navigation Links & Badges */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Status Badge */}
        <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 border border-white/15 text-neutral-200 bg-black/40 backdrop-blur-md text-[10px] uppercase font-bold tracking-[0.2em] font-geist">
          <span className={`w-2 h-2 ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
          <Clock className="w-3 h-3 text-neutral-300" />
          <span>{isOpenNow ? 'Open Till 10 PM' : 'Opens 8 AM'}</span>
        </div>

        {/* Quick Menu Button */}
        <button
          onClick={onOpenMenu}
          className="hidden md:flex items-center gap-2 px-4 py-2 text-white/90 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-orange-300" />
          <span>Menu</span>
        </button>

        {/* Cart Trigger */}
        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
          title="View Order"
        >
          <ShoppingBag className="w-3.5 h-3.5 text-white" />
          {totalCartCount > 0 && (
            <span className="bg-white text-[#121212] text-[9px] font-black px-1.5 py-0.2 min-w-[16px] text-center">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* Reserve Table Button */}
        <button
          onClick={onOpenReservation}
          className="flex items-center gap-2 px-5 py-2 bg-white text-[#121212] hover:bg-[#EAE8E2] text-[10px] uppercase tracking-[0.2em] font-bold font-geist shadow-xl transition-all active:scale-95 cursor-pointer"
        >
          <Calendar className="w-3 h-3 text-[#121212]" />
          <span className="hidden sm:inline">Reserve Table</span>
          <span className="sm:hidden">Book</span>
        </button>
      </div>
    </nav>
  );
};
