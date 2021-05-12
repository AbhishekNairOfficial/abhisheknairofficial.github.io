import React, { useContext } from 'react';
import Image from 'next/image';

import FirebaseContext from 'config/context';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import moreStyles from 'templates/Projects/index.module.css';
import styles from './index.module.css';

const LetsTalk = () => {
  const { letsTalk } = useContext(FirebaseContext);

  const { email, image, paragraph } = letsTalk;

  return (
    <section className={moreStyles.container}>
      <h1 className={otherStyles.title}>Let&#39;s Talk!</h1>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <p>{paragraph}</p>
          <a href={`mailto:${email}`}>shoot me an email</a>
        </div>
        <div className={styles.rightSide}>
          <Image src={image} height={300} width={300} />
        </div>
      </div>
    </section>
  );
};

export default LetsTalk;
