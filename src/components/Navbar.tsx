"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", mass: 2, damping: 40, stiffness: 200 }}
      className="fixed w-full z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-[#3b4b37]/30"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xl font-bold tracking-tighter text-[#00FF00] font-['Space_Grotesk']">
          <Terminal className="w-6 h-6 text-[#00FF00]" />
          AURAL_PROTOCOL
        </div>
        <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest text-[#84967e] font-['Space_Grotesk']">
          <a href="#features" className="hover:text-[#00FF00] transition-colors">Telemetry</a>
          <a href="#pricing" className="hover:text-[#00FF00] transition-colors">Arsenal</a>
          <a href="#docs" className="hover:text-[#00FF00] transition-colors">Manual</a>
        </div>
        <button className="px-6 py-2 border border-[#00FF00]/50 text-[#00FF00] text-sm uppercase font-bold tracking-widest font-['Space_Grotesk'] hover:bg-[#00FF00] hover:text-black hover:shadow-[0_0_15px_rgba(0,255,0,0.4)] transition-all">
          Connect Device
        </button>
      </div>
    </motion.nav>
  );
}
