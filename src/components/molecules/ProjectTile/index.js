import { useFirebaseStorage } from 'config/useFirebase';
import React from 'react';
import styled from 'styled-components';

import EXTERNAL_LINK_ICON from 'assets/images/external-link.svg';
import RIGHT_ARROW_ICON from 'assets/images/button-arrow.svg';

export const Container = styled.div`
  background-color: ${props => props.theme.palette.black[0]};
  width: calc(35vw - 10px);
  height: calc(35vw - 10px);
  box-shadow: 0px 1px 2px #00000033;
  border-radius: 9px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0px 5px 10px #00000033;
  }
  @media only screen and (max-width: 600px) {
    box-shadow: 0px 5px 10px #00000033;
    width: calc(100vw - 60px);
    height: calc(100vw - 60px);
  }
`;

export const TextContainer = styled.div`
  background-color: ${props => props.theme.palette.white[0]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 20px;
  @media only screen and (max-width: 600px) {
    padding: 5px 15px;
  }
`;

export const Title = styled.div`
  font-family: ${props => props.theme.fonts.bold};
  font-size: 1.2em;
  line-height: 1.5em;
  color: ${props => props.theme.palette.black[0]};
  text-align: center;
  letter-spacing: 1.2px;
  opacity: 1;
  @media only screen and (max-width: 600px) {
    font-size: 1em;
    line-height: 1em;
  }
`;

export const Icon = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    height: 20px;
    width: 20px;
  }
`;

export const Image = styled.img`
  width: calc(35vw - 10px);
  height: calc((35vw - 10px) * 0.8);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  object-fit: cover;
  opacity: 0.6;
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 60px);
    height: calc((100vw - 60px) * 0.8);
  }
`;

const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightSide = styled.div`
  background-color: ${props => props.theme.palette.primary[0]};
  padding: 20px;
  height: 40px;
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    padding: 10px;
    height: 30px;
  }
`;

const Text = styled.span`
  text-align: left;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1em;
  color: ${props => props.theme.palette.white[0]};
  letter-spacing: 0.32px;
  color: #fbfffe;
  text-transform: capitalize;
  margin-right: 10px;
  @media only screen and (max-width: 600px) {
    font-size: 0.8em;
  }
`;

const RightSideIcon = styled.img`
  height: 16px;
  width: 16px;
  @media only screen and (max-width: 600px) {
    height: 12px;
    width: 12px;
  }
`;

const ProjectTile = ({ title, image, type, icon }) => {
  const actualImageLink = useFirebaseStorage(`projects/${image}`);
  const actualIconLink = useFirebaseStorage(`projects/${icon}`);

  const rightSideIcon = type === 'design' ? RIGHT_ARROW_ICON : EXTERNAL_LINK_ICON;
  const rightSideText = type === 'design' ? 'read case study' : 'see more';

  return (
    <Container id="projectTileContainer">
      <Image src={actualImageLink} alt="project" />
      <TextContainer>
        <LeftSide>
          <Icon src={actualIconLink} alt="project icon" />
          <Title>{title}</Title>
        </LeftSide>
        <RightSide>
          <Text>{rightSideText}</Text>
          <RightSideIcon src={rightSideIcon} alt="project icon" />
        </RightSide>
      </TextContainer>
    </Container>
  );
};

export default ProjectTile;
