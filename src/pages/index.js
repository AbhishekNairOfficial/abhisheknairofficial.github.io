import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { SkeletonTheme } from 'react-loading-skeleton';
import Head from 'next/head';
import 'product-sans-webfont';
import 'typeface-spartan';

import SixFootFour from 'atoms/6foot4';
import LoadingPage from 'atoms/Loading6foot4';
import theme from 'themes';
import { useRealtimeDatabase } from 'config/useFirebase';
import FirebaseContext from 'config/context';
import LandingPage from 'templates/LandingPage';
import ProjectsContainerComponent from 'templates/Projects';
import AboutMe from 'templates/AboutMe';
import LetsTalk from 'templates/LetsTalk';
import Footer from 'templates/Footer';

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
            <LandingPage />
            <ProjectsContainerComponent />
            <AboutMe />
            <LetsTalk />
            <Footer />
          </SkeletonTheme>
        )}
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
