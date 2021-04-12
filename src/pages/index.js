import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import Head from 'next/head';
import 'product-sans-webfont';
import 'typeface-spartan';

import SixFootFour from 'components/atoms/6foot4';
import HomePage from 'components/pages/HomePage';
import LoadingPage from 'components/atoms/Loading6foot4';
import theme from 'themes';
import { useRealtimeDatabase } from 'config/useFirebase';
import FirebaseContext from 'config/context';

export const GlobalStyle = createGlobalStyle`
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
    background-color: ${props => props.theme.palette.primary};
  }
`;

const App = () => {
  const firebaseData = useRealtimeDatabase('');
  return (
    <FirebaseContext.Provider value={firebaseData}>
      <ThemeProvider theme={theme}>
        <LoadingPage loading={!firebaseData} />
        {!!firebaseData && (
          <SkeletonTheme color="#ffffff1a" highlightColor="#ffffff80">
            <Head>
              <title>Abhishek P</title>
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <GlobalStyle />
            <SixFootFour />
            <HomePage />
          </SkeletonTheme>
        )}
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
