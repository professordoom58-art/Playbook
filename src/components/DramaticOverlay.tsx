import React, { useEffect, useRef, useState, useCallback } from 'react';

interface DramaticOverlayProps {
  active: boolean;
}

/* ── Web Audio API: synthesise a POWERFUL thunder crack ─────────── */
function playThunder(ctx: AudioContext) {
  const now = ctx.currentTime;

  /* Master compressor — glues all layers, prevents clipping */
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value      = 6;
  compressor.ratio.value     = 8;
  compressor.attack.value    = 0.002;
  compressor.release.value   = 0.4;
  compressor.connect(ctx.destination);

  /* Master output gain */
  const master = ctx.createGain();
  master.gain.value = 2.0;
  master.connect(compressor);

  /* Helper: create a white-noise buffer source */
  const makeNoise = (durationSec: number, channels = 1) => {
    const len = Math.ceil(ctx.sampleRate * durationSec);
    const buf = ctx.createBuffer(channels, len, ctx.sampleRate);
    for (let ch = 0; ch < channels; ch++) {
      const d = buf.getChannelData(ch);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    return src;
  };

  /* ── LAYER 1: Sub-bass BOOM (30–90 Hz) ─────────────────────────── */
  const sub = makeNoise(1.8);
  const subLP = ctx.createBiquadFilter();
  subLP.type = 'lowpass';
  subLP.frequency.setValueAtTime(90, now);
  subLP.frequency.exponentialRampToValueAtTime(30, now + 1.8);
  const subGain = ctx.createGain();
  subGain.gain.setValueAtTime(0, now);
  subGain.gain.linearRampToValueAtTime(3.0,  now + 0.01);  // instant boom
  subGain.gain.exponentialRampToValueAtTime(0.8, now + 0.35);
  subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
  sub.connect(subLP); subLP.connect(subGain); subGain.connect(master);
  sub.start(now); sub.stop(now + 1.8);

  /* ── LAYER 2: Deep rumble body (60–220 Hz, long decay) ─────────── */
  const rumble = makeNoise(5.5, 2);
  const rumbleLP = ctx.createBiquadFilter();
  rumbleLP.type = 'lowpass';
  rumbleLP.frequency.setValueAtTime(220, now);
  rumbleLP.frequency.exponentialRampToValueAtTime(55, now + 4.5);
  const rumbleGain = ctx.createGain();
  rumbleGain.gain.setValueAtTime(0, now);
  rumbleGain.gain.linearRampToValueAtTime(2.2,  now + 0.04);
  rumbleGain.gain.exponentialRampToValueAtTime(0.7, now + 0.8);
  rumbleGain.gain.exponentialRampToValueAtTime(0.15, now + 3.0);
  rumbleGain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);
  rumble.connect(rumbleLP); rumbleLP.connect(rumbleGain); rumbleGain.connect(master);
  rumble.start(now); rumble.stop(now + 5.5);

  /* ── LAYER 3: Mid-body CRACK (200–900 Hz) ──────────────────────── */
  const mid = makeNoise(0.9);
  const midBP = ctx.createBiquadFilter();
  midBP.type = 'bandpass';
  midBP.frequency.value = 450;
  midBP.Q.value = 0.4;
  const midGain = ctx.createGain();
  midGain.gain.setValueAtTime(0, now);
  midGain.gain.linearRampToValueAtTime(2.5,  now + 0.006);  // ultra-sharp crack
  midGain.gain.exponentialRampToValueAtTime(0.3, now + 0.18);
  midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
  mid.connect(midBP); midBP.connect(midGain); midGain.connect(master);
  mid.start(now); mid.stop(now + 0.9);

  /* ── LAYER 4: High crackle / electrical sizzle (2k–8k Hz) ─────── */
  const crackle = makeNoise(0.25);
  const crackleHP = ctx.createBiquadFilter();
  crackleHP.type = 'highpass';
  crackleHP.frequency.value = 2200;
  const crackleGain = ctx.createGain();
  crackleGain.gain.setValueAtTime(0, now);
  crackleGain.gain.linearRampToValueAtTime(1.8, now + 0.003);
  crackleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  crackle.connect(crackleHP); crackleHP.connect(crackleGain); crackleGain.connect(master);
  crackle.start(now); crackle.stop(now + 0.25);

  /* ── LAYER 5: Secondary echo rumble (slightly delayed) ─────────── */
  const echoDelay = 0.22 + Math.random() * 0.3;
  const echo = makeNoise(3.5);
  const echoLP = ctx.createBiquadFilter();
  echoLP.type = 'lowpass';
  echoLP.frequency.value = 120;
  const echoGain = ctx.createGain();
  echoGain.gain.setValueAtTime(0, now + echoDelay);
  echoGain.gain.linearRampToValueAtTime(1.4,  now + echoDelay + 0.03);
  echoGain.gain.exponentialRampToValueAtTime(0.3, now + echoDelay + 0.9);
  echoGain.gain.exponentialRampToValueAtTime(0.001, now + echoDelay + 3.5);
  echo.connect(echoLP); echoLP.connect(echoGain); echoGain.connect(master);
  echo.start(now + echoDelay); echo.stop(now + echoDelay + 3.5);
}


