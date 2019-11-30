import React from 'react';
import { getIcon } from '../../pages/landing-page';
import './index.css';

const ProjectTile = props => {
  const { data } = props;
  const { title, description, url, icon } = data;
  return (
    <div className="project">
      <p className="title">{title}</p>
      <img alt="Social Icon" className="icon" src={getIcon(icon)} />
      <p className="text">{description}</p>
      <a
        aria-label="article link"
        className="link"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="button">Check it out!</p>
      </a>
    </div>
  );
};

export default ProjectTile;
