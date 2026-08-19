import React from 'react';
import { Target, Play, HelpCircle, Sparkles, FileCheck, ShieldAlert, Flame, Moon, CloudRain, BookOpen, Eye } from 'lucide-react';
import { FireworksCanvas } from './FireworksCanvas';

interface LandingPageProps {
  onPlayBingo: () => void;
  onOpenMethodology: () => void;
  onOpenHowItWorks: () => void;
  onOpenAboutMe?: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isDramatic: boolean;
  onToggleDramatic: () => void;
}

/* Mini demo card labels for the hero section — single-word labels */
const DEMO_LABELS = [
  { label: 'TRAITOR',    marked: true  },
  { label: 'NAXAL',      marked: false },
  { label: 'AGENT',      marked: false },
  { label: 'JIHADI',     marked: false },
  { label: 'MAOIST',     marked: true  },
  { label: 'APPEASER',   marked: false },
  { label: 'TERRORIST',  marked: false },
  { label: 'KHALISTANI', marked: false },
  { label: 'FRANDS',     marked: true  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onPlayBingo,
  onOpenMethodology,
  onOpenHowItWorks,
  onOpenAboutMe,
  isDarkMode,
  onToggleDarkMode,
  isDramatic,
  onToggleDramatic,
}) => {
  const [demoBoard, setDemoBoard] = React.useState(DEMO_LABELS);

  const toggleDemoSquare = (idx: number) => {
    setDemoBoard((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, marked: !item.marked } : item))
    );
  };

  const markedCount = demoBoard.filter((item) => item.marked).length;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className="min-h-screen font-body flex flex-col transition-colors duration-200"
      style={{ backgroundColor: isDarkMode ? '#0B0F19' : '#FFFFFF', color: isDarkMode ? '#E2E8F0' : '#1E293B' }}
    >

      {/* HEADER */}
      <header
        className="py-3 px-3 sm:px-8 sticky top-0 z-30 transition-colors duration-200 border-b-2"
        style={{ backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF', borderColor: isDarkMode ? '#1E293B' : '#E2E8F0' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">

          <div className="flex items-center gap-2 flex-shrink min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-400 rounded-xl sm:rounded-2xl border-2 border-amber-500
              flex items-center justify-center shadow-[0_2px_0_0_#D97706] flex-shrink-0">
              <Target className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span
                className="font-display font-black text-xs sm:text-xl tracking-tight leading-tight truncate block"
                style={{ color: isDarkMode ? '#FFFFFF' : '#0F172A' }}
              >
                PLAYBOOK BINGO
              </span>
              <span
                className="text-[8.5px] sm:text-xs font-semibold leading-none truncate block mt-0.5"
                style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}
              >
                Discredit Dissent
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 font-extrabold text-xs">
            <button onClick={() => scrollToSection('how-it-works')}
              className="px-3.5 py-2 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>
              How It Works
            </button>
            <button onClick={onOpenMethodology}
              className="px-3.5 py-2 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>
              Who is George Orwell?
            </button>
            <button onClick={() => scrollToSection('orwell-info')}
              className="px-3.5 py-2 rounded-xl transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{ color: isDarkMode ? '#E2E8F0' : '#334155' }}>
              Disclaimer
            </button>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              type="button"
              className={`h-9 inline-flex items-center justify-center px-2.5 sm:px-3.5 rounded-xl border-2 text-xs font-black transition-all duration-200 cursor-pointer select-none ${
                isDarkMode
                  ? 'bg-gradient-to-r from-purple-600 via-rose-600 to-purple-700 border-purple-400 text-white shadow-[0_2.5px_0_0_#3B0764] hover:border-purple-300'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_2.5px_0_0_#CBD5E1] hover:border-slate-300'
              }`}
              title="Toggle Dark Mode"
              aria-label={`Dark mode: ${isDarkMode ? 'on' : 'off'}`}
            >
              <Moon className={`w-3.5 h-3.5 transition-transform duration-200 ${isDarkMode ? 'text-purple-200 fill-purple-200 scale-110' : 'text-slate-500'}`} />
              <span className="hidden md:inline font-black tracking-wide ml-1.5">Dark</span>
              {/* Desktop-only miniature ON/OFF Switch */}
              <div className={`hidden md:flex w-7 h-3.5 rounded-full p-0.5 transition-all duration-200 items-center ml-1.5 ${
                isDarkMode ? 'bg-purple-400 justify-end shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]' : 'bg-slate-300 justify-start'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${isDarkMode ? 'bg-purple-950 shadow-md' : 'bg-slate-600'}`} />
              </div>
            </button>

            {/* Dramatic Mode Toggle (Rain & Thunder) */}
            <button
              onClick={onToggleDramatic}
              type="button"
              className={`h-9 inline-flex items-center justify-center px-2.5 sm:px-3.5 rounded-xl border-2 text-xs font-black transition-all duration-200 cursor-pointer select-none ${
                isDramatic
                  ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 border-amber-300 text-white shadow-[0_2.5px_0_0_#B45309] animate-pulse'
                  : isDarkMode
                  ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 shadow-[0_2.5px_0_0_#0F172A]'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-[0_2.5px_0_0_#CBD5E1] hover:border-slate-300'
              }`}
              title="Toggle Dramatic Rain & Thunder Mode"
              aria-label={`Dramatic mode: ${isDramatic ? 'on' : 'off'}`}
            >
              <CloudRain className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isDramatic ? 'text-amber-200 scale-110' : isDarkMode ? 'text-amber-400' : 'text-slate-500'
              }`} />
              <span className="hidden md:inline font-black tracking-wide ml-1.5">Dramatic</span>
              {/* Desktop-only miniature ON/OFF Switch */}
              <div className={`hidden md:flex w-7 h-3.5 rounded-full p-0.5 transition-all duration-200 items-center ml-1.5 ${
                isDramatic ? 'bg-amber-300 justify-end shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)]' : isDarkMode ? 'bg-slate-700 justify-start' : 'bg-slate-300 justify-start'
              }`}>
                <div className={`w-2.5 h-2.5 rounded-full transition-transform duration-200 ${
                  isDramatic ? 'bg-amber-950 shadow-md' : isDarkMode ? 'bg-slate-400' : 'bg-slate-600'
                }`} />
              </div>
            </button>

            <button onClick={onPlayBingo} className="btn-primary h-9 !py-0 px-3 sm:px-4 text-xs font-black gap-1.5 rounded-xl inline-flex items-center justify-center flex-shrink-0">
              <Play className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
              <span className="hidden sm:inline">PLAY BINGO</span>
              <span className="sm:hidden font-black">PLAY</span>
            </button>
          </div>

        </div>
      </header>

      {/* HERO */}
      <section
        className="relative overflow-hidden min-h-[calc(100vh-70px)] scroll-mt-[70px] py-8 sm:py-12 md:py-16 px-4 sm:px-8 border-b-2 flex items-center transition-colors duration-200"
        style={{ backgroundColor: isDarkMode ? '#0B0F19' : '#FFFFFF', borderColor: isDarkMode ? '#1E293B' : '#E2E8F0' }}
      >

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          {/* Left: pitch */}
          <div className="lg:col-span-7 text-left space-y-5 order-2 lg:order-1">

            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-extrabold text-[9px] sm:text-[10px] uppercase tracking-wide shadow-xs"
              style={{
                backgroundColor: isDarkMode ? 'rgba(69, 26, 3, 0.6)' : '#FEF3C7',
                borderColor: isDarkMode ? 'rgba(180, 83, 9, 0.5)' : '#FDE68A',
                color: isDarkMode ? '#FDE68A' : '#78350F',
              }}
            >
              <Flame className="w-3 h-3 fill-amber-500 flex-shrink-0" style={{ color: isDarkMode ? '#F59E0B' : '#D97706' }} />
              <span>please dont sue me prettty please</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight font-display"
              style={{ color: isDarkMode ? '#FFFFFF' : '#0F172A' }}
            >
              How many labels can they fit{' '}
              <span className="inline-block text-transparent bg-clip-text
                bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600
                underline decoration-amber-400 decoration-wavy decoration-2">
                on one movement?
              </span>
            </h1>

            <p
              className="hidden lg:block text-base sm:text-xl font-medium leading-relaxed max-w-xl"
              style={{ color: isDarkMode ? '#CBD5E1' : '#475569' }}
            >
              Spot the wild labels, political buzzwords, and viral accusations thrown around daily.
              Tap the board, spot the labels, and play along for the laughs!
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full sm:w-auto">
              <button onClick={onPlayBingo} className="btn-primary text-base sm:text-lg py-3.5 sm:py-4 px-7 justify-center gap-2 rounded-2xl shadow-lg w-full sm:w-auto">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-slate-950 stroke-none" />
                <span>PLAY BINGO</span>
              </button>
              <button onClick={() => scrollToSection('how-it-works')}
                className="btn-secondary text-sm sm:text-base py-3.5 sm:py-4 px-6 justify-center gap-2 rounded-2xl w-full sm:w-auto">
                <HelpCircle className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                <span>HOW IT WORKS</span>
              </button>
            </div>

          </div>

          {/* Right: Retro Console with Demo Card in Screen */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] console-wiggle-container">
              {/* Console Frame Image */}
              <img
                src="/ChatGPT Image Aug 18, 2026, 12_14_40 AM.png"
                alt="Playbook Bingo Console"
                className="w-full h-auto block select-none pointer-events-none drop-shadow-2xl"
              />

              {/* Screen Overlay (positioned inside console screen frame) */}
              <div
                className="absolute bg-[#111625] rounded-[10px] p-1.5 sm:p-2 flex flex-col justify-between overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] z-20 pointer-events-auto"
                style={{
                  top: 'calc(19.0% - 1px)',
                  left: '20.0%',
                  width: '60.0%',
                  height: 'calc(48.2% - 5px)',
                }}
              >
                {/* Screen Header */}
                <div className="flex items-center justify-between pb-1 border-b border-slate-800 flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    <span className="font-black text-[8px] sm:text-[10px] text-amber-400 uppercase tracking-wide">
                      WHO ARE YOU??
                    </span>
                  </div>
                  <span className="bg-amber-400/20 text-amber-300 text-[8px] sm:text-[9px] font-black px-1.5 py-px rounded-full border border-amber-400/30">
                    {markedCount} / 25
                  </span>
                </div>

                {/* 3×3 mini interactive preview grid */}
                <div className="grid grid-cols-3 gap-1 flex-1 my-1 overflow-hidden relative z-30">
                  {demoBoard.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleDemoSquare(idx)}
                      className={`p-1 rounded-md sm:rounded-lg border text-center transition-all cursor-pointer select-none
                        flex items-center justify-center gap-1 active:scale-95 relative z-30 pointer-events-auto ${
                          item.marked
                            ? 'bg-amber-400 border-amber-500 shadow-[0_1.5px_0_0_#D97706]'
                            : 'bg-slate-800/90 text-slate-200 border-slate-700/80 hover:bg-slate-750'
                        }`}
                      style={item.marked ? { backgroundColor: '#F59E0B', borderColor: '#D97706' } : undefined}
                    >
                      <span
                        className={`text-[8px] sm:text-[10px] font-black uppercase tracking-tight leading-none text-center truncate ${
                          item.marked ? 'font-black' : 'text-slate-100 font-bold'
                        }`}
                        style={item.marked ? { color: '#020617' } : undefined}
                      >
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Screen Footer */}
                <div className="bg-slate-950/80 px-1 py-0.5 rounded text-center flex-shrink-0 border border-slate-800/80">
                  <span className="text-[7px] sm:text-[8.5px] font-black text-amber-300 tracking-wider truncate block uppercase">
                    are you politically correct?
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="relative min-h-[calc(100vh-70px)] scroll-mt-[70px] py-16 md:py-24 px-4 sm:px-8 border-b-2 border-slate-200 bg-white flex items-center overflow-hidden">
        {/* Animated Fireworks Background */}
        <FireworksCanvas />

        <div className="max-w-6xl mx-auto w-full relative z-10">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
              bg-purple-100 border border-purple-300 text-purple-800 font-extrabold
              text-xs uppercase tracking-wide mb-4">
              <Sparkles className="w-4 h-4" />
              <span>3-Step Gameplay</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              How Playbook Bingo Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8
              hover:-translate-y-1 transition-transform shadow-[0_4px_0_0_#E2E8F0]">
              <div className="w-14 h-14 rounded-2xl bg-rose-500 text-white font-display
                font-black text-2xl flex items-center justify-center mb-6 shadow-[0_3px_0_0_#9F1239]">
                01
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">SPOT THE LABEL</h3>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                Hear a political buzzword on TV or social media? Whenever someone drops a classic
                label on a movement, tap the square to mark it!
              </p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8
              hover:-translate-y-1 transition-transform shadow-[0_4px_0_0_#E2E8F0]">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white font-display
                font-black text-2xl flex items-center justify-center mb-6 shadow-[0_3px_0_0_#B45309]"
                style={{ color: '#FFFFFF' }}>
                02
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">ADD EVIDENCE</h3>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                Got a link, clip, or quote? Double-click any square to add your notes
                and show where it was used out in the wild!
              </p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-slate-200 p-8
              hover:-translate-y-1 transition-transform shadow-[0_4px_0_0_#E2E8F0]">
              <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-display
                font-black text-2xl flex items-center justify-center mb-6 shadow-[0_3px_0_0_#5B21B6]">
                03
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">GET BINGO!</h3>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                Hit 5 in a row or fill the board to score BINGO! Download and share your card
                because the rhetoric speaks for itself.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ENJOY + SATIRE */}
      <section id="orwell-info" className="relative min-h-[calc(100vh-70px)] scroll-mt-[70px] py-16 md:py-24 px-4 sm:px-8 border-b-2 border-slate-200 bg-white flex items-center overflow-hidden">
        
        {/* 6-Row Alternating Satire Ticker Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex flex-col justify-between py-2 opacity-80 z-0">
          {/* Row 1: Left to Right */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-left flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-amber-500/10 dark:text-amber-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>

          {/* Row 2: Right to Left */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-right flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-purple-600/10 dark:text-purple-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>

          {/* Row 3: Left to Right */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-left flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-rose-500/10 dark:text-rose-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>

          {/* Row 4: Right to Left */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-right flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-amber-500/10 dark:text-amber-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>

          {/* Row 5: Left to Right */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-left flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-emerald-500/10 dark:text-emerald-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>

          {/* Row 6: Right to Left */}
          <div className="overflow-hidden flex items-center">
            <div className="animate-ticker-right flex items-center gap-12">
              {Array(12).fill(0).map((_, i) => (
                <span key={i} className="satire-ticker-text text-rose-500/10 dark:text-rose-400/20">
                  SATIRE &bull;
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative z-10">

          <div className="bg-white rounded-3xl border-2 border-slate-200 p-10
            shadow-[0_6px_0_0_#E2E8F0]">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300
              flex items-center justify-center text-amber-800 font-black mb-6">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">Notice the pattern? Enjoy.</h3>
            <p className="text-base font-medium text-slate-600 leading-relaxed">
              Ever noticed how every protest gets the exact same set of labels?
              The joke practically writes itself so I turned it into a bingo game. Play along!
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-slate-200 p-10
            shadow-[0_6px_0_0_#E2E8F0]">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 border border-rose-300
              flex items-center justify-center text-rose-700 font-black mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">100% Satire.</h3>
            <p className="text-base font-medium text-slate-600 leading-relaxed">
              I'm here for pure satire and laughs. The labels track real viral rhetoric used out
              in the wild, served up in a fun, interactive game. Have fun!
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[calc(100vh-73px)] py-16 md:py-24 px-4 overflow-hidden border-b-2 border-slate-200
        text-white text-center flex items-center justify-center snap-start">
        
        {/* Strict Rectangular Clipped Background Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 rainbow-cta-bg" />
          <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rainbow-blob-1" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rainbow-blob-2" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8 w-full relative z-10 cta-content-wiggle-tilt">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-display">
            How many labels can they fit<br />
            on one movement?
          </h2>
          <p className="text-base sm:text-xl font-bold text-white/95 leading-snug">
            Grab your 5×5 board, spot the labels,<br />
            and have some fun!
          </p>
          <div className="relative z-30 pointer-events-auto">
            <button
              type="button"
              onClick={onPlayBingo}
              className="font-black text-xl py-5 px-12 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all
                inline-flex items-center gap-3 cursor-pointer select-none relative z-30 pointer-events-auto"
              style={{ backgroundColor: '#FFFFFF', color: '#020617' }}
            >
              <Play className="w-6 h-6 stroke-none" style={{ fill: '#020617', color: '#020617' }} />
              <span style={{ color: '#020617' }}>LAUNCH BINGO GAME</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-10 px-4 sm:px-8
        border-t-4 border-amber-400 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row
          items-center justify-between gap-6">

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-400 rounded-xl border border-amber-500
              flex items-center justify-center text-slate-950 font-black text-lg">
              🎯
            </div>
            <div>
              <span className="font-display font-black text-xl text-white tracking-tight block leading-none">
                PLAYBOOK BINGO
              </span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                GOVERNMENT'S PLAYBOOK BINGO
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-extrabold text-slate-300">
              <button onClick={onOpenHowItWorks} className="hover:text-amber-400 transition-colors">
                How It Works
              </button>
              <button onClick={onOpenMethodology} className="hover:text-amber-400 transition-colors">
                Who is George Orwell?
              </button>
              <button onClick={() => scrollToSection('orwell-info')} className="hover:text-amber-400 transition-colors">
                Disclaimer
              </button>
            </div>

            {/* 50/50 Equal-width action buttons: PLAY BINGO (Left) & ABOUT ME (Right) */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm sm:max-w-md">
              <button
                onClick={onPlayBingo}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3 px-2 text-xs sm:text-sm font-black rounded-xl shadow-md hover:scale-105 transition-transform"
              >
                <Play className="w-4 h-4 fill-slate-950 stroke-none flex-shrink-0" />
                <span className="truncate">PLAY BINGO</span>
              </button>
              {onOpenAboutMe && (
                <button
                  onClick={onOpenAboutMe}
                  className="bg-purple-600 hover:bg-purple-500 text-white border-2 border-purple-400 w-full inline-flex items-center justify-center gap-1.5 py-3 px-2 text-xs sm:text-sm font-black rounded-xl shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                  <span className="truncate">ABOUT ME</span>
                </button>
              )}
            </div>
          </div>

          <span className="text-[11px] text-slate-500 font-semibold">
            © 2026 TUNG TUNG TUNG SAHUR(TRIPLE T)
          </span>

        </div>
      </footer>

    </div>
  );
};
