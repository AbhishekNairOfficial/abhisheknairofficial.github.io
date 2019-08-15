import React from 'react';
import LandingPage from './pages/landing-page';
import ProjectsPage from './pages/projects-page';
import EmailPage from './pages/email-page';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <LandingPage />
      <ProjectsPage />
      <EmailPage />
    </div>
  );
};

export default App;
