import React from 'react';
import arrowIcon from '../../assets/down-arrow.svg';

const ProjectsPage = () => {
  return (
    <div className="landing-page-container" id="ProjectsPage">
      I am Projects Page
      <a href="#EmailPage">
        <img src={arrowIcon} alt="chevron-down" className="chevron-down" />
      </a>
    </div>
  );
};

export default ProjectsPage;
