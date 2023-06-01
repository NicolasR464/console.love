"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Image from "next/image";
import Quizz from "./Quizz";

interface IMessage {
  username: string;
  body: string;
  timestamp: any;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<any | null>(null);
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
    <>
      <div className="card card-compact w-full bg-black-lover shadow-xl h-h-chat mr-5">
        <h2 className="flex justify-center card-title text-pink-lover pt-5">
          Prénom/Username
        </h2>
        <div className="card-body">
          <div className="card card-compact w-full bg-base-100 shadow-xl mx-auto h-h-inner-chat overflow-y-auto mb-6">
            <div className="card-body">
              {messages.map((message, i) => (
                <div className="chat chat-start" key={i}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        src={
                          message.username === "cosme"
                            ? "https://img.freepik.com/vecteurs-premium/avatar-jeune-homme-souriant-homme-moustache-barbe-brune-cheveux-portant-pull-jaune-sweat-shirt-3d-vecteur-personnes-illustration-personnage-style-minimal-dessin-anime_365941-860.jpg"
                            : "https://img.freepik.com/psd-gratuit/illustration-3d-personne-lunettes-soleil_23-2149436188.jpg?w=900&t=st=1685025279~exp=1685025879~hmac=1204a4259a095ed096bc27e1dacf212a051b1c963224b3f47280a7a665301580"
                        }
                        alt="avatar"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div
                    className={`chat ${
                      message.username === "cosme" ? "chat-start" : "chat-end"
                    }`}
                  >
                    <div className="chat-header">
                      {message.username}
                      <time className="text-xs opacity-50">
                        {" "}
                        {formatDate(message.timestamp)}
                      </time>
                    </div>
                    <div
                      className={`chat-bubble ${
                        message.username === "cosme"
                          ? "chat-bubble-info"
                          : "chat-bubble-success"
                      }`}
                    >
                      {message.body}.
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div ref={endOfChatRef} />
          </div>

          <div>
            <form onSubmit={sendMessage} className="flex m-auto w-full">
              <input
                type="text"
                value={newMessage}
                onChange={(event) => setNewMessage(event.target.value)}
                className="self-center input input-bordered input-info w-[80%]"
              />
              <button
                type="submit"
                className="bg-pink-lover rounded-xl ml-3 w-28"
              >
                Send
              </button>
            </form>
          </div>
        </div>
        {/* <Quizz /> */}
      </div>
    </>
  );
}
