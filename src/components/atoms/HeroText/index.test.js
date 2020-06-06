import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import HeroText, { Text, HelloText, NameText, DesignationText } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<BannerImage />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <HeroText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<Text />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Text />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<HelloText />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <HelloText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<NameText />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <NameText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<DesignationText />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <DesignationText />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
