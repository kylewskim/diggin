export const getGreetingMessage = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 6) return 'Sweet dreams';
  if (hours < 12) return 'Good morning';
  if (hours < 17) return 'Good afternoon';
  return 'Good evening';
};
