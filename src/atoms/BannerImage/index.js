import React from 'react';
import Image from 'next/image';

import styles from './index.module.css';

const BannerImage = () => {
  // Hooks
  const imageUrl = '/banner/banner-image.jpg';

  return (
    <picture className={styles.picture}>
      <div className={styles.ImageContainer}>
        <Image
          loading="eager"
          className={styles.bannerImage}
          alt="banner"
          height={300}
          width={300}
          src={imageUrl}
        />
      </div>
    </picture>
  );
};

export default BannerImage;
