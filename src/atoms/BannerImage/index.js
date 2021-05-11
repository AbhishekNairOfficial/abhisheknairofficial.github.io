import React from 'react';
import Image from 'next/image';

import useWindowSize from 'config/useWindowResize';

import styles from './index.module.css';

const BannerImage = () => {
  // Hooks
  const imageUrl = '/banner/banner-image.png';

  const { width } = useWindowSize();

  const widthOfTheImage = (width - 13 * 16) / 7;
  const heightOfTheImage = (widthOfTheImage * 552) / 384;

  return (
    <picture className={styles.picture}>
      <div className={styles.ImageContainer}>
        <Image
          loading="eager"
          alt="banner"
          width={widthOfTheImage}
          height={heightOfTheImage}
          src={imageUrl}
        />
      </div>
    </picture>
  );
};

export default BannerImage;
