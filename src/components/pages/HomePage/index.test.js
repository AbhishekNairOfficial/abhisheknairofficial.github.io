import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';
import Footer from '../../templates/Footer';
import HomePage from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  const component = renderer.create(
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('<Footer />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Footer />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
