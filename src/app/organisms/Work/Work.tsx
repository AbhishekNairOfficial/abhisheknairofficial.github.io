import { JSX } from 'react';
import Projects from '@/app/molecules/Projects';
import { WORK_TITLE } from '@/config/constants';

const Work = (): JSX.Element => {
  return (
    <section className="mx-[50px] p-[50px]">
      <h2 className="font-primary text-5xl underline mb-[30px]">
        {WORK_TITLE}
      </h2>
      <div className="border-t-[3px] border-b-[3px] border-black -mx-[50px]">
        <Projects />
      </div>
    </section>
  );
};

export default Work;