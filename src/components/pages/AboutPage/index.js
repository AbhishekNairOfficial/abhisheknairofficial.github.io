import React from 'react';
import styled from 'styled-components';

import useMarkDown from 'config/useMarkDown';
import ABOUT_ME_DATA from './index.md';

const Container = styled.div`
  padding: 0 15em;
`;

const AboutPage = () => {
  const markDownData = useMarkDown(ABOUT_ME_DATA);
  return <Container>{markDownData}</Container>;
};

export default AboutPage;
