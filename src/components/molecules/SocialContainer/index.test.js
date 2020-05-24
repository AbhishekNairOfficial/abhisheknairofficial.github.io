import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import SocialContainer, { Image } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<SocialContainer />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <SocialContainer />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<Image />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Image />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
