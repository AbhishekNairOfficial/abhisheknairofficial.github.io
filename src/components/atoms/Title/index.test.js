import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import Title, { SpartanTitle, ProductSansTitle } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

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

describe('<SpartanTitle />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <SpartanTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<ProductSansTitle />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <ProductSansTitle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
