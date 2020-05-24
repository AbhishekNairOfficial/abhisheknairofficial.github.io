import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import LandingPage, { Container, MainPart } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<LandingPage />', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
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

describe('<MainPart />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <MainPart />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
