import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';

import RightSideNavBar, { Container, LinkComponent } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<RightSideNavBar />', () => {
  const Component = mount(
    <ThemeProvider theme={theme}>
      <RightSideNavBar />
    </ThemeProvider>
  );

  const linkButton = Component.find({ className: 'projects-nav-link' });

  // Create new element
  const testId = 'projectsSectionContainer';
  const newDiv = document.createElement('div');
  newDiv.setAttribute('id', testId);
  document.body.appendChild(newDiv);

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });

  it('should contain a work button', () => {
    expect(linkButton.text()).toEqual('Work');
  });

  it('should click the work button', () => {
    newDiv.scrollIntoView = jest.fn();
    linkButton.simulate('click');
    expect(newDiv.scrollIntoView).toHaveBeenCalled();
  });
});

describe('<Container />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  );

  Component.simulate('mouseMove', { preventDefault: () => true });
  Component.simulate('mouseLeave', { preventDefault: () => true });

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});

describe('<LinkComponent />', () => {
  const Component = shallow(
    <ThemeProvider theme={theme}>
      <LinkComponent />
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
