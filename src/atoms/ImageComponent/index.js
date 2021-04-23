import React from 'react';

import styles from './index.module.css';

const ImageComponent = ({ src }) => {
  return (
    <picture className={styles.picture}>
      <source srcSet={`${src}?webp`} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <img className={styles.imageContainer} alt="about me" src={src} />
    </picture>
  );
};

export default ImageComponent;
