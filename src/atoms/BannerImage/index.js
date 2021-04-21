import React from 'react';
import styled from 'styled-components';

import Image from 'next/image';

export const Picture = styled.picture`
  align-self: flex-end;
  background-image: transparent url;
  @media only screen and (max-width: 600px) {
    margin-top: 10vh;
  }
`;

export const ImageContainer = styled.div`
  margin-top: 10vh;
  & img {
    border-radius: 250px;
    height: 300px;
    @media only screen and (max-width: 600px) {
      width: 80%;
      height: auto;
    }
  }
`;

export const StyledSkeleton = styled.div`
  align-self: flex-end;
  @media only screen and (max-width: 600px) {
    margin-top: 10vh;
  }
`;

const BannerImage = () => {
  // Hooks
  const imageUrl = '/banner/banner-image.jpg?resize&size=300';

  return (
    <Picture>
      <ImageContainer>
        <Image height={300} width={300} src={imageUrl} />
      </ImageContainer>
    </Picture>
  );
};

export default BannerImage;
