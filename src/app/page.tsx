import React from 'react';
import Header from '@/app/organisms/Header';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';
import Footer from './organisms/Footer';
import Hero from './molecules/Hero';
import Skills from './organisms/Skills';

const PortfolioPage = () => {

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Hero />
        <Experience />
        <Clients />
        <Skills />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;