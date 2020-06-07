import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useFirebaseStorage } from '../../../config/useFirebase';

export const Image = styled.img`
  align-self: flex-end;
  background-image: transparent url;
`;

export const StyledSkeleton = styled.div`
  align-self: flex-end;
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
