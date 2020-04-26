import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import ProjectsContainer, { Container } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<ProjectsContainer />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <ProjectsContainer />
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
