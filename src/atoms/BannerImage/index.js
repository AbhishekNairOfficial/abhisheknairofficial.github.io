import React from 'react';
import styled from 'styled-components';

export const Image = styled.img`
  align-self: flex-end;
  background-image: transparent url;
  border-radius: 250px;
  height: 300px;
  @media only screen and (max-width: 600px) {
    width: 80%;
    height: auto;
    margin-top: 10vh;
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
  const imageUrl = '/banner/banner-image.jpg';

  return <Image src={imageUrl} alt="Banner" />;
};

export default BannerImage;
