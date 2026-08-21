import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  Sparkles,
  Utensils,
  Heart,
  ChefHat,
  Coffee,
  Flame,
  Leaf,
  Clock,
  Star,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  Filter
} from 'lucide-react';
import { MenuItem, MenuCategoryId, CartItem } from '../types';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: MenuCategoryId;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateCartQuantity: (itemId: string, delta: number) => void;
  onOpenCart: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'all',
  cartItems,
  onAddToCart,
  onUpdateCartQuantity,
  onOpenCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'vegan' | 'special'>('all');

  // Keep category in sync if changed by caller
  React.useEffect(() => {
    if (isOpen && initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [isOpen, initialCategory]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter
      if (dietaryFilter === 'vegan' && !item.isVegan) {
        return false;
      }
      if (dietaryFilter === 'special' && !item.isSpecial) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesHindi = item.hindiName?.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesHindi && !matchesDesc && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const getItemQuantity = (itemId: string) => {
    const found = cartItems.find((ci) => ci.item.id === itemId);
    return found ? found.quantity : 0;
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  if (!isOpen) return null;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'breakfast':
        return <Utensils className="w-4 h-4" />;
      case 'sweets':
        return <Heart className="w-4 h-4" />;
      case 'bistro':
        return <ChefHat className="w-4 h-4" />;
      case 'beverages':
        return <Coffee className="w-4 h-4" />;
      case 'specials':
        return <Flame className="w-4 h-4" />;
      case 'vegan':
        return <Leaf className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-5xl h-[92vh] shadow-2xl flex flex-col overflow-hidden border border-[#121212]/20">
        {/* Modal Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#121212]/10 flex items-center justify-between bg-[#EAE8E2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#121212]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#121212] font-geist">
                Modak-Cafe &bull; Complete Culinary Collection
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase font-jakarta text-[#121212] tracking-tight mt-1">
              Explore Our Menu
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#F8F7F3] hover:bg-[#121212] hover:text-white border border-[#121212]/15 flex items-center justify-center text-[#121212] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Dietary Filters Bar */}
        <div className="px-6 sm:px-8 py-4 bg-[#F8F7F3] border-b border-[#121212]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sweets, pizzas, filter coffee, thali..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-none bg-[#EAE8E2] border border-[#121212]/15 focus:outline-none focus:border-[#121212] font-geist text-[#121212]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#121212]/50 hover:text-[#121212] text-[10px] uppercase font-bold tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#121212]/50 font-bold font-geist mr-1 hidden md:inline">Dietary:</span>
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'special', label: 'Chef Specials' },
              { id: 'vegan', label: '100% Vegan' }
            ].map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietaryFilter(diet.id as any)}
                className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-bold font-geist whitespace-nowrap transition-all cursor-pointer border ${
                  dietaryFilter === diet.id
                    ? 'bg-[#121212] text-white border-[#121212] shadow-xs'
                    : 'bg-[#EAE8E2] text-[#121212]/70 border-[#121212]/15 hover:bg-white hover:text-[#121212]'
                }`}
              >
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 sm:px-8 py-3 bg-[#EAE8E2] border-b border-[#121212]/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {MENU_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as MenuCategoryId)}
                className={`flex items-center gap-2 px-3.5 py-2 text-[10px] uppercase tracking-[0.15em] font-bold font-geist whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'bg-[#F8F7F3] text-[#121212] hover:bg-white border-[#121212]/15'
                }`}
              >
                {getCategoryIcon(cat.id)}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F8F7F3]">
          {filteredItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <Filter className="w-8 h-8 text-[#121212]/30 mb-3" />
              <h4 className="text-[#121212] font-jakarta font-bold uppercase tracking-tight">No culinary creations found</h4>
              <p className="text-[#121212]/50 text-xs mt-1 font-geist max-w-xs">
                Try searching for another dish or clearing your filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setDietaryFilter('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#121212] text-white text-[10px] uppercase tracking-[0.2em] font-bold"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <div
                    key={item.id}
                    className="bg-[#EAE8E2] p-5 border border-[#121212]/10 shadow-sm hover:border-[#121212]/30 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 sm:w-24 sm:h-24 object-cover border border-[#121212]/15"
                        />
                        {item.isSpecial && (
                          <span className="absolute -top-1.5 -left-1.5 bg-[#121212] text-white text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 border border-white/20">
                            Signature
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              {/* Veg / Vegan indicator */}
                              <span className="w-2.5 h-2.5 border border-[#121212] flex items-center justify-center p-0.5">
                                <span className="w-1 h-1 bg-[#121212]"></span>
                              </span>
                              <h4 className="font-bold font-jakarta text-[#121212] uppercase tracking-tight text-sm sm:text-base leading-snug">
                                {item.name}
                              </h4>
                            </div>
                            {item.hindiName && (
                              <span className="text-[10px] text-[#121212]/50 font-medium block mt-0.5 font-geist">
                                {item.hindiName}
                              </span>
                            )}
                          </div>
                          <span className="text-base font-black font-geist text-[#121212] shrink-0 ml-1">
                            ₹{item.price}
                          </span>
                        </div>

                        <p className="text-xs text-[#121212]/70 font-geist mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>

                        <div className="flex items-center gap-3 mt-2 text-[10px] uppercase tracking-wider text-[#121212]/50 font-geist font-bold">
                          {item.preparationTime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.preparationTime}
                            </span>
                          )}
                          {item.rating && (
                            <span className="flex items-center gap-1 text-[#121212] font-bold">
                              <Star className="w-3 h-3 fill-[#121212]" />
                              {item.rating} ({item.reviewCount})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-4 pt-3 border-t border-[#121212]/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {item.tags?.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="bg-[#F8F7F3] text-[#121212] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border border-[#121212]/10 font-geist"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {qty > 0 ? (
                        <div className="flex items-center gap-2 bg-[#121212] text-white px-2 py-1">
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, -1)}
                            className="w-5 h-5 bg-white/20 text-white hover:bg-white hover:text-[#121212] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.id, 1)}
                            className="w-5 h-5 bg-white/20 text-white hover:bg-white hover:text-[#121212] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onAddToCart(item)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#121212] hover:bg-white hover:text-[#121212] text-white text-[10px] uppercase tracking-[0.15em] font-bold font-geist transition-all border border-[#121212] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Order Strip (if cart has items) */}
        {totalCartCount > 0 && (
          <div className="px-6 sm:px-8 py-4 bg-[#121212] text-white border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] text-white/50 font-geist uppercase tracking-wider block">
                  {totalCartCount} item{totalCartCount > 1 ? 's' : ''} in order
                </span>
                <span className="text-base font-bold font-jakarta text-white uppercase tracking-tight">
                  Total: ₹{totalCartAmount}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="px-6 py-3 bg-white text-[#121212] hover:bg-[#EAE8E2] text-[10px] uppercase tracking-[0.2em] font-bold font-geist transition-all cursor-pointer flex items-center gap-2"
            >
              <span>View Order & WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
