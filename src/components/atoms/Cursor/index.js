import React from 'react';
import styled from 'styled-components';

const Cursor = styled.div`
  position: fixed;
  width: 1.8rem;
  height: 1.8rem;
  border: ${props => `2px solid ${props.theme.palette.secondary[0]}`};
  border-radius: 50%;
  transform: translate(100%, -300%);
  pointer-events: none;
  transition: all 0.2s ease;
  transition-property: background, border, transform;
  transform-origin: 150% 150%;
  z-index: 999;
  &.filled {
    background-color: ${props => props.theme.palette.secondary[0]};
  }
`;

const CursorContainer = () => {
  return <Cursor className="cursor" />;
};

export default CursorContainer;
