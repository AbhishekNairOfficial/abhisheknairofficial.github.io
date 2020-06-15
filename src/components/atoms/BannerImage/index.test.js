import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import BannerImage, { Image } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<BannerImage />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <BannerImage />
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
