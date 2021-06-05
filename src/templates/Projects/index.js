/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useContext } from 'react';

import ProjectsTitle from 'molecules/ProjectsTitle';
import ProjectTile from 'molecules/ProjectTile';
import FirebaseContext from 'config/context';

import styles from './index.module.css';

const ProjectsContainerComponent = () => {
  const {
    projectsPage: { projects: listOfProjects, text },
  } = useContext(FirebaseContext);

  return (
    <section>
      <div className={styles.container} id="projectsSectionContainer">
        <ProjectsTitle title={text} />
        <div className={styles.projectsContainerDiv}>
          {listOfProjects.map((project, key) => (
            <ProjectTile key={key} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainerComponent;
