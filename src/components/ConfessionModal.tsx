import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Heart, Sparkles, X, BookOpen, Smile } from 'lucide-react';
import { ThemeConfig } from '../types';

interface ConfessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  friendName?: string;
  theme: ThemeConfig;
  fontStyleClass?: string;
}

export const ConfessionModal: React.FC<ConfessionModalProps> = ({
  isOpen,
  onClose,
  friendName = 'Dr Trunali',
  theme,
  fontStyleClass,
}) => {
  const isDark = true;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md duration-300 animate-in fade-in" />
        
        {/* Confession Card */}
        <Dialog.Content 
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[94vw] max-w-xl max-h-[88vh] flex flex-col rounded-3xl sm:rounded-4xl shadow-2xl border overflow-hidden outline-none duration-200 animate-in fade-in zoom-in-95 ${
            isDark 
              ? 'bg-slate-900/95 border-purple-500/50 text-slate-100' 
              : 'bg-white border-rose-200 text-stone-800'
          }`}
        >
          {/* Header Banner */}
          <div className="relative shrink-0 px-6 pt-7 pb-6 text-center text-white select-none bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-950 border-b border-purple-500/30">
            {/* Close Button */}
            <Dialog.Close asChild>
              <button 
                type="button"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
                aria-label="Close Confession"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>

            {/* Floating Heart Icon */}
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white shadow-xl mb-2.5">
              <Heart className="w-8 h-8 fill-white text-white animate-pulse" />
            </div>

            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase mb-1.5 text-pink-200">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>A Heartfelt Note</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </div>

            <Dialog.Title className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Okay, I have a confession to make. 😅
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              A personal confession letter for Dr Trunali about remembering the little things.
            </Dialog.Description>
            <p className={`${fontStyleClass || 'font-serif-luxury italic text-xl'} text-pink-300 mt-1`}>
              For Dearest {friendName}
            </p>
          </div>

          {/* Scrollable Letter Body */}
          <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[calc(88vh-190px)] text-left text-sm sm:text-base leading-relaxed text-slate-200 font-normal">
            {/* Paragraph 1 */}
            <p className="first-letter:text-3xl first-letter:font-serif first-letter:text-pink-400 first-letter:mr-1 first-letter:float-left">
              It’s been only a week since we started talking, but somewhere between all our conversations, I’ve started noticing and remembering these little things about you. I know you’re a doctor, that you’re career-oriented and have your own long story behind choosing medicine. I know you love your mom and dad, that your <em className="text-pink-300 font-medium not-italic underline decoration-pink-500/50">didi</em> is someone you’re close to, and that you have a very soft corner for kids. I know you like biryani and fish, you’ve played chess, you don’t really believe in God, you’re not much into zodiac signs even though you’ve experimented with numerology… and yes, apparently you’re an Aquarius while I’m a Libra, so according to the stars we’re supposed to get along. 😂
            </p>

            {/* Paragraph 2 */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-slate-100">
              <p>
                But honestly, those are just facts. What I’ve found more interesting is the person behind them. You’re a good listener, but what I really noticed is that you don’t just wait for your turn to talk—you actually get curious about the person in front of you. You remember things, you care about little details, and from what you’ve told me, your way of loving someone is through being there, doing little things, paying attention, and making them feel cared for. I think that says a lot about you.
              </p>
            </div>

            {/* Paragraph 3 */}
            <p>
              And yes… I may have written some of these things down. 😂 Not because I’m trying to prepare for an exam called “Getting to Know You 101,” but because when I genuinely find someone interesting, I like remembering the little things they tell me.
            </p>

            {/* Paragraph 4 - Highlight Quote */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-pink-950/40 via-purple-950/50 to-indigo-950/40 border border-pink-500/40 shadow-inner">
              <div className="flex items-center gap-2 mb-2 text-pink-300 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>Pages from my little diary</span>
              </div>
              <p className="font-serif-luxury italic text-base sm:text-lg text-purple-100 leading-snug">
                "And that actually made me think… if this is what I’ve managed to learn about you in just one week of talking, imagine what my little diary would look like if you actually gave me a chance to date you. 😌"
              </p>
            </div>

            {/* Paragraph 5 */}
            <p>
              Maybe it wouldn’t just have your favourite food or random facts anymore. It would have the little things you don’t even realise you do—what makes you laugh when you’ve had a bad day, what your comfort looks like, the stories behind your favourite memories, the things you’re passionate about, the things you’re afraid of, the tiny habits I’d eventually know without you telling me… and probably a ridiculous number of pages dedicated to things like <span className="text-pink-300 italic">“she said she wasn’t hungry but somehow stole half my food.”</span> 😂
            </p>

            {/* Paragraph 6 & Closing */}
            <div className="pt-2 border-t border-purple-500/20 text-center space-y-2">
              <p className="text-slate-300">
                So yeah, maybe I’ve only known you for a week.
              </p>
              <p className="font-serif-luxury font-bold text-lg sm:text-xl text-pink-300">
                But I’m genuinely curious about how many more pages there could be… if you let me keep getting to know you. ❤️
              </p>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-purple-500/30 bg-slate-950/60 flex items-center justify-center">
            <Dialog.Close asChild>
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-sm shadow-md shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smile className="w-4 h-4 text-pink-200" />
                <span>Close & Continue ✨</span>
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
