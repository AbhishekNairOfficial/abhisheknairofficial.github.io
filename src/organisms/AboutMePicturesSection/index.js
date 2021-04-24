import React, { useContext } from 'react';

import ImageComponent from 'atoms/ImageComponent';
import FirebaseContext from 'config/context';
import useWindowResize from 'config/useWindowResize';

import styles from './index.module.css';

const AboutMePicturesSection = () => {
  const {
    aboutMe: { images: listOfImages },
  } = useContext(FirebaseContext);

  const { width } = useWindowResize();

  if (!listOfImages) {
    return <></>;
  }

  const numberOfRows = width <= 600 ? 1 : 3;
  const numberOfColumns = Math.ceil(listOfImages.length / numberOfRows);
  let newListOfImages = [];

  const transpose = m => m[0].map((x, i) => m.map(x => x[i]).filter(i => i));

  listOfImages.forEach((image, key) => {
    const myColumnNumber = Math.floor(key / numberOfColumns);
    const myColumn = newListOfImages[myColumnNumber];
    if (myColumn) {
      myColumn.push(image);
    } else {
      newListOfImages[myColumnNumber] = [image];
    }
  });
  if (numberOfRows > 1) {
    newListOfImages = transpose(newListOfImages);
  }

  return (
    <div className={styles.container}>
      {newListOfImages.map((column, index) => (
        <div className={styles.column} key={index}>
          {column.map((image, key) => (
            <ImageComponent key={key} src={image} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AboutMePicturesSection;
