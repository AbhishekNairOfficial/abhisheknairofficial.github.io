/* eslint-disable react/no-danger */
import React, { useContext } from 'react';

import FirebaseContext from 'config/context';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import externalStyles from 'templates/Projects/index.module.css';
import Image from 'next/image';
import useWindowSize from 'config/useWindowResize';
import CareerGraph from 'atoms/CareerGraph';
import Link from 'next/link';
import styles from './index.module.css';

const AboutMe = () => {
  const {
    aboutMe: { image, paraOne, paraTwo, paraThree },
  } = useContext(FirebaseContext);

  const { width } = useWindowSize();

  const widthOfTheImage = ((width - 13 * 16) / 14) * 3 + 16 * 2;

  return (
    <section id="AboutMeSection">
      <div className={externalStyles.container}>
        <h1 className={otherStyles.title}>About Me</h1>
        <div className={styles.container}>
          <div className={styles.leftSide}>
            <p className={styles.aboutMeText} dangerouslySetInnerHTML={{ __html: paraOne }} />
            <p className={styles.aboutMeText} dangerouslySetInnerHTML={{ __html: paraTwo }} />
            <p className={styles.aboutMeText} dangerouslySetInnerHTML={{ __html: paraThree }} />
          </div>
          <Image
            className={styles.profilePicture}
            quality={100}
            src={image}
            width={widthOfTheImage}
            height={widthOfTheImage}
          />
        </div>
        <Link href="/resume.pdf">
          <div className={styles.resumeButton}>download my resume</div>
        </Link>
        <CareerGraph />
      </div>
    </section>
  );
};

export default AboutMe;
