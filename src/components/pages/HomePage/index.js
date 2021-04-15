import React from 'react';

import LandingPage from 'components/templates/LandingPage';
import LetsTalk from 'components/templates/LetsTalk';

import ProjectsContainer from 'components/templates/Projects';
import AboutPage from 'components/templates/AboutMe';
import Footer from 'components/templates/Footer';

const HomePage = () => (
  <>
    <LandingPage />
    <ProjectsContainer />
    <AboutPage />
    <LetsTalk />
    <Footer />
  </>
);

export default HomePage;
