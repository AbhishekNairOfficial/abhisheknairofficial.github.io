import React from 'react';
import styled from 'styled-components';

export const StyledButton = styled.div`
  height: 50px;
  border: ${props => `2px solid ${props.theme.palette.primary[0]}`};
  margin: 10px;
  min-width: 150px;
  padding: 0 15px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.palette.primary[0]};
  font-family: ${props => props.theme.fonts.primary};
  &:hover {
    background-color: ${props => props.theme.palette.primary[0]};
    color: ${props => props.theme.palette.white[0]};
  }
`;

const ButtonComponent = ({ label }) => {
  return <StyledButton type="button">{label}</StyledButton>;
};

export default ButtonComponent;
