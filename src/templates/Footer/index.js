import React from 'react';

import SocialContainer from 'molecules/SocialContainer';

import styles from './index.module.css';

const Footer = () => (
  <footer className={styles.container}>
    <p className={styles.leftSideText}>© 2021. Made with love, sleepless nights and Next JS.</p>
    <SocialContainer />
  </footer>
);

export default Footer;
