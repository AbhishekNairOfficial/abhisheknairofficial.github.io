import React from 'react';

import SocialContainer from 'molecules/SocialContainer';

import styles from './index.module.css';

const Footer = () => (
  <footer className={styles.container}>
    <p className={styles.leftSideText}>© 2020 by Abhishek P</p>
    <SocialContainer />
  </footer>
);

export default Footer;
