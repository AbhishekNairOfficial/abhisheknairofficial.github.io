/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useContext } from 'react';
import styled from 'styled-components';

import ProjectsTitle from 'components/molecules/ProjectsTitle';
import ProjectTile from 'components/molecules/ProjectTile';
import FirebaseContext from 'config/context';
import { Block, BottomLine } from '../AboutMe';

export const Container = styled.section`
  position: relative;
  font-family: ${props => props.theme.fonts.primary};
  background-color: ${props => props.theme.palette.white[0]};
  padding: 2.5em 15vw;
  @media only screen and (max-width: 600px) {
    padding: 30px;
  }
`;

const ProjectsContainerDiv = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  column-gap: 10px;
  row-gap: 20px;
  margin-top: 60px;
  @media only screen and (max-width: 600px) {
    margin-top: 30px;
    grid-template-columns: 100%;
  }
`;

const ProjectsContainerComponent = () => {
  const {
    projectsPage: { projects: listOfProjects },
  } = useContext(FirebaseContext);

  return (
    <Block>
      <Container id="projectsSectionContainer">
        <ProjectsTitle />
        <ProjectsContainerDiv>
          {listOfProjects.map((project, key) => (
            <ProjectTile key={key} project={project} />
          ))}
        </ProjectsContainerDiv>
      </Container>
      <BottomLine />
    </Block>
  );
};

export default ProjectsContainerComponent;
