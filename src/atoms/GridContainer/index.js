import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  display: flex;
  flex-wrap: wrap;
`;

const GridItem = styled.div`
  height: 10vh;
  width: 10vw;
  border: 0.5px solid ${props => props.theme.palette.white[2]};
  opacity: 0.25;
  z-index: -1;
`;

const GridContainer = () => (
  <Container>
    {Array.from(Array(100)).map((i, key) => (
      <GridItem key={key} />
    ))}
  </Container>
);

export default GridContainer;
