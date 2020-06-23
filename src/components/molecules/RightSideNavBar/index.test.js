import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ThemeProvider } from 'styled-components';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import RightSideNavBar, { Container, LinkComponent } from '.';

import theme from '../../../themes';

configure({ adapter: new Adapter() });

describe('<RightSideNavBar />', () => {
  const Component = mount(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <RightSideNavBar history={{}} />
      </MemoryRouter>
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

describe('<RightSideNavBar />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Container />
      </MemoryRouter>
    </ThemeProvider>
  );
  // Creating a new element with classname cursor
  const cursor = document.createElement('div');
  cursor.setAttribute('class', 'cursor');
  document.body.appendChild(cursor);

  it('should change class on mouse enter', () => {
    fireEvent(
      container,
      new MouseEvent('mouseover', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  it('should change class on mouse enter', () => {
    fireEvent(
      container,
      new MouseEvent('mouseleave', {
        bubbles: true,
        cancelable: true,
      })
    );
  });

  expect(cursor.classList.contains('filled')).toBe(false);
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
      <MemoryRouter>
        <LinkComponent to="/" />
      </MemoryRouter>
    </ThemeProvider>
  );

  it('should match the snapshot', () => {
    expect(Component.html()).toMatchSnapshot();
  });
});
