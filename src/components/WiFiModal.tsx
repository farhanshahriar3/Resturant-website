import React, { useState } from 'react';
import { X, Wifi, Copy, Check, ShieldCheck, Zap } from 'lucide-react';

interface WiFiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WiFiModal: React.FC<WiFiModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const password = 'GoodFoodGoodLife';

  if (!isOpen) return null;

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#121212] text-white w-full max-w-md p-6 sm:p-8 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="w-10 h-10 bg-white text-[#121212] flex items-center justify-center">
            <Wifi className="w-5 h-5" />
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-400 font-bold font-geist block mb-1">
          High Speed Connectivity
        </span>
        <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-jakarta mb-1 text-white">
          Complimentary Wi-Fi
        </h3>
        <p className="text-xs text-neutral-400 font-geist mb-6 leading-relaxed">
          Enjoy ultra-fast 300 Mbps fiber internet during your dining visit at Modak-Cafe.
        </p>

        <div className="bg-neutral-900 p-5 border border-white/15 space-y-3 font-geist text-xs">
          <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
            <span className="text-neutral-400 text-[10px] uppercase tracking-wider">Network (SSID):</span>
            <span className="font-bold text-white tracking-wide">Modak_Cafe_Guest_5G</span>
          </div>

          <div className="flex justify-between items-center pt-1">
            <div>
              <span className="text-neutral-400 block text-[9px] uppercase tracking-wider mb-0.5">Wi-Fi Password:</span>
              <span className="font-mono font-bold text-white text-sm tracking-wider">
                {password}
              </span>
            </div>
            <button
              onClick={handleCopyPassword}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#121212] hover:bg-neutral-200 text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-wider text-neutral-400 font-geist">
          <div className="flex items-center gap-1 text-white">
            <Zap className="w-3.5 h-3.5" />
            <span>300 Mbps Fiber</span>
          </div>
          <span>&bull;</span>
          <div className="flex items-center gap-1 text-neutral-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted Guest Network</span>
          </div>
        </div>
      </div>
    </div>
  );
};
