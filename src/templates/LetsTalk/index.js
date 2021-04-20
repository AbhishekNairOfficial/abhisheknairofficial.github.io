import React, { useContext } from 'react';
import styled from 'styled-components';

import { Block } from 'templates/AboutMe';
import { Container } from 'templates/Projects';
import { Title } from 'molecules/ProjectsTitle';
import QuoteComponent from 'atoms/Quote';
import { StyledButton } from 'atoms/Button';
import FirebaseContext from 'config/context';

const Paragraph = styled.div`
  color: ${props => props.theme.palette.black[0]};
  text-align: left;
  font-family: ${props => props.theme.fonts.primary};
  letter-spacing: 0.28px;
  font-size: 1.2em;
  opacity: 1;
  margin-top: 20px;
`;

const ButtonContainer = styled.a`
  margin: 30px auto;
  flex: 1;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const LetsTalk = () => {
  const { letsTalk } = useContext(FirebaseContext);

  const { email, paragraph, quotes } = letsTalk;

  return (
    <Block>
      <Container id="AboutMeSection">
        <Title>Let&#39;s Talk</Title>
        {quotes.map((quote, index) => (
          <QuoteComponent index={index} key={index} text={quote} />
        ))}
        <Paragraph>{paragraph}</Paragraph>
        <ButtonContainer href={`mailto:${email}`}>
          <StyledButton label="Email">
            <img src="/mail-icon.svg" alt="email" />
          </StyledButton>
        </ButtonContainer>
      </Container>
    </Block>
  );
};

export default LetsTalk;
