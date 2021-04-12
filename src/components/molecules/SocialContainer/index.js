/* eslint-disable comma-dangle */
import React, { useContext } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import NextImage from 'next/image';

import FirebaseContext from 'config/context';

const QUORA_ICON = '/quora.svg';
const BEHANCE_ICON = '/behance.svg';
const LINKEDIN_ICON = '/linkedin.svg';
const MEDIUM_ICON = '/medium.svg';
const DRIBBBLE_ICON = '/dribbble.svg';
const GITHUB_ICON = '/github.svg';
const TWITTER_ICON = '/twitter.svg';

export const ImageContainer = styled.div`
  /* height: 32px; */
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
  const { socialProfiles = [] } = useContext(FirebaseContext);

  return (
    <div>
      {socialProfiles ? (
        socialProfiles.map((socialProfile, index) => {
          const { icon, link } = socialProfile;
          return (
            <a href={link} key={index} target="_blank" rel="noopener noreferrer">
              <ImageContainer>
                <NextImage height={32} width={32} index={index} src={imageLinks[icon]} alt={link} />
              </ImageContainer>
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
