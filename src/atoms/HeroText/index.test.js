import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import theme from 'themes';
import FirebaseContext from 'config/context';
import HeroText, { Text, HelloText, NameText, DesignationText } from '.';

describe('<BannerImage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={{ landingPage: { title: '', quote: '', firstLine: '' } }}>
        <HeroText />
      </FirebaseContext.Provider>
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
