import React from 'react';

import styles from './index.module.css';

const GridContainer = () => (
  <div className={styles.container}>
    {Array.from(Array(100)).map((i, key) => (
      <div className={styles.gridItem} key={key} />
    ))}
  </div>
);

export default GridContainer;
