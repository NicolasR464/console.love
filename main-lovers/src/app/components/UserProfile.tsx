"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useSocket } from '../context/SocketContext';
import Image from "next/image";
import RejectUserComponent from "./UnmatchButton";

interface Session {
  user: {
    sub: string;
  };
}

interface User {
  name: string
}

function InnerCarousel({ roomId }: any) {
  const [pictures, setPictures] = useState<Array<string>>([]);
  const socket = useSocket().socket;
  const [session, setSession] = useState<Session | null>(null);
  const [otherUserId, setOtherUserId] = useState<string>("");
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchSession = async () => {
      const currentSession = await getSession();
      setSession(currentSession);
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("room-data", async (room: any) => {
      for (const chatter of room.chatters) {
        if (chatter.chatId !== session?.user?.sub) {
          setOtherUserId(chatter.chatId);
          const res = await axios.get(`http://localhost:3000/api/users/${chatter.chatId}`);
          setUserData(res.data.data)
          console.log(userData)
          setPictures(res.data.data.pictures);
        }
      }
    });

    return () => {
      socket.off("room-data");
    };
  }, [socket, session, userData]);



  return (
    <>



{/* <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="https://res.cloudinary.com/dgarygsq5/image/upload/v1686061732/evalha8eztv07hwo1vip.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://res.cloudinary.com/dgarygsq5/image/upload/v1686061732/evalha8eztv07hwo1vip.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://res.cloudinary.com/dgarygsq5/image/upload/v1686061732/evalha8eztv07hwo1vip.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://res.cloudinary.com/dgarygsq5/image/upload/v1686061732/evalha8eztv07hwo1vip.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div> */}







      <div className="carousel w-full">
        {pictures.map((pic, index) => (
          <div id={`slide${index + 1}`} className="carousel-item relative w-full" key={index}>
            {/* <Image src={pic} className="w-full"></Image> */}
            
            <div
              style={{
                backgroundImage: `url(${pic})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover', 
            }}
              className="w-full h-[400px] rounded-2xl flex justify-end p-3 m-[12px]"
            >
              <RejectUserComponent
                currentUserId={session?.user?.sub || ""}
                targetUserId={otherUserId}
                roomId={roomId}
              />
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${index === 0 ? pictures.length : index}`} className="btn btn-circle">❮</a>
              <a href={`#slide${index === pictures.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
        
        <div className="flex-col w-[90%] h-auto m-auto rounded-br-2xl text-white mt-5">
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold mw-[200px] overflow-hidden">{userData.name}
            </h3>
            <div className="font-bold self-end mb-[1px]">{userData.city}</div>
          </div>
          <div className="flex justify-between">
            <div className="font-bold">{userData.sex}</div>
            <h3 className="text-xl ml-3">{userData.age}</h3>
            </div>
            <div className="badge badge-ghost font-bold text-white glass">{userData.profileStatus}
          </div>
          <div className="flex-col mt-5">
            {userData?.languages?.map((language: string, index: any) => (
              <p key={index} className="text-lg -mb-1">
                {language}
              </p>
            ))}
          </div>
        </div>

    </>
  );
}

export default InnerCarousel;
