import { act, renderHook } from '@testing-library/react-hooks';

import useWindowResize from './useWindowResize';

describe('useWindowResize', () => {
  const { result } = renderHook(() => useWindowResize());

  function triggerResize(dimension, value) {
    if (dimension === 'width') {
      window.innerWidth = value;
    } else if (dimension === 'height') {
      window.innerHeight = value;
    }

    window.dispatchEvent(new Event('resize'));
  }
  it('Should handle resize', async () => {
    act(() => {
      triggerResize('width', 360);
    });

    expect(result.current.width).toBe(360);

    act(() => {
      triggerResize('height', 2048);
    });

    expect(result.current.height).toBe(2048);
  });
});
