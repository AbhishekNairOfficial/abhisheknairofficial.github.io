import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  color: ${props => props.theme.palette.white[1]};
  font-family: ${props => props.theme.fonts.primary};
`;

const Title = styled.h1`
  font-size: 2.5em;
  font-weight: 300;
  margin: 0 0 20px 0;
`;

const SubTitle = styled.h3`
  margin: 0;
  font-size: 1.2em;
  font-weight: 100;
`;

const ProjectsTitle = () => (
  <Container>
    <Title>Projects</Title>
    <SubTitle>Here are a few things I’ve worked on, and am excited to share!</SubTitle>
  </Container>
);

export default ProjectsTitle;
