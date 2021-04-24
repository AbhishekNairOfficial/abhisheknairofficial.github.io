import React from 'react';

import Title from 'atoms/Title';
import RightSideNavBar from 'molecules/RightSideNavBar';

import styles from './index.module.css';

const NavBar = () => (
  <div className={styles.container}>
    <Title />
    <RightSideNavBar />
  </div>
);

export default NavBar;
