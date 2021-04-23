import React from 'react';

import GridContainer from '../GridContainer';
import styles from './index.module.css';

const SixFootFour = () => (
  <div className={styles.container}>
    <span className={[styles.text, styles.left, styles.bottom].join(' ')}>6</span>
    <GridContainer />
    <span className={[styles.text, styles.right, styles.top].join(' ')}>4</span>
  </div>
);

export default SixFootFour;
