import React, { useState } from 'react';
import {
  ChefHat,
  Coffee,
  ArrowRight,
  Utensils,
  Heart,
  CupSoda,
  Flame,
  Leaf,
  Plus,
  Check,
  Sparkles
} from 'lucide-react';
import { MenuCategoryId, MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface NarrativeSectionProps {
  onOpenMenuWithCategory: (categoryId: MenuCategoryId) => void;
  onOpenFullMenu: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const NarrativeSection: React.FC<NarrativeSectionProps> = ({
  onOpenMenuWithCategory,
  onOpenFullMenu,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('sweets');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const categories: { id: MenuCategoryId; label: string; icon: React.ReactNode }[] = [
    { id: 'breakfast', label: 'Breakfast', icon: <Utensils className="w-5 h-5" /> },
    { id: 'sweets', label: 'Sweets', icon: <Heart className="w-5 h-5" /> },
    { id: 'bistro', label: 'Bistro', icon: <ChefHat className="w-5 h-5" /> },
    { id: 'beverages', label: 'Beverages', icon: <CupSoda className="w-5 h-5" /> },
    { id: 'specials', label: 'Specials', icon: <Flame className="w-5 h-5" /> },
    { id: 'vegan', label: 'Vegan', icon: <Leaf className="w-5 h-5" /> }
  ];

  // Get items for the selected category preview
  const previewItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory
  ).slice(0, 3);

  const handleAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item);
    setAddedItemId(item.id);
    setTimeout(() => setAddedItemId(null), 1500);
  };

  return (
    <section className="bg-[#F8F7F3] w-full px-6 sm:px-8 md:px-20 py-20 md:py-32 border-b border-[#121212]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-12 lg:gap-20">
        {/* Narrative Column */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] bg-[#121212] text-white px-2.5 py-1">
                Since 2022
              </span>
              <span className="w-10 h-[1px] bg-[#121212]/20"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#121212]/40">Sanawad, MP</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-[#121212] font-jakarta mb-6">
              Where every bite
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px #121212' }}>
                tells a story.
              </span>
            </h2>

            <p className="text-[#121212]/70 font-geist leading-relaxed text-sm sm:text-base mb-8 font-normal">
              Modak-Cafe n Restaurant is Sanawad&apos;s sanctuary for flavor
              enthusiasts. We blend the warmth of traditional hospitality with
              the sleekness of modern cafe culture, guided by our motto: Good
              Food...Good Life.
            </p>

            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-5 bg-[#EAE8E2] border border-[#121212]/10 shadow-sm transition-all hover:border-[#121212]/30">
                <div className="w-10 h-10 bg-[#121212] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] font-jakarta text-[#121212]">
                    Handcrafted Sweets
                  </h4>
                  <p className="text-xs text-[#121212]/60 font-geist mt-1 leading-relaxed">
                    Signature Modaks made fresh daily with premium Kashmiri saffron,
                    crunchy nuts, and pure mawa.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-5 bg-[#EAE8E2] border border-[#121212]/10 shadow-sm transition-all hover:border-[#121212]/30">
                <div className="w-10 h-10 bg-[#121212] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.15em] font-jakarta text-[#121212]">
                    Artisan Coffee & Chai
                  </h4>
                  <p className="text-xs text-[#121212]/60 font-geist mt-1 leading-relaxed">
                    Single-origin beans roasted to perfection, artisan lattes,
                    and fragrant earthen Kulhad Chai.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Menu Grid */}
        <div className="lg:col-span-7">
          <div className="bg-[#EAE8E2] border border-[#121212]/10 h-full relative overflow-hidden p-6 sm:p-10 md:p-12 shadow-xl">
            {/* Subtle Abstract Geometry */}
            <div className="w-72 h-72 bg-[#D1CFC7] rounded-full absolute -top-24 -right-24 opacity-40 pointer-events-none"></div>

            <div className="relative z-10 flex flex-wrap justify-between items-end gap-3 mb-8">
              <div>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#121212]/50 font-geist block mb-1">
                  Taste The Craft
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase font-jakarta tracking-tighter text-[#121212]">
                  Curated Menu
                </h3>
              </div>
              <button
                onClick={onOpenFullMenu}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#121212] border-b border-[#121212] pb-0.5 hover:opacity-60 transition-opacity font-geist flex items-center gap-2 cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 6 Category Selection Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-8">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group p-4 sm:p-5 border transition-all text-center flex flex-col items-center justify-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#121212] text-white border-[#121212] shadow-lg'
                        : 'bg-[#F8F7F3] text-[#121212] border-[#121212]/15 hover:border-[#121212]/40'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-white/10 text-white'
                          : 'bg-[#EAE8E2] text-[#121212] group-hover:bg-[#121212] group-hover:text-white'
                      }`}
                    >
                      {cat.icon}
                    </div>
                    <span
                      className={`font-bold font-geist text-[10px] sm:text-xs uppercase tracking-[0.15em] ${
                        isSelected ? 'text-white' : 'text-[#121212]'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Category Highlights Preview */}
            <div className="relative z-10 bg-[#F8F7F3] p-5 sm:p-6 border border-[#121212]/15 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#121212]/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#121212]" />
                  <span className="text-[10px] font-bold text-[#121212] uppercase tracking-[0.2em] font-geist">
                    Popular in {selectedCategory}
                  </span>
                </div>
                <button
                  onClick={() => onOpenMenuWithCategory(selectedCategory)}
                  className="text-[10px] font-bold text-[#121212]/70 uppercase tracking-[0.15em] hover:text-[#121212] flex items-center gap-1 cursor-pointer"
                >
                  See all ({MENU_ITEMS.filter((i) => i.category === selectedCategory).length})
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3">
                {previewItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenMenuWithCategory(item.category)}
                    className="flex items-center justify-between p-3 bg-white/70 hover:bg-white transition-colors border border-[#121212]/5 hover:border-[#121212]/20 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover shrink-0 border border-[#121212]/10"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs sm:text-sm font-bold font-jakarta text-[#121212] truncate">
                            {item.name}
                          </h5>
                          {item.isSpecial && (
                            <span className="shrink-0 bg-[#121212] text-white text-[8px] font-bold px-1.5 py-0.5 uppercase tracking-widest">
                              Special
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#121212]/60 truncate max-w-[200px] sm:max-w-xs font-geist">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <span className="text-xs sm:text-sm font-bold font-geist text-[#121212]">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={(e) => handleAdd(item, e)}
                        className={`p-2 transition-all cursor-pointer ${
                          addedItemId === item.id
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#121212] hover:bg-neutral-800 text-white'
                        }`}
                        title="Add to order"
                      >
                        {addedItemId === item.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Plus className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
