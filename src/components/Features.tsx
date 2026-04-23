"use client";
import React from 'react';
import { motion } from 'framer-motion';

const telemetryData = [
  {
    title: "Class-A Amplification",
    metric1: "[THD: <0.0001%]",
    metric2: "[OUTPUT: 2W @ 32Ω]",
    desc: "Discrete components running in pure Class A for zero crossover distortion.",
    accent: "#FF7B00",
    graphType: "thd"
  },
  {
    title: "Planar Magnetic Drivers",
    metric1: "[FR: 5Hz - 50kHz]",
    metric2: "[IMPEDANCE: 18Ω]",
    desc: "Ultra-thin diaphragm for transient response that defies acoustic limits.",
    accent: "#00FF00",
    graphType: "fr"
  },
  {
    title: "R2R DAC Architecture",
    metric1: "[SNR: 130dB]",
    metric2: "[JITTER: <10fs]",
    desc: "Resistor ladder decoding for pure, uncolored digital-to-analog conversion.",
    accent: "#FF7B00",
    graphType: "snr"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-32 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", mass: 2, damping: 40, stiffness: 200 }}
          className="mb-16 border-l-2 border-[#FF7B00] pl-4"
        >
          <h2 className="text-4xl font-bold uppercase tracking-widest font-['Space_Grotesk'] text-[#e5e2e1]">
            Sonic Telemetry
          </h2>
          <p className="font-mono text-[#84967e] text-sm mt-2">HARDWARE SPECIFICATIONS & ACOUSTIC MEASUREMENTS</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {telemetryData.map((data, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, type: "spring", mass: 2, damping: 40, stiffness: 200 }}
              className="glass-panel p-8 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold uppercase tracking-widest text-[#e5e2e1] mb-2 font-['Space_Grotesk'] group-hover:text-[#FF7B00] transition-colors">{data.title}</h3>

                <div className="flex flex-col gap-1 mb-6 mt-4">
                  <span className="font-mono text-xs text-[#00FF00] bg-[#00FF00]/5 px-2 py-1 w-fit border border-[#00FF00]/20">{data.metric1}</span>
                  <span className="font-mono text-xs text-[#FF7B00] bg-[#FF7B00]/5 px-2 py-1 w-fit border border-[#FF7B00]/20">{data.metric2}</span>
                </div>

                <p className="text-[#84967e] text-sm leading-relaxed mb-8">
                  {data.desc}
                </p>
              </div>

              {/* Static SVG Visualization that animates on scroll */}
              <div className="w-full h-24 border border-white/5 bg-black/50 relative overflow-hidden flex items-end">
                {/* Grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

                <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {data.graphType === "fr" && (
                    <motion.path
                      d="M0,90 Q10,90 20,40 T40,30 T60,35 T80,30 T100,50"
                      fill="none"
                      stroke={data.accent}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 + 0.3 }}
                    />
                  )}
                  {data.graphType === "thd" && (
                    <motion.path
                      d="M0,95 L10,95 L20,92 L30,90 L40,85 L50,88 L60,80 L70,75 L80,60 L90,20 L100,10"
                      fill="none"
                      stroke={data.accent}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 + 0.3 }}
                    />
                  )}
                  {data.graphType === "snr" && (
                    <motion.path
                      d="M0,10 L20,15 L40,12 L60,18 L80,14 L100,10"
                      fill="none"
                      stroke={data.accent}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.2 + 0.3 }}
                    />
                  )}
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
