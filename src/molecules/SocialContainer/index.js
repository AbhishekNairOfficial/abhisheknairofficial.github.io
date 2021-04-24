/* eslint-disable comma-dangle */
import React, { useContext } from 'react';

import FirebaseContext from 'config/context';

import Image from 'next/image';
import styles from './index.module.css';

const QUORA_ICON = '/socialIcons/quora.svg';
const BEHANCE_ICON = '/socialIcons/behance.svg';
const LINKEDIN_ICON = '/socialIcons/linkedin.svg';
const MEDIUM_ICON = '/socialIcons/medium.svg';
const DRIBBBLE_ICON = '/socialIcons/dribbble.svg';
const GITHUB_ICON = '/socialIcons/github.svg';
const TWITTER_ICON = '/socialIcons/twitter.svg';

const imageLinks = {
  quora: QUORA_ICON,
  linkedin: LINKEDIN_ICON,
  medium: MEDIUM_ICON,
  dribbble: DRIBBBLE_ICON,
  github: GITHUB_ICON,
  twitter: TWITTER_ICON,
  behance: BEHANCE_ICON,
};

const SocialContainer = () => {
  const { socialProfiles = [] } = useContext(FirebaseContext);

  return (
    <div>
      {socialProfiles.map((socialProfile, index) => {
        const { icon, link } = socialProfile;
        return (
          <a
            href={link}
            className={[styles.image, index === 0 && styles.firstItem].join(' ')}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image height={32} width={32} index={index} src={imageLinks[icon]} alt={link} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialContainer;
