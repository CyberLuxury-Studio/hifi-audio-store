"use client";
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTransform } from 'framer-motion';

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

export default function Hero3DScene({ scrollYProgress }: { scrollYProgress: any }) {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#00FF00" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#FF7B00" />
      <AbstractVacuumTube scrollYProgress={scrollYProgress} />
      <Environment preset="city" />
    </Canvas>
  );
}
