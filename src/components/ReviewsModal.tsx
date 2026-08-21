import React, { useState } from 'react';
import { X, Star, CheckCircle2, MessageSquarePlus, User, ThumbsUp, Loader2 } from 'lucide-react';
import { ReviewItem } from '../types';
import { REVIEWS_DATA } from '../data/reviewsData';
import { submitToFormspree } from '../utils/formspree';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [showAddForm, setShowAddForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [favoriteDish, setFavoriteDish] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    setIsSubmitting(true);

    await submitToFormspree({
      formType: 'Dining Review & Rating',
      reviewerName: author,
      reviewerCity: city || 'Sanawad',
      ratingScore: `${rating} / 5 Stars`,
      favoriteDish: favoriteDish || 'Signature Modak',
      customerReview: comment
    });

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author,
      city: city || 'Sanawad',
      rating,
      date: 'Just now',
      comment,
      favoriteDish: favoriteDish || 'Signature Modak',
      verifiedVisit: true
    };

    setReviews([newRev, ...reviews]);
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setShowAddForm(false);
      setSubmitted(false);
      setAuthor('');
      setCity('');
      setComment('');
      setFavoriteDish('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F8F7F3] w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden border border-[#121212]/20">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-[#121212]/10 flex items-center justify-between bg-[#EAE8E2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#121212]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#121212] font-geist">
                Customer Feedback
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase font-jakarta text-[#121212] tracking-tight mt-1">
              Verified Dining Reviews
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#F8F7F3] hover:bg-[#121212] hover:text-white border border-[#121212]/15 flex items-center justify-center text-[#121212] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Summary Header */}
        <div className="p-6 sm:p-8 bg-[#121212] text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#121212]">
          <div className="flex items-center gap-4">
            <div className="text-center sm:text-left">
              <span className="text-4xl sm:text-5xl font-black font-jakarta text-white tracking-tight">
                4.9
              </span>
              <div className="flex items-center gap-1 mt-1 justify-center sm:justify-start">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-white fill-white" />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-geist mt-1.5 block">
                Based on 840+ verified guests
              </span>
            </div>
          </div>

          <div className="flex-1 w-full sm:max-w-xs space-y-2 text-xs font-geist">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-12 text-[10px] uppercase tracking-wider">5 Star</span>
              <div className="flex-1 h-1.5 bg-neutral-800 overflow-hidden">
                <div className="h-full bg-white w-[94%]"></div>
              </div>
              <span className="text-neutral-300 w-8 text-right font-mono text-[10px]">94%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-12 text-[10px] uppercase tracking-wider">4 Star</span>
              <div className="flex-1 h-1.5 bg-neutral-800 overflow-hidden">
                <div className="h-full bg-white w-[5%]"></div>
              </div>
              <span className="text-neutral-300 w-8 text-right font-mono text-[10px]">5%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400 w-12 text-[10px] uppercase tracking-wider">3 Star</span>
              <div className="flex-1 h-1.5 bg-neutral-800 overflow-hidden">
                <div className="h-full bg-white w-[1%]"></div>
              </div>
              <span className="text-neutral-300 w-8 text-right font-mono text-[10px]">1%</span>
            </div>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 bg-white text-[#121212] hover:bg-[#EAE8E2] text-[10px] font-bold uppercase tracking-[0.2em] font-geist transition-all shrink-0 cursor-pointer shadow-sm"
          >
            {showAddForm ? 'View Reviews' : 'Write a Review'}
          </button>
        </div>

        {/* Reviews List or Add Form */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F8F7F3]">
          {showAddForm ? (
            <form onSubmit={handleAddReview} className="space-y-4">
              <h3 className="font-black uppercase font-jakarta text-base text-[#121212] tracking-tight">
                Share Your Dining Experience
              </h3>

              {submitted ? (
                <div className="p-6 bg-[#EAE8E2] border border-[#121212]/20 text-center">
                  <CheckCircle2 className="w-8 h-8 text-[#121212] mx-auto mb-2" />
                  <h4 className="font-bold uppercase tracking-tight font-jakarta text-[#121212]">Thank you for your review!</h4>
                  <p className="text-xs text-[#121212]/70 mt-1 font-geist">Your feedback helps us maintain our quality.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="E.g. Rohit Patil"
                        className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] mb-1">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="E.g. Sanawad / Indore"
                        className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] mb-1">
                      Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="p-1 cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              s <= rating
                                ? 'text-[#121212] fill-[#121212]'
                                : 'text-[#121212]/20'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-[#121212] ml-2 font-geist">
                        {rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] mb-1">
                      Favorite Dish Ordered
                    </label>
                    <input
                      type="text"
                      value={favoriteDish}
                      onChange={(e) => setFavoriteDish(e.target.value)}
                      placeholder="E.g. Shahi Modak, Filter Coffee, Grand Thali..."
                      className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.15em] font-bold text-[#121212] mb-1">
                      Your Comments *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what you loved about the food, ambiance, or service..."
                      className="w-full px-3 py-2 text-xs bg-[#EAE8E2] border border-[#121212]/15 text-[#121212] font-geist focus:outline-none focus:border-[#121212]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="px-4 py-2 bg-[#EAE8E2] text-[#121212] text-[10px] uppercase tracking-wider font-bold border border-[#121212]/15 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2 bg-[#121212] hover:bg-neutral-800 disabled:opacity-70 text-white text-[10px] uppercase tracking-[0.2em] font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-[#EAE8E2] border border-[#121212]/15"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold font-jakarta text-[#121212] text-sm uppercase tracking-tight">
                          {rev.author}
                        </h4>
                        <span className="text-xs text-[#121212]/40 font-geist">&bull;</span>
                        <span className="text-xs text-[#121212]/60 font-geist">{rev.city}</span>
                        {rev.verifiedVisit && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#121212] font-bold bg-[#F8F7F3] px-2 py-0.5 border border-[#121212]/20">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            Verified Guest
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              s <= rev.rating
                                ? 'text-[#121212] fill-[#121212]'
                                : 'text-[#121212]/20'
                            }`}
                          />
                        ))}
                        <span className="text-[10px] text-[#121212]/50 font-geist ml-2 uppercase">
                          {rev.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#121212]/80 font-geist mt-3 leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  {rev.favoriteDish && (
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F7F3] text-[#121212] text-[10px] font-bold uppercase tracking-wider font-geist border border-[#121212]/15">
                      <ThumbsUp className="w-3 h-3 text-[#121212]" />
                      <span>Recommended: {rev.favoriteDish}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
