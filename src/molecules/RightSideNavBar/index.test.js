import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';

import theme from 'themes';
import RightSideNavBar from '.';

describe('<RightSideNavBar />', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <RightSideNavBar />
    </ThemeProvider>
  );
  // const linkButton = getByTestId('workButton');

  // // Create new element
  // const testId = 'projectsSectionContainer';
  // const newDiv = document.createElement('div');
  // newDiv.setAttribute('id', testId);
  // container.appendChild(newDiv);

  it('should match the snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  // it('should click the work button', () => {
  //   const scrollIntoViewMock = jest.fn();
  //   window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  //   screen.debug(container);
  //   fireEvent(
  //     linkButton,
  //     new MouseEvent('click', {
  //       bubbles: true,
  //       cancelable: true,
  //     })
  //   );
  //   expect(scrollIntoViewMock).toBeCalled();
  // });
});
