import React, { useContext } from 'react';
import Image from 'next/image';

import FirebaseContext from 'config/context';
import useWindowSize from 'config/useWindowResize';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import moreStyles from 'templates/Projects/index.module.css';
import styles from './index.module.css';

const LetsTalk = () => {
  const { letsTalk } = useContext(FirebaseContext);
  const { width } = useWindowSize();

  const { email, image, paragraph } = letsTalk;

  const widthOfTheImage = ((width - 13 * 16) / 14) * 3 + 16 * 2;

  return (
    <section className={moreStyles.container}>
      <h1 className={otherStyles.title}>Let&#39;s Talk!</h1>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <p>{paragraph}</p>
          <a href={`mailto:${email}`}>shoot me an email</a>
        </div>
        <div className={styles.rightSide}>
          <Image src={image} height={widthOfTheImage} width={widthOfTheImage} />
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
