import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import theme from 'themes';
import ProjectTile, { Container, Title } from '.';

describe('<ProjectTile />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ProjectTile title="title" />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('<Container />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

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
