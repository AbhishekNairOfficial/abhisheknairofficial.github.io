import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import SocialContainer, { Image } from '.';

import theme from '../../../themes';

describe('<SocialContainer />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <SocialContainer />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<Image />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Image />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
