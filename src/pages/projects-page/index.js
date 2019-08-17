import React from 'react';
import arrowIcon from '../../assets/down-arrow.svg';
import data from '../../config/projects-page.json';
import './index.css';
import ProjectTile from '../../components/projectTile';

const ProjectsPage = () => {
  return (
    <div className="landing-page-container project-page-container" id="ProjectsPage">
      <h1 className="projects-title">{data.title}</h1>
      <h3 className="projects-text">{data.text}</h3>
      <div className="projects-holder">
        {data.projects.map((project, key) => {
          return <ProjectTile key={key} data={project} />;
        })}
      </div>
      <a aria-label="chevron" href="#EmailPage">
        <img src={arrowIcon} alt="chevron-down" className="chevron-down" />
      </a>
    </div>
  );
};

export default ProjectsPage;
