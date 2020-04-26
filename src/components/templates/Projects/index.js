import React from 'react';
import styled from 'styled-components';
import ProjectsTitle from '../../molecules/ProjectsTitle';

export const Container = styled.section`
  position: relative;
  background-color: ${props => props.theme.palette.black[0]};
  padding: 2.5em 5vw;
`;

const ProjectsContainer = () => (
  <Container>
    <ProjectsTitle />
  </Container>
);

export default ProjectsContainer;
