import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.div`
  height: 50px;
  border: ${props => `2px solid ${props.theme.palette.primary[0]}`};
  margin: 10px;
  padding: 0 50px;
  border-radius: 6px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.palette.white[0]};
  background-color: ${props => props.theme.palette.primary[0]};
  font-family: ${props => props.theme.fonts.primary};
  &:hover {
    color: ${props => props.theme.palette.primary[0]};
  }
`;

const ButtonComponent = ({ label, onClick = () => {} }) => {
  return (
    <StyledButton onClick={onClick} type="button">
      {label}
    </StyledButton>
  );
};

export default ButtonComponent;
