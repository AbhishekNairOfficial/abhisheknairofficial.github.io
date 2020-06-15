import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import ButtonComponent, { StyledButton } from '.';
import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<StyledButton />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <StyledButton />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<ButtonComponent />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <ButtonComponent />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
