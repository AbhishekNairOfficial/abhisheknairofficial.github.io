/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import styles from './index.module.css';

const ButtonComponent = ({ label, onClick = () => {} }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={styles.StyledButton} onClick={onClick} type="button">
      {label}
    </div>
  );
};

export default ButtonComponent;
