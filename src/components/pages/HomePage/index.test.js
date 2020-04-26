import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';
import LandingPage from '../../templates/LandingPage';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<LandingPage />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
