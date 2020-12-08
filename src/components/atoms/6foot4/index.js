import React from 'react';
import styled from 'styled-components';

import GridContainer from '../GridContainer';

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const Text = styled.span`
  font-size: 35rem;
  color: transparent;
  line-height: ${props => (props.right ? '1em' : '0.6em')};
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: ${props => props.theme.palette.white[2]};
  position: fixed;
  top: ${props => props.top && 0};
  bottom: ${props => props.bottom && 0};
  left: ${props => props.left && '-0.1em'};
  right: ${props => props.right && '-0.1em'};
  font-family: ${props => props.theme.fonts.pre};
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;

const SixFootFour = () => (
  <Container>
    <Text left bottom>
      6
    </Text>
    <GridContainer />
    <Text right top>
      4
    </Text>
  </Container>
);

export default SixFootFour;
