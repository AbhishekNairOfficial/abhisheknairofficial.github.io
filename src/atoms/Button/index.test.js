import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import ButtonComponent, { StyledButton } from '.';

describe('<StyledButton />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <StyledButton />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<ButtonComponent />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ButtonComponent />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
