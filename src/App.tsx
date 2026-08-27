import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Volume2, 
  VolumeX, 
  Flame,
  RotateCcw,
  Clock,
  Calendar,
  MailOpen,
  ArrowRight
} from 'lucide-react';
import { FloatingPetals } from './components/FloatingPetals';
import { DodgeButton } from './components/DodgeButton';
import { CelebrationModal } from './components/CelebrationModal';
import { soundEffects } from './utils/audio';
import { fireCelebrationConfetti, fireFlowerSparkles } from './utils/confetti';
import { THEMES } from './utils/themes';

export default function App() {
  // Default to Midnight Velvet theme & Dr Trunali
  const currentThemeId = 'midnight-starlight';
  const friendName = 'Dr Trunali';

  const [hasOpenedLetter, setHasOpenedLetter] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeTheme = THEMES[currentThemeId];
  const fontStyleClass = 'font-serif-luxury italic text-3xl sm:text-4xl font-semibold tracking-wide';

  const handleSoundToggle = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    soundEffects.setSoundEnabled(nextVal);
    if (nextVal) {
      soundEffects.playPopSound();
    }
  };

  const handleOpenLetter = () => {
    soundEffects.playPopSound();
    fireFlowerSparkles(0.5, 0.5);
    setHasOpenedLetter(true);
  };

  const handleYesClick = () => {
    setIsAccepted(true);
    setShowCelebrationModal(true);
    soundEffects.playCelebrationChime();
    fireCelebrationConfetti();
  };

  const handleReset = () => {
    soundEffects.playPopSound();
    setIsAccepted(false);
    setShowCelebrationModal(false);
    setDodgeCount(0);
  };

  const handleBackToLetter = () => {
    soundEffects.playPopSound();
    setHasOpenedLetter(false);
    setIsAccepted(false);
    setShowCelebrationModal(false);
    setDodgeCount(0);
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`Date with ${friendName} 🌹✨`);
    const details = encodeURIComponent(
      `Congrats! 🎉\nThanks for accepting my date, get ready for our date! 🌹✨\nReserved for ${friendName} in the first week of September.`
    );
    const location = encodeURIComponent('A Beautiful Romantic Spot ✨');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260905T180000Z/20260905T220000Z&details=${details}&location=${location}`;
  };

  const getPersuasionText = () => {
    if (dodgeCount === 0) return "Choose wisely... there is only one true answer ✨";
    if (dodgeCount === 1) return "Did you really think 'No' was an option? Try again! 🌸";
    if (dodgeCount === 2) return "The 'No' button is too shy to be clicked! 🏃‍♀️💨";
    if (dodgeCount === 3) return "Every dodge only makes our date more destiny-bound 💕";
    if (dodgeCount >= 4 && dodgeCount < 7) return `You've chased 'No' ${dodgeCount} times! Just tap YES! 🌹`;
    return "Resistance is futile! September first week belongs to us! 🥂✨";
  };

  const yesScale = Math.min(1 + dodgeCount * 0.04, 1.35);

  return (
    <div 
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 select-none overflow-x-hidden transition-colors duration-500 ${activeTheme.bgClass}`}
    >
      {/* Floating flower petals and ambient starlight */}
      <FloatingPetals 
        intensity={isAccepted ? 'celebration' : 'ambient'} 
        themeId={currentThemeId}
      />

      {/* Ambient glowing light orbs */}
      <div 
        className="absolute top-12 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse-halo" 
        style={{ backgroundColor: activeTheme.accentColor }} 
      />
      <div 
        className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 animate-pulse-halo" 
        style={{ backgroundColor: activeTheme.accentColor }} 
      />

      {/* Minimal Top Control Bar */}
      <header className="fixed top-4 right-4 z-30 flex items-center gap-2 pointer-events-auto">
        {/* Re-open Letter Box Button */}
        {hasOpenedLetter && (
          <button
            id="back-to-letter-button"
            type="button"
            onClick={handleBackToLetter}
            className="p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200"
            title="View Letter Box"
            aria-label="View Letter Box"
          >
            <MailOpen className="w-4 h-4 text-pink-400" />
          </button>
        )}

        {/* Replay Question Button (Only shown when accepted) */}
        {isAccepted && (
          <button
            id="reset-experience-button"
            type="button"
            onClick={handleReset}
            className="p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200"
            title="Replay Question"
            aria-label="Replay Question"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {/* Sound Toggle */}
        <button
          id="sound-toggle-button"
          type="button"
          onClick={handleSoundToggle}
          className="p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200"
          title={soundOn ? 'Mute Audio Effects' : 'Unmute Audio Effects'}
          aria-label={soundOn ? 'Mute Audio Effects' : 'Unmute Audio Effects'}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-pink-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>
      </header>

      {/* Main Container with Smooth Screen Transitions */}
      <main className="relative z-20 w-full max-w-lg sm:max-w-xl my-auto py-8">
        <AnimatePresence mode="wait">
          {!hasOpenedLetter ? (
            /* ========================================================
               STAGE 0: THE ROMANTIC LETTER BOX / ENVELOPE CARD
               ======================================================== */
            <motion.div
              key="letter-box-card"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 1.06, 
                y: -20,
                filter: 'blur(4px)',
                transition: { duration: 0.45, ease: 'easeInOut' }
              }}
              transition={{ duration: 0.6, type: 'spring', damping: 22 }}
              onClick={handleOpenLetter}
              className={`rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300 cursor-pointer group shadow-2xl hover:shadow-pink-500/25 ${activeTheme.cardBgClass} ${activeTheme.cardBorderClass}`}
            >
              {/* Corner Decorative Ornaments */}
              <div className="absolute top-4 left-4 opacity-30 text-pink-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute top-4 right-4 opacity-30 text-pink-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute bottom-4 left-4 opacity-30 text-pink-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute bottom-4 right-4 opacity-30 text-pink-400 font-serif text-lg pointer-events-none">❦</div>

              {/* Addressed To Name in Library Romance */}
              <div className="mb-6">
                <h2 className={`${fontStyleClass} text-pink-200 leading-tight drop-shadow-md`}>
                  Dearest {friendName}
                </h2>
              </div>

              {/* Glowing Beating Heart in Center */}
              <div className="relative my-8 flex items-center justify-center">
                {/* Outer halo aura */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: "easeInOut",
                  }}
                  className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-500/35 via-purple-500/30 to-indigo-400/20 blur-xl pointer-events-none"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.85, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: "easeInOut",
                  }}
                  className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-pink-500/25 blur-md pointer-events-none"
                />

                {/* Main Interactive Heart Emblem */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, -3, 3, 0] }}
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.0,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 shadow-2xl flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400 cursor-pointer"
                >
                  <div className="w-full h-full rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden shadow-inner bg-slate-950 text-pink-400">
                    <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-pink-500 text-pink-500 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-bounce" />
                  </div>
                </motion.div>
              </div>

              {/* Subtext Preview */}
              <p className="font-serif-luxury text-base sm:text-lg font-medium text-purple-100 max-w-sm mx-auto mb-6 leading-relaxed italic">
                "Some moments are too special to wait for... someone has a heartfelt question to ask you."
              </p>

              {/* Open Letter Action Pill */}
              <div className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 group-hover:scale-105 transition-all duration-300">
                <Heart className="w-4 h-4 fill-white" />
                <span>Open Letter 💌</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ) : !isAccepted ? (
            /* ========================================================
               STAGE 1: MAIN PROPOSAL INVITATION CARD
               ======================================================== */
            <motion.div
              key="proposal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`rounded-3xl sm:rounded-4xl p-7 sm:p-11 text-center relative overflow-hidden transition-all duration-300 shadow-2xl ${activeTheme.cardBgClass} ${activeTheme.cardBorderClass}`}
            >
              {/* Wax Seal / Romantic Letter Stamp */}
              <div className="relative mb-5 inline-block">
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4.5, 
                    ease: "easeInOut" 
                  }}
                  className="w-18 h-18 sm:w-22 sm:h-22 mx-auto rounded-3xl p-0.5 shadow-xl flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400"
                >
                  <div className="w-full h-full rounded-[22px] flex items-center justify-center relative overflow-hidden bg-slate-950 text-pink-300">
                    <span className="text-3xl sm:text-4xl">💌</span>
                    <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-bounce" />
                  </div>
                </motion.div>

                {/* Dodge Counter Badge */}
                {dodgeCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-pink-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/40"
                  >
                    <Flame className="w-3 h-3 fill-yellow-200" />
                    <span>{dodgeCount} dodges</span>
                  </motion.div>
                )}
              </div>

              {/* Clean Recipient Name in Library Romance */}
              <div className="mb-4">
                <h2 className={`${fontStyleClass} text-pink-200 leading-tight drop-shadow-md`}>
                  Dearest {friendName}
                </h2>
              </div>

              {/* 1-Week Milestone Special Note */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mx-auto mb-5 max-w-md px-4 py-3 rounded-2xl border text-xs sm:text-sm leading-relaxed shadow-sm transition-all bg-purple-950/50 border-purple-500/40 text-purple-200"
              >
                <div className="flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-pink-300 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Week Milestone Special</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <p className="font-serif-luxury text-sm sm:text-base font-semibold text-purple-100 italic">
                  "It’s been one week today since we started talking... and for that reason, let’s move further by meeting for a real date!"
                </p>
              </motion.div>

              {/* The Core Question */}
              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight sm:leading-tight mb-4 text-white">
                Can we go for a date on <br />
                <span className={`font-serif-luxury font-extrabold ${activeTheme.textHeadingGradient}`}>
                  September first week?
                </span>
              </h1>

              {/* Date Badge Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 shadow-sm transition-all bg-purple-950/70 border border-purple-500/40 text-purple-200">
                <CalendarIcon className="w-4 h-4 text-pink-400" />
                <span>September 1st – September 7th</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>

              {/* Persuasive Subtext */}
              <p className="text-xs sm:text-sm font-medium h-6 mb-7 transition-all text-slate-300">
                {getPersuasionText()}
              </p>

              {/* The Interactive YES & Runaway NO Button Area */}
              <div id="button-container" className="relative min-h-[85px] flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                {/* The YES Button (Fires Confetti & Opens Celebration Dialog) */}
                <motion.button
                  id="accept-date-button"
                  type="button"
                  animate={{ 
                    scale: yesScale,
                  }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  onClick={handleYesClick}
                  className={`relative px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold transition-all cursor-pointer text-base sm:text-lg flex items-center gap-2.5 z-20 group ${activeTheme.yesBtnGradient} ${activeTheme.yesBtnShadow}`}
                >
                  <Heart className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
                  <span>Yes, with pleasure! 🌹</span>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                </motion.button>

                {/* The Runaway NO Button */}
                <div className="z-10">
                  <DodgeButton
                    containerRef={containerRef}
                    onDodge={(count) => setDodgeCount(count)}
                    disabled={isAccepted}
                    theme={activeTheme}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================
               STAGE 2: CONFIRMED DATE VIEW ON MAIN SCREEN
               ======================================================== */
            <motion.div
              key="confirmed-card"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, type: 'spring', damping: 24 }}
              className={`rounded-3xl sm:rounded-4xl p-6 sm:p-10 text-center relative overflow-hidden transition-all duration-300 shadow-2xl ${activeTheme.cardBgClass} ${activeTheme.cardBorderClass}`}
            >
              {/* Floating Heart Ribbon */}
              <div className="mb-4 inline-block">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl p-0.5 shadow-xl flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-400">
                  <div className="w-full h-full rounded-[22px] flex items-center justify-center relative overflow-hidden bg-slate-950 text-pink-300">
                    <Heart className="w-8 h-8 fill-pink-500 text-pink-500 animate-pulse" />
                    <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Confirmed Message Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-xs font-bold tracking-wider uppercase mb-2 text-pink-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Date Confirmed</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-2">
                <span className={activeTheme.textHeadingGradient}>
                  Congrats, get ready for a date!
                </span>
              </h1>

              <p className={`${fontStyleClass} text-pink-300 mb-4`}>
                September First Week with {friendName} 🌹✨
              </p>

              {/* Milestone Celebration Tag */}
              <div className="mx-auto mb-6 max-w-md px-3.5 py-2 rounded-xl border text-xs leading-relaxed bg-purple-950/40 border-purple-500/30 text-purple-200">
                <span className="font-semibold text-pink-300">1-Week Milestone:</span> "It's been one week today since we started talking, and now let's meet for our real date!" 🥂
              </div>

              {/* Date Card Ticket */}
              <div className="p-4 rounded-2xl border text-left flex flex-col sm:flex-row items-center justify-between gap-3.5 mb-6 bg-purple-950/40 border-purple-500/30">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 text-white flex flex-col items-center justify-center shadow-md shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest leading-none">SEP</span>
                    <span className="text-lg font-bold leading-none mt-0.5">1–7</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base flex items-center gap-1.5 text-white">
                      First Week of September <Sparkles className="w-4 h-4 text-amber-400" />
                    </h4>
                    <p className="text-xs flex items-center gap-1 mt-0.5 text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-pink-400" /> Special Evening Date with {friendName} 💖
                    </p>
                  </div>
                </div>

                <button
                  id="reopen-dialog-btn"
                  type="button"
                  onClick={() => {
                    soundEffects.playPopSound();
                    fireCelebrationConfetti();
                    setShowCelebrationModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 shadow-sm bg-purple-900/50 hover:bg-purple-800 text-purple-200 border-purple-500/40"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>View Details Dialog</span>
                </button>
              </div>

              {/* Calendar Action */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  id="main-add-google-calendar-button"
                  href={createGoogleCalendarLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Google Calendar 📅
                </a>
              </div>

              {/* Replay action */}
              <div className="mt-5 pt-4 border-t border-purple-500/20 flex items-center justify-center gap-4">
                <button
                  id="replay-invitation-bottom-button"
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer text-purple-300 hover:text-purple-100"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Proposal</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Date Accepted Celebration Dialog */}
      <CelebrationModal
        isOpen={showCelebrationModal}
        friendName={friendName}
        onClose={() => setShowCelebrationModal(false)}
        theme={activeTheme}
        fontStyleClass={fontStyleClass}
      />
    </div>
  );
}
