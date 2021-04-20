import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import BannerImage, { ImageContainer } from '.';

describe('<BannerImage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <BannerImage />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<Image />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ImageContainer />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
