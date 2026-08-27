import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Calendar as CalendarIcon, 
  Volume2, 
  VolumeX, 
  Edit3, 
  Check, 
  Rose, 
  Flame,
  RotateCcw,
  Star,
  Clock,
  Calendar,
  MailOpen,
  ArrowRight
} from 'lucide-react';
import { FloatingPetals } from './components/FloatingPetals';
import { DodgeButton } from './components/DodgeButton';
import { CelebrationModal } from './components/CelebrationModal';
import { ThemeSelector } from './components/ThemeSelector';
import { soundEffects } from './utils/audio';
import { fireCelebrationConfetti, fireFlowerSparkles } from './utils/confetti';
import { THEMES } from './utils/themes';
import { ThemeId, GreetingFontStyle, FontStyleOption } from './types';

export const FONT_STYLES: FontStyleOption[] = [
  {
    id: 'cormorant',
    name: 'Library Romance',
    fontClass: 'font-serif-luxury italic text-2xl sm:text-3xl font-semibold',
    previewClass: 'font-serif-luxury italic',
  },
  {
    id: 'pinyon',
    name: 'Royal Calligraphy',
    fontClass: 'font-pinyon text-3xl sm:text-4xl tracking-wide',
    previewClass: 'font-pinyon',
  },
  {
    id: 'alex',
    name: 'Romantic Brush',
    fontClass: 'font-alex text-2xl sm:text-3xl tracking-normal',
    previewClass: 'font-alex',
  },
  {
    id: 'parisienne',
    name: 'Parisian Script',
    fontClass: 'font-parisienne text-2xl sm:text-3xl tracking-wide',
    previewClass: 'font-parisienne',
  },
  {
    id: 'italiana',
    name: 'Italian Vogue',
    fontClass: 'font-italiana text-xl sm:text-2xl font-bold tracking-widest uppercase',
    previewClass: 'font-italiana',
  },
];

