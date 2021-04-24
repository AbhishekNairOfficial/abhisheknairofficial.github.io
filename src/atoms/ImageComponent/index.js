import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import useWindowResize from 'config/useWindowResize';

import styles from './index.module.css';

const ImageComponent = ({ src }) => {
  const { width } = useWindowResize();
  const [height, setHeight] = useState(0);

  const widthOfTheElement = (width - 6 * 16 - 30) / 3;

  useEffect(() => {
    const imageElement = document.getElementById(src);
    setHeight((widthOfTheElement * imageElement.naturalHeight) / imageElement.naturalWidth);
  }, [widthOfTheElement]);

  return (
    <picture className={styles.picture}>
      <source srcSet={`${src}?webp`} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <Image
        id={src}
        width={widthOfTheElement}
        height={height}
        className={styles.imageContainer}
        alt="about me"
        src={src}
      />
    </picture>
  );
};

export default ImageComponent;
