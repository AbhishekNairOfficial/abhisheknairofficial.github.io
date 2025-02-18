import React from 'react';
import Header from '@/app/organisms/Header';
import DateDisplay from './atoms/Date';
import Banner from './atoms/Banner';
import Experience from './atoms/Experience';

const PortfolioPage = () => {

  return (
    <>
      <div className="w-screen h-[20px] bg-primary" />
      <Header />
      <DateDisplay />
      <Banner />
      <Experience />
    </>
  );
};

export default PortfolioPage;