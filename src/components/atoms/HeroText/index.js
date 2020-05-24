import React from 'react';
import styled from 'styled-components';

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
`;

export const DesignationText = styled.h3`
  margin: 0;
  font-size: 1.5em;
  font-weight: 100;
  font-family: ${props => props.theme.fonts.primary};
`;

export const B = styled.span`
  font-family: ${props => props.theme.fonts.bold};
`;

export const YellowText = styled.span`
  color: ${props => props.theme.palette.secondary[0]};
`;

const HeroText = () => (
  <Text>
    <HelloText>Hello there!</HelloText>
    <NameText>
      I&apos;m
      <B> Abhishek.</B>
    </NameText>
    <DesignationText>
      {'front-end developer | '}
      <YellowText>design</YellowText>
      {' student'}
    </DesignationText>
  </Text>
);

export default HeroText;
