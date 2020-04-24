import React from 'react';
import styled from 'styled-components';

const SpartanTitle = styled.div`
  font-size: 2em;
  font-family: ${(props) => props.theme.fonts.pre};
  display: inline;
  font-weight: bold;
  color: ${(props) => props.theme.palette.white[1]};
`;

const ProductSansTitle = styled.div`
  display: inline;
  font-family: ${(props) => props.theme.fonts.primary};
`;

const Title = () => (
  <SpartanTitle>
    6
    <ProductSansTitle>foot</ProductSansTitle>
    4
  </SpartanTitle>
);

export default Title;
