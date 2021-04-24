import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import FirebaseContext from 'config/context';
import LandingPage from '.';

describe('<LandingPage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={{ landingPage: {} }}>
        <LandingPage />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});
