import Image from "next/image";
import React, { useState, useEffect } from "react";

function InnerCarousel({ pictures, userId, userIndex }: any) {
  const [picturesLength, setPicturesLength] = useState(Number);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setPicturesLength(pictures.length);
  }, [pictures]);

  const goToPreviousSlide = (userId: any) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? picturesLength - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = (userId: any) => {
    setCurrentIndex((prevIndex) =>
      prevIndex === picturesLength - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel-container">
      <div id={userId} className="carousel w-[300px] card h-full">
        {pictures.map((picture: any, index: number) => (
          <div
            id={`slide${userId+index}`}
            className={`carousel-item relative h-full ${currentIndex === index ? "active" : ""
              }`}
            key={userId+index}
          >
            <div
              style={{ backgroundImage: `url(${picture})` }}
              className="card"
            />
            <div className="buttons_inner">
              <a onClick={() => { goToPreviousSlide(userId) }} href={`#slide${userId+(index-1)}`} className="btn btn-circle">❮</a>
              <a onClick={() => goToNextSlide(userId)} href={`#slide${userId+(index+1)}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InnerCarousel;
