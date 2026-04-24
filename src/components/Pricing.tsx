"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

const rigs = [
  {
    name: "Entry Node (Desktop)",
    price: "$850",
    desc: "Compact solid-state DAC/Amp combo + dynamic driver headphones.",
    color: "#e5e2e1",
    components: [
      "DAC: AK4490EQ (32-bit/768kHz)",
      "AMP: Class-D (1.5W @ 32Ω)",
      "HP: 50mm Dynamic Beryllium"
    ]
  },
  {
    name: "Audiophile Node (Planar)",
    price: "$3,200",
    desc: "Balanced R2R DAC stack + flagship planar magnetic headphones.",
    color: "#00FF00",
    isPopular: true,
    components: [
      "DAC: Discrete R2R Array",
      "AMP: Class-A Dual Mono (4W)",
      "HP: 106mm Planar Magnetic"
    ]
  },
  {
    name: "Endgame Node (Electrostatic)",
    price: "$12,500",
    desc: "High-voltage tube energizer + ultra-thin film electrostatic headphones.",
    color: "#FF7B00",
    components: [
      "DAC: FPGA-based Oversampling",
      "AMP: 300B Vacuum Tube Energizer",
      "HP: 0.5μm Electrostatic Diaphragm"
    ]
  }
];

export default function Pricing() {
  const [securedItems, setSecuredItems] = useState<Record<number, boolean>>({});

  const handleSecure = (index: number) => {
    setSecuredItems(prev => ({ ...prev, [index]: true }));
    setTimeout(() => {
      setSecuredItems(prev => ({ ...prev, [index]: false }));
    }, 2000);
  };

  return (
    <section id="pricing" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold uppercase tracking-widest font-['Space_Grotesk'] text-[#e5e2e1]">
            Curated Rigs
          </h2>
          <p className="font-mono text-[#84967e] text-sm mt-2">PRE-CONFIGURED ACOUSTIC ARSENALS</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {rigs.map((rig, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", mass: 2, damping: 40, stiffness: 200 }}
              className={`glass-panel p-8 relative flex flex-col ${rig.isPopular ? 'border-[#00FF00] md:-translate-y-4 z-10' : 'border-white/10 hover:border-[#84967e]'}`}
            >
              {rig.isPopular && (
                <div className="absolute top-0 right-0 bg-[#00FF00] text-black text-xs font-bold font-mono uppercase tracking-widest px-3 py-1">
                  OPTIMAL SPEC
                </div>
              )}

              <h3 className="text-xl uppercase tracking-widest font-['Space_Grotesk'] mb-2" style={{ color: rig.color }}>
                {rig.name}
              </h3>

              <div className="text-4xl font-bold font-mono mb-4 text-[#e5e2e1]">{rig.price}</div>
              <p className="text-[#84967e] text-sm mb-8 h-10">{rig.desc}</p>

              {/* Brutalist Thumbnails Placeholder */}
              <div className="grid grid-cols-3 gap-2 mb-8 h-16">
                <div className="bg-[#111] border border-[#222] flex items-center justify-center filter grayscale contrast-125">
                  <span className="font-mono text-[8px] text-[#444] rotate-[-45deg] tracking-widest">DAC</span>
                </div>
                <div className="bg-[#111] border border-[#222] flex items-center justify-center filter grayscale contrast-125">
                  <span className="font-mono text-[8px] text-[#444] rotate-[-45deg] tracking-widest">AMP</span>
                </div>
                <div className="bg-[#111] border border-[#222] flex items-center justify-center filter grayscale contrast-125">
                  <span className="font-mono text-[8px] text-[#444] rotate-[-45deg] tracking-widest">HEADPHONE</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="font-mono text-[10px] text-[#84967e] mb-3 uppercase tracking-widest border-b border-[#3b4b37]/30 pb-1">
                  SYSTEM COMPONENTS
                </div>
                <ul className="space-y-3 mb-8 text-[#e5e2e1] text-xs font-mono">
                  {rig.components.map((comp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Plus className="w-3 h-3 mt-0.5 text-[#444] shrink-0" />
                      <span className="text-[#aaa]">{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSecure(i)}
                className={`w-full py-4 font-mono uppercase font-bold tracking-widest text-sm transition-all flex items-center justify-center gap-2 ${
                  securedItems[i]
                    ? 'bg-[#00FF00]/10 border border-[#00FF00] text-[#00FF00] shadow-[0_0_15px_rgba(0,255,0,0.4)]'
                    : rig.isPopular
                      ? 'bg-[#00FF00] text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                      : 'border border-[#84967e] text-[#84967e] hover:bg-[#84967e] hover:text-black'
                }`}
              >
                {securedItems[i] ? (
                  <>
                    <Check className="w-4 h-4" /> [SECURED]
                  </>
                ) : (
                  '[ADD TO ARSENAL]'
                )}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
