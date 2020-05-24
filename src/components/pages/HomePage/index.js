import React, { lazy, Suspense } from 'react';

import LandingPage from '../../templates/LandingPage';

const ProjectsContainer = lazy(() => import('../../templates/Projects'));
const Footer = lazy(() => import('../../templates/Footer'));

const HomePage = () => (
  <>
    <LandingPage />
    <Suspense fallback={<div>hi</div>}>
      <ProjectsContainer />
      <Footer />
    </Suspense>
  </>
);

export default HomePage;
