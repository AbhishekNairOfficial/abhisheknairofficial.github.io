import React from 'react';

export const DateDisplay = () => {
  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <p className='mx-[50px] px-[50px] my-[10px] font-primary underline'>
      {formattedDate}
    </p>
  );
};

export default DateDisplay;
