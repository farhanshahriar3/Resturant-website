import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  User,
  Mail,
  MessageSquare,
  ShieldCheck,
  Printer,
  Loader2
} from 'lucide-react';
import { TableReservation } from '../types';
import { submitToFormspree } from '../utils/formspree';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState<TableReservation>({
    name: '',
    email: '',
    guests: 2,
    date: todayStr,
    time: '19:30',
    seatingArea: 'indoor',
    occasion: 'Casual Dining',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedRef = `MDK-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(generatedRef);

    // Send payload to Formspree endpoint
    await submitToFormspree({
      formType: 'Table Reservation',
      bookingReference: generatedRef,
      guestName: formData.name,
      guestEmail: formData.email,
      tableFor: `${formData.guests} ${formData.guests === 1 ? 'Guest' : 'Guests'}`,
      reservationDate: formData.date,
      reservationTime: formData.time,
      seatingPreference: formData.seatingArea,
      diningOccasion: formData.occasion,
      specialRequests: formData.specialRequests || 'None'
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const guestPresets = [1, 2, 4, 6, 8, 10];
  const timePresets = [
    { label: 'Breakfast', time: '09:00' },
    { label: 'Lunch', time: '13:00' },
    { label: 'Afternoon Tea', time: '16:30' },
    { label: 'Early Dinner', time: '19:30' },
    { label: 'Late Dinner', time: '21:00' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-xl shadow-2xl overflow-hidden border border-[#121212]/20 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#121212]/10 flex items-center justify-between bg-[#EAE8E2] shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#121212]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#121212] font-geist">
                Sanawad Dining Sanctuary
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase font-jakarta text-[#121212] tracking-tight mt-0.5">
              Reserve Your Table
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#F8F7F3] hover:bg-[#121212] hover:text-white border border-[#121212]/15 flex items-center justify-center text-[#121212] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-6 sm:p-8 text-center bg-[#F8F7F3] overflow-y-auto">
            <div className="w-12 h-12 bg-[#121212] text-white flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#121212]/50 font-bold block mb-1">
              Confirmed Booking
            </span>
            <h3 className="text-2xl font-black uppercase font-jakarta text-[#121212] mb-1 tracking-tight">
              Table Reserved!
            </h3>
            <p className="text-xs text-[#121212]/70 font-geist mb-5 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-[#121212]">{formData.name}</span>. Your reservation is confirmed and details have been logged for <span className="font-bold text-[#121212]">{formData.email}</span>.
            </p>

            {/* Booking Details Card */}
            <div className="bg-[#EAE8E2] p-5 text-left border border-[#121212]/15 mb-6 text-xs font-geist space-y-2.5">
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Booking Ref:</span>
                <span className="font-mono font-bold text-[#121212]">#{bookingRef}</span>
              </div>
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Guest Name:</span>
                <span className="font-bold text-[#121212]">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Email Address:</span>
                <span className="font-bold text-[#121212]">{formData.email}</span>
              </div>
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Table For:</span>
                <span className="font-bold text-[#121212]">
                  {formData.guests} {formData.guests === 1 ? 'Guest (Solo Dining)' : formData.guests === 2 ? 'Guests (Couple Table)' : 'Guests'}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Date & Timing:</span>
                <span className="font-bold text-[#121212]">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Seating Area:</span>
                <span className="font-bold text-[#121212] capitalize">
                  {formData.seatingArea === 'indoor' ? 'Indoor AC' : formData.seatingArea === 'patio' ? 'Al Fresco Patio' : 'Private Lounge'}
                </span>
              </div>
              {formData.occasion && (
                <div className="flex justify-between border-b border-[#121212]/10 pb-2">
                  <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Occasion:</span>
                  <span className="font-bold text-[#121212]">{formData.occasion}</span>
                </div>
              )}
              {formData.specialRequests && (
                <div className="flex justify-between">
                  <span className="text-[#121212]/60 uppercase tracking-wider text-[10px]">Notes:</span>
                  <span className="font-medium text-[#121212] max-w-[65%] text-right">{formData.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handlePrint}
                className="py-3 px-5 bg-[#EAE8E2] hover:bg-white text-[#121212] font-bold text-[10px] uppercase tracking-[0.2em] font-geist border border-[#121212]/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Confirmation</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="flex-1 py-3 px-6 bg-[#121212] hover:bg-neutral-800 text-white font-bold text-[10px] uppercase tracking-[0.2em] font-geist shadow-lg cursor-pointer transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 bg-[#F8F7F3] overflow-y-auto">
            {/* Primary Guest Info: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Vikram Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] placeholder:text-[#121212]/40 focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="E.g. vikram@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] placeholder:text-[#121212]/40 focus:outline-none focus:border-[#121212]"
                  />
                </div>
              </div>
            </div>

            {/* Table for How Many (Guests) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist">
                  Table For How Many? *
                </label>
                <span className="text-[10px] font-bold text-[#121212] font-mono">
                  {formData.guests} {formData.guests === 1 ? 'Person' : 'Guests'}
                </span>
              </div>
              <div className="relative mb-2">
                <Users className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full pl-10 pr-3 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] focus:outline-none focus:border-[#121212] appearance-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Person (Solo Dining)' : n === 2 ? 'People (Couple Table)' : `${n} People (Group Dining)`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Guest Count Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[9px] uppercase tracking-wider text-[#121212]/50 font-bold mr-1">
                  Quick Select:
                </span>
                {guestPresets.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setFormData({ ...formData, guests: count })}
                    className={`px-2.5 py-1 text-[10px] font-bold font-geist border transition-all cursor-pointer ${
                      formData.guests === count
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#EAE8E2] text-[#121212]/70 border-[#121212]/15 hover:bg-white'
                    }`}
                  >
                    {count} {count === 1 ? 'Person' : 'Pax'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Timing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Date */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                  Reservation Date *
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] focus:outline-none focus:border-[#121212]"
                  />
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, date: todayStr })}
                    className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border cursor-pointer ${
                      formData.date === todayStr
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-transparent text-[#121212]/60 border-[#121212]/15 hover:bg-white'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, date: tomorrowStr })}
                    className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border cursor-pointer ${
                      formData.date === tomorrowStr
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-transparent text-[#121212]/60 border-[#121212]/15 hover:bg-white'
                    }`}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>

              {/* Timing */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                  Timing / Time Slot *
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] focus:outline-none focus:border-[#121212] appearance-none"
                  >
                    {[
                      '08:30', '09:00', '10:00', '11:30',
                      '12:30', '13:00', '13:30', '14:30',
                      '16:00', '17:00', '18:00', '19:00',
                      '19:30', '20:00', '20:30', '21:00', '21:30'
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t} {Number(t.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {timePresets.map((tp) => (
                    <button
                      key={tp.time}
                      type="button"
                      onClick={() => setFormData({ ...formData, time: tp.time })}
                      className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 border cursor-pointer ${
                        formData.time === tp.time
                          ? 'bg-[#121212] text-white border-[#121212]'
                          : 'bg-transparent text-[#121212]/60 border-[#121212]/15 hover:bg-white'
                      }`}
                    >
                      {tp.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Seating Area Selection */}
            <div className="pt-1">
              <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                Seating Area Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'indoor', label: 'Indoor AC Dining' },
                  { id: 'patio', label: 'Al Fresco Patio' },
                  { id: 'private_lounge', label: 'Private VIP Lounge' }
                ].map((area) => (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                    className={`py-2.5 px-3 text-[10px] uppercase tracking-wider font-bold font-geist border transition-all cursor-pointer text-center ${
                      formData.seatingArea === area.id
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-[#EAE8E2] text-[#121212] border-[#121212]/15 hover:bg-white'
                    }`}
                  >
                    {area.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                Occasion (Optional)
              </label>
              <select
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] focus:outline-none focus:border-[#121212]"
              >
                <option value="Casual Dining">Casual Dining / Coffee & Snacks</option>
                <option value="Birthday Celebration">Birthday Celebration (Cake & Decoration)</option>
                <option value="Anniversary">Anniversary Special Dinner</option>
                <option value="Family Gathering">Family Gathering / Grand Thali Meal</option>
                <option value="Business Meeting">Business Meeting / Work Discussion</option>
              </select>
            </div>

            {/* Special Request */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] font-geist mb-1.5">
                Special Requests & Dietary Preferences
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-[#121212]/40 absolute left-3.5 top-3" />
                <textarea
                  rows={2}
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="E.g. Jain food options, baby highchair needed, sweet gift boxes pre-arranged on table..."
                  className="w-full pl-10 pr-4 py-2 bg-[#EAE8E2] border border-[#121212]/15 text-xs font-geist text-[#121212] placeholder:text-[#121212]/40 focus:outline-none focus:border-[#121212]"
                />
              </div>
            </div>

            {/* Guarantee Note */}
            <div className="flex items-center gap-2 text-[10px] font-geist text-[#121212]/60 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#121212]" />
              <span>Instant table confirmation sent to your email. Zero reservation fee.</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#121212] hover:bg-neutral-800 disabled:opacity-70 text-white font-bold text-[10px] uppercase tracking-[0.2em] font-geist transition-all shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
