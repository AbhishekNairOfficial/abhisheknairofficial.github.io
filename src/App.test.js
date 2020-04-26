import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ThemeProvider } from 'styled-components';

import theme from './themes';
import SixFootFour from './components/atoms/6foot4';

configure({ adapter: new Adapter() });

describe('<SixFootFour />', () => {
  const SixFootFourComponent = shallow(
    <ThemeProvider theme={theme}>
      <SixFootFour />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(SixFootFourComponent.html()).toMatchSnapshot();
  });
});
