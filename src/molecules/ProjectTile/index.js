/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import useWindowSize from 'config/useWindowResize';
import externalStyles from 'molecules/RightSideNavBar/index.module.css';
import styles from './index.module.css';

const EXTERNAL_LINK_ICON = 'projects/external-link.svg';
const RIGHT_ARROW_ICON = 'projects/button-arrow.svg';

const ProjectTile = ({ project }) => {
  const { title, image, type, icon, url, local } = project;

  const { width } = useWindowSize();

  const rightSideIcon = type === 'design' ? RIGHT_ARROW_ICON : EXTERNAL_LINK_ICON;
  const rightSideText = type === 'design' ? 'read case study' : 'see more';

  const onButtonClick = () => {
    if (local) {
      return;
    }
    window.open(url);
  };

  return (
    <div className={styles.container} id="projectTileContainer">
      <Image
        className={styles.imageContainer}
        width={0.35 * width - 10}
        height={(0.35 * width - 10) * 0.8}
        src={image}
        alt="project"
      />
      <div className={styles.textContainer}>
        <div className={styles.leftSide}>
          <Image
            className={styles.icon}
            height={width >= 600 ? 30 : 20}
            width={width >= 600 ? 30 : 20}
            src={icon}
            alt="project icon"
          />
          <div className={styles.title}>{title}</div>
        </div>
        {local ? (
          <Link href={url} />
        ) : (
          <span
            className={externalStyles.linkComponent}
            data-testid="workButton"
            href="/"
            onClick={onButtonClick}
          >
            <div className={styles.rightSide}>
              <span className={styles.text}>{rightSideText}</span>
              <img
                className={styles.rightSideIconContainer}
                src={rightSideIcon}
                alt="project icon"
              />
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default ProjectTile;
