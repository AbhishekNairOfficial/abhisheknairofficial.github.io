import React from 'react';
import { useRealtimeDatabase } from 'config/useFirebase';

import { Title } from 'components/molecules/ProjectsTitle';
import { Container } from 'components/templates/Projects';
import styled from 'styled-components';
import AboutMePicturesSection from 'components/organisms/NavBar/AboutMePicturesSection';

const AboutMeText = styled.p`
  text-align: left;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.2em;
  line-height: 1.5em;
  letter-spacing: 0.72px;
  opacity: 1;
  & > B {
    color: ${props => props.theme.palette.primary[0]};
    text-transform: capitalize;
    font-family: ${props => props.theme.fonts.bold};
  }
`;

const AboutMe = () => {
  const aboutMeText = useRealtimeDatabase('aboutMe/text');

  return (
    <>
      <Container id="AboutMeSection">
        <Title>About Me</Title>
        <AboutMeText dangerouslySetInnerHTML={{ __html: aboutMeText }} />
      </Container>
      <AboutMePicturesSection />
    </>
  );
};

export default AboutMe;
