import React from 'react';
import styled from 'styled-components';

import Title from '../../atoms/Title';
import RightSideNavBar from '../../molecules/RightSideNavBar';

const Container = styled.nav`
  background-color: ${(props) => props.theme.palette.primary[0]};
  padding: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavBar = () => (
  <Container>
    <Title />
    <RightSideNavBar />
  </Container>
);

export default NavBar;
