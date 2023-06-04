"use client";
import Image from "next/image";
import MyMatches from "./MyMatches";
import MyMessages from "./MyMessages";

import React, { useEffect, useState } from "react";

const Drawer: React.FC = () => {
  const url = window.location.href || undefined;
  const [showMatches, setShowMatches] = useState(true);
  const [showMessages, setShowMessages] = useState(false);

  const handleMatchesClick = () => {
    setShowMatches(true);
    setShowMessages(false);
  };

  const handleMessagesClick = () => {
    setShowMatches(false);
    setShowMessages(true);
  };

  return (
    <div id="drawer" className="drawer w-auto absolute mt-16 h-full">
      {/* <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked={
            url !== "http://localhost:3000/" &&
            url !== "http://localhost:3000/admin"
        }
        /> */}

      <input
        id="my-drawer-3"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked={
          url !== "http://localhost:3000/" &&
          url !== "http://localhost:3000/admin"
        }
      />

      <ul
        tabIndex={0}
        className="menu dropdown-content -ml-2 p-2 shadow bg-black-lover w-52 h-full w-96 fixed z-999"
      >
        <div className="flex text-pink-lover w-full justify-evenly mb-4">
          {/* VISIBLE TRUE DEFAULT */}
          <li>
            <button onClick={handleMatchesClick}>My Matches</button>
          </li>
          {/* ONCLICK: MATCHES VISIBLE FALSE && MESSAGES VISIBILE TRUE */}
          <li>
            <button onClick={handleMessagesClick}>My Messages</button>
          </li>
        </div>
        {showMatches && <MyMatches />}
        {showMessages && <MyMessages />}
      </ul>
    </div>
  );
};

export default Drawer;
