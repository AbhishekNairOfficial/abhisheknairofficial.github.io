import React from 'react';

import Title from '../Title';

import styles from './index.module.css';

const LoadingPage = ({ loading }) => (
  <div className={[styles.container, loading && styles.loading].join(' ')}>
    <Title large />
  </div>
);

export default LoadingPage;
