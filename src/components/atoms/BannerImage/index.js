import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useFirebaseStorage } from '../../../config/useFirebase';

export const Image = styled.img`
  align-self: flex-end;
  background-image: transparent url;
  max-width: 300px;
  @media only screen and (max-width: 600px) {
    max-width: 80vw;
    margin: auto 0;
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
  const imageUrl = useFirebaseStorage('banner-image.png');

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
