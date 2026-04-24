"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

const Hero3DScene = dynamic(() => import('./Hero3DScene'), { ssr: false });

export default function Hero() {
  const { scrollYProgress } = useScroll();

  return (
    <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden min-h-[120vh] flex flex-col justify-start items-center">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00FF00] rounded-full mix-blend-screen filter blur-[250px] opacity-5 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF7B00] rounded-full mix-blend-screen filter blur-[250px] opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", mass: 2, damping: 40, stiffness: 200 }}
        className="inline-flex items-center gap-2 px-4 py-1 border border-[#00FF00]/30 text-[#00FF00] font-mono text-xs uppercase tracking-widest mx-auto mb-8 bg-[#00FF00]/5 shadow-[0_0_15px_rgba(0,255,0,0.1)]"
      >
        <ShieldAlert className="w-4 h-4" /> SECURE CHANNEL ESTABLISHED
      </motion.div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", mass: 2, damping: 40, stiffness: 200, delay: 0.1 }}
        className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 font-['Space_Grotesk'] uppercase relative z-10 leading-none"
      >
        AURAL_<span className="text-[#00FF00] underline decoration-[#FF7B00] underline-offset-8">PROTOCOL.</span>
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-xl text-[#84967e] mb-12 max-w-2xl mx-auto relative z-10 font-mono text-sm"
      >
        CYBER-LUXURY AUDIOPHILE EQUIPMENT. <br/> ENGINEERED FOR EXTREME ACOUSTIC PRECISION.
      </motion.p>
      
      {/* 3D Canvas integration directly beneath typography */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="w-full h-[500px] relative z-0 mt-[-40px]"
      >
        <Hero3DScene scrollYProgress={scrollYProgress} />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="font-mono text-xs text-[#FF7B00]/70 tracking-widest uppercase">SCROLL TO DISENGAGE COMPONENTS</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", mass: 2, damping: 40, stiffness: 200, delay: 0.8 }}
        className="flex gap-6 justify-center relative z-10 mt-8"
      >
        <button className="flex items-center gap-3 px-10 py-5 border-2 border-[#00FF00] bg-transparent text-[#00FF00] font-mono font-bold uppercase tracking-widest text-lg hover:bg-[#00FF00] hover:text-black hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all">
          <Zap className="w-5 h-5" /> INITIALIZE HARDWARE
        </button>
      </motion.div>
    </section>
  );
}
