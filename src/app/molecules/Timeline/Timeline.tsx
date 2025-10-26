import React from 'react';
import TimelineItem from '@/app/atoms/TimelineItem';
import { TIMELINE_DATA } from '@/config/constants';

const Timeline = () => {
  return (
    <aside className="flex-1 pl-[50px]">
      {/* Experience items */}
      {TIMELINE_DATA.map((item, index) => (
        <div
          className="relative"
          key={index}
        >
          <TimelineItem
            company={item.company}
            period={item.period}
            role={item.role}
          />
          {/* Vertical timeline line */}
          {(index !== TIMELINE_DATA.length - 1) && <div className="absolute -left-[1px] top-6 bottom-3 w-[2px] bg-black" />}
        </div>
      ))}
    </aside >
  );
};

export default Timeline;