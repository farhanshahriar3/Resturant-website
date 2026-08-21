import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NarrativeSection } from './components/NarrativeSection';
import { BentoFacilitiesSection } from './components/BentoFacilitiesSection';
import { LocationHoursSection } from './components/LocationHoursSection';
import { FooterSection } from './components/FooterSection';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { OrderDrawer } from './components/OrderDrawer';
import { ReviewsModal } from './components/ReviewsModal';
import { WiFiModal } from './components/WiFiModal';
import { PrivacyModal } from './components/PrivacyModal';
import { MenuItem, MenuCategoryId, CartItem } from './types';
import { Check } from 'lucide-react';

export default function App() {
  // Modal states
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuInitialCategory, setMenuInitialCategory] = useState<MenuCategoryId>('all');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [isWiFiOpen, setIsWiFiOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check if cafe is currently open
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      // Open between 8 AM (8) and 10 PM (22)
      setIsOpenNow(hour >= 8 && hour < 22);
    };
    checkOpenStatus();
    const timer = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to your order!`);
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Order cleared');
  };

  const handleOpenMenuWithCategory = (category: MenuCategoryId) => {
    setMenuInitialCategory(category);
    setIsMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#EAE8E2] flex items-center justify-center p-0 sm:p-4 md:p-6 selection:bg-[#121212] selection:text-white font-geist">
      {/* Main App Canvas Container */}
      <div className="relative w-full max-w-[1600px] bg-[#F8F7F3] overflow-hidden shadow-2xl border border-[#121212]/10 flex flex-col">
        {/* Navigation Bar */}
        <Navbar
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenMenu={() => {
            setMenuInitialCategory('all');
            setIsMenuOpen(true);
          }}
          onOpenCart={() => setIsCartOpen(true)}
          cartItems={cartItems}
          isOpenNow={isOpenNow}
        />

        {/* HERO SECTION */}
        <HeroSection
          onOpenMenu={() => {
            setMenuInitialCategory('all');
            setIsMenuOpen(true);
          }}
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenReviews={() => setIsReviewsOpen(true)}
        />

        {/* SECTION 1: Narrative & Curated Menu Grid */}
        <NarrativeSection
          onOpenMenuWithCategory={handleOpenMenuWithCategory}
          onOpenFullMenu={() => {
            setMenuInitialCategory('all');
            setIsMenuOpen(true);
          }}
          onAddToCart={handleAddToCart}
        />

        {/* SECTION 2: Bento Facilities (Dark Mode) */}
        <BentoFacilitiesSection
          onOpenWiFiModal={() => setIsWiFiOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* SECTION 3: Location & Operating Hours */}
        <LocationHoursSection isOpenNow={isOpenNow} />

        {/* FOOTER & CTA */}
        <FooterSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </div>

      {/* MODALS & DRAWERS */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        initialCategory={menuInitialCategory}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateCartQuantity={handleUpdateCartQuantity}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <OrderDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOpenMenu={() => setIsMenuOpen(true)}
      />

      <ReviewsModal
        isOpen={isReviewsOpen}
        onClose={() => setIsReviewsOpen(false)}
      />

      <WiFiModal
        isOpen={isWiFiOpen}
        onClose={() => setIsWiFiOpen(false)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#121212] text-white px-5 py-3 shadow-2xl flex items-center gap-2.5 text-xs font-bold font-geist uppercase tracking-wider border border-white/20 animate-fadeIn">
          <div className="w-4 h-4 bg-white text-[#121212] flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
