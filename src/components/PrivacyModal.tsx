import React from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-[#121212]/20">
        <div className="flex items-center justify-between mb-5 border-b border-[#121212]/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#121212]"></span>
            <div>
              <span className="text-[8px] uppercase tracking-[0.25em] text-[#121212]/50 font-bold block">
                Policies & Standards
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight font-jakarta text-[#121212]">
                Kitchen & Privacy Policies
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#EAE8E2] hover:bg-[#121212] hover:text-white text-[#121212] flex items-center justify-center transition-colors cursor-pointer border border-[#121212]/15"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs font-geist text-[#121212]/75 max-h-[60vh] overflow-y-auto pr-1">
          <div className="p-4 bg-[#EAE8E2] border border-[#121212]/15">
            <h4 className="font-bold font-jakarta uppercase tracking-tight text-[#121212] text-xs mb-1">
              100% Pure Vegetarian & Fresh Ingredients
            </h4>
            <p className="leading-relaxed text-[#121212]/70 text-[11px]">
              Our kitchen strictly adheres to authentic vegetarian preparation protocols. Sweets are prepared daily using pure dairy mawa, ghee, and natural sweeteners.
            </p>
          </div>

          <div className="p-4 bg-[#EAE8E2] border border-[#121212]/15">
            <h4 className="font-bold font-jakarta uppercase tracking-tight text-[#121212] text-xs mb-1">
              Data & Reservation Security
            </h4>
            <p className="leading-relaxed text-[#121212]/70 text-[11px]">
              We respect your privacy. Contact details provided for table bookings or WhatsApp orders are strictly used for dining communications and never shared with third parties.
            </p>
          </div>

          <div className="p-4 bg-[#EAE8E2] border border-[#121212]/15">
            <h4 className="font-bold font-jakarta uppercase tracking-tight text-[#121212] text-xs mb-1">
              Special Occasion & Group Bookings
            </h4>
            <p className="leading-relaxed text-[#121212]/70 text-[11px]">
              For custom catering, sweet gift boxes for festivals, or private birthday arrangements, please reach out via phone or WhatsApp at least 24 hours in advance.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#121212]/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#121212] hover:bg-neutral-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold font-geist cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
