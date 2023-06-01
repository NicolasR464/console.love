"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Image from "next/image";

interface IMessage {
  username: string;
  body: string;
  timestamp: Date;
}

export default function UserProfile() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const endOfChatRef = useRef<HTMLDivElement | null>(null);

  const chatroomId = "646e2097d935a8b4ed7afaa4";

  // Connect to the WebSocket when the component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Fetch existing messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(
        `http://localhost:3001/chats/${chatroomId}/messages`
      );
      setMessages(response.data);
    };

    fetchMessages();
  }, [chatroomId]);

  // Listen for incoming messages
  useEffect(() => {
    if (socket == null) return;

    socket.on("chat message", (message: IMessage) => {
      setMessages((msgs) => [...msgs, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, [socket]);

  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    if (newMessage.trim() === "") return;

    const timestamp = new Date();

    const message: IMessage = {
      username: "arthur",
      body: newMessage,
      timestamp: timestamp,
    };

    // Send the message to the server over the WebSocket
    socket?.emit("chat message", message);

    setNewMessage("");
  };

  function formatDate(dateStr: string) {
    const date = new Date(dateStr);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month} - ${hours}:${minutes}`;
  }


  return (
    // <main className="flex h-screen flex-col items-center justify-between bg-pink-lover pt-20">
    <>
      <div className="card card-compact w-[70%] bg-black-lover shadow-xl h-h-chat ml-5">
          <div className="flex">
            <div className="carousel w-full h-80 rounded-2xl">
              <div id="slide1" className="carousel-item relative w-full">
                <img src="https://i0.wp.com/studio-baindelumiere.fr/wp-content/uploads/2022/04/photo-site-de-rencontre-20.webp?resize=612%2C920&ssl=1" className="h-full m-auto" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">❮</a> 
                  <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide2" className="carousel-item relative w-full">
                <img src="https://images.squarespace-cdn.com/content/v1/5707c9364c2f85d0ea64d6ee/1561997865068-MUSRAJF85S5RMZ2XV8S2/Shooting+photo+site+de+rencontres" className="h-full m-auto" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">❮</a> 
                  <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide3" className="carousel-item relative w-full">
                <img src="https://images.squarespace-cdn.com/content/v1/5707c9364c2f85d0ea64d6ee/1562054294775-22LY0L2F0933P3MGTN4N/Shooting+photo+site+de+rencontres?format=1000w" className="h-full m-auto" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">❮</a> 
                  <a href="#slide4" className="btn btn-circle">❯</a>
                </div>
              </div> 
              <div id="slide4" className="carousel-item relative w-full">
                <img src="https://images.squarespace-cdn.com/content/v1/5707c9364c2f85d0ea64d6ee/1561997746158-LZBXMGI1QGHKNNS84XLW/Shooting+photo+site+de+rencontres" className="h-full m-auto" />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">❮</a> 
                  <a href="#slide1" className="btn btn-circle">❯</a>
                </div>
              </div>
            </div>


          </div>
          <div className="bg-white w-full h-full rounded-2xl p-4">
            <div className="flex">
              <h2 className="text-2xl font-bold">Prénom</h2>
              <h2 className="text-2xl font-bold ml-3">Age</h2>
            </div>
            
            <div className="flex w-full justify-between">
              <div className="flex-col mt-3">
                <h2 className="text-lg font-bold">Metier</h2>
                <h2 className="text-lg font-bold">Ville</h2>
                <h2 className="text-lg font-bold">Distance</h2>
              </div>

              <div className="flex-col mt-3 mr-8">
                <h2 className="text-lg font-bold">LANGUAGES</h2>
                <h2 className="text-md">Language 1</h2>
                <h2 className="text-md">Language 2</h2>
              </div>
            </div>

            <div className="flex-col mt-3 mr-8 w-full">
              <h2 className="text-xl font-bold">BIO</h2>
              <p className="text-md">Yo les poulets</p>
            </div>
            
          </div>
      </div>
      </>
    // </main>
  )
}
