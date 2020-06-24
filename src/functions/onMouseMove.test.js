import { onMouseMove } from './onMouseMove';

describe('onMouseMove', () => {
  // Create new element
  const testClassName = 'cursor';
  const newDiv = document.createElement('div');
  newDiv.setAttribute('class', testClassName);
  document.body.appendChild(newDiv);

  // Check for (0,0);
  it('should move the element to (0,0)', () => {
    const event = { screenX: 0, screenY: 0 };
    onMouseMove(event);
    expect(newDiv.style.left).toBe('0px');
    expect(newDiv.style.top).toBe('0px');
  });

  // Check for random co-ordinates;
  const RANDOM_NUMBER = Math.floor(Math.random() * 1920) + 1;
  it('should move the element to (0,0)', () => {
    const event = { screenX: RANDOM_NUMBER, screenY: RANDOM_NUMBER };
    onMouseMove(event);
    expect(newDiv.style.left).toBe(`${RANDOM_NUMBER}px`);
    expect(newDiv.style.top).toBe(`${RANDOM_NUMBER}px`);
  });
});
