import React from 'react';
import styled from 'styled-components';
import Title from '../Title';

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.theme.palette.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => (
  <Container>
    <Title large />
  </Container>
);

export default LoadingPage;
