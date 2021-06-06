const greetingText = () => {
  const currentTime = new Date().getHours();
  if (currentTime > 4 && currentTime <= 8) {
    return "It's a little early, isn't it?";
  }
  if (currentTime > 8 && currentTime <= 12) {
    return 'Good morning to you!';
  }
  if (currentTime > 12 && currentTime <= 16) {
    return 'Good afternoon to you!';
  }
  if (currentTime > 16 && currentTime <= 22) {
    return 'Good evening to you!';
  }
  if (currentTime > 22 || currentTime <= 4) {
    return "It's a little late, isn't it?";
  }
  return 'Hello!';
};

export { greetingText };
