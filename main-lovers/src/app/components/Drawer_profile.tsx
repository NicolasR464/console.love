"use client";
import Image from "next/image";
import Carousel from "./UserProfile"


import React, { useEffect, useState, useRef } from "react";

export default function DrawerCarousel({ roomId }: any) {
  const [showDrawer, setShowDrawer] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
 

  

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
    setShowArrow(false);

    setTimeout(() => {
      setShowArrow(true);
    }, 500);
  };


  useEffect(() => {
    setShowArrow(true);
  }, []);

  return (
    <div className="h-screen">
      <div className="">
        <button
          onClick={handleDrawerToggle}
          className={`btn ${!showDrawer ? 'btn-circle' : ''} mt-2 fixed z-50 transition-all duration-500 ease-in-out ${showDrawer ? 'bg-blue-lover' : 'bg-pink-lover'}`}
          style={{ right: showDrawer ? '21rem' : '1rem' }} 
        >
          {showArrow && (showDrawer ? '❯' : '❮')}
        </button>
      
        <div
          tabIndex={0}   
          className={`absolute right-0 w-[100%] sm:w-96 shadow bg-black-lover h-[90vh] z-999 transition-transform duration-500 ease-in-out ${showDrawer ? 'transform translate-x-0' : 'transform translate-x-full'}`}
        >
       <Carousel roomId={ roomId } />
         
        </div>
      </div>

  
    </div>
  );
};


