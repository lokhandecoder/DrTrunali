import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  Clock, 
  X,
  Smile
} from 'lucide-react';
import { ThemeConfig } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName?: string;
  theme: ThemeConfig;
  fontStyleClass?: string;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({ 
  isOpen,
  onClose, 
  friendName,
  theme,
  fontStyleClass,
}) => {
  const isDark = theme.id === 'midnight-starlight';

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`Date with ${friendName || 'Dr Trunali'} 🌹✨`);
    const details = encodeURIComponent(
      `Congrats! 🎉\nThanks for accepting my date, get ready for our date! 🌹✨\nReserved for ${friendName || 'Dr Trunali'} in the first week of September.`
    );
    const location = encodeURIComponent('A Beautiful Romantic Spot ✨');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260905T180000Z/20260905T220000Z&details=${details}&location=${location}`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        {/* Backdrop overlay */}
        <Dialog.Overlay 
          className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        />
        
        {/* Dialog card */}
        <Dialog.Content 
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[92vw] max-w-md flex flex-col rounded-3xl sm:rounded-4xl shadow-2xl border overflow-hidden outline-none duration-200 animate-in fade-in zoom-in-95 ${
            isDark 
              ? 'bg-slate-900 border-purple-500/50 text-slate-100' 
              : 'bg-white border-rose-200 text-stone-800'
          }`}
          aria-describedby="date-dialog-description"
        >
          {/* Accessible Title & Description for Screen Readers */}
          <Dialog.Title className="sr-only">
            Date Acceptance Confirmation
          </Dialog.Title>
          <Dialog.Description id="date-dialog-description" className="sr-only">
            Congratulatory details for the first week of September date.
          </Dialog.Description>

          {/* Top Header Banner */}
          <div className={`relative shrink-0 px-6 pt-8 pb-7 text-center text-white select-none ${
            isDark 
              ? 'bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900' 
              : 'bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700'
          }`}>
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                id="dialog-close-icon-btn"
                type="button"
                className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/30 hover:bg-black/55 text-white border border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer z-20 shadow-md flex items-center justify-center"
                aria-label="Close dialog"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            {/* Floating Heart */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white text-rose-600 shadow-xl mb-3">
              <Heart className="w-9 h-9 fill-rose-600 text-rose-600 animate-pulse" />
            </div>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Invitation Accepted</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            {/* Requested Exact Content */}
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Congrats! 🎉
            </h2>
            <p className={`${fontStyleClass || 'font-serif-luxury italic text-2xl sm:text-3xl font-semibold'} text-rose-100 mt-1.5`}>
              Thanks for accepting my date,
            </p>
            <p className="text-base sm:text-lg font-semibold text-amber-200 mt-1">
              Get ready for our date! 🌹✨
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-4 text-center">
            {/* Summary Ticket */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              isDark 
                ? 'bg-slate-800/90 border-slate-700 text-white' 
                : 'bg-rose-50/90 border-rose-200 text-stone-800'
            }`}>
              <div className="flex items-center gap-3 text-left">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  🗓️
                </div>
                <div>
                  <h4 className="font-bold text-sm flex items-center gap-1.5">
                    September First Week <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </h4>
                  <p className={`text-xs flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                    <Clock className="w-3 h-3 text-rose-500" /> Reserved for {friendName || 'Dr Trunali'} 💖
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                isDark ? 'bg-purple-900/60 text-purple-200 border-purple-500/40' : 'bg-white text-rose-700 border-rose-200'
              }`}>
                RSVP Yes
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                id="radix-calendar-btn"
                href={createGoogleCalendarLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-sm shadow-md shadow-rose-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4" />
                Add to Google Calendar 📅
              </a>

              {/* Done / Dismiss Button */}
              <Dialog.Close asChild>
                <button
                  id="radix-done-btn"
                  type="button"
                  className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
                    isDark 
                      ? 'bg-purple-950/60 hover:bg-purple-900 text-purple-200 border-purple-500/40' 
                      : 'bg-rose-100/80 hover:bg-rose-200 text-rose-900 border-rose-200'
                  }`}
                >
                  <Smile className="w-4 h-4 text-rose-600" />
                  <span>Got It! Let's Get Ready ✨</span>
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
