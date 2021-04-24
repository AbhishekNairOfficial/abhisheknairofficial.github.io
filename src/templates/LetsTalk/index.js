import React, { useContext } from 'react';

import QuoteComponent from 'atoms/Quote';
import StyledButton from 'atoms/Button';
import FirebaseContext from 'config/context';

import otherStyles from 'molecules/ProjectsTitle/index.module.css';
import externalStyles from 'templates/AboutMe/index.module.css';
import moreStyles from 'templates/Projects/index.module.css';
import styles from './index.module.css';

const LetsTalk = () => {
  const { letsTalk } = useContext(FirebaseContext);

  const { email, paragraph, quotes } = letsTalk;

  return (
    <section className={externalStyles.block}>
      <div className={moreStyles.container} id="AboutMeSection">
        <h1 className={otherStyles.title}>Let&#39;s Talk</h1>
        {quotes.map((quote, index) => (
          <QuoteComponent index={index} key={index} text={quote} />
        ))}
        <div className={styles.paragraph}>{paragraph}</div>
        <a className={styles.buttonContainer} href={`mailto:${email}`}>
          <StyledButton label="Email">
            <img src="/mail-icon.svg" alt="email" />
          </StyledButton>
        </a>
      </div>
    </section>
  );
};

export default LetsTalk;
