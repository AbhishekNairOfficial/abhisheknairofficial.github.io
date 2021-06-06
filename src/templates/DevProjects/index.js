import FirebaseContext from 'config/context';
import ProjectTile from 'molecules/ProjectTile';
import React, { useContext } from 'react';

import styles from './index.module.css';

const DevelopmentProjects = () => {
  const { devProjects } = useContext(FirebaseContext);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Almost forgot, I develop too</h2>
      <div>
        {devProjects.map((project, i) => (
          <ProjectTile key={i} project={project} />
        ))}
      </div>
    </section>
  );
};

export default DevelopmentProjects;
