"use client"
import React from 'react';
import Image from 'next/image';

export default function MyMatches() {
 
  return (
    <>
      <div
        id="myMatches"
        className="flex flex-wrap justify-between w-86 mx-auto p-4 overflow-scroll h-[80%]"
      >
        {messageData.map((message, index) => (
          <div key={index} className="avatar online m-2">
            <div className="w-20 h-20 rounded-full">
              {/* <Image
                width={50} height={50} src={`https://xsgames.co/randomusers/avatar.php?g=${message.gender}`} alt=""
              /> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
