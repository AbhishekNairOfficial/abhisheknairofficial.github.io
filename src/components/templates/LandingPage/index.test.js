import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import LandingPage, { Container, MainPart } from '.';

import theme from '../../../themes';

describe('<LandingPage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
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

describe('<MainPart />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <MainPart />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
