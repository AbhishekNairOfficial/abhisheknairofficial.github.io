import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useFirebaseStorage } from 'config/useFirebase';

export const Image = styled.img`
  align-self: flex-end;
  background-image: transparent url;
  /* width: 300px; */
  height: 300px;
  border-radius: 250px;
  @media only screen and (max-width: 600px) {
    width: 100%;
    margin-top: 10vh;
    align-self: flex-start;
  }
`;

export const StyledSkeleton = styled.div`
  align-self: flex-end;
  @media only screen and (max-width: 600px) {
    align-self: center;
  }
`;

const BannerImage = () => {
  // State
  const [loading, setLoading] = useState(true);
  // Hooks
  const imageUrl = useFirebaseStorage('banner-image.jpg');

  return (
    <>
      {loading && (
        <StyledSkeleton>
          <Skeleton height={250} width={250} circle />
        </StyledSkeleton>
      )}
      {imageUrl && (
        <Image loading={loading} onLoad={() => setLoading(false)} src={imageUrl} alt="Banner" />
      )}
    </>
  );
};

export default BannerImage;
