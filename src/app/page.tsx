import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ListeningChamber from '@/components/ListeningChamber';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';

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
