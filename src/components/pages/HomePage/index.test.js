import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import Footer from '../../templates/Footer';
import HomePage from '.';

import theme from '../../../themes';

describe('<HomePage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

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
