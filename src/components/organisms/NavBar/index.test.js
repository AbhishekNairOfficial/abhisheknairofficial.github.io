import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import { Container } from '.';


// describe('<NavBar />', () => {
//   const Component = render(
//     <ThemeProvider theme={theme}>
//       <NavBar />
//     </ThemeProvider>
//   );

//   it('should match the snapshot', () => {
//     expect(Component).toMatchSnapshot();
//   });
// });

describe('<Container />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
