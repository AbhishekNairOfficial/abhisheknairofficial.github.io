import React, { lazy, Suspense } from 'react';

import LandingPage from 'components/templates/LandingPage';

const ProjectsContainer = lazy(() => import('components/templates/Projects'));
const AboutPage = lazy(() => import('components/templates/AboutMe'));
const Footer = lazy(() => import('components/templates/Footer'));

const HomePage = () => (
  <>
    <LandingPage />
    <Suspense fallback={<div>hi</div>}>
      <ProjectsContainer />
      <AboutPage />
      <Footer />
    </Suspense>
  </>
);

export default HomePage;
