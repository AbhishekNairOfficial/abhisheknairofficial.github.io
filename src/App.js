import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import SixFootFour from './components/atoms/6foot4';
import HomePage from './components/pages/HomePage';
import theme from './themes';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  *::-webkit-scrollbar {
    width: 0 !important
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SixFootFour />
      <HomePage />
    </ThemeProvider>
  );
};

export default React.memo(App);
