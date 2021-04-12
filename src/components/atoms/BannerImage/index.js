import React, { useState } from 'react';
import styled from 'styled-components';
import NextImage from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { useFirebaseStorage } from 'config/useFirebase';

export const ImageContainer = styled.div`
  align-self: flex-end;
  /* background-image: transparent url; */
  border-radius: 250px;
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
  // State
  const [loading, setLoading] = useState(1);
  // Hooks
  const imageUrl = useFirebaseStorage('banner-image.jpg');

  return (
    <>
      {!!loading && (
        <StyledSkeleton>
          <Skeleton height={250} width={250} circle />
        </StyledSkeleton>
      )}
      {imageUrl && (
        <ImageContainer>
          <NextImage
            height={300}
            width={300}
            loading={loading}
            onLoad={() => setLoading(0)}
            src={imageUrl}
            alt="Banner"
          />
        </ImageContainer>
      )}
    </>
  );
};

export default BannerImage;
