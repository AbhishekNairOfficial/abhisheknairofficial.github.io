import React from 'react';
import styled from 'styled-components';

export const Container = styled.div``;

export const LinkComponent = styled.span`
  font-size: 1.2em;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.palette.white[1]};
  margin-left: 1.2em;
`;

const RightSideNavBar = () => (
  <Container>
    <LinkComponent>About</LinkComponent>
    <LinkComponent>Work</LinkComponent>
    <LinkComponent>Contact</LinkComponent>
  </Container>
);

export default RightSideNavBar;
