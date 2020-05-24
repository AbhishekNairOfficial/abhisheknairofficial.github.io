import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import renderer from 'react-test-renderer';

import theme from './themes';
import SixFootFour from './components/atoms/6foot4';
import App, { GlobalStyle } from './App';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

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

describe('<GlobalStyle />', () => {
  const GlobalStyleComponent = shallow(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(GlobalStyleComponent.html()).toMatchSnapshot();
  });
});
