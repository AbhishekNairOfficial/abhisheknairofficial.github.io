import React from 'react';

import styles from './index.module.css';

const Title = ({ large }) => (
  <div className={[styles.spartanTitle, large && styles.large].join(' ')}>
    {' 6'}
    <div className={styles.productSansTitle}>foot</div>
    {'4 '}
  </div>
);

export default Title;
