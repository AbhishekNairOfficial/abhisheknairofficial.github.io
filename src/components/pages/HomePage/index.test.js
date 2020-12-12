import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import Footer from 'components/templates/Footer';
import theme from 'themes';
import FirebaseContext from 'config/context';
import HomePage from '.';

describe('<HomePage />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider
        value={{
          landingPage: { title: '', quote: '', firstLine: '' },
          letsTalk: { email: '', paragraph: '', quotes: [] },
        }}
      >
        <HomePage />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );
  expect(container).toMatchSnapshot();
});

describe('<Footer />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <FirebaseContext.Provider value={{ socialProfile: [] }}>
        <Footer />
      </FirebaseContext.Provider>
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
