import React from 'react';
import Head from 'next/head';

import SixFootFour from 'atoms/6foot4';
import LandingPage from 'templates/LandingPage';
import ProjectsContainerComponent from 'templates/Projects';
import AboutMe from 'templates/AboutMe';
import LetsTalk from 'templates/LetsTalk';
import Footer from 'templates/Footer';
import FirebaseContext from 'config/context';

import firebaseData from '../../content/data.content.json';

const App = () => {
  return (
    <FirebaseContext.Provider value={firebaseData}>
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
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
