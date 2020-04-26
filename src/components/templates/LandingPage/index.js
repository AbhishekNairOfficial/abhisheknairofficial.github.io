import React from 'react';
import styled from 'styled-components';

import NavBar from '../../organisms/NavBar';
import HeroText from '../../atoms/HeroText';
import BannerImage from '../../atoms/BannerImage';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const MainPart = styled.div`
  padding-left: 15vw;
  padding-right: 15vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const LandingPage = () => (
  <Container>
    <NavBar />
    <MainPart>
      <HeroText />
      <BannerImage />
    </MainPart>
  </Container>
);

export default LandingPage;
