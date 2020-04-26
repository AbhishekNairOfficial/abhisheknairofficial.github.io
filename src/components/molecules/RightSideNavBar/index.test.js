import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import RightSideNavBar, { Container, LinkComponent } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<RightSideNavBar />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <RightSideNavBar />
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

describe('<LinkComponent />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <LinkComponent />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
