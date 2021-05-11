import React from 'react';
import Image from 'next/image';

import styles from './index.module.css';

const NavBar = () => (
  <div className={styles.container}>
    <Image
      src="/banner/6foot4-logo-long.png"
      alt="logo"
      layout="fixed"
      quality="100"
      height={39}
      width={107}
    />
  </div>
);

export default NavBar;
