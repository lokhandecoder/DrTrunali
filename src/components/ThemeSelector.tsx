import React from 'react';
import { Palette, Check } from 'lucide-react';
import { ThemeId } from '../types';
import { THEMES } from '../utils/themes';
import { soundEffects } from '../utils/audio';

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative inline-block text-left z-30">
      <button
        id="theme-dropdown-button"
        type="button"
        onClick={() => {
          soundEffects.playPopSound();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-stone-200/80 dark:border-purple-500/30 text-xs font-semibold shadow-sm hover:shadow transition-all cursor-pointer text-stone-700 dark:text-purple-200"
        aria-label="Change visual theme"
        title="Switch visual theme"
      >
        <Palette className="w-3.5 h-3.5 text-rose-500" />
        <span className="hidden sm:inline">Theme:</span>
        <span className="font-bold">{THEMES[currentTheme].name}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-stone-200 dark:border-purple-500/40 shadow-xl z-40 p-1.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider uppercase text-stone-400 dark:text-purple-300">
              Choose Romantic Aesthetic
            </div>
            <div className="space-y-1">
              {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                const theme = THEMES[themeKey];
                const isSelected = currentTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    id={`theme-option-${themeKey}`}
                    type="button"
                    onClick={() => {
                      soundEffects.playPopSound();
                      onSelectTheme(themeKey);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 dark:bg-purple-950/60 text-rose-700 dark:text-purple-200 font-bold'
                        : 'hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{theme.icon}</span>
                      <span>{theme.name}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-rose-500" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