/* ── Rain sound via AudioWorklet-free approach (looped noise) ────── */
function startRainSound(ctx: AudioContext): () => void {
  const bufferSize = ctx.sampleRate * 4;
  const rainBuffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const ch_data = rainBuffer.getChannelData(ch);
    for (let i = 0; i < bufferSize; i++) {
      ch_data[i] = Math.random() * 2 - 1;
    }
  }

  /* Band-pass filtered white noise → realistic rain hiss */
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 2800;
  bandpass.Q.value = 0.6;

  const highshelf = ctx.createBiquadFilter();
  highshelf.type = 'highshelf';
  highshelf.frequency.value = 6000;
  highshelf.gain.value = -4;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.5);

  const source = ctx.createBufferSource();
  source.buffer = rainBuffer;
  source.loop = true;
  source.connect(bandpass);
  bandpass.connect(highshelf);
  highshelf.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start();

  return () => {
    gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
    setTimeout(() => {
      try { source.stop(); } catch {}
    }, 1100);
  };
}

/* ── Pre-generate stable rain drop positions ───────────────────── */
const RAIN_DROPS = Array.from({ length: 130 }, (_, i) => ({
  left:     (i * 0.79 + (i % 13) * 0.4) % 100,
  width:    i % 3 === 0 ? 1.8 : i % 3 === 1 ? 1.2 : 0.8,
  height:   28 + (i % 7) * 8,
  duration: 0.28 + (i % 6) * 0.06,
  delay:    (i % 20) * 0.11,
  opacity:  0.35 + (i % 4) * 0.15,
}));

export const DramaticOverlay: React.FC<DramaticOverlayProps> = ({ active }) => {
  const [flashing, setFlashing] = useState(false);
  const [lightningBolt, setLightningBolt] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRainRef = useRef<(() => void) | null>(null);

  const getOrCreateCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const triggerLightning = useCallback(() => {
    setFlashing(true);
    setLightningBolt(true);
    const ctx = getOrCreateCtx();
    playThunder(ctx);
    setTimeout(() => setFlashing(false), 80 + Math.random() * 120);
    // Optional second flash
    if (Math.random() > 0.5) {
      setTimeout(() => {
        setFlashing(true);
        setTimeout(() => setFlashing(false), 60 + Math.random() * 80);
      }, 180 + Math.random() * 200);
    }
    setTimeout(() => setLightningBolt(false), 600);
  }, [getOrCreateCtx]);

  useEffect(() => {
    if (!active) {
      // Stop rain sound
      if (stopRainRef.current) {
        stopRainRef.current();
        stopRainRef.current = null;
      }
      return;
    }

    // Start rain sound
    const ctx = getOrCreateCtx();
    stopRainRef.current = startRainSound(ctx);

    // Immediate first strike (600ms to let rain fade in a touch first)
    const firstStrikeTimer = setTimeout(() => {
      triggerLightning();
    }, 600);

    // Lightning scheduler (subsequent random strikes)
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 8000;
      return setTimeout(() => {
        triggerLightning();
        timerRef.current = scheduleNext();
      }, delay);
    };

    const timerRef = { current: scheduleNext() };

    return () => {
      clearTimeout(firstStrikeTimer);
      clearTimeout(timerRef.current);
      if (stopRainRef.current) {
        stopRainRef.current();
        stopRainRef.current = null;
      }
    };
  }, [active, triggerLightning, getOrCreateCtx]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden select-none">
      {/* Dark storm tint */}
      <div className="fixed inset-0 bg-slate-950/30" />

      {/* Lightning flash */}
      <div
        className="fixed inset-0 transition-opacity"
        style={{
          background: flashing
            ? 'radial-gradient(ellipse at 35% 10%, rgba(200,230,255,0.7) 0%, rgba(160,200,255,0.2) 50%, transparent 80%)'
            : 'transparent',
          opacity: flashing ? 1 : 0,
          transition: flashing ? 'none' : 'opacity 0.15s ease',
        }}
      />

      {/* Lightning bolt SVG */}
      {lightningBolt && (
        <svg
          className="absolute"
          style={{
            top: 0,
            left: `${20 + Math.random() * 60}%`,
            width: 60,
            height: '55%',
            opacity: 0.85,
            filter: 'drop-shadow(0 0 12px #a0d0ff) drop-shadow(0 0 4px #fff)',
          }}
          viewBox="0 0 60 300"
          fill="none"
        >
          <polyline
            points="38,0 18,120 32,120 12,300"
            stroke="url(#bolt)"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="bolt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#c0e8ff" />
              <stop offset="100%" stopColor="#7cb8ff" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Rain streaks */}
      <div className="absolute inset-0">
        {RAIN_DROPS.map((drop, i) => (
          <div
            key={i}
            className="rain-drop absolute rounded-full"
            style={{
              left: `${drop.left}%`,
              top: `-${drop.height}px`,
              width: `${drop.width}px`,
              height: `${drop.height}px`,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(180,220,255,0.5) 40%, rgba(130,190,255,0.9) 100%)',
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>

      {/* Rain splash shimmer at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16"
        style={{
          background: 'linear-gradient(to top, rgba(120,180,255,0.08) 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
