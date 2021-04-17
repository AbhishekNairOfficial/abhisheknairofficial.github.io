import React from 'react';
import styled from 'styled-components';

export const SpartanTitle = styled.div`
  font-size: ${props => (props.large ? '5em' : '2em')};
  font-family: ${props => props.theme.fonts.pre};
  display: inline;
  font-weight: bold;
  color: ${props => props.theme.palette.white[1]};
  @media only screen and (max-width: 600px) {
    font-size: ${props => (props.large ? '3em' : '1.4em')};
  }
`;

export const ProductSansTitle = styled.div`
  display: inline;
  font-family: ${props => props.theme.fonts.primary};
  @media only screen and (max-width: 600px) {
    font-size: 1em;
  }
`;

const Title = ({ large }) => (
  <SpartanTitle large={large}>
    {' 6'}
    <ProductSansTitle>foot</ProductSansTitle>
    {'4 '}
  </SpartanTitle>
);

export default Title;
