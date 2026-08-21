import React, { useState } from 'react';
import {
  PhoneCall,
  MessageCircle,
  CreditCard,
  Wallet,
  Smartphone,
  Check,
  Heart,
  Instagram,
  ShieldCheck,
  Mail,
  Loader2,
  Sparkles
} from 'lucide-react';
import { submitToFormspree } from '../utils/formspree';

interface FooterSectionProps {
  onOpenReservation: () => void;
  onOpenPrivacy: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenReservation,
  onOpenPrivacy
}) => {
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNews, setIsSubmittingNews] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const phoneNumber = '+91 96302 84444';

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+919630284444');
    setPhoneCopied(true);
    setTimeout(() => setPhoneCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Namaste Modak-Cafe team! I would like to inquire about table booking / sweet boxes.'
    );
    window.open(`https://wa.me/919630284444?text=${text}`, '_blank');
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubmittingNews(true);
    await submitToFormspree({
      formType: 'VIP Dining Circle & Newsletter',
      subscriberEmail: newsletterEmail
    });

    setIsSubmittingNews(false);
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 4000);
  };

  return (
    <section className="bg-[#F8F7F3] w-full px-6 sm:px-8 md:px-20 py-20 md:py-32">
      {/* Dark CTA Banner - Artistic Monolith Card */}
      <div className="bg-[#121212] p-8 sm:p-14 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10">
        {/* Grain Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] bg-white text-[#121212] px-2.5 py-1">
              Sanawad Signature
            </span>
            <span className="w-10 h-[1px] bg-white/20"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-jakarta text-white uppercase mb-4 sm:mb-6 tracking-tighter leading-[0.95]">
            Craving something <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.85)' }}>
              sweet & sublime?
            </span>
          </h2>

          <p className="text-white/70 text-sm sm:text-base font-geist mb-8 sm:mb-10 font-light max-w-xl mx-auto leading-relaxed">
            Reserve a quiet table for the weekend or order our handcrafted signature Modak gift boxes for your next celebration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Phone Call / Copy Button */}
            <button
              onClick={handleCopyPhone}
              className="w-full sm:w-auto bg-white text-[#121212] px-8 py-4 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] font-geist hover:bg-[#EAE8E2] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-95 cursor-pointer"
              title="Click to copy or call"
            >
              {phoneCopied ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <PhoneCall className="w-4 h-4 text-[#121212]" />
              )}
              <span>{phoneCopied ? 'Number Copied!' : phoneNumber}</span>
            </button>

            {/* WhatsApp Chat Button */}
            <button
              onClick={handleWhatsApp}
              className="w-full sm:w-auto bg-transparent text-white px-8 py-4 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] font-geist hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/30 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Formspree VIP Tasting & Updates Form */}
          <div className="max-w-md mx-auto pt-6 border-t border-white/10">
            <span className="text-[9px] uppercase tracking-[0.25em] text-white/50 font-bold block mb-2">
              Join Modak VIP Tasting Circle
            </span>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email for festival specials..."
                  className="w-full pl-10 pr-3 py-3 bg-white/5 border border-white/20 text-white placeholder:text-white/40 text-xs font-geist focus:outline-none focus:border-white focus:bg-white/10"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingNews}
                className="px-6 py-3 bg-white text-[#121212] hover:bg-neutral-200 disabled:opacity-70 font-bold text-[10px] uppercase tracking-[0.2em] font-geist flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                {isSubmittingNews ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : newsletterSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </form>
            {newsletterSuccess && (
              <p className="text-[11px] text-white/80 font-geist mt-2 animate-fadeIn">
                Thank you for subscribing! Your email has been added to our VIP circle.
              </p>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-white/50 text-[10px] font-geist uppercase tracking-[0.2em]">
          <span className="font-bold flex items-center gap-2 text-white/70">
            <ShieldCheck className="w-4 h-4 text-white" />
            Verified Payment Options
          </span>
          <div className="flex items-center gap-6 text-white/60">
            <div className="flex items-center gap-1.5" title="Cards Accepted">
              <CreditCard className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">Cards</span>
            </div>
            <div className="flex items-center gap-1.5" title="Wallets Accepted">
              <Wallet className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">Wallets</span>
            </div>
            <div className="flex items-center gap-1.5" title="UPI Apps Accepted">
              <Smartphone className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold">UPI / GPay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Footer Grid */}
      <footer className="mt-16 pt-8 border-t border-[#121212]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="flex flex-wrap gap-12 sm:gap-16">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.25em] opacity-40 font-bold mb-1 text-[#121212]">
              Location
            </span>
            <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">
              Sanawad, MP 451111
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.25em] opacity-40 font-bold mb-1 text-[#121212]">
              Direct Contact
            </span>
            <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">
              +91 96302 84444
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-[0.25em] opacity-40 font-bold mb-1 text-[#121212]">
              Established
            </span>
            <span className="text-xs font-bold text-[#121212] uppercase tracking-wider">
              May 3, 2022
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-[#121212]">
          <button
            onClick={onOpenPrivacy}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            Privacy
          </button>
          <button
            onClick={onOpenReservation}
            className="hover:opacity-50 transition-opacity cursor-pointer"
          >
            Reservations
          </button>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50 transition-opacity flex items-center gap-1.5 cursor-pointer"
          >
            <Instagram className="w-3.5 h-3.5" />
            Instagram
          </a>
        </div>
      </footer>
    </section>
  );
};
