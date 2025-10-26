import { JOB_DESCRIPTION, JOB_TITLE } from '@/config/constants';

const Banner = () => (
  <section className="mx-[50px] p-[50px] bg-secondary flex justify-center">
    <h1 className="text-right font-primary text-7xl flex-1">
      <p className="inline bg-white px-2 leading-[1.5]">
        {JOB_TITLE}
      </p>
    </h1>
    <p className="flex-1 pl-[50px] text-2xl">
      {JOB_DESCRIPTION}
    </p>
  </section>
);

export default Banner;