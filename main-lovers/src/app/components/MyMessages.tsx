"use client"
import Image from 'next/image';
import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from "socket.io-client";
import Link from 'next/link';
import { useCallback } from 'react';


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

export default function MyMessages() {
  const { data: session } = useSession();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageCounts, setNewMessageCounts] = useState<{ [key: string]: number }>({});
  const [chatUsers, setChatUsers] = useState<{ [key: string]: User }>({});
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

  //console.log('DRAWER MOUNTING')
  const fetchUserData = useCallback(async (username: any) => {
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
    console.log('useEffect executed2');
    if(!session) return; // Don't attempt socket connection if session is not yet available
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [session]); // Add session as dependency

  useEffect(() => {
    //console.log("socket",socket)
    //console.log("session",session)
    console.log('useEffect executed');

    if(!socket || !session) return; // Ensure both socket and session are available
      
    socket?.on('connect', () => {
      console.log('drawer connected on socket', socket)
      // Emit the 'fetch chat rooms' event after the component has rendered and socket connected
      socket.emit('fetch chat rooms', session?.user.sub);
    });

    socket?.on('chat rooms', async (rooms) => {
      setChatRooms(rooms);
      //console.log('LOOKING CHAT ROOM', rooms)
      const otherChatters = new Set<string>();
      rooms.forEach((room: any) => {
        room.chatters.forEach((chatter: any) => {
          if (chatter.chatId !== session?.user.sub) {
            otherChatters.add(chatter.chatId);
          }
        });
      });

      await Promise.all(Array.from(otherChatters).map(fetchUserData));
      setLoading(false);
    });
      // Listen for the new 'new message' event
      socket?.on("new message", () => {
        // Fetch updated chat rooms when a new message is sent
        socket.emit('fetch chat rooms', session?.user.sub);
      });


    socket?.on("new chat room", (newChatRoom: any) => {
      //console.log('LOOKING NEW CHAT ROOM', newChatRoom)
      setChatRooms(prevChatRooms => [newChatRoom, ...prevChatRooms]);
      newChatRoom.chatters.forEach((chatter: any) => {
        if (chatter.chatId !== session?.user.sub) {
          fetchUserData(chatter.chatId);
        }
      });
    });
    socket?.on("chat list", (message: Message, roomId: string) => {
      setChatRooms(prevChatRooms => {
        let updatedRooms = prevChatRooms.map(room => {
          if (room._id === roomId) {
            return { ...room, discussion: [...room.discussion, message] };
          } else {
            return room;
          }
        });
        
        // Sort updatedRooms by the timestamp of the last message (the most recent one) in each chat room
        updatedRooms.sort((a, b) => new Date(b.discussion[b.discussion.length - 1]?.timestamp).getTime() - new Date(a.discussion[a.discussion.length - 1]?.timestamp).getTime());
        //console.log('Updated chat room list:', updatedRooms); // Added //console.log

        return updatedRooms;
      });
    
      if (message.username !== session?.user.sub) {
        setNewMessageCounts(prevCounts => ({
          ...prevCounts,
          [roomId]: (prevCounts[roomId] || 0) + 1,
        }));
      }
    });
    

    return () => {
      socket?.off("connect");
      socket?.off("chat rooms");
      socket?.off("new chat room");
      socket?.off("chat list");
      socket?.off("new message");  // Don't forget to disconnect the new event listener

    };
  }, [socket, session, fetchUserData]);

  console.log("Chat rooms:", chatRooms);

  if (loading || !session) {
    return <p><span className='loading loading-spinner text-secondary'></span></p>
  }

  const sortedChatRooms = [...chatRooms].sort((a, b) => {
    const lastMessageA = a.discussion[a.discussion.length - 1];
    const lastMessageB = b.discussion[b.discussion.length - 1];
  
    // If one or both timestamps are undefined, handle those cases
    if (!lastMessageA?.timestamp && !lastMessageB?.timestamp) {
      // Neither chat room has a last message timestamp - consider them equal for sorting purposes
      return 0;
    } else if (!lastMessageA?.timestamp) {
      // Only chat room A is missing a last message timestamp - consider B greater
      return 1;
    } else if (!lastMessageB?.timestamp) {
      // Only chat room B is missing a last message timestamp - consider A greater
      return -1;
    }
  
    // Both chat rooms have a last message timestamp - compare them normally
    const comparison = new Date(lastMessageB.timestamp).getTime() - new Date(lastMessageA.timestamp).getTime();
    console.log(`Comparing last message in ${a._id} (${lastMessageA.timestamp}) vs last message in ${b._id} (${lastMessageB.timestamp}): comparison = ${comparison}`);
    return comparison;
  });
  
  console.log("Sorted chat rooms:", sortedChatRooms);  
  return (
    <div id="myMessages" className="flex-col overflow-scroll h-[90%] mx text-white w-full">
      {sortedChatRooms.map((chatRoom, index) => {
        const otherChatter = chatRoom.chatters.find(chatter => session && chatter.chatId !== session.user.sub);

        if (!otherChatter) {
          return <div key={index}> <span className='loading loading-spinner text-secondary'></span></div>;
        }

        const chatUser = chatUsers[otherChatter.chatId];

        if (!chatUser) {
          return <div key={index}><span className='loading loading-spinner text-secondary'></span></div>;
        }

        const sortedDiscussion = [...chatRoom.discussion].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const newMessageCount = newMessageCounts[chatRoom._id] || 0;

        return (
          <Link key={chatRoom._id} href={`/my_lobby/${chatRoom._id}`}>
            <div className="flex w-86 mx-4 my-2 border border-white rounded-2xl py-2 relative">
              {newMessageCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-sm">{newMessageCount}</span>
              )}
              <div className="avatar online p-2">
                <div className="w-14 h-14 rounded-full">
                  <Image
                    width={25} height={25} alt="users" src={chatUser?.data.profilePicture}
                    className={`rounded-full border-2 ${chatUser?.data.sex === 'Male' ? 'border-blue-lover' : 'border-pink-lover'}`}
                  />
                </div>
              </div>
              <div className="ml-2">
                <h2 className="font-bold text-lg">{chatUser?.data.name}</h2>
                <p className="text-gray-500">{sortedDiscussion[0]?.body}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
