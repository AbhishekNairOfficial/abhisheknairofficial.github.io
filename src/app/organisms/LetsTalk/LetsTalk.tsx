import { EMAIL_BUTTON_TEXT, LETS_TALK_IMAGE_ALT, LETS_TALK_SECTION_TITLE, LETS_TALK_TEXT } from '@/config/constants';
import Button from '@/app/atoms/Button';
import Image from 'next/image';

const LetsTalk = () => (
  <section className="mx-[50px] p-[50px]">
    <h2 className="font-primary text-5xl underline mb-[30px]">
      {LETS_TALK_SECTION_TITLE}
    </h2>
    <div className="flex">
      <p className="flex-1 text-2xl text-justify pr-[50px]">
        {LETS_TALK_TEXT}
        <Button className="mt-7 block">
          {EMAIL_BUTTON_TEXT}
        </Button>
      </p>
      <p className="flex-1">
        <Image
          alt={LETS_TALK_IMAGE_ALT}
          height="250"
          src="/images/lets-talk.png"
          width="250"
        />
      </p>
    </div>
  </section>
);

export default LetsTalk;