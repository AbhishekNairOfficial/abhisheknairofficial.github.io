import React from 'react';
import styled from 'styled-components';

import ProjectsTitle from '../../molecules/ProjectsTitle';
import ProjectTile from '../../molecules/ProjectTile';

import projectsData from '../../../config/projects-page.json';

export const Container = styled.section`
  position: relative;
  background-color: ${props => props.theme.palette.black[0]};
  padding: 2.5em 5vw;
`;

const ProjectsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 30px;
`;

const ProjectsContainerComponent = () => (
  <Container>
    <ProjectsTitle />
    <ProjectsContainerDiv>
      {projectsData.projects.map((project, key) => {
        const { title, description, url } = project;
        return <ProjectTile key={key} title={title} description={description} url={url} />;
      })}
    </ProjectsContainerDiv>
  </Container>
);

export default ProjectsContainerComponent;
