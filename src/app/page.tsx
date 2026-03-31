import React from 'react';
import Header from '@/app/organisms/Header';
import Hero from './molecules/Hero';
import { About } from './molecules/About';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import Skills from './organisms/Skills';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';
import Footer from './organisms/Footer';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Work />
        <Skills />
        <Clients />
        <LetsTalk />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
