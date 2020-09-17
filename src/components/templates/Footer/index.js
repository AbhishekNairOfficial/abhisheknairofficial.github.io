import React from 'react';
import styled from 'styled-components';

import SocialContainer from 'components/molecules/SocialContainer';

export const Container = styled.footer`
  background-color: ${props => props.theme.palette.primary[0]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5em 15vw;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 1.5em 20px;
    justify-content: center;
  }
`;

export const LeftSideText = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.palette.white[1]};
  font-size: 1.1em;
`;

const Footer = () => (
  <Container>
    <LeftSideText>© 2020 by Abhishek P</LeftSideText>
    <SocialContainer />
  </Container>
);

export default Footer;
