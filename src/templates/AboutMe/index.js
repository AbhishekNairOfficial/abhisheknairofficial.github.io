import React, { useContext } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-cycle
import { Container } from 'templates/Projects';
import FirebaseContext from 'config/context';
import AboutMePicturesSection from 'organisms/AboutMePicturesSection';
import otherStyles from 'molecules/ProjectsTitle/index.module.css';

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

export const Block = styled.section`
  background-color: ${props => props.theme.palette.white[0]};
`;

export const BottomLine = styled.hr`
  margin: 0px 15vw;
  margin-top: 50px;
  border: 0.5x solid ${props => props.theme.palette.black[0]};
`;

const AboutMe = () => {
  const {
    aboutMe: { text },
  } = useContext(FirebaseContext);

  return (
    <Block>
      <Container id="AboutMeSection">
        <h1 className={otherStyles.title}>About Me</h1>
        <AboutMeText dangerouslySetInnerHTML={{ __html: text }} />
      </Container>
      <AboutMePicturesSection />
      <BottomLine />
    </Block>
  );
};

export default AboutMe;
