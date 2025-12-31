
import React, { useState, useEffect } from 'react';
import CanvasScene from './components/CanvasScene';
import Countdown from './components/Countdown';
import GeminiGreeting from './components/GeminiGreeting';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-[#D4AF37]">
      {/* Background Canvas Logic (Particles & Fireworks) */}
      <CanvasScene />

      {/* Main UI Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none select-none">
        
        {/* Decorative Top Line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 opacity-60"></div>

        {/* Central Text */}
        <header className="text-center animate-fade-in px-4">
          <h1 className="font-serif-elegant text-5xl md:text-8xl lg:text-9xl font-bold tracking-widest drop-shadow-[0_5px_15px_rgba(212,175,55,0.4)]">
            HAPPY <span className="italic">NEW YEAR</span>
          </h1>
          <h2 className="font-serif-elegant text-6xl md:text-9xl mt-2 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#FFDF00] via-[#D4AF37] to-[#8A6D3B]">
            2026
          </h2>
        </header>

        {/* Countdown Timer */}
        <div className="mt-12 pointer-events-auto">
          <Countdown targetDate="2026-01-01T00:00:00" />
        </div>

        {/* Subtitle / Interaction Guide */}
        <p className="mt-16 text-xs md:text-sm uppercase tracking-[0.4em] opacity-40 font-light">
          Click anywhere to light up the sky
        </p>

        {/* Decorative Bottom Line */}
        <div className="mt-12 w-48 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30"></div>
        
        {/* Gemini Integration Component */}
        <div className="mt-8 pointer-events-auto">
          <GeminiGreeting />
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#D4AF37] opacity-10 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 border border-[#D4AF37] opacity-5 rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
