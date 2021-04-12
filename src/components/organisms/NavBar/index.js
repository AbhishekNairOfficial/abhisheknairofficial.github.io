import React from 'react';
import styled from 'styled-components';

import Title from 'components/atoms/Title';
import RightSideNavBar from 'components/molecules/RightSideNavBar';

export const Container = styled.nav`
  padding: 3em;
  padding-right: 15vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 2em;
    padding-right: 2em;
  }
`;

const NavBar = () => (
  <Container>
    <Title />
    <RightSideNavBar />
  </Container>
);

export default NavBar;
