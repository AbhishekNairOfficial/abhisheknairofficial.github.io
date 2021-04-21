import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
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

import LoadingPage from 'atoms/Loading6foot4';
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
  const router = useRouter();

  const [pageLoading, setPageLoading] = React.useState(false);
  React.useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  }, [router]);

  return (
    <FirebaseContext.Provider value={firebaseData}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Head>
          <title>Abhishek P</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        {pageLoading ? (
          <LoadingPage />
        ) : (
          <>
            <SixFootFour />
            <LandingPage />
            <ProjectsContainerComponent />
            <AboutMe />
            <LetsTalk />
            <Footer />
          </>
        )}
      </ThemeProvider>
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
