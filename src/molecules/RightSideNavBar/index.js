/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';

import styles from './index.module.css';

const RightSideNavBar = () => {
  const navigateToAboutMe = () => {
    const element = document.querySelector('#AboutMeSection');
    element.scrollIntoView();
  };

  return (
    <div data-testid="rightSideNavBarContainer">
      <Link href="/resume.pdf">
        <span className={styles.linkComponent} data-testid="workButton">
          Resume
        </span>
      </Link>
      <span className={[styles.linkComponent, styles.hide].join(' ')} onClick={navigateToAboutMe}>
        About
      </span>
    </div>
  );
};

export default RightSideNavBar;
