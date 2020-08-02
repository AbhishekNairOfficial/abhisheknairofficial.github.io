import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import SixFootFour from 'components/atoms/6foot4';
import App, { GlobalStyle } from 'App';

describe('<App />', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

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

describe('<GlobalStyle />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
