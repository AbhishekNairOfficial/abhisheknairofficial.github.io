import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import 'product-sans-webfont';
import 'typeface-spartan';

import SixFootFour from 'atoms/6foot4';
import theme from 'themes';
import FirebaseContext from 'config/context';
import LandingPage from 'templates/LandingPage';
import ProjectsContainerComponent from 'templates/Projects';
import AboutMe from 'templates/AboutMe';
import LetsTalk from 'templates/LetsTalk';
import Footer from 'templates/Footer';

import firebaseData from '../../content/data.content.json';

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
  return (
    <FirebaseContext.Provider value={firebaseData}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <title>Abhishek P</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <SixFootFour />
        <LandingPage />
        <ProjectsContainerComponent />
        <AboutMe />
        <LetsTalk />
        <Footer />
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
