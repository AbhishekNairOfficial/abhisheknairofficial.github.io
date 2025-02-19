import React from 'react';
import Header from '@/app/organisms/Header';
import DateDisplay from './atoms/Date';
import Banner from './atoms/Banner';
import Experience from './organisms/Experience';
import Work from './organisms/Work';
import Clients from './molecules/Clients';
import LetsTalk from './organisms/LetsTalk';

const PortfolioPage = () => {

  return (
    <>
      <div className="w-screen h-[20px] bg-primary" />
      <Header />
      <DateDisplay />
      <Banner />
      <Experience />
      <Work />
      <Clients />
      <LetsTalk />
    </>
  );
};

export default PortfolioPage;