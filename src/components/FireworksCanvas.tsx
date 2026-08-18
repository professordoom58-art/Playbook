import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
}

const FIREWORK_COLORS = [
  '#FF1493', // Deep Pink
  '#FF4500', // Orange Red
  '#FFD700', // Gold
  '#00E5FF', // Bright Cyan
  '#7C3AED', // Vivid Violet
  '#10B981', // Emerald
  '#F43F5E', // Rose
  '#8B5CF6', // Purple
  '#F59E0B', // Amber
];

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const createExplosion = (x: number, y: number) => {
      const particleCount = 45 + Math.floor(Math.random() * 25);
      const baseColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
      const secondaryColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.4;
        const speed = 2.5 + Math.random() * 6;
        const color = Math.random() > 0.3 ? baseColor : secondaryColor;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
          size: 3 + Math.random() * 3,
          decay: 0.01 + Math.random() * 0.012,
        });
      }
    };

    let lastLaunch = 0;
    const launchInterval = 500; // Launch vibrant burst every 500ms

    const loop = (timestamp: number) => {
      if (timestamp - lastLaunch > launchInterval) {
        const x = canvas.width * (0.12 + Math.random() * 0.76);
        const y = canvas.height * (0.15 + Math.random() * 0.55);
        createExplosion(x, y);
        lastLaunch = timestamp;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.07; // gravity
        p.vx *= 0.98; // friction
        p.vy *= 0.98;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    // Immediate initial explosions
    createExplosion(canvas.width * 0.25, canvas.height * 0.3);
    createExplosion(canvas.width * 0.75, canvas.height * 0.35);

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
