import confetti from 'canvas-confetti';

export function fireCelebrationConfetti() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;

  // Custom romantic colors: rose pink, ruby red, gold, pastel blush, white, magenta
  const romanticColors = ['#f43f5e', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff', '#e11d48', '#ec4899', '#a855f7'];

  // 1. Initial powerful center blast
  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 0.55 },
    colors: romanticColors,
    ticks: 240,
    shapes: ['circle', 'square'],
    scalar: 1.2,
    zIndex: 99999,
    disableForReducedMotion: true,
  });

  // 2. Continuous celebratory fireworks from alternating sides
  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 35 * (timeLeft / duration);

    // Left side burst
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 60,
      spread: 55,
      origin: { x: 0.08, y: 0.65 },
      colors: romanticColors,
      ticks: 180,
      scalar: 1.1,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // Right side burst
    confetti({
      particleCount: Math.floor(particleCount),
      angle: 120,
      spread: 55,
      origin: { x: 0.92, y: 0.65 },
      colors: romanticColors,
      ticks: 180,
      scalar: 1.1,
      zIndex: 99999,
      disableForReducedMotion: true,
    });

    // Center cascade
    confetti({
      particleCount: Math.floor(particleCount * 0.7),
      angle: 90,
      spread: 70,
      origin: { x: 0.5, y: 0.4 },
      colors: romanticColors,
      ticks: 160,
      scalar: 1.0,
      zIndex: 99999,
      disableForReducedMotion: true,
    });
  }, 280);
}

// Extra floral sparkle burst
export function fireFlowerSparkles(x = 0.5, y = 0.5) {
  confetti({
    particleCount: 40,
    angle: 90,
    spread: 360,
    startVelocity: 25,
    origin: { x, y },
    colors: ['#fb7185', '#f43f5e', '#fde047', '#ffedd5', '#ec4899'],
    scalar: 0.9,
    ticks: 140,
    zIndex: 99999,
    disableForReducedMotion: true,
  });
}
