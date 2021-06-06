import React from 'react';

import styles from './index.module.css';

const QuoteComponent = ({ text, index }) => {
  const odd = index % 2 === 0; // index is one lesser than count
  return (
    <div className={[styles.block, odd && styles.odd]}>
      <span className={styles.quote}>&#34;</span>
      <span className={styles.text}>{text}</span>
      <span className={styles.quote}>&#34;</span>
    </div>
  );
};

export default QuoteComponent;
