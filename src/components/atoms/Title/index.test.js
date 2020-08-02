import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import theme from 'themes';
import Title, { SpartanTitle, ProductSansTitle } from '.';


describe('<Title />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Title />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<SpartanTitle />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <SpartanTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<ProductSansTitle />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ProductSansTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
