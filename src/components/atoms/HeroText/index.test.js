import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import HeroText, { Text, HelloText, NameText, DesignationText } from '.';

import theme from '../../../themes';

describe('<BannerImage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <HeroText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<Text />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Text />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<HelloText />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <HelloText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<NameText />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <NameText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<DesignationText />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <DesignationText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
