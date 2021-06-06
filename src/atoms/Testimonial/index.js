import React from 'react';

import styles from './index.module.css';

const Testimonial = ({ testimonial }) => {
  const { name, role, message } = testimonial;

  return (
    <div className={styles.container}>
      <p>&#34;</p>
      <span>{message}</span>
      <div>
        <span>{name}</span>
        <span>{role}</span>
      </div>
      <p>&#34;</p>
    </div>
  );
};

export default Testimonial;
