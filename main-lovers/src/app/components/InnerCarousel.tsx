import Image from "next/image";
import React, { useState, useEffect } from "react";

function InnerCarousel({ pictures, userId, userIndex }: any) {
    const [picturesLength, setPicturesLength] = useState(Number);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      setPicturesLength(pictures.length);
    }, [pictures]);

    const goToPreviousSlide = (userId: any) => {
        console.log(userId)
        console.log(userIndex)
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? picturesLength - 1 : prevIndex - 1
        );
      };
    
      const goToNextSlide = (userId: any) => {
        console.log(userId)
        console.log(userIndex)
        setCurrentIndex((prevIndex) =>
          prevIndex === picturesLength - 1 ? 0 : prevIndex + 1
        );
      };
  
    return (
      <div className="carousel-container">
        <div id={userId} className="carousel w-[300px] card h-full">
          {pictures.map((picture: any, index: number) => (
            <div
              id={`slide${index}`}
              className={`carousel-item relative h-full ${
                currentIndex === index ? "active" : ""
              }`}
              key={index}
            >
              <div
                style={{ backgroundImage: `url(${picture})` }}
                className="card"
              />
              {/* <div className="buttons absolute">
                    <a onClick={() => goToPreviousSlide(userId)} href={`#slide${currentIndex === 0 ? picturesLength - 1 : currentIndex - 1}`} className="btn btn-circle">❮</a> 
                    <a onClick={() => goToNextSlide(userId)} href={`#slide${currentIndex === picturesLength - 1 ? 0 : currentIndex + 1}`} className="btn btn-circle">❯</a>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default InnerCarousel;
  