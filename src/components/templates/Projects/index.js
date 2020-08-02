/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import ProjectsTitle from 'components/molecules/ProjectsTitle';
import ProjectTile from 'components/molecules/ProjectTile';
import { useRealtimeDatabase } from 'config/useFirebase';

export const Container = styled.section`
  position: relative;
  background-color: ${props => props.theme.palette.black[0]};
  padding: 2.5em 5vw;
  @media only screen and (max-width: 600px) {
    padding: 30px;
  }
`;

const ProjectsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 20px;
  row-gap: 20px;
  margin-top: 30px;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

const ProjectsContainerComponent = () => {
  const listOfProjects = useRealtimeDatabase('projectsPage/projects');
  const listOfFourEmptyProjects = new Array(4).fill({});

  return (
    <Container id="projectsSectionContainer">
      <ProjectsTitle />
      <ProjectsContainerDiv>
        {listOfProjects
          ? listOfProjects.map((project, key) => {
              const { title, description, url } = project;
              return <ProjectTile key={key} title={title} description={description} url={url} />;
            })
          : listOfFourEmptyProjects.map((item, index) => (
              <Skeleton key={index} width="40vw" height="40vh" />
            ))}
      </ProjectsContainerDiv>
    </Container>
  );
};

export default ProjectsContainerComponent;
