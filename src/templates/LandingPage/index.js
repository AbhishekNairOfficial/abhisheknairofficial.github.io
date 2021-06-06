import React from 'react';

import HeroText from 'atoms/HeroText';
import NavBar from 'organisms/NavBar';
import BannerImage from 'atoms/BannerImage';

import styles from './index.module.css';

const LandingPage = () => (
  <div className={styles.container}>
    <NavBar />
    <div className={styles.mainPart}>
      <HeroText />
      <BannerImage />
    </div>
  </div>
);

export default LandingPage;
