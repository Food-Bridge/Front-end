import React, { useState, useEffect } from 'react';
import './ImageSlider.scss';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';

export default function ImageSlider({ mini, slides }) {
  const [current, setCurrent] = useState(0);
  const length = slides ? slides.length : 0;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  });

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <div className={mini ? 'imageSlider mini' : 'imageSlider'}>
      <IoIosArrowBack
        className='imageSlider-arrow left'
        size='30'
        onClick={prevSlide}
      />
      <IoIosArrowForward
        className='imageSlider-arrow right'
        size='30'
        onClick={nextSlide}
      />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
              <img
                src={slide}
                alt='음식사진'
                className={
                  mini ? 'imageSlider-image mini' : 'imageSlider-image'
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
