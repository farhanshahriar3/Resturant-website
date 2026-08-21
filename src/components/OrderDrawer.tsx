import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Send,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { CartItem } from '../types';
import { submitToFormspree } from '../utils/formspree';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenMenu: () => void;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenMenu
}) => {
  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway' | 'preorder'>('dine_in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableOrPickup, setTableOrPickup] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, curr) => acc + curr.item.price * curr.quantity,
    0
  );
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  const handleSendToWhatsApp = async () => {
    setIsSubmitting(true);

    const itemsSummary = cartItems
      .map((ci) => `${ci.item.name} (Qty: ${ci.quantity}, Price: ₹${ci.item.price * ci.quantity})`)
      .join('; ');

    let orderTypeLabel =
      orderType === 'dine_in'
        ? `Dine-In (Table: ${tableOrPickup || 'Upon arrival'})`
        : orderType === 'takeaway'
        ? `Curbside / Takeaway (Time: ${tableOrPickup || 'ASAP'})`
        : `Pre-Order Box`;

    // Submit order data to Formspree endpoint
    await submitToFormspree({
      formType: 'Online Food Order / Pre-Order',
      customerName: customerName || 'Guest Dining',
      customerPhone: customerPhone || 'Not provided',
      orderType: orderTypeLabel,
      tableOrPickupPreference: tableOrPickup || 'Not specified',
      orderItems: itemsSummary,
      itemsCount: cartItems.reduce((acc, c) => acc + c.quantity, 0),
      subtotalAmount: `₹${subtotal}`,
      gstAmount: `₹${gst}`,
      totalAmount: `₹${total}`,
      specialCookingNotes: orderNotes || 'None'
    });

    setIsSubmitting(false);
    setOrderSubmitted(true);

    let itemsList = cartItems
      .map(
        (ci, i) =>
          `${i + 1}. *${ci.item.name}* x ${ci.quantity} = ₹${ci.item.price * ci.quantity}`
      )
      .join('\n');

    const text = encodeURIComponent(
      `*🌟 NEW ORDER - MODAK-CAFE SANAWAD*\n\n` +
      `👤 *Customer:* ${customerName || 'Guest'}\n` +
      `📞 *Phone:* ${customerPhone || 'Not provided'}\n` +
      `🍽️ *Type:* ${orderTypeLabel}\n\n` +
      `*ORDER ITEMS:*\n${itemsList}\n\n` +
      `💵 *Subtotal:* ₹${subtotal}\n` +
      `🧾 *GST (5%):* ₹${gst}\n` +
      `💰 *Total Amount:* ₹${total}\n\n` +
      `📝 *Notes:* ${orderNotes || 'None'}\n\n` +
      `Please confirm order preparation and payment link/QR.`
    );

    window.open(`https://wa.me/919630284444?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-[#121212]/20 animate-slideLeft">
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#121212]/10 flex items-center justify-between bg-[#EAE8E2]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#121212] text-white flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#121212]/50 font-bold block mb-0.5">
                Current Selection
              </span>
              <h3 className="font-black uppercase font-jakarta text-[#121212] text-sm tracking-tight">
                Order Summary
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#F8F7F3] hover:bg-[#121212] hover:text-white border border-[#121212]/15 flex items-center justify-center text-[#121212] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8F7F3]">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-bold uppercase tracking-tight font-jakarta text-[#121212]">
                Your order is currently empty
              </h4>
              <p className="text-xs text-[#121212]/60 font-geist mt-1 max-w-xs">
                Explore our handcrafted sweets, hot beverages, and bistro specialties.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenMenu();
                }}
                className="mt-6 px-6 py-3 bg-[#121212] text-white text-[10px] uppercase tracking-[0.2em] font-bold font-geist shadow-md active:scale-95 transition-all cursor-pointer"
              >
                Browse Menu Now
              </button>
            </div>
          ) : (
            <>
              {/* Order Type Toggle */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dine_in', label: 'Dine-In' },
                    { id: 'takeaway', label: 'Takeaway' },
                    { id: 'preorder', label: 'Sweet Box' }
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setOrderType(type.id as any)}
                      className={`py-2 px-2 text-[10px] uppercase tracking-wider font-bold font-geist border transition-all cursor-pointer ${
                        orderType === type.id
                          ? 'bg-[#121212] text-white border-[#121212]'
                          : 'bg-[#EAE8E2] text-[#121212]/70 border-[#121212]/15 hover:bg-white'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold font-geist text-[#121212] uppercase tracking-[0.15em]">
                    Selected Items ({cartItems.reduce((a, b) => a + b.quantity, 0)})
                  </span>
                  <button
                    onClick={onClearCart}
                    className="text-[10px] text-red-600 hover:underline uppercase font-bold tracking-wider flex items-center gap-1 font-geist cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear all
                  </button>
                </div>

                {cartItems.map((ci) => (
                  <div
                    key={ci.item.id}
                    className="flex items-center justify-between p-3 bg-[#EAE8E2] border border-[#121212]/10"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={ci.item.image}
                        alt={ci.item.name}
                        className="w-12 h-12 object-cover border border-[#121212]/15 shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="text-xs font-bold uppercase tracking-tight font-jakarta text-[#121212] truncate">
                          {ci.item.name}
                        </h5>
                        <span className="text-[10px] text-[#121212]/50 font-geist block">
                          ₹{ci.item.price} each
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-2">
                      <div className="flex items-center gap-1.5 bg-[#121212] text-white px-1.5 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(ci.item.id, -1)}
                          className="w-4 h-4 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">
                          {ci.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(ci.item.id, 1)}
                          className="w-4 h-4 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <span className="text-xs font-black font-geist text-[#121212] min-w-[45px] text-right">
                        ₹{ci.item.price * ci.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold font-geist text-[#121212] uppercase tracking-[0.15em] block">
                  Quick Details
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone No."
                    className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                  />
                </div>

                <input
                  type="text"
                  value={tableOrPickup}
                  onChange={(e) => setTableOrPickup(e.target.value)}
                  placeholder={
                    orderType === 'dine_in'
                      ? 'Table number (if seated)'
                      : 'Pickup time preference'
                  }
                  className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                />

                <textarea
                  rows={2}
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special cooking notes (e.g. less spicy, extra ketchup, gift box wrap)..."
                  className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                />
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Pricing & WhatsApp Button */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-[#121212]/10 bg-[#EAE8E2] space-y-4">
            <div className="space-y-1.5 text-xs font-geist">
              <div className="flex justify-between text-[#121212]/60">
                <span className="uppercase tracking-wider text-[10px]">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#121212]/60">
                <span className="uppercase tracking-wider text-[10px]">GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#121212] pt-2 border-t border-[#121212]/10 uppercase tracking-tight">
                <span>Total Payable</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleSendToWhatsApp}
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#121212] hover:bg-neutral-800 disabled:opacity-70 text-white font-bold text-[10px] uppercase tracking-[0.2em] font-geist transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Logging Order & Opening WhatsApp...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Order to WhatsApp</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
