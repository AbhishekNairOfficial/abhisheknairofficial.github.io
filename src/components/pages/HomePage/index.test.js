import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';
import Footer from '../../templates/Footer';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

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
