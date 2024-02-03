import React, { useState, useEffect } from 'react'
import './SliderTime.scss'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'

function SliderTime({ slides }) {
    const [ current, setCurrent ] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length -1 ? 0 : current + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [current, length]);

    return (
        <div className='SliderTime'>

            {slides.map((slide, index) => {
                return (
                    <div
                        className={index === current ? 'slideActive' : 'slide'}
                        key={index}
                    >
                        { index === current && <img src={slide.image} className='image'/>} 
                    </div>
                );
            })}
        </div>
    );
}

export default SliderTime
