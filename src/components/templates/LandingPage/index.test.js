import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import { Container, MainPart } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

// describe('<LandingPage />', () => {
//   const Component = shallow(
//     <ThemeProvider theme={theme}>
//       <LandingPage />
//     </ThemeProvider>
//   );

//   it('should match the snapshot', () => {
//     expect(Component.html()).toMatchSnapshot();
//   });
// });

describe('<Container />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<MainPart />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <MainPart />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
