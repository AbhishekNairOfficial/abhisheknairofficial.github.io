import React from 'react';
import styled from 'styled-components';

const Block = styled.div`
  color: ${props => props.theme.palette.black[0]};
  font-family: ${props => props.theme.fonts.italic};
  letter-spacing: 0px;
  text-align: ${props => (props.odd ? 'left' : 'right')};
  line-height: 3em;
`;

const Quote = styled.span`
  font-size: 3em;
`;

const Text = styled.span`
  font-size: 1em;
`;

const QuoteComponent = ({ text, index }) => {
  const odd = index % 2 === 0; // index is one lesser than count
  return (
    <Block odd={odd}>
      <Quote>&#34;</Quote>
      <Text>{text}</Text>
      <Quote>&#34;</Quote>
    </Block>
  );
};

export default QuoteComponent;
