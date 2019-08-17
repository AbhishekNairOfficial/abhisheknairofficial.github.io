import React, { useEffect } from 'react';
import LandingPage from './pages/landing-page';
import ProjectsPage from './pages/projects-page';
import EmailPage from './pages/email-page';
import './App.css';

const App = () => {
  // This function adds and removes the chevrons during scroll
  const handleScroll = () => {
    let timer = null;
    const chevrons = document.getElementsByClassName('chevron-down');

    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      Array.from(chevrons).forEach(element => {
        element.classList.remove('hide');
      });
    }, 1000);
    Array.from(chevrons).forEach(element => {
      element.classList.add('hide');
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', e => handleScroll(e));
    return () => {
      window.removeEventListener('scroll', e => handleScroll(e));
    };
  }, []);
  return (
    <div className="container">
      <LandingPage />
      <ProjectsPage />
      <EmailPage />
    </div>
  );
};

export default App;
