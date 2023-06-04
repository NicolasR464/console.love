"use client";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import Image from "next/image";
import Quizz from "./Quizz";
import { getSession, useSession } from "next-auth/react";

interface IMessage {
  username: string;
  body: string;
  timestamp: any;
  
}
interface Session {
  user: {
    sub: string;
  };
}


export default function ChatBox({ roomId }: any) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<any | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const endOfChatRef = useRef<HTMLDivElement | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userNames, setUserNames] = useState<Map<string, string>>(new Map());
  const [userProfilePics, setUserProfilePics] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true); 
  const [roomDataId, setroomDataId] = useState<string>("");



  useEffect(() => {
    const sessionHandler = async () => {
      const resSession = await getSession();
      console.log(resSession);
      setSession(resSession);
    };
    sessionHandler();
  }, []);
  // console.log('MY ROOM CHAT SESSION',session)

  // console.log('MY ROOM CHAT DISPLAY',roomId)
  // Connect to the WebSocket when the component mounts
  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // FETCH MESSAGE HISTORY------------
  useEffect(() => {
    socket?.emit("fetch-room", roomId);
  }, [roomId, socket]);

// DISPLAY USER DATA--------------
  useEffect(() => {
    if (socket == null) return;
    
    setIsLoading(true);  
    socket.on("room-data", async (room: any) => {
      setMessages(room.discussion);
      setroomDataId(room._id)
  
      let usersNameMap = new Map<string, string>();
      let usersPicMap = new Map<string, string>();
  
      for (const chatter of room.chatters) {
        const res = await axios.get(`http://localhost:3000/api/users/${chatter.chatId}`);
        usersNameMap.set(chatter.chatId, res.data.data.name);
        usersPicMap.set(chatter.chatId, res.data.data.profilePicture);
      }
  
      setUserNames(usersNameMap);
      setUserProfilePics(usersPicMap);
      setIsLoading(false);
      setTimeout(() => {
        endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  
    return () => {
      socket.off("room-data");
    };
  }, [socket]);
  
// END DISPLAY----------------
// ROOM JOINING AND LEAVING
useEffect(() => {
  if (socket == null) return;
  
  // Join the room
  socket.emit("join-room", roomId);

  // Return a cleanup function that leaves the room when the component unmounts or roomId changes
  return () => {
    // Leave the room
    socket.emit("leave-room", roomId);
  };
}, [socket, roomId]);

    // CHATBOX DISPLAY MESSAGES
    useEffect(() => {
      if (socket == null) return;
  
      socket.on("chat message", (message: IMessage) => {
        console.log(`Received message: ${JSON.stringify(message)}`);
        setMessages((msgs) => [...msgs, message]);
      });
  
      return () => {
        socket.off("chat message");
      };
    }, [socket, roomId]); 
// END CHATBOX DISPLAY MESSAGE ----------


//  SCROLL MESSAGE
  useEffect(() => {
    endOfChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (newMessage.trim() === "" || !session?.user?.sub) return;
  
    const timestamp = new Date();
  
    const message: IMessage = {
      username: session?.user?.sub,
      body: newMessage,
      timestamp: timestamp,
    };
  
    // Update local state with the new message, so it's displayed instantly for the sender
    setMessages((currentMessages) => [...currentMessages, message]);
  
    // Clear input after sending message
    setNewMessage("");
  
    // Then emit the event to the server
    socket.emit("chat message", message, roomId);
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
    
      <div className="card card-compact w-full bg-base-100 shadow-xl mx-auto h-h-inner-chat overflow-y-auto mb-6">
        <div id="chatBody" className="card-body">
        {isLoading ? (
            <div className="h-full w-full flex items-center justify-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-pink-lover motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                  Loading...
                </span>
              </div>
            </div>
      ) : (
          messages
          .map((message, i) => (
            <div
              className={`chat ${
                message.username === session?.user?.sub
                  ? "chat-end"
                  : "chat-start"
              }`}
              key={i}
              ref={i === messages.length - 1 ? endOfChatRef : null}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <Image
                    src={
                      userProfilePics.get(message.username) ||
                      "https://img.freepik.com/vecteurs-premium/avatar-jeune-homme-souriant-homme-moustache-barbe-brune-cheveux-portant-pull-jaune-sweat-shirt-3d-vecteur-personnes-illustration-personnage-style-minimal-dessin-anime_365941-860.jpg"
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="chat-header">
                <b>{userNames.get(message.username) || message.username}</b>
                <time className="text-xs opacity-50">
                  {" "}
                  {formatDate(message.timestamp)}
                </time>
              </div>
              <div
                className={`chat-bubble ${
                  message.username === session?.user?.sub
                    ? "bg-pink-lover"
                    : "bg-blue-lover"
                }`}
              >
                {message.body}.
              </div>
            </div>
          )))}
        </div>
        <div className="card-footer">
          <form onSubmit={sendMessage} className="flex m-auto w-full">
            <input
              type="text"
              value={newMessage}
              onChange={(event) => setNewMessage(event.target.value)}
              className="self-center input input-bordered input-info w-[80%] rounded-tl-none rounded-r-none"
            />
            <button
              type="submit"
              className="btn bg-pink-lover rounded-tr-none rounded-l-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
