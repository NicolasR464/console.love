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

function InnerCarousel({ roomId }: any) {
  const [pictures, setPictures] = useState<Array<string>>([]);
  const socket = useSocket().socket;
  const [session, setSession] = useState<Session | null>(null);
  const [otherUserId, setOtherUserId] = useState<string>("");

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
          setPictures(res.data.data.pictures);
        }
      }
    });

    return () => {
      socket.off("room-data");
    };
  }, [socket, session]);

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
            <img src={pic} className="w-full" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href={`#slide${index === 0 ? pictures.length : index}`} className="btn btn-circle">❮</a>
              <a href={`#slide${index === pictures.length - 1 ? 1 : index + 2}`} className="btn btn-circle">❯</a>
            </div>
          </div>
        ))}
      </div>
      <RejectUserComponent
        currentUserId={session?.user?.sub || ""}
        targetUserId={otherUserId}
        roomId={roomId}
      />
    </>
  );
}

export default InnerCarousel;
