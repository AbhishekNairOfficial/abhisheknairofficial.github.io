/* eslint-disable react/no-danger */
import React, { useContext } from 'react';

import FirebaseContext from 'config/context';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import externalStyles from 'templates/Projects/index.module.css';
import Image from 'next/image';
import useWindowSize from 'config/useWindowResize';
import CareerGraph from 'atoms/CareerGraph';
import styles from './index.module.css';

const AboutMe = () => {
  const {
    aboutMe: { image, imageBlur, paraOne, paraTwo, paraThree, resumeLink },
  } = useContext(FirebaseContext);

  const { width } = useWindowSize();

  let widthOfTheImage = ((width - 13 * 16) / 14) * 3 + 16 * 2;
  if (width < 600) {
    widthOfTheImage = width - 100;
  }

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
            placeholder="blur"
            blurDataURL={imageBlur}
            alt="profile picture"
            width={widthOfTheImage}
            height={widthOfTheImage}
          />
        </div>
        <a href={resumeLink} target="_blank" rel="noreferrer">
          <div className={styles.resumeButton}>download my resume</div>
        </a>
        {width < 600 || <CareerGraph />}
      </div>
    </section>
  );
};

export default AboutMe;
