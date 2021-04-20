import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import FirebaseContext from 'config/context';
import SocialContainer, { Image } from '.';

describe('<SocialContainer />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={{ socialProfile: [] }}>
        <SocialContainer />
      </FirebaseContext.Provider>
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
