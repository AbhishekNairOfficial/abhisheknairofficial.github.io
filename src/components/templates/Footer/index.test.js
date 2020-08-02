import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import Footer, { Container, LeftSideText } from '.';


describe('<Footer />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

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

describe('<LeftSideText />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <LeftSideText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
