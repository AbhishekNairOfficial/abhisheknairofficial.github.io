/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// import Link from 'next/link';
import Image from 'next/image';

import useWindowSize from 'config/useWindowResize';
import styles from './index.module.css';

// const EXTERNAL_LINK_ICON = 'projects/external-link.svg';
// const RIGHT_ARROW_ICON = 'projects/button-arrow.svg';

const ProjectTile = ({ project }) => {
  const { title, image, url, icon, description, client, tags = [] } = project;

  const { width } = useWindowSize();

  let widthOfTheImage = ((width - 13 * 16) / 14) * 10 + 16 * 9;
  if (width < 600) {
    widthOfTheImage = width;
  }
  const heightOfTheImage = widthOfTheImage * 0.5;

  const onReadMoreClick = () => {
    window.open(url);
  };

  return (
    <div className={styles.container} id="projectTileContainer">
      <div className={styles.imageContainer}>
        <Image
          quality={100}
          width={widthOfTheImage}
          height={heightOfTheImage}
          src={image}
          alt="project"
        />
      </div>
      <div className={styles.textContainer}>
        <div className={styles.leftSide}>
          <div className={styles.title}>{title}</div>
          <div>
            <Image
              quality={100}
              className={styles.icon}
              height={width >= 600 ? 24 : 20}
              width={width >= 600 ? 24 : 20}
              src={icon}
              alt="project icon"
            />
            <span>{client}</span>
          </div>
        </div>
        <div className={styles.rightSide}>
          <div>
            {tags.map((tag, i) => (
              <div key={i}>{tag}</div>
            ))}
          </div>
          <div>{description}</div>
          <div onClick={onReadMoreClick}>
            <span>read full case study</span>
            <Image src="/projects/right-arrow.svg" height={8} width={8} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;
