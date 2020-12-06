/* eslint-disable comma-dangle */
import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import QUORA_ICON from 'assets/images/quora.svg';
import BEHANCE_ICON from 'assets/images/behance.svg';
import LINKEDIN_ICON from 'assets/images/linkedin.svg';
import MEDIUM_ICON from 'assets/images/medium.svg';
import DRIBBBLE_ICON from 'assets/images/dribbble.svg';
import GITHUB_ICON from 'assets/images/github.svg';
import TWITTER_ICON from 'assets/images/twitter.svg';
import { useRealtimeDatabase } from 'config/useFirebase';

export const Image = styled.img`
  height: 32px;
  margin-left: 30px;
  @media only screen and (max-width: 600px) {
    margin-left: ${props => (props.index === 0 ? '0px' : '20px')};
  }
`;

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
  const socialProfiles = useRealtimeDatabase('socialProfiles');

  return (
    <div>
      {socialProfiles ? (
        socialProfiles.map((socialProfile, index) => {
          const { icon, link } = socialProfile;
          return (
            <a href={link} key={index} target="_blank" rel="noopener noreferrer">
              <Image index={index} src={imageLinks[icon]} alt={link} />
            </a>
          );
        })
      ) : (
        <Skeleton count={6} height={32} width={32} />
      )}
    </div>
  );
};

export default SocialContainer;
