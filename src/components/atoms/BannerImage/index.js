import React from 'react';
import styled from 'styled-components';

import BANNER_IMAGE from '../../../assets/images/banner-image.png';

export const Image = styled.img`
  align-self: flex-end;
`;

const BannerImage = () => <Image src={BANNER_IMAGE} alt="Banner" />;

export default BannerImage;
