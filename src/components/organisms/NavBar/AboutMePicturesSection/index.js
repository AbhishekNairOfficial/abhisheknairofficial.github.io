import ImageComponent from 'components/atoms/ImageComponent';
import { useRealtimeDatabase } from 'config/useFirebase';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.palette.white[0]};
  padding: 3em;
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  &:nth-child(2) {
    margin: 0 15px;
  }
`;

const AboutMePicturesSection = () => {
  const listOfImages = useRealtimeDatabase('aboutMe/images');

  if (!listOfImages) {
    return <></>;
  }

  const numberOfRows = 3;
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

  newListOfImages = transpose(newListOfImages);

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
