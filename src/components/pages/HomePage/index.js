import React, { lazy, Suspense } from 'react';

import LandingPage from '../../templates/LandingPage';

const ProjectsContainer = lazy(() => require('../../templates/Projects'));
const Footer = lazy(() => require('../../templates/Footer'));

const HomePage = () => (
  <>
    <Suspense fallback={<div>hi</div>}>
      <LandingPage />
      <ProjectsContainer />
      <Footer />
    </Suspense>
  </>
);

export default HomePage;
