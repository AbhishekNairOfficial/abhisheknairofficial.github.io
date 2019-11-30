import React from 'react';
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
    </div>
  );
};

export default React.memo(ProjectsPage);
