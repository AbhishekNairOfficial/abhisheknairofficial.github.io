const greetingText = () => {
  const currentTime = new Date().getHours();
  if (currentTime > 4 && currentTime <= 7) {
    return 'What are you, a rooster? Go back to sleep!';
  }
  if (currentTime > 7 && currentTime <= 12) {
    return 'Good morning to you!';
  }
  if (currentTime > 12 && currentTime <= 16) {
    return 'Good afternoon to you!';
  }
  if (currentTime > 16 && currentTime <= 22) {
    return 'Good evening to you!';
  }
  if (currentTime > 22 || currentTime <= 4) {
    return "Isn't it a little late to be checking out my site?";
  }
  return 'Hello!';
};

export { greetingText };
