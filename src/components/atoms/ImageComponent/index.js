import { useFirebaseStorage } from 'config/useFirebase';
import React from 'react';
import NextImage from 'next/image';
import styled from 'styled-components';

const ImageContainer = styled.div`
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
  const imageUrl = useFirebaseStorage(`aboutMe/${src}`);

  return (
    <ImageContainer>
      <NextImage height={300} width={400} alt="about me" src={imageUrl} />
    </ImageContainer>
  );
};

export default ImageComponent;
