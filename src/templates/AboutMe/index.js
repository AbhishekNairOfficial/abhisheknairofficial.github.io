/* eslint-disable react/no-danger */
import React, { useContext } from 'react';

// eslint-disable-next-line import/no-cycle
import FirebaseContext from 'config/context';
import AboutMePicturesSection from 'organisms/AboutMePicturesSection';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import externalStyles from 'templates/Projects/index.module.css';
import styles from './index.module.css';

const AboutMe = () => {
  const {
    aboutMe: { text },
  } = useContext(FirebaseContext);

  return (
    <section className={styles.block}>
      <div className={externalStyles.container} id="AboutMeSection">
        <h1 className={otherStyles.title}>About Me</h1>
        <p className={styles.aboutMeText} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <AboutMePicturesSection />
      <hr className={styles.bottomLine} />
    </section>
  );
};

export default AboutMe;
