"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useSocket } from "../context/SocketContext";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";

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
  };
}

export default function MyMatches(props: any) {
  const { data: session } = useSession();
  const [chatUsers, setChatUsers] = useState<{ [key: string]: User }>({});
  const [Matches, setMatches] = useState<ChatRoom[]>([]);
  const [newMatches, setNewMatches] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket().socket;

  const fetchUserData = useCallback(
    async (username: any) => {
      let userDataResponse: any = null;
      if (!chatUsers.hasOwnProperty(username)) {
        try {
          userDataResponse = await axios.get(
            `${process.env.HOSTNAME}/api/users/${username}`
          );
          console.log(
            `User data response for user ${username}:`,
            userDataResponse.data
          );
          setChatUsers((prevUsers) => ({
            ...prevUsers,
            [username]: userDataResponse.data,
          }));
        } catch (error) {
          console.error(
            `Error fetching user data for user ${username}:`,
            error
          );
        }
      } else {
        userDataResponse = { data: chatUsers[username] };
      }
      return userDataResponse.data;
    },
    [chatUsers]
  );

  useEffect(() => {
    if (socket === null || !session) return;

    socket.on("connect", () => {
      socket.emit("fetch match", session?.user.sub);
    });

    socket.on("matches", async (resmatches) => {
      setMatches(resmatches);

      if (resmatches.length > 0) {
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

    socket.on("new match", async (newMatch) => {
      setMatches((prevMatches) => [...prevMatches, newMatch]);
      setNewMatches((prevNewMatches) => [...prevNewMatches, newMatch._id]);

      const otherChatter = newMatch.chatters.find(
        (chatter: any) => chatter.chatId !== session?.user.sub
      );

      const chatUser = await fetchUserData(otherChatter?.chatId);
      console.log("Sending username to modal:", chatUser?.data?.name || "");
      props.handleModalOpen(chatUser?.data?.name || "");
    });
    return () => {
      socket.off("connect");
      socket.off("matches");
      socket.off("new match");
    };
  }, [socket, session, fetchUserData]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : Matches.length === 0 ? (
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
                      chatUser?.data?.sex === "Male"
                        ? "border-blue-lover"
                        : chatUser?.data?.sex === "Female"
                        ? "border-pink-lover"
                        : "border-purple-lover"
                    }`}
                  />
                  {newMatches.includes(match._id) && (
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "pink",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "50%",
                        padding: "0.2em 0.5em",
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
}
