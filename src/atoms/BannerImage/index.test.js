import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import BannerImage from '.';

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
