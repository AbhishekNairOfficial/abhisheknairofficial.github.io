import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import ProjectsTitle from '.';

describe('<ProjectsTitle />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ProjectsTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
