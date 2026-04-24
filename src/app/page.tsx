import React from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

const ListeningChamber = dynamic(() => import('@/components/ListeningChamber'));
const Features = dynamic(() => import('@/components/Features'));
const Pricing = dynamic(() => import('@/components/Pricing'));

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-neon-green selection:text-black">
      <Navbar />
      <Hero />
      <ListeningChamber />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
