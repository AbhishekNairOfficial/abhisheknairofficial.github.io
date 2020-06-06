import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

import { useRealtimeDatabase } from '../../../config/useFirebase';

export const Text = styled.div`
  color: ${props => props.theme.palette.white[0]};
  font-family: ${props => props.theme.fonts.primary};
`;

export const HelloText = styled.h1`
  font-size: 3em;
  margin: 0 0 20px 0;
  font-weight: 100;
`;

export const NameText = styled.h2`
  font-size: 8em;
  margin: 0;
  font-weight: 500;
  & > B {
    font-family: ${props => props.theme.fonts.bold};
  }
`;

export const DesignationText = styled.h3`
  margin: 0;
  font-size: 1.5em;
  font-weight: 100;
  font-family: ${props => props.theme.fonts.primary};
  & > YellowText {
    color: ${props => props.theme.palette.secondary[0]};
  }
`;

const HeroText = () => {
  const landingPageData = useRealtimeDatabase('landingPage');

  if (!landingPageData) {
    return (
      <>
        <Skeleton height="4em" width={150} />
        <Skeleton height="10em" width="70vw" />
        <Skeleton height="2.5em" width="30vw" />
      </>
    );
  }

  const { title, quote, firstLine } = landingPageData;
  return (
    <Text>
      <HelloText>{firstLine}</HelloText>
      <NameText dangerouslySetInnerHTML={{ __html: title }} />
      <DesignationText dangerouslySetInnerHTML={{ __html: quote }} />
    </Text>
  );
};

export default HeroText;
