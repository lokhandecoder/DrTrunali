import React, { useEffect, useState } from 'react';
import { Petal, ThemeId } from '../types';

interface FloatingPetalsProps {
  intensity?: 'ambient' | 'celebration';
  themeId?: ThemeId;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({ 
  intensity = 'ambient',
  themeId = 'rose-champagne'
}) => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = intensity === 'celebration' ? 45 : 18;

    let palette = [
      'rgba(244, 63, 94, 0.75)',
      'rgba(251, 113, 133, 0.8)',
      'rgba(253, 164, 175, 0.85)',
      'rgba(254, 205, 211, 0.9)',
      'rgba(251, 191, 36, 0.75)',
    ];

    if (themeId === 'midnight-starlight') {
      palette = [
        'rgba(236, 72, 153, 0.85)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(192, 132, 252, 0.85)',
        'rgba(251, 207, 232, 0.8)',
        'rgba(250, 204, 21, 0.85)',
      ];
    } else if (themeId === 'sunset-amber') {
      palette = [
        'rgba(249, 115, 22, 0.8)',
        'rgba(244, 63, 94, 0.75)',
        'rgba(251, 191, 36, 0.85)',
        'rgba(254, 215, 170, 0.9)',
        'rgba(253, 230, 138, 0.85)',
      ];
    } else if (themeId === 'lavender-mist') {
      palette = [
        'rgba(168, 85, 247, 0.8)',
        'rgba(232, 121, 249, 0.85)',
        'rgba(192, 132, 252, 0.8)',
        'rgba(244, 114, 182, 0.8)',
        'rgba(245, 208, 254, 0.85)',
      ];
    }

    const shapes: Array<'rose' | 'cherry' | 'heart' | 'sparkle' | 'blossom'> = [
      'rose', 'cherry', 'heart', 'sparkle', 'blossom'
    ];

    const newPetals: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -100,
      size: Math.random() * (intensity === 'celebration' ? 18 : 14) + 12,
      rotation: Math.random() * 360,
      speed: Math.random() * (intensity === 'celebration' ? 1.6 : 0.8) + (intensity === 'celebration' ? 1.0 : 0.6),
      drift: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.35 + 0.55,
      color: palette[Math.floor(Math.random() * palette.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }));

    setPetals(newPetals);
  }, [intensity, themeId]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10 select-none" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute transform-gpu will-change-transform filter drop-shadow-sm"
          style={{
            left: `${petal.x}%`,
            top: `${petal.y}%`,
            opacity: petal.opacity,
            animation: `petalFall ${14 / petal.speed}s linear infinite, petalSway ${4 + Math.random() * 3}s ease-in-out infinite alternate`,
            animationDelay: `${petal.id * 0.3}s`,
          }}
        >
          {petal.shape === 'heart' ? (
            <svg
              width={petal.size}
              height={petal.size}
              viewBox="0 0 24 24"
              fill={petal.color}
              style={{ transform: `rotate(${petal.rotation}deg)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : petal.shape === 'blossom' ? (
            <svg
              width={petal.size * 1.3}
              height={petal.size * 1.3}
              viewBox="0 0 32 32"
              fill={petal.color}
              style={{ transform: `rotate(${petal.rotation}deg)` }}
            >
              <path d="M16 2 C18 7 24 7 26 12 C28 17 23 21 21 26 C19 31 13 31 11 26 C9 21 4 17 6 12 C8 7 14 7 16 2 Z" />
              <circle cx="16" cy="16" r="3" fill="#fff" opacity="0.8" />
            </svg>
          ) : petal.shape === 'sparkle' ? (
            <svg
              width={petal.size * 0.9}
              height={petal.size * 0.9}
              viewBox="0 0 24 24"
              fill={petal.color}
              style={{ transform: `rotate(${petal.rotation}deg)` }}
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          ) : (
            // Curved Rose Petal
            <div
              className="rounded-tl-2xl rounded-br-2xl rounded-tr-sm rounded-bl-lg shadow-sm"
              style={{
                width: `${petal.size}px`,
                height: `${petal.size * 1.35}px`,
                backgroundColor: petal.color,
                transform: `rotate(${petal.rotation}deg)`,
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-8vh) rotate(0deg);
          }
          100% {
            transform: translateY(112vh) rotate(360deg);
          }
        }
        @keyframes petalSway {
          0% {
            margin-left: -20px;
          }
          100% {
            margin-left: 20px;
          }
        }
      `}</style>
    </div>
  );
};
