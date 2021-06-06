import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import FirebaseContext from 'config/context';
import Footer from '.';

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
