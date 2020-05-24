/* eslint-disable comma-dangle */
import React from 'react';
import styled from 'styled-components';

import QUORA_ICON from '../../../assets/images/quora.svg';
import LINKEDIN_ICON from '../../../assets/images/linkedin.svg';
import MEDIUM_ICON from '../../../assets/images/medium.svg';
import DRIBBBLE_ICON from '../../../assets/images/dribbble.svg';
import GITHUB_ICON from '../../../assets/images/github.svg';
import TWITTER_ICON from '../../../assets/images/twitter.svg';

export const Image = styled.img`
  height: 32px;
  margin-left: 30px;
`;

const socialProfileMaps = [
  { icon: QUORA_ICON, link: 'https://www.quora.com/profile/Abhishek-Nair-147' },
  { icon: LINKEDIN_ICON, link: 'https://www.linkedin.com/in/6foot4/' },
  { icon: MEDIUM_ICON, link: 'https://medium.com/@abhisheknairp' },
  { icon: DRIBBBLE_ICON, link: 'https://dribbble.com/AbhishekNairOfficial' },
  { icon: GITHUB_ICON, link: 'https://github.com/abhisheknairofficial' },
  { icon: TWITTER_ICON, link: 'https://twitter.com/NairGalactico21' },
];

const SocialContainer = () => (
  <div>
    {socialProfileMaps.map((socialProfile, index) => {
      const { icon, link } = socialProfile;
      return (
        <a href={link} key={index} target="_blank" rel="noopener noreferrer">
          <Image src={icon} alt={link} />
        </a>
      );
    })}
  </div>
);

export default SocialContainer;
