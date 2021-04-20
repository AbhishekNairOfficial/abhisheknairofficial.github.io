import React from 'react';
import styled from 'styled-components';

export const Picture = styled.picture`
  align-self: flex-end;
  background-image: transparent url;
  @media only screen and (max-width: 600px) {
    margin-top: 10vh;
  }
`;

export const Image = styled.img`
  border-radius: 250px;
  height: 300px;
  @media only screen and (max-width: 600px) {
    width: 80%;
    height: auto;
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
      <source srcSet={`${imageUrl}&webp`} type="image/webp" />
      <source srcSet={imageUrl} type="image/jpeg" />
      <Image src={imageUrl} alt="Banner" />
    </Picture>
  );
};

export default BannerImage;
