"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldAlert, Zap } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Abstract Vacuum Tube Component
function AbstractVacuumTube({ scrollYProgress }: { scrollYProgress: any }) {
  const group = useRef<THREE.Group>(null);
  const filament1 = useRef<THREE.Mesh>(null);
  const filament2 = useRef<THREE.Mesh>(null);
  const casing = useRef<THREE.Mesh>(null);

  // Transform values for exploded view based on scroll
  // The outer casing stays mostly put, internal parts move out
  const expandY = useTransform(scrollYProgress, [0, 0.5], [0, 2]);

  useFrame(() => {
    if (filament1.current && filament2.current) {
      filament1.current.position.y = expandY.get();
      filament2.current.position.y = -expandY.get();

      // Pulse the filament
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time * 2) * 0.2 + 0.8;
      (filament1.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 2;
      (filament2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse * 2;
    }
  });

  return (
    <group ref={group} rotation={[0, Math.PI / 4, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Outer Glass Casing */}
        <mesh ref={casing} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#222"
            transmission={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Top Cap */}
        <mesh position={[0, 2, 0]}>
          <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Bottom Base */}
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[1.5, 1.4, 0.5, 32]} />
          <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Pins */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[Math.cos(i * Math.PI / 2) * 0.8, -2.5, Math.sin(i * Math.PI / 2) * 0.8]}>
            <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
            <meshStandardMaterial color="#gold" metalness={1} roughness={0.2} />
          </mesh>
        ))}

        {/* Inner Glowing Filament 1 */}
        <mesh ref={filament1} position={[0, 0, 0]}>
          <boxGeometry args={[0.2, 2.5, 0.2]} />
          <meshStandardMaterial
            color="#FF7B00"
            emissive="#FF7B00"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Inner Glowing Filament 2 */}
        <mesh ref={filament2} position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.2, 2.5, 0.2]} />
          <meshStandardMaterial
            color="#FF7B00"
            emissive="#FF7B00"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        {/* Internal Supports */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
          <meshStandardMaterial color="#444" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

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
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00FF00" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#FF7B00" />
          <AbstractVacuumTube scrollYProgress={scrollYProgress} />
          <Environment preset="city" />
        </Canvas>
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
