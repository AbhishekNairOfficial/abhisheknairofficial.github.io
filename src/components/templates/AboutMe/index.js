import React, { useContext } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-cycle
import { Container } from 'components/templates/Projects';
import { Title } from 'components/molecules/ProjectsTitle';
import AboutMePicturesSection from 'components/organisms/AboutMePicturesSection';
import FirebaseContext from 'config/context';

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
        <Title>About Me</Title>
        <AboutMeText dangerouslySetInnerHTML={{ __html: text }} />
      </Container>
      <AboutMePicturesSection />
      <BottomLine />
    </Block>
  );
};

export default AboutMe;
