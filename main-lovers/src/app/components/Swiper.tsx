"use client";
import React, {
  useState,
  useMemo,
  useEffect,
  createRef,
  useInsertionEffect,
} from "react";
import InnerCarousel from "./InnerCarousel";

import Image from "next/image";
import HeartImage from "../../../public/coeur.png";
import CloseImage from "../../../public/close.png";
import BackImage from "../../../public/retour.png";

import TinderCard from "./react-tinder-card/";
import { loadStripe } from "@stripe/stripe-js";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import connectMongo from "../utils/mongoose";
import axios from "axios";
import { arrayOutputType } from "zod";
import { useSocket } from "../context/SocketContext";

// COUCOU MERGE

interface Character {
  _id: string;
  name: string;
  firstName: string;
  email: string;
  languages: string[];
  profilePicture: string;
  city: string;
  distance: boolean;
  age: number;
  profileStatus: string;
  pictures: string[];
}

const rejected: string[] = [];
const matched: string[] = [];

function ConsoleSwiper({ userId }: any) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [lastDirection, setLastDirection] = useState();
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [undoData, setUndoData] = useState("");
  const [timerSwipe, setTimerSwipe] = useState(null);
  const [counterSwipe, setCounterSwipe] = useState(1);
  const [isPremium, setIsPremium] = useState(false);
  const socket = useSocket().socket;

  // useEffect(() => {
  //   if (socket === null ) return;
  //   socket.on('room-created', (roomId) => {
  //     console.log('Room created with id:', roomId);
  //     // perform actions based on the new roomId
  //   });

  //   return () => {
  //     socket.off('room-created');
  //   };
  // }, [socket]);

  useEffect(() => {
    // Fetching Users from MongoDB to get data to create the User's Stack
    const fetchUserStack = async () => {
      try {
        const userDataForStack = await axios.get(`/api/users/${userId}`);
        const userMatchedData = userDataForStack?.data.data.matched;
        const userRejectedData = userDataForStack?.data.data.rejected;
        const countSwipe = userDataForStack?.data.data.swipe;
        const checkTimerSwipe = userDataForStack?.data.data.timerSwipe;
        const isPremium = userDataForStack?.data.data.premium;

        // Sets countSwipe from the swipe field in the Connected User Data
        setIsPremium(isPremium);
        if (isPremium === false) {
          setCounterSwipe(countSwipe);
        } else {
          setCounterSwipe(1000);
        }
        // CALL the route in /api/users/[id]/matches to create the stack for the connected user
        const response = await axios.get(`/api/users/${userId}/matches`);
        const userData = response.data.users;
        console.log("my stack", userData);

        // CREATION OF THE USER'S STACK
        setCharacters(userData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserStack();
  }, [userId]);

  useEffect(() => {
    console.log("COUNTERSWIPE => ", counterSwipe);
  });

  // Call put route to populate the Connected User's Matched Array
  const populateMatched = async (idToDelete: string) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      const existingUser = response.data.data;
      const responseOther = await axios.get(`/api/users/${idToDelete}`);
      const existingOtherUser = responseOther.data.data;

      const newMatchedArray = [...existingUser.matched, idToDelete];
      const newMatchedData = {
        matched: newMatchedArray,
      };
      const updateResponse = await axios.put(
        `${process.env.HOSTNAME}/api/users/${userId}`,
        newMatchedData
      );
      //   console.log("je vais créer ma room");
      // ROOM CREATION WHEN MATCH -------------------------------------------
      const chatData = {
        chatters: [
          {
            chatId: existingUser._id,
            status: "pending",
          },
          {
            chatId: idToDelete,
            status: "pending",
          },
        ],
      };
      //  console.log("MON CUR USER", userId);
      // console.log("MON OTHER USER", idToDelete);
      let roomId;
      //  console.log("MY SOCKET SWIPE", socket);
      if (socket === null) return;
      const userDataForStack = await axios.get(`/api/users/${userId}`);

      // Handle 'chat room created' event
      socket.once("chat room created", async (id) => {
        roomId = id;

        // Fetch most recent user data
        const responseUpdated = await axios.get(`/api/users/${userId}`);
        const existingUserUpdated = responseUpdated.data.data;
        const responseOtherUpdated = await axios.get(
          `${process.env.HOSTNAME}/api/users/${idToDelete}`
        );
        const existingOtherUserUpdated = responseOtherUpdated.data.data;

        // Update the rest of your data inside this callback
        // Because roomId is available only after the socket receives the 'chat room created' event
        const updateChatIds = {
          chatIds: [...existingUserUpdated.chatIds, roomId],
        };
        const updateOtherChatIds = {
          chatIds: [...existingOtherUserUpdated.chatIds, roomId],
        };

        //   console.log("HOW DOES MY ROOM ID LOOK", roomId);
        //  console.log("jajoute ma room");
        // MATCHED DATA DON'T TOUCH
        const updateUserChatIds = await axios.put(
          `${process.env.HOSTNAME}/api/users/${userId}`,
          updateChatIds
        );
        const updateOtherUserChatIds = await axios.put(
          `${process.env.HOSTNAME}/api/users/${idToDelete}`,
          updateOtherChatIds
        );
        // Fetch chat rooms after a new chat room is created
        socket.emit("fetch chat rooms", userId);
        // console.log(updateResponse);
        // console.log("room created", roomId);
        // console.log("room added", updateUserChatIds);
        // console.log("room added to other", updateOtherUserChatIds);
      });

      socket.emit("create-room", chatData);
    } catch (error) {
      console.log("Error updating main user data:", error);
    }
  };

  // Call put route to populate the Connected User's Rejected Array
  const populateRejected = async (idToDelete: string) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      const existingUser = response.data.data;

      const newRejectedArray = [...existingUser.rejected, idToDelete];

      const newRejectedData = {
        rejected: newRejectedArray,
      };

      const updateResponse = await axios.put(
        `${process.env.HOSTNAME}/api/users/${userId}`,
        newRejectedData
      );
    } catch (error) {
      console.log("Error updating user data:", error);
    }
  };

  useEffect(() => {
    console.log("STACK => ", characters);
  }, [characters]);

  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [characters.length]
  );

  const fetchUserData = (userId: string) => {
    // Find the user data from the db array using the ID
    const response = axios.get(`/api/users/${userId}`);
    const userData = response;
    // console.log("User Data:", userData);
    return userData;
  };

  const swipe = (dir: any) => {
    if (counterSwipe < 1) {
      // Exit the function and disable swipe when counterSwipe is 0
      return;
    } else {
      const cardsLeft = characters.filter(
        (person) => !rejected.includes(person._id)
      );

      if (cardsLeft.length) {
        // Find the card object to be removed
        const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id;
        // Find the index of which to make the reference to
        const index = characters
          .map((person) => person._id)
          .indexOf(toBeRemoved);

        if (counterSwipe >= 1) {
          // Swipe the card!
          childRefs[index].current.swipe(dir);
        }
      }
    }
  };

  const swiped = (direction: any, idToDelete: string) => {
    setLastDirection(direction);

    if (direction === "left") {
      // console.log("_id Unliked : " + idToDelete);
      setUndoData(idToDelete);

      const filteredDb = characters.filter((person) => {
        return person._id !== idToDelete;
      });
      rejected.push(idToDelete);
      characters.pop();

      // Call the populateRejected function to update the user
      populateRejected(idToDelete);

      setUndoAvailable(true);

      // Update the user2 rejected array on dislike
      const populateOtherRejected = async ({ userId }: any) => {
        try {
          const response = await axios.get(`/api/users/${idToDelete}`);
          const otherUserId = response.data.data;

          const newRejectedArrayOtherUser = [...otherUserId.rejected, userId];

          const newRejectedDataOtherUser = {
            rejected: newRejectedArrayOtherUser,
          };

          const updateOtherUser = await axios.put(
            `${process.env.HOSTNAME}/api/users/${idToDelete}`,
            newRejectedDataOtherUser
          );
        } catch (error) {
          console.log("Error updating user data:", error);
        }
      };
      populateOtherRejected({ userId });
    } else {
      if (counterSwipe < 1) {
        return; // Exit the function and disable swipe when counterSwipe is 0
      } else {
        // console.log("_id Liked : " + idToDelete);

        // Sets the undoData (Swiped profileId) to empty on right swipe
        setUndoData("");

        // Sets UndoAvailable to false to disable the undo on right swipe
        setUndoAvailable(false);

        matched.push(idToDelete);
        characters.pop();

        // console.log("MATCHED : ", matched);
        // console.log("CHARACTERS : ", characters);

        // Call the populateMatched function to update the user on like
        populateMatched(idToDelete);

        // On right swipe, edits user with decrementing the swipe count
        const editCountSwipe = async () => {
          try {
            const response = await axios.get(`/api/users/${userId}`);
            const userDataForSwipe = response.data.data.swipe;
            const timerSwipe = response.data.data?.timerSwipe;
            // console.log("LEFT SWIPE =>", userDataForSwipe);
            // console.log("TIMER =>", timerSwipe);

            const swipeLeft = {
              swipe: userDataForSwipe - 1,
            };

            const newSwipeLeft = await axios.put(
              `${process.env.HOSTNAME}/api/users/${userId}`,
              swipeLeft
            );
            // console.log(newSwipeLeft);

            // Set a Timestamp if doesn't exists already
            if (!timerSwipe) {
              const timer = {
                timerSwipe: Date.now(),
              };
              const newTimer = await axios.put(
                `${process.env.HOSTNAME}/api/users/${userId}`,
                timer
              );
              // console.log(newTimer);
            }
          } catch (error) {
            console.log("Error updating user data:", error);
          }
        };
        editCountSwipe();
      }

      // Update the user2 matched array on like
      const populateOtherMatched = async ({ userId }: any) => {
        try {
          const response = await axios.get(`/api/users/${idToDelete}`);
          const otherUserId = response.data.data;
          // console.log("OTHERUSER", otherUserId);

          const newMatchedArrayOtherUser = [...otherUserId.matched, userId];

          const newMatchedDataOtherUser = {
            matched: newMatchedArrayOtherUser,
          };

          const updateOtherUser = await axios.put(
            `${process.env.HOSTNAME}/api/users/${idToDelete}`,
            newMatchedDataOtherUser
          );
        } catch (error) {
          console.log("Error updating user data:", error);
        }
      };
      populateOtherMatched({ userId });
    }
  };

  // UNDO FUNCTION
  const undo = async () => {
    if (undoAvailable && undoData && isPremium === true) {
      try {
        // Fetch profile to undo
        const profileToUndo = await axios.get(`/api/users/${undoData}`);
        const undoReady = profileToUndo.data.data;

        // console.log("Profile to undo => ", undoReady);

        // Add the response at the end of the characters array
        setCharacters([...characters, undoReady]);

        // Remove undoData from the rejected array using a PUT request
        await axios.put(`${process.env.HOSTNAME}/api/users/${userId}`, {
          rejected: rejected.filter((userId) => userId !== undoData),
        });

        // Remove userId from the rejected array of undoData using a PUT request
        await axios.put(`${process.env.HOSTNAME}/api/users/${undoData}`, {
          rejected: undoReady.rejected.filter(
            (userId: any) => userId !== userId
          ),
        });

        setUndoAvailable(false);
        setUndoData("");
        console.log("STACK AFTER UNDO => ", characters);
      } catch (error) {
        console.error("Error occurred during undo: ", error);
      }
    }

    console.log("Already liked: ", matched);
    console.log("Already unliked: ", rejected);
  };

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

  const createCheckOutSession = async () => {
    const stripe: any = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout_sessions");
    // console.log(checkoutSession.data);

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <>
      <div className="cardContainer -mt-[50px] cursor-grab">
        {characters.length === 0 ? (
          <div className="flex items-center justify-center h-screen text-center px-4">
            <p className="text-white text-2xl">
              Sorry, we could not find anybody that matches with you. Try a
              different location.
            </p>
          </div>
        ) : (
          characters.map((character: Character, index: number) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe pressable"
              key={character._id}
              onSwipe={(dir: any) => swiped(dir, character._id)}
              preventSwipe={
                counterSwipe < 1 ? ["up", "down", "right"] : ["up", "down"]
              }
            >
              <InnerCarousel
                pictures={character.pictures}
                userId={character._id}
                userIndex={index}
              />
              <div className="flex-col w-full h-auto absolute mb-[100px] bottom-0 rounded-br-2xl rounded-bl-2xl px-4 text-white">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-bold mw-[200px] overflow-hidden">
                    {character.firstName}
                  </h3>
                  <h3 className="text-3xl ml-3">{character.age}</h3>
                </div>
                <div className="flex justify-between">
                  <div className="badge badge-ghost font-bold text-white glass">
                    {character.profileStatus}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex-col">
                    {character.languages.map((language, index) => (
                      <p key={index} className="text-lg -mb-3">
                        {language}
                      </p>
                    ))}
                  </div>
                  <div className="font-bold">{character.distance} km</div>
                </div>
              </div>
            </TinderCard>
          ))
        )}

        {characters.length > 0 && (
          <div className="swipe_buttons_div absolute flex justify-evenly mt-[430px] w-[300px]">
            {isPremium === false && (
              <>
                <label
                  id="undo_button"
                  htmlFor="my_modal_6"
                  className="btn-circle btn-outline btn-error border-solid border-2 border-swipeCancel btn-sm self-center"
                >
                  <Image
                    src={BackImage}
                    style={{ width: "55px", margin: "auto" }}
                    alt=""
                  />
                </label>

                <input
                  type="checkbox"
                  id="my_modal_6"
                  className="modal-toggle"
                />
                <div className="modal  bg-black-lover w-[300px] h-[50vh] m-auto rounded-2xl">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-xl text-center font-bold text-pink-lover mb-10">
                      Change your choice with a premium account
                    </h2>
                    <button
                      onClick={createCheckOutSession}
                      className="btn btn-outline btn-secondary shadow shadow-secondary w-[70%] m-auto"
                    >
                      GO PREMIUM 🤩
                    </button>
                    <label
                      htmlFor="my_modal_6"
                      className="btn mt-10 bg-blue-lover w-[70%] m-auto"
                    >
                      Close!
                    </label>
                  </div>
                </div>
              </>
            )}
            {isPremium !== false && (
              <button
                className="btn-circle btn-outline btn-error border-solid border-2 border-swipeCancel btn-sm self-center"
                onClick={undo}
                id="undo_button"
                disabled={!undoAvailable}
              >
                <Image
                  src={BackImage}
                  style={{ width: "55px", margin: "auto" }}
                  alt=""
                />
              </button>
            )}

            <button
              className="btn-circle btn-outline btn-error border-solid border-2 border-swipeCancel"
              onClick={() => swipe("left")}
            >
              <Image
                src={CloseImage}
                style={{ width: "25px", margin: "auto" }}
                alt=""
              ></Image>
            </button>
            <button
              className="btn-circle btn-outline btn-success border-solid border-2 border-swipeLike"
              onClick={() => swipe("right")}
            >
              <Image
                src={HeartImage}
                style={{ width: "25px", margin: "auto" }}
                alt=""
              ></Image>
            </button>
          </div>
        )}

        {counterSwipe === 0 && (
          <div className="flex justify-evenly items-center rounded-2xl h-full glass">
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl text-center font-bold text-black-lover">
                No more Swipes...
              </h2>
              <button
                onClick={createCheckOutSession}
                className="btn btn-outline btn-secondary shadow shadow-secondary"
              >
                GO PREMIUM 🤩
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ConsoleSwiper;
TinderCard.displayName = "TinderCard";
