import React from 'react';
import styled from 'styled-components';

const Picture = styled.picture`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const ImageContainer = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  width: calc((100vw - 6em - 30px) / 3);
  @media only screen and (max-width: 600px) {
    width: calc(100vw - 60px);
  }
`;

const ImageComponent = ({ src }) => {
  return (
    <Picture>
      <source srcSet={`${src}?webp`} type="image/webp" />
      <source srcSet={src} type="image/jpeg" />
      <ImageContainer alt="about me" src={src} />
    </Picture>
  );
};

export default ImageComponent;
