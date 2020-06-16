import React, { useState } from 'react';
import styled from 'styled-components';

import FAKE_TILE from '../../../assets/images/fake-project-tile.png';
import Button from '../../atoms/Button';

export const Container = styled.div`
  position: relative;
  background-color: ${props => props.theme.palette.white[0]};
  &:hover {
    background-color: ${props => `${props.theme.palette.white[0]}1A`};
  }
  &:hover > img {
    opacity: 0.1;
  }
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;

export const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.3em;
  font-weight: bold;
  color: ${props => props.theme.palette.white[1]};
  margin-bottom: 20px;
`;

export const Description = styled.div`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1em;
  color: ${props => props.theme.palette.white[1]};
`;

export const Image = styled.img`
  position: relative;
  top: 0;
  right: 0;
  @media only screen and (max-width: 600px) {
    max-width: calc(100vw - 60px);
  }
`;

export const Gap = styled.div`
  height: 30px;
`;

const ProjectTile = ({ title, description }) => {
  const [showImage, setShowImage] = useState(true);

  const handleMouseHover = () => {
    setShowImage(!showImage);
  };

  return (
    <Container
      id="projectTileContainer"
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      {showImage || (
        <TextContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Gap />
          <Button label="Learn more" />
        </TextContainer>
      )}
      <Image src={FAKE_TILE} />
    </Container>
  );
};

export default ProjectTile;
