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

const SocialContainer = () => (
  <div>
    <Image src={QUORA_ICON} alt="quora" />
    <Image src={LINKEDIN_ICON} alt="linkedin" />
    <Image src={MEDIUM_ICON} alt="medium" />
    <Image src={DRIBBBLE_ICON} alt="dribbble" />
    <Image src={GITHUB_ICON} alt="github" />
    <Image src={TWITTER_ICON} alt="twitter" />
  </div>
);

export default SocialContainer;
