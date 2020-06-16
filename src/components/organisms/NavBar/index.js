import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

export const Container = styled.nav`
  padding: 3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 2em;
  }
`;

const Title = lazy(() => import('../../atoms/Title'));
const RightSideNavBar = lazy(() => import('../../molecules/RightSideNavBar'));

const NavBar = () => (
  <Container>
    <Suspense fallback={<Skeleton />}>
      <Title />
    </Suspense>
    <Suspense fallback={<Skeleton />}>
      <RightSideNavBar />
    </Suspense>
  </Container>
);

export default NavBar;
