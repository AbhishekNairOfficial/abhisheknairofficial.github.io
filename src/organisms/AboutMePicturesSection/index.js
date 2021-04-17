import React, { useContext } from 'react';
import styled from 'styled-components';

import ImageComponent from 'atoms/ImageComponent';
import FirebaseContext from 'config/context';
import useWindowResize from 'config/useWindowResize';

const Container = styled.div`
  background-color: ${props => props.theme.palette.white[0]};
  padding: 0 3em;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 600px) {
    padding: 0 30px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:nth-child(2) {
    margin: 0 15px;
  }
`;

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
    <Container>
      {newListOfImages.map((column, index) => (
        <Column key={index}>
          {column.map((image, key) => (
            <ImageComponent key={key} src={image} />
          ))}
        </Column>
      ))}
    </Container>
  );
};

export default AboutMePicturesSection;
