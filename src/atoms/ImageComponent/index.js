import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  width: calc((100vw - 6em - 30px) / 3);
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;

const ImageComponent = ({ src }) => {
  return <ImageContainer alt="about me" src={src} />;
};

export default ImageComponent;
