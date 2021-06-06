import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import SixFootFour from '.';

describe('<SixFootFour />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <SixFootFour />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
