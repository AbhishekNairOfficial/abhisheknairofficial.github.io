import FirebaseContext from 'config/context';
import React, { useContext } from 'react';

import styles from './index.module.css';

const CareerGraph = () => {
  const {
    aboutMe: { careerGraph },
  } = useContext(FirebaseContext);

  return (
    <div className={styles.container}>
      {careerGraph.map((job, i) => (
        <div className={styles.jobContainer} key={i}>
          <span>{job.name}</span>
          {!!job.date && <span>{job.date}</span>}
        </div>
      ))}
    </div>
  );
};

export default CareerGraph;
