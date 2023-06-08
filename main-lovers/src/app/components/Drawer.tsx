"use client";
import Image from "next/image";
import MyMatches from "./MyMatches";
import MyMessages from "./MyMessages";
import NewMatchModal from './NewMatchModal';

import React, { useEffect, useState, useRef } from "react";

const Drawer: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(true);
  const [showArrow, setShowArrow] = useState(false);
  const [showMatches, setShowMatches] = useState(false);
  const [showMessages, setShowMessages] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserName, setModalUserName] = useState('');

  const [userName, setUserName] = useState(''); 
  const modalRootRef = useRef();

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

  const handleModalOpen = (name: string) => {
    console.log(`Received username in Drawer component: ${name}`);

    setModalUserName(name);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setShowArrow(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      // Adjust the value to your desired breakpoint
      if (screenWidth <= 768) {
        setShowDrawer(false);
      } else {
        setShowDrawer(true);
      }
    };
    // Check on initial render
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-screen">
      <div className="">
        <button
          onClick={handleDrawerToggle}
          className={`btn ${!showDrawer ? 'btn-circle' : ''} mt-2 fixed z-${!showDrawer ? '999' : '50'} transition-all duration-500 ease-in-out ${
            showDrawer ? 'bg-blue-lover' : 'bg-pink-lover'
          }`}
          style={{ left: showDrawer ? '20.2rem' : '1rem' }}
        >
          {showArrow && (showDrawer ? '❮' : '❯')}
        </button>
      
        <div
          // tabIndex={0}   
          className={`absolute left-0 -ml-2 p-2 shadow bg-black-lover h-[90vh] w-96 z-40 transition-transform duration-500 ease-in-out ${showDrawer ? 'transform translate-x-0' : 'transform -translate-x-full'}`}
        >
          <div className="flex text-pink-lover w-[90%] justify-evenly mb-4">
            <button className="btn" onClick={handleMatchesClick}>My Matches</button>
            <div className="text-pink-lover">|</div>
            <button className="btn" onClick={handleMessagesClick}>My Messages</button>
          </div>
          <div id='myMessages' style={{ display: showMatches ? "block" : "none" }} className="flex-col overflow-scroll h-[90%] mx text-white w-full">
            <MyMatches handleModalOpen={handleModalOpen} />
          </div>
          <div id='myMessages' style={{ display: showMessages ? "block" : "none" }} className="flex-col overflow-scroll h-[90%] mx text-white w-full">
            <MyMessages />
          </div>
        </div>
      </div>

      <div id="modal-root"></div>
      <NewMatchModal isOpen={isModalOpen} userName={modalUserName} onClose={handleModalClose} />
    </div>
  );
};

export default Drawer;
