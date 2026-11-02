import React from 'react';
import Header from '@/app/organisms/Header';
import Hero from './molecules/Hero';
import { Systems } from './molecules/Systems';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import { Now } from './molecules/Now';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';
import Footer from './organisms/Footer';

export const dynamic = 'force-static';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main id="main">
        <Hero />
        <Systems />
        <Experience />
        <Work />
        <Now />
        <Clients />
        <LetsTalk />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
