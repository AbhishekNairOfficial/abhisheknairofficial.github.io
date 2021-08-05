import React from 'react';

import SixFootFour from 'atoms/6foot4';
import LandingPage from 'templates/LandingPage';
import ProjectsContainerComponent from 'templates/Projects';
import AboutMe from 'templates/AboutMe';
import Footer from 'templates/Footer';
import FirebaseContext from 'config/context';
import SEO from 'atoms/SEO';

import Testimonials from 'templates/Testimonials';
import DevelopmentProjects from 'templates/DevProjects';
import LetsTalk from 'templates/LetsTalk';
import firebaseData from '../../content/data.content.json';

const App = () => {
  return (
    <FirebaseContext.Provider value={firebaseData}>
      <SEO />
      <SixFootFour />
      <LandingPage />
      <ProjectsContainerComponent />
      <AboutMe />
      <Testimonials />
      <DevelopmentProjects />
      <LetsTalk />
      <Footer />
    </FirebaseContext.Provider>
  );
};

export default React.memo(App);
