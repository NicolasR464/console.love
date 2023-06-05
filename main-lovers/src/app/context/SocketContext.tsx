"use client"

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({
  socket: null,
});

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("SOCKET CONTEXT YOUHOU")
  }, [])

  useEffect(() => {
    console.log("SOCKET CONTEXT")
    if (!session) return;

    const newSocket = io("http://localhost:3001");
    newSocket.on("connect", () => {
      console.log("SOCKET CONNECTED")
    })
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [session]); // socket connection depends on session

  console.log("SOCKET => ", socket)
  if (socket === null ) {
    return ( <div
    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-pink-lover motion-reduce:animate-[spin_1.5s_linear_infinite]"
    role="status"
  >
    <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >
      Loading...
    </span>
  </div>)
  }

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {console.log("APPEL DE USESOCKET"); return useContext(SocketContext)};
