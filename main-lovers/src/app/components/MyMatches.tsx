"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSocket } from '../context/SocketContext';
import axios from 'axios';
import { getSession, useSession } from "next-auth/react";
import { useCallback } from 'react';
import Link from 'next/link';







interface Message {
  username: string;
  body: string;
  _id: string;
  timestamp: string;
}

interface ChatRoom {
  _id: string;
  chatters: Array<{
    chatId: string;
    status: string;
    _id: string;
  }>;
  discussion: Message[];
  __v: number;
}

interface User {
  data: {
    _id: string;
    email: string;
    password: string;
    geoloc: number[];
    languages: string[];
    attraction: string[];
    pictures: string[];
    matched: string[];
    rejected: string[];
    chatIds: string[];
    profileStatus: string;
    address: string;
    age: string;
    city: string;
    firstName: string;
    lastName: string;
    name: string;
    profilePicture: string;
    sex: string;
    swipe: number;
    timerSwipe: string;
  }
}




export default function MyMatches() {
  const { data: session } = useSession();
  const [chatUsers, setChatUsers] = useState<{ [key: string]: User }>({});
  const [Matches, setMatches] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket().socket





  const fetchUserData = useCallback(async (username: any) => { 

    // LOOK FOR USER DATA
    if (!chatUsers.hasOwnProperty(username)) {
      try {
        const userDataResponse = await axios.get(`http://localhost:3000/api/users/${username}`);
        setChatUsers((prevUsers) => ({
          ...prevUsers,
          [username]: userDataResponse.data,
        }));
      } catch (error) {
        console.error(`Error fetching user data for user ${username}:`, error);
      }
    }
  }, [chatUsers]);


  useEffect(() => {
    //console.log("socket",socket)
    //console.log("session",session)
    console.log('useEffect executed');
    if(socket === null || !session) return; 
      
    socket?.on('connect', () => {
      console.log('drawer connected on socket', socket)
      socket.emit('fetch match', session?.user.sub);
    });

    socket?.on('matches', async (resmatches) => {
      setMatches(resmatches);
    
      if (resmatches.length > 0) { // <-- Check if resmatches is not empty
        setLoading(false); 
      }
      
      const otherChatters = new Set<string>();
      resmatches.forEach((match: any) => {
        match.chatters.forEach((chatter: any) => {
          if (chatter.chatId !== session?.user.sub) {
            otherChatters.add(chatter.chatId);
          }
        });
      });
    
      await Promise.all(Array.from(otherChatters).map(fetchUserData));
    });


      // socket?.on("new message", () => {
      //   socket.emit('fetch chat rooms', session?.user.sub);
      // });


    // socket?.on("new chat room", (newChatRoom: any) => {
    //   //console.log('LOOKING NEW CHAT ROOM', newChatRoom)
    //   setChatRooms(prevChatRooms => [newChatRoom, ...prevChatRooms]);
    //   newChatRoom.chatters.forEach((chatter: any) => {
    //     if (chatter.chatId !== session?.user.sub) {
    //       fetchUserData(chatter.chatId);
    //     }
    //   });
    // });
  
    return () => {
      socket?.off("connect");
      socket?.off("matches");

    };
  }, [socket, session, fetchUserData]);

console.log('LOADING MATCHES', loading)
console.log('LOADING MATCHES', Matches)
return (
<>
{loading ? (
  <p>Loading...</p>
) : Matches.length === 0 ? (  // <-- Check if Matches is empty
  <p>No matches yet.</p>
) : (
  Matches.map((match) => {
    const otherChatter = match.chatters.find(
      (chatter) => chatter.chatId !== session?.user.sub
    );
    const chatUser = chatUsers[otherChatter?.chatId || ""];


            return (
              
              <Link key={match._id} href={`/my_lobby/${match._id}`}>
              
          
                  <div className="avatar ">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        alt="users"
                        src={chatUser?.data?.profilePicture || "/placeholder.png"}
                        className={`rounded-full border-2 ${
                          chatUser?.data?.sex === 'Male' ? 'border-blue-lover' : 'border-pink-lover'
                        }`}
                      />
                    </div>
                  </div>
              
     
              </Link>
            );
          })
        )}
   </>
);

}

