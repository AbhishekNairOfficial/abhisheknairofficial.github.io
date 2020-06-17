export const onMouseMove = mouseMoveEvent => {
  const cursor = document.querySelector('.cursor');
  const { screenX, screenY } = mouseMoveEvent;
  cursor.style.left = `${screenX}px`;
  cursor.style.top = `${screenY}px`;
};