export default function App() {
  const [hasOpenedLoveCard, setHasOpenedLoveCard] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('rose-champagne');
  const [currentFontStyle, setCurrentFontStyle] = useState<GreetingFontStyle>('cormorant');
  const [isAccepted, setIsAccepted] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [friendName, setFriendName] = useState('Dr Trunali');
  const [isEditingName, setIsEditingName] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeTheme = THEMES[currentThemeId];
  const isDark = currentThemeId === 'midnight-starlight';
  const activeFontStyle = FONT_STYLES.find(f => f.id === currentFontStyle) || FONT_STYLES[0];

  const handleSoundToggle = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    soundEffects.setSoundEnabled(nextVal);
    if (nextVal) {
      soundEffects.playPopSound();
    }
  };

  const handleOpenLoveCard = () => {
    soundEffects.playPopSound();
    fireFlowerSparkles(0.5, 0.5);
    setHasOpenedLoveCard(true);
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

  const handleBackToEnvelope = () => {
    soundEffects.playPopSound();
    setHasOpenedLoveCard(false);
    setIsAccepted(false);
    setShowCelebrationModal(false);
    setDodgeCount(0);
  };

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`Date with ${friendName || 'Dr Trunali'} 🌹✨`);
    const details = encodeURIComponent(
      `Congrats! 🎉\nThanks for accepting my date, get ready for our date! 🌹✨\nReserved for ${friendName || 'Dr Trunali'} in the first week of September.`
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
      {/* Floating flower petals and blossoms */}
      <FloatingPetals 
        intensity={isAccepted ? 'celebration' : 'ambient'} 
        themeId={currentThemeId}
      />

      {/* Ambient glowing light orbs */}
      <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse-halo" style={{ backgroundColor: activeTheme.accentColor }} />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 animate-pulse-halo" style={{ backgroundColor: activeTheme.accentColor }} />

      {/* Top Navigation Bar */}
      <header className="fixed top-4 left-4 right-4 max-w-4xl mx-auto flex items-center justify-between z-30 pointer-events-auto">
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md text-xs font-semibold shadow-sm border transition-all ${
          isDark 
            ? 'bg-slate-900/80 border-purple-500/30 text-purple-200' 
            : 'bg-white/80 border-rose-200/80 text-rose-800'
        }`}>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="tracking-wide">
            {!hasOpenedLoveCard 
              ? 'Secret Love Letter 💌' 
              : isAccepted 
                ? 'Date Confirmed ✨' 
                : 'Special Invitation 🌹'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Visual Theme Switcher */}
          <ThemeSelector 
            currentTheme={currentThemeId} 
            onSelectTheme={setCurrentThemeId} 
          />

          {/* Re-open Envelope Button */}
          {hasOpenedLoveCard && (
            <button
              id="back-to-envelope-button"
              type="button"
              onClick={handleBackToEnvelope}
              className={`p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200' 
                  : 'bg-white/80 hover:bg-white border-stone-200 text-stone-700'
              }`}
              title="View Initial Love Card"
              aria-label="View Initial Love Card"
            >
              <MailOpen className="w-4 h-4 text-rose-500" />
            </button>
          )}

          {/* Replay Question Button */}
          {isAccepted && (
            <button
              id="reset-experience-button"
              type="button"
              onClick={handleReset}
              className={`p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer ${
                isDark 
                  ? 'bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200' 
                  : 'bg-white/80 hover:bg-white border-stone-200 text-stone-700'
              }`}
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
            className={`p-2.5 rounded-full backdrop-blur-md border shadow-sm transition-all cursor-pointer ${
              isDark 
                ? 'bg-slate-900/80 hover:bg-slate-800 border-purple-500/40 text-purple-200' 
                : 'bg-white/80 hover:bg-white border-stone-200 text-stone-700'
            }`}
            title={soundOn ? 'Mute Audio Effects' : 'Unmute Audio Effects'}
            aria-label={soundOn ? 'Mute Audio Effects' : 'Unmute Audio Effects'}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-rose-500" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
        </div>
      </header>

      {/* Main Container with Smooth Screen Transitions */}
      <main className="relative z-20 w-full max-w-lg sm:max-w-xl my-auto py-12">
        <AnimatePresence mode="wait">
          {!hasOpenedLoveCard ? (
            /* ========================================================
               STAGE 0: INITIAL LOVE MESSAGE CARD WITH HEART IN CENTER
               ======================================================== */
            <motion.div
              key="intro-love-card"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 1.08, 
                y: -30,
                filter: 'blur(6px)',
                transition: { duration: 0.55, ease: [0.32, 0.72, 0, 1] }
              }}
              transition={{ duration: 0.7, type: 'spring', damping: 20 }}
              onClick={handleOpenLoveCard}
              className={`rounded-3xl sm:rounded-4xl p-8 sm:p-12 text-center relative overflow-hidden transition-all duration-300 cursor-pointer group shadow-2xl hover:shadow-rose-500/25 ${activeTheme.cardBgClass} ${activeTheme.cardBorderClass}`}
            >
              {/* Corner Decorative Ornaments */}
              <div className="absolute top-4 left-4 opacity-40 text-rose-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute top-4 right-4 opacity-40 text-rose-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute bottom-4 left-4 opacity-40 text-rose-400 font-serif text-lg pointer-events-none">❦</div>
              <div className="absolute bottom-4 right-4 opacity-40 text-rose-400 font-serif text-lg pointer-events-none">❦</div>

              {/* Sub-header badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-500/10 border border-rose-400/30 text-xs font-bold tracking-widest uppercase mb-4 text-rose-600 dark:text-pink-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>A Romantic Message For You</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              </div>

              {/* Addressed To Name in Selected Font Style */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest font-semibold text-stone-500 dark:text-purple-300 mb-1">
                  Exclusively Written For
                </p>
                <h2 className={`${activeFontStyle.fontClass} text-rose-700 dark:text-pink-300 leading-tight drop-shadow-sm`}>
                  Dearest {friendName}
                </h2>
              </div>

              {/* Glowing Beating Heart in Center */}
              <div className="relative my-8 flex items-center justify-center">
                {/* Outer halo rings */}
                <motion.div
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                  }}
                  className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-rose-500/30 via-pink-400/25 to-amber-300/20 blur-xl pointer-events-none"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                  }}
                  className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-rose-500/20 blur-md pointer-events-none"
                />

                {/* Main Interactive Heart Emblem */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: [0, -4, 4, 0] }}
                  whileTap={{ scale: 0.92 }}
                  animate={{
                    scale: [1, 1.06, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.0,
                    ease: "easeInOut",
                  }}
                  className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 shadow-2xl flex items-center justify-center bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400 cursor-pointer"
                >
                  <div className={`w-full h-full rounded-[22px] flex flex-col items-center justify-center relative overflow-hidden shadow-inner ${
                    isDark ? 'bg-slate-950 text-rose-400' : 'bg-white text-rose-600'
                  }`}>
                    <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-rose-600 text-rose-600 drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                    <Sparkles className="w-4 h-4 text-amber-300 absolute top-2 right-2 animate-bounce" />
                  </div>
                </motion.div>
              </div>

              {/* Love Card Note Preview */}
              <p className="font-serif-luxury text-base sm:text-lg font-medium text-stone-700 dark:text-purple-100 max-w-sm mx-auto mb-6 leading-relaxed italic">
                "Some moments are too special to wait for... someone has a heartfelt question to ask you."
              </p>

              {/* Action Prompt Pill */}
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-rose-600/30 group-hover:shadow-rose-600/50 group-hover:scale-105 transition-all duration-300">
                <Heart className="w-4 h-4 fill-white" />
                <span>Tap to open your message 💌</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ) : !isAccepted ? (
            /* ========================================================
               STAGE 1: MAIN PROPOSAL INVITATION CARD
               ======================================================== */
            <motion.div
              key="proposal-card"
              initial={{ opacity: 0, scale: 0.94, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={`rounded-3xl sm:rounded-4xl p-7 sm:p-11 text-center relative overflow-hidden transition-all duration-300 shadow-2xl ${activeTheme.cardBgClass} ${activeTheme.cardBorderClass}`}
            >
              {/* Wax Seal / Luxury Heart Stamp */}
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
                  className="w-18 h-18 sm:w-22 sm:h-22 mx-auto rounded-3xl p-0.5 shadow-xl flex items-center justify-center bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400"
                >
                  <div className={`w-full h-full rounded-[22px] flex items-center justify-center relative overflow-hidden ${
                    isDark ? 'bg-slate-950 text-pink-300' : 'bg-white text-rose-600'
                  }`}>
                    <span className="text-3xl sm:text-4xl">💌</span>
                    <Sparkles className="w-4 h-4 text-amber-400 absolute top-2 right-2 animate-bounce" />
                  </div>
                </motion.div>

                {/* Dodge Counter Badge */}
                {dodgeCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white/40"
                  >
                    <Flame className="w-3 h-3 fill-yellow-200" />
                    <span>{dodgeCount} dodges</span>
                  </motion.div>
                )}
              </div>

              {/* Editable Friend Name & Font Style Picker */}
              <div className="mb-4 flex flex-col items-center justify-center gap-2">
                {isEditingName ? (
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border shadow-inner ${
                    isDark ? 'bg-slate-800 border-purple-400' : 'bg-white border-rose-300'
                  }`}>
                    <input
                      id="friend-name-input"
                      type="text"
                      value={friendName}
                      onChange={(e) => setFriendName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setIsEditingName(false);
                      }}
                      className={`text-sm font-semibold focus:outline-none text-center bg-transparent w-44 ${
                        isDark ? 'text-purple-200' : 'text-rose-800'
                      }`}
                      autoFocus
                    />
                    <button
                      id="save-friend-name-button"
                      type="button"
                      onClick={() => setIsEditingName(false)}
                      className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                      aria-label="Save name"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div 
                      className={`group flex items-center gap-2.5 px-6 py-2 rounded-full transition-all cursor-pointer border shadow-sm ${
                        isDark 
                          ? 'bg-purple-950/50 hover:bg-purple-900/70 border-purple-500/40 text-purple-200' 
                          : 'bg-rose-50/90 hover:bg-rose-100/90 border-rose-200/90 text-rose-800'
                      }`}
                      onClick={() => setIsEditingName(true)}
                      title="Click to customize recipient name"
                    >
                      <span className={`${activeFontStyle.fontClass} leading-tight drop-shadow-sm`}>
                        Dearest {friendName}
                      </span>
                      <Edit3 className="w-3.5 h-3.5 text-rose-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Font Style Switcher Pills */}
                    <div className="flex items-center gap-1.5 flex-wrap justify-center pt-0.5">
                      {FONT_STYLES.map((style) => (
                        <button
                          key={style.id}
                          id={`font-style-${style.id}`}
                          type="button"
                          onClick={() => {
                            soundEffects.playPopSound();
                            setCurrentFontStyle(style.id);
                          }}
                          className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all cursor-pointer border ${
                            currentFontStyle === style.id
                              ? isDark
                                ? 'bg-pink-500/30 text-pink-200 border-pink-400 font-bold shadow-sm ring-1 ring-pink-400/40'
                                : 'bg-rose-600 text-white border-rose-600 font-bold shadow-sm ring-1 ring-rose-300'
                              : isDark
                                ? 'bg-slate-900/60 text-slate-400 hover:text-purple-200 border-slate-700 hover:bg-slate-800'
                                : 'bg-white/80 text-stone-600 hover:text-rose-700 border-stone-200 hover:bg-rose-50'
                          }`}
                        >
                          {style.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 1-Week Milestone Special Note */}
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`mx-auto mb-4 max-w-md px-4 py-2.5 rounded-2xl border text-xs sm:text-sm leading-relaxed shadow-sm transition-all ${
                  isDark 
                    ? 'bg-purple-950/50 border-purple-500/40 text-purple-200' 
                    : 'bg-rose-50/90 border-rose-200/90 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wider text-rose-600 dark:text-pink-300 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Week Milestone Special</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="font-serif-luxury text-sm sm:text-base font-semibold text-rose-950 dark:text-purple-100 italic">
                  "It’s been one week today since we started talking... and for that reason, let’s move further by meeting for a real date!"
                </p>
              </motion.div>

              {/* The Core Question */}
              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight sm:leading-tight mb-4">
                Can we go for a date on <br />
                <span className={`font-serif-luxury font-extrabold ${activeTheme.textHeadingGradient}`}>
                  September first week?
                </span>
              </h1>

              {/* Date Badge Pill */}
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 shadow-sm transition-all ${
                isDark 
                  ? 'bg-purple-950/70 border border-purple-500/40 text-purple-200' 
                  : 'bg-rose-50 border border-rose-200/90 text-rose-900'
              }`}>
                <CalendarIcon className="w-4 h-4 text-rose-500" />
                <span>September 1st – September 7th</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>

              {/* Persuasive Subtext */}
              <p className={`text-xs sm:text-sm font-medium h-6 mb-7 transition-all ${
                isDark ? 'text-slate-300' : 'text-stone-600'
              }`}>
                {getPersuasionText()}
              </p>

              {/* The Interactive YES & Runaway NO Button Area */}
              <div id="button-container" className="relative min-h-[85px] flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                {/* The YES Button (Fires Confetti & Opens Dialog) */}
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
               STAGE 2: CONFIRMED & BOOKED DATE VIEW ON MAIN SCREEN
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl p-0.5 shadow-xl flex items-center justify-center bg-gradient-to-tr from-rose-600 via-pink-500 to-amber-400">
                  <div className={`w-full h-full rounded-[22px] flex items-center justify-center relative overflow-hidden ${
                    isDark ? 'bg-slate-950 text-rose-400' : 'bg-white text-rose-600'
                  }`}>
                    <Heart className="w-8 h-8 fill-rose-600 text-rose-600 animate-pulse" />
                    <Sparkles className="w-4 h-4 text-amber-400 absolute top-2 right-2 animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Confirmed Message Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-rose-500/15 border border-rose-400/30 text-xs font-bold tracking-wider uppercase mb-2 text-rose-600 dark:text-pink-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Date Confirmed</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-2">
                <span className={activeTheme.textHeadingGradient}>
                  Congrats, get ready for a date!
                </span>
              </h1>

              <p className={`${activeFontStyle.fontClass} text-rose-600 dark:text-pink-300 mb-3`}>
                September First Week with {friendName || 'Dr Trunali'} 🌹✨
              </p>

              {/* Milestone Celebration Tag */}
              <div className={`mx-auto mb-6 max-w-md px-3.5 py-1.5 rounded-xl border text-xs leading-relaxed ${
                isDark ? 'bg-purple-950/30 border-purple-500/30 text-purple-200' : 'bg-rose-50/60 border-rose-200/60 text-stone-600'
              }`}>
                <span className="font-semibold text-rose-600 dark:text-pink-300">1-Week Milestone:</span> "It's been one week today since we started talking, and now let's meet for our real date!" 🥂
              </div>

              {/* Date Card Ticket */}
              <div className={`p-4 rounded-2xl border text-left flex flex-col sm:flex-row items-center justify-between gap-3.5 mb-6 ${
                isDark ? 'bg-purple-950/40 border-purple-500/30' : 'bg-rose-50/70 border-rose-200/80'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-white flex flex-col items-center justify-center shadow-md shrink-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest leading-none">SEP</span>
                    <span className="text-lg font-bold leading-none mt-0.5">1–7</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base flex items-center gap-1.5">
                      First Week of September <Sparkles className="w-4 h-4 text-amber-500" />
                    </h4>
                    <p className={`text-xs flex items-center gap-1 mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      <Clock className="w-3.5 h-3.5 text-rose-500" /> Special Evening Date with {friendName || 'Dr Trunali'} 💖
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer transition-all hover:scale-105 shadow-sm ${
                    isDark 
                      ? 'bg-purple-900/50 hover:bg-purple-800 text-purple-200 border-purple-500/40' 
                      : 'bg-rose-100/90 hover:bg-rose-200 text-rose-800 border-rose-300'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
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
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Google Calendar 📅
                </a>
              </div>

              {/* Replay action */}
              <div className="mt-5 pt-4 border-t border-rose-100/60 dark:border-purple-500/20 flex items-center justify-center gap-4">
                <button
                  id="replay-invitation-bottom-button"
                  type="button"
                  onClick={handleReset}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isDark ? 'text-purple-300 hover:text-purple-100' : 'text-stone-500 hover:text-rose-600'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Proposal</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className={`relative z-20 text-center text-xs font-medium tracking-wide flex items-center gap-1.5 ${
        isDark ? 'text-purple-300/70' : 'text-stone-500/80'
      }`}>
        <Star className="w-3 h-3 text-amber-400" />
        <span>Crafted with love & excitement for September ✨🌹</span>
      </footer>

      {/* Date Accepted Celebration Dialog (Powered by Radix UI) */}
      <CelebrationModal
        isOpen={showCelebrationModal}
        friendName={friendName}
        onClose={() => setShowCelebrationModal(false)}
        theme={activeTheme}
        fontStyleClass={activeFontStyle.fontClass}
      />
    </div>
  );
}

