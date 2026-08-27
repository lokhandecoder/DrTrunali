import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundEffects } from '../utils/audio';
import { ThemeConfig } from '../types';

interface DodgeButtonProps {
  onDodge?: (count: number) => void;
  containerRef?: React.RefObject<HTMLElement | null>;
  disabled?: boolean;
  theme: ThemeConfig;
}

const DODGE_RESPONSES = [
  "Oops, too slow! 💨",
  "Nice try, darling! 🙈",
  "That button is slippery! ✨",
  "Are you sure? Try again! 😉",
  "Error: 'No' is strictly unavailable 🚫",
  "Destiny has chosen YES! 💖",
  "The stars said you must click Yes 🌙",
  "Resistance is impossible 💕",
  "Look at that shiny Yes button instead 👉",
  "I can dodge all day! 🏃‍♀️💨",
  "Just click YES already! 🌹",
];

export const DodgeButton: React.FC<DodgeButtonProps> = ({
  onDodge,
  disabled = false,
  theme,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  // Jump to a new random position far from the cursor
  const dodge = useCallback((cursorX?: number, cursorY?: number) => {
    if (disabled) return;

    soundEffects.playDodgeSound();

    const newCount = dodgeCount + 1;
    setDodgeCount(newCount);
    setHasMoved(true);
    setIsDodging(true);

    const msgIndex = Math.min(newCount - 1, DODGE_RESPONSES.length - 1);
    setCurrentMessage(DODGE_RESPONSES[msgIndex]);

    if (onDodge) {
      onDodge(newCount);
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const minX = -Math.min(viewportWidth * 0.35, 260);
    const maxX = Math.min(viewportWidth * 0.35, 260);
    const minY = -Math.min(viewportHeight * 0.3, 190);
    const maxY = Math.min(viewportHeight * 0.3, 190);

    let targetX = (Math.random() * (maxX - minX) + minX);
    let targetY = (Math.random() * (maxY - minY) + minY);

    if (cursorX !== undefined && cursorY !== undefined && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const dx = btnCenterX - cursorX;
      const dy = btnCenterY - cursorY;
      
      const distance = Math.hypot(dx, dy) || 1;
      const pushFactor = Math.min(Math.max(window.innerWidth * 0.3, 160), 280);
      
      targetX = position.x + (dx / distance) * pushFactor + (Math.random() - 0.5) * 100;
      targetY = position.y + (dy / distance) * pushFactor + (Math.random() - 0.5) * 100;

      targetX = Math.max(minX, Math.min(maxX, targetX));
      targetY = Math.max(minY, Math.min(maxY, targetY));
    }

    setPosition({ x: targetX, y: targetY });

    setTimeout(() => {
      setIsDodging(false);
    }, 250);
  }, [disabled, dodgeCount, onDodge, position.x, position.y]);

  // Global proximity detector
  useEffect(() => {
    if (disabled) return;

    let lastTime = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = performance.now();
      if (now - lastTime < 30) return;
      lastTime = now;

      if (!buttonRef.current) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distance = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

      if (distance < 115) {
        dodge(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [disabled, dodge]);

  return (
    <div className="relative inline-block select-none">
      {/* Floating runaway reaction tooltip */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            key={dodgeCount}
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -44, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none z-40 whitespace-nowrap px-3 py-1 rounded-full bg-stone-900/90 text-rose-200 text-xs font-semibold shadow-lg backdrop-blur-md border border-rose-400/30"
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Runaway Button */}
      <motion.button
        ref={buttonRef}
        id="runaway-no-button"
        type="button"
        tabIndex={-1}
        animate={{
          x: position.x,
          y: position.y,
          scale: isDodging ? [1, 1.12, 0.95, 1] : 1,
          rotate: isDodging ? [0, -6, 6, 0] : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 24,
          mass: 0.5,
        }}
        onMouseEnter={(e) => dodge(e.clientX, e.clientY)}
        onPointerDown={(e) => {
          e.preventDefault();
          dodge(e.clientX, e.clientY);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          dodge(e.touches[0].clientX, e.touches[0].clientY);
        }}
        onFocus={() => dodge()}
        className={`relative px-7 py-3 sm:px-8 sm:py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide flex items-center gap-2 transition-all cursor-default shadow-sm ${theme.noBtnClass} ${
          hasMoved ? 'ring-2 ring-rose-400/50' : ''
        }`}
        aria-label="No, I cannot go on a date"
      >
        <span>No</span>
        <span className="text-sm opacity-75">🕊️</span>
        {dodgeCount > 0 && (
          <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-300">
            {dodgeCount}
          </span>
        )}
      </motion.button>
    </div>
  );
};
