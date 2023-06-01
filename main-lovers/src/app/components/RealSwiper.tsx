import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.min.css';

const RealSwiper = () => {

    const images = [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80',
        'https://img-9gag-fun.9cache.com/photo/aB8bj5A_460s.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLZFWbcl5d-NMAeHXypLTcvWxddYKqOHSNC1iU3nHsYDqZzyQXP7-an_h5iqlvE6IvAE&usqp=CAU',
      ];


      useEffect(() => {
        const loadSwiperScript = () => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/swiper/swiper-bundle.min.js';
          script.async = true;
          document.body.appendChild(script);
      
          script.onload = () => {
            const swiper = new window.Swiper('.mySwiper', {
              effect: 'cards',
              grabCursor: true,
              slidesPerView: 1,
              // Disable touch move by default
              allowTouchMove: true,
            });
      
            swiper.on('slideChange', () => {
                const previousEnabled = false;
                // const previousEnabled2 = swiper.touches.diff < 0
                const previousEnabled1 = swiper.touches.diff < 0
                // Disable touch move after each slide change
                swiper.allowTouchMove = false;
              
                // Enable touch move when the user releases the card
                swiper.once('touchEnd', () => {
                  swiper.allowTouchMove = true;
                });
                console.log("prevEnabled1", previousEnabled1);
                // console.log("prevEnabled2", previousEnabled2);
            });
          };
        };
      
        loadSwiperScript();
      
        return () => {
          const script = document.querySelector('script[src="https://unpkg.com/swiper/swiper-bundle.min.js"]');
          if (script) {
            document.body.removeChild(script);
          }
        };
      }, []);


    return (
        <>
        <div className="swiper mySwiper">
            <div className="swiper-wrapper">
                {images.map((imageUrl, index) => (
                <div className="swiper-slide" key={index}>
                    <img src={imageUrl} alt={`Slide ${index + 1}`} className="swiper-slide-image" />
                </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default RealSwiper;
