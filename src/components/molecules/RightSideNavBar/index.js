import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div``;

export const LinkComponent = styled(Link)`
  font-size: 1.2em;
  text-decoration: none;
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
    <Container
      data-testid="rightSideNavBarContainer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <LinkComponent to="/about">About</LinkComponent>
      <LinkComponent to="/" className="projects-nav-link" onClick={navigateToProjects}>
        Work
      </LinkComponent>
      <LinkComponent to="/">Contact</LinkComponent>
    </Container>
  );
};

export default RightSideNavBar;
