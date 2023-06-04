"use client";
import Image from "next/image";
import MyMatches from "./MyMatches";
import MyMessages from "./MyMessages";

import React, { useEffect, useState } from "react";

const Drawer: React.FC = () => {
 
  const [showDrawer, setShowDrawer] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [showMessages, setShowMessages] = useState(true);

  const handleMatchesClick = () => {
    setShowMatches(true);
    setShowMessages(false);
  };

  const handleMessagesClick = () => {
    setShowMatches(false);
    setShowMessages(true);
  };

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
    <div className="mt-36 h-full">
      <button
        onClick={handleDrawerToggle}
        className={`btn ${!showDrawer ? 'btn-circle' : ''} mt-2 fixed z-50 transition-all duration-500 ease-in-out ${showDrawer ? 'bg-blue-lover' : 'bg-pink-lover'}`}
        style={{ left: showDrawer ? '21rem' : '1rem' }} 
      >
        {showArrow && (showDrawer ? '❮' : '❯')}
      </button>
      
      <div
        tabIndex={0}   style={{ maxHeight: "780px", overflow: "auto" }}

        className={`absolute left-0 -ml-2 p-2 shadow bg-black-lover w-52 h-full w-96 z-40 transition-transform duration-500 ease-in-out ${showDrawer ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
      >
        <div className="flex text-pink-lover w-full justify-evenly mb-4">
          {/* VISIBLE TRUE DEFAULT */}
          {/* <li>
            <button onClick={handleMatchesClick}>My Matches</button>
          </li> */}
          {/* ONCLICK: MATCHES VISIBLE FALSE && MESSAGES VISIBILE TRUE */}
       
            <button onClick={handleMessagesClick}>My Messages</button>
         
        </div>
        {/* {showMatches && <MyMatches />} */}
        {showMessages && <MyMessages />}
      </div>
    </div>
  );
};

export default Drawer;
