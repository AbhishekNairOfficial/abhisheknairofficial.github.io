import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import theme from 'themes';
import ProjectsTitle, { Container, Title, SubTitle } from '.';

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

describe('<SubTitle />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <SubTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
