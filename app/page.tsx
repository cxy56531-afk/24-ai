import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import KillerSection from '@/components/landing/KillerSection';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Header />
      <main>
        <Hero />
        <KillerSection />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}