import React from 'react';
import styled from 'styled-components';

export const Container = styled.div``;

export const LinkComponent = styled.span`
  font-size: 1.2em;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.palette.white[1]};
  margin-left: 1.2em;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const RightSideNavBar = () => {
  const navigateToProjects = () => {
    const element = document.querySelector('#projectsSectionContainer');
    element.scrollIntoView();
  };

  const onMouseMove = () => {
    const cursor = document.querySelector('.cursor');
    cursor.classList.add('filled');
  };

  const onMouseLeave = () => {
    const cursor = document.querySelector('.cursor');
    cursor.classList.remove('filled');
  };

  return (
    <Container onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <LinkComponent>About</LinkComponent>
      <LinkComponent onClick={navigateToProjects}>Work</LinkComponent>
      <LinkComponent>Contact</LinkComponent>
    </Container>
  );
};

export default RightSideNavBar;
