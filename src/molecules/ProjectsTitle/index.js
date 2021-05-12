import React, { useEffect } from 'react';

import styles from './index.module.css';

const ProjectsTitle = () => {
  useEffect(() => {
    const projectTitleElement = document.getElementById('projectsTitle');
    const { top } = projectTitleElement.getBoundingClientRect();
    const heightOfTheWindow = window.innerHeight;
    if (top > heightOfTheWindow) {
      // This component is below
      projectTitleElement.classList.add(styles.black);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 id="projectsTitle" className={styles.title}>
        Here is some of my best work
      </h1>
    </div>
  );
};

export default ProjectsTitle;
