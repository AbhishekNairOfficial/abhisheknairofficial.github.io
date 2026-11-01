import React from 'react';
import Header from '@/app/organisms/Header';
import { IdentityColumn } from '@/app/organisms/IdentityColumn';
import { About } from './molecules/About';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';
import Footer from './organisms/Footer';

const PortfolioPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-6xl px-6 lg:flex lg:gap-20 lg:px-8">
        <IdentityColumn />
        <main
          className="flex-1 py-8 lg:max-w-xl lg:py-24"
          id="main"
        >
          <About />
          <Experience />
          <Work />
          <Clients />
          <LetsTalk />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
