import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import theme from 'themes';
import ProjectTile from '.';

describe('<ProjectTile />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ProjectTile project={{ title: 'title' }} />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
