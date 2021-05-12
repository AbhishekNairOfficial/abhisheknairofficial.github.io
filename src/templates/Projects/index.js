/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useContext } from 'react';

import ProjectsTitle from 'molecules/ProjectsTitle';
import ProjectTile from 'molecules/ProjectTile';
import FirebaseContext from 'config/context';

import otherStyles from 'templates/AboutMe/index.module.css';
import styles from './index.module.css';

const ProjectsContainerComponent = () => {
  const {
    projectsPage: { projects: listOfProjects },
  } = useContext(FirebaseContext);

  return (
    <section>
      <div className={styles.container} id="projectsSectionContainer">
        <ProjectsTitle />
        <div className={styles.projectsContainerDiv}>
          {listOfProjects.map((project, key) => (
            <ProjectTile key={key} project={project} />
          ))}
        </div>
      </div>
      <hr className={otherStyles.bottomLine} />
    </section>
  );
};

export default ProjectsContainerComponent;
