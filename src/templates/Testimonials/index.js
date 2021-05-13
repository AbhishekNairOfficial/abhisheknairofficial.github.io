import React, { useContext } from 'react';
import FirebaseContext from 'config/context';

import Testimonial from 'atoms/Testimonial';
import Image from 'next/image';
import useWindowSize from 'config/useWindowResize';
import styles from './index.module.css';

const Testimonials = () => {
  const { testimonials } = useContext(FirebaseContext);

  const { width } = useWindowSize();

  const widthOfTheImage = ((width - 13 * 16) / 14) * 2 + 16;
  const heightOfTheImage = (widthOfTheImage * 8) / 3;

  return (
    <section className={styles.container}>
      <div className={styles.title}>Testimonials</div>
      <div className={styles.gridContainer}>
        {testimonials.map((testimonial, i) => (
          <Testimonial key={i} testimonial={testimonial} />
        ))}
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="/testimonials/testimonial-image.svg"
          height={heightOfTheImage}
          width={widthOfTheImage}
          quality={100}
        />
      </div>
    </section>
  );
};

export default Testimonials;
