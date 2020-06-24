import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import ProjectTile, { Container, Title, Description } from '.';
import theme from '../../../themes';

describe('<ProjectTile />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <ProjectTile title="title" description="description" />
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

describe('<Description />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Description />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
