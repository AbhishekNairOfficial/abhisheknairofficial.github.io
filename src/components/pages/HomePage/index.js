import React, { lazy, Suspense } from 'react';

import LandingPage from 'components/templates/LandingPage';

const ProjectsContainer = lazy(() => import('components/templates/Projects'));
const Footer = lazy(() => import('components/templates/Footer'));

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
