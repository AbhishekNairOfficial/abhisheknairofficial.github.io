/* eslint-disable react/no-danger */
import React, { useContext } from 'react';

import FirebaseContext from 'config/context';

import styles from './index.module.css';

const HeroText = () => {
  const { landingPage } = useContext(FirebaseContext);
  const { title, quote, firstLine } = landingPage;

  return (
    <div className={styles.text}>
      <h1 className={styles.helloText}>{firstLine}</h1>
      <h2 className={styles.nameText} dangerouslySetInnerHTML={{ __html: title }} />
      <h3 className={styles.designationText} dangerouslySetInnerHTML={{ __html: quote }} />
    </div>
  );
};

export default HeroText;
