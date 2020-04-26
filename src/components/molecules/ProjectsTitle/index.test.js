import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import ProjectsTitle, { Container, Title, SubTitle } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<ProjectsTitle />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <ProjectsTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<Container />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<Title />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Title />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<SubTitle />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <SubTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
