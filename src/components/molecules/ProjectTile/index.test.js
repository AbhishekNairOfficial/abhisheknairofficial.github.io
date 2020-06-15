import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import ProjectTile, { Container, Title, Description } from '.';
import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<ProjectTile />', () => {
  const Component = mount(
    <ThemeProvider theme={theme}>
      <ProjectTile title="title" description="description" />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    Component.simulate('mouseEnter');
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

describe('<Description />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Description />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
