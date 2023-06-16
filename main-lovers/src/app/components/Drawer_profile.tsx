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

  useEffect(() => {
    const handleResize = () => {
      // Check the window width and update the showDrawer state accordingly
      setShowDrawer(window.innerWidth > 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the handleResize function initially
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const buttonStyle = {
    right: showDrawer ? "20.2rem" : "15px",
  };

  if (showDrawer && window.innerWidth >= 768) {
    buttonStyle.right = "20.7rem";
  }

  if (!showDrawer && window.innerWidth >= 768) {
    buttonStyle.right = "1rem";
  }

  return (
    <div className="h-screen">
      <button
        onClick={handleDrawerToggle}
        className={`btn ${!showDrawer ? "btn-circle" : ""} mt-2 fixed z-${
          !showDrawer ? "999" : "50"
        } transition-all duration-500 ease-in-out ${
          showDrawer ? "bg-blue-lover" : "bg-pink-lover"
        }`}
        style={buttonStyle}
      >
        {showArrow && (showDrawer ? "❯" : "❮")}
      </button>
      <div className="">
      
        <div
          tabIndex={0}   
          className={`fixed right-[0px] w-[100%] sm:w-96 shadow bg-black-lover h-[90vh] z-10 transition-transform duration-500 ease-in-out ${showDrawer ? 'transform translate-x-0' : 'transform translate-x-full' }`}
        >
          <Carousel roomId={ roomId } />
        </div>
      </div>

  
    </div>
  );
};


