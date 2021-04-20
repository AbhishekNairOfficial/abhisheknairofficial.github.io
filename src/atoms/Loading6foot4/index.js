import React from 'react';
import styled from 'styled-components';
import Title from '../Title';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.palette.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: ${props => props.loading || 'translateY(-100vh)'};
  transition: transform 0.4s ease-in-out;
`;

const LoadingPage = ({ loading }) => (
  <Container loading={loading}>
    <Title large />
  </Container>
);

export default LoadingPage;
