import React from 'react';
import styled from 'styled-components';

import NavBar from '../../organisms/NavBar';
import HeroText from '../../atoms/HeroText';
import BannerImage from '../../atoms/BannerImage';

const Container = styled.div`
  background-color: ${props => props.theme.palette.primary[0]};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const MainPart = styled.div`
  padding-left: 15vw;
  padding-right: 15vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const HomePage = () => (
  <Container>
    <NavBar />
    <MainPart>
      <HeroText />
      <BannerImage />
    </MainPart>
  </Container>
);

export default HomePage;
