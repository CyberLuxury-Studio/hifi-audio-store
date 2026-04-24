"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Square, Volume2 } from 'lucide-react';

export default function ListeningChamber() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 px-6 relative z-10 border-y border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 border-l-2 border-[#00FF00] pl-4">
          <h2 className="text-3xl font-bold font-['Space_Grotesk'] text-white uppercase tracking-tighter">
            THE LISTENING CHAMBER
          </h2>
          <p className="font-mono text-[#84967e] text-sm mt-1">Lossless FLAC playback simulator. Rack-mount interface.</p>
        </div>

        {/* Rack Mount Interface */}
        <div className="glass-panel rounded-sm p-8 relative overflow-hidden">
          {/* Rack mount screws */}
          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[#222] border border-[#444] shadow-inner"></div>
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[#222] border border-[#444] shadow-inner"></div>
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[#222] border border-[#444] shadow-inner"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[#222] border border-[#444] shadow-inner"></div>

          <div className="flex flex-col md:flex-row items-center gap-8 px-8">

            {/* Control Panel */}
            <div className="flex flex-col items-start gap-4 shrink-0">
              <div className="font-mono text-[10px] text-[#84967e] mb-2 uppercase tracking-widest border-b border-[#3b4b37]/30 pb-1 w-full">
                TRANSPORT CONTROLS
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center justify-center gap-2 px-6 py-3 font-mono font-bold uppercase tracking-widest text-sm transition-all border ${
                  isPlaying
                    ? 'border-[#FF7B00] bg-[#FF7B00]/10 text-[#FF7B00] shadow-[0_0_15px_rgba(255,123,0,0.3)]'
                    : 'border-[#00FF00] bg-transparent text-[#00FF00] hover:bg-[#00FF00]/10'
                }`}
              >
                {isPlaying ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                [EXECUTE PLAYBACK]
              </motion.button>

              <div className="flex items-center gap-4 mt-2 w-full">
                <Volume2 className="w-4 h-4 text-[#84967e]" />
                <div className="flex-1 h-1 bg-[#222] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00FF00] w-[75%]"></div>
                </div>
              </div>
            </div>

            {/* Display / Visualizer */}
            <div className="flex-1 bg-[#050505] border border-white/10 rounded p-4 relative min-h-[120px] flex flex-col justify-between overflow-hidden shadow-inner w-full">
              {/* Scanline overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none opacity-50"></div>

              <div className="flex justify-between items-start relative z-20">
                <div className="font-mono text-[#00FF00] text-xs">
                  {isPlaying ? '> STATUS: STREAMING' : '> STATUS: IDLE'}
                </div>
                <div className="font-mono text-[#FF7B00] text-xs">
                  [96kHz / 24-bit]
                </div>
              </div>

              {/* Dynamic Visualizer */}
              <div className="flex items-end justify-between h-16 gap-[2px] mt-4 relative z-20">
                {Array.from({ length: 48 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={
                      isPlaying
                        ? { height: ["10%", `${Math.random() * 80 + 20}%`, "10%"] }
                        : { height: "2px" }
                    }
                    transition={{
                      repeat: isPlaying ? Infinity : 0,
                      duration: Math.random() * 0.5 + 0.3,
                      ease: "linear"
                    }}
                    className={`w-full rounded-t-sm ${i % 3 === 0 ? 'bg-[#FF7B00]' : 'bg-[#00FF00]'}`}
                    style={{ opacity: 0.8 }}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
