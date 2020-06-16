import React from 'react';
import styled from 'styled-components';

import SocialContainer from '../../molecules/SocialContainer';

export const Container = styled.footer`
  background-color: ${props => props.theme.palette.white[3]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 1.5em 20px;
    justify-content: center;
  }
`;

export const LeftSideText = styled.p`
  font-family: ${props => props.theme.fonts.primary};
`;

const Footer = () => (
  <Container>
    <LeftSideText>© 2020 by Abhishek P. All rights reserved.</LeftSideText>
    <SocialContainer />
  </Container>
);

export default Footer;
