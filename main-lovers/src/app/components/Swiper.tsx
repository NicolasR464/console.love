"use client"
import React, { useState, useMemo, useEffect, createRef } from "react";
// import TinderCard from "./react-tinder-card";
import TinderCard from './react-tinder-card/'
import BackImage from '../../../public/arriere.png';
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";
import connectMongo  from '../utils/mongoose';
import axios from 'axios';


interface Character {
  _id: string;
  name: string,
  email: string;
  languages: string[];
}

const rejected: string[] = [];
const matched: string[] = [];

function ConsoleSwiper({userId}: any) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [lastDirection, setLastDirection] = useState();
  const [undoAvailable, setUndoAvailable] = useState(false);
  const [undoData, setUndoData] = useState('');
  const [timerSwipe, setTimerSwipe] = useState(null);
  const [counterSwipe, setCounterSwipe] = useState(Number)

  
useEffect(() => {
    
  // Fetching Users from MongoDB to get data to create the User's Stack
  const fetchUserStack = async () => {
    try {
      const userDataForStack = await axios.get(`/api/users/${userId}`);
      const responseForStack = userDataForStack.data.data;
      const userMatchedData = responseForStack.matched;
      const userRejectedData = responseForStack.rejected;
      const countSwipe = responseForStack?.swipe;
      const checkTimerSwipe = responseForStack?.timerSwipe;
      setCounterSwipe(countSwipe)

      console.log("MATCHEDuser => ", userMatchedData)
      console.log("REJECTEDuser => ", userRejectedData)
      console.log("userSwipe => ", counterSwipe)

      // Check if checkTimerSwipe exists and is 24 hours or more in the past
      if (
        checkTimerSwipe &&
        new Date(checkTimerSwipe) <= new Date(Date.now() - 24 * 60 * 60 * 1000)
      ) {
        const countSwipe = async () => {
          try {
            const resetSwipe = {
              swipe: 20,
            };
            const updateCountSwipe = await axios.put(`/api/users/${userId}`, resetSwipe);
            // setCounterSwipe(updateCountSwipe)

            const resetTimerSwipe = {
              timerSwipe: '',
            }
            const updateTimerSwipe = await axios.put(`/api/users/${userId}`, resetTimerSwipe);
          } catch (error) {
            console.log("Error updating user data:", error);
          }
        };
        await countSwipe();
      }

      if (!countSwipe) {
        // Call the countSwipe function to update the user with the initial countSwipe value if user doesn't have the 'swipe' field
        const countSwipe = async () => {
          try {
            const swipeData = {
              swipe: 20,
            };
            const updateCountSwipe = await axios.put(`/api/users/${userId}`, swipeData);
            // setCounterSwipe(updateCountSwipe)
          } catch (error) {
            console.log("Error updating user data:", error);
          }
        };
        await countSwipe();
      }

      // CALL the route in /api/users/[id]/matches to create the stack for the connected user
      const response = await axios.get(`/api/users/${userId}/matches`);
      const userData = response.data.users;
      // CREATION OF THE USER'S STACK
      setCharacters(userData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  fetchUserStack();
}, [userId]);

// CONSOLE => Counter Swipe
useEffect(() => {
  console.log("CountSwipe after set => ", counterSwipe)
})

// Call put route to populate the Connected User's Matched Array
const populateMatched = async (idToDelete: string) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    const existingUser = response.data.data;
    
    const newMatchedArray = [...existingUser.matched, idToDelete];
    
    const newMatchedData = {
      matched: newMatchedArray,
    };

    const updateResponse = await axios.put(`/api/users/${userId}`, newMatchedData);
    console.log(updateResponse);
  } catch (error) {
    console.log("Error updating user data:", error);
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

    const updateResponse = await axios.put(`/api/users/${userId}`, newRejectedData);
    console.log(updateResponse);
  } catch (error) {
    console.log("Error updating user data:", error);
  }
};

  useEffect(() => {
    console.log("CHARACTERS", characters);
  }, [characters]);


  const childRefs = useMemo(
    () =>
      Array(characters.length)
        .fill(0)
        .map(() => React.createRef<any>()),
    [characters.length]
  );


  // useEffect(() => {
  //   console.log("UNDO Data =>", undoData)
  //   console.log("UNDO AVAILABLE =>", undoAvailable)
  // }, [undoData, undoAvailable])


  // const fetchUserData = (userId: string) => {
  //   // Find the user data from the db array using the ID
  //   const user = userDb.find((person) => person.Github_token._id === userId);
  //   console.log('User Data:', user);
  //   // userDb.unshift(user)
  //   return user
  // };

  
  const swipe = (dir: any) => {
    if (counterSwipe === 0) {
      return; // Exit the function and disable swipe when counterSwipe is 0
    }
  
    const cardsLeft = characters.filter((person) => !rejected.includes(person._id));
  
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1]._id; // Find the card object to be removed
      const index = characters.map((person) => person._id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      // rejected.push(toBeRemoved); // Make sure the next card gets removed next time if this card does not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  const swiped = (direction: any, idToDelete: string) => {
    setLastDirection(direction);
  
    if (direction === 'left') {
      console.log("_id Unliked : " + idToDelete);
      setUndoData(idToDelete);
      // userDb.pop();
      const filteredDb = characters.filter((person) => {
        return person._id !== idToDelete
      });
      rejected.push(idToDelete);
      characters.pop();
      console.log("REJECTED => ", rejected)
      console.log("CHARACTERS : ", characters);

      
      // Call the populateRejected function to update the user
      populateRejected(idToDelete);
      // console.log("CHARACTERS => ", characters)
      // const filteredCharacters = characters.filter((character) => character.Github_token._id !== idToDelete );
      // console.log("FILTERED", filteredCharacters)
      // setCharacters(filteredCharacters);
      
      setUndoAvailable(true);
      
      const populateOtherRejected = async ({userId}: any) => {
        try {
          const response = await axios.get(`/api/users/${idToDelete}`);
          const otherUserId = response.data.data;
          console.log("OTHERUSER", otherUserId)
          
          const newRejectedArrayOtherUser = [...otherUserId.rejected, userId];
          
          const newRejectedDataOtherUser = {
            rejected: newRejectedArrayOtherUser,
          };
      
          const updateOtherUser = await axios.put(`/api/users/${idToDelete}`, newRejectedDataOtherUser);
          // console.log(updateResponse);
        } catch (error) {
          console.log("Error updating user data:", error);
        }
      };
      populateOtherRejected({userId});
      
      // userDb.splice(0, userDb.length, ...filteredDb);
      
      // userDb.pop();
      // console.log("USER DB SWIPE => ", userDb)

    } else {
      console.log("_id Liked : " + idToDelete);

      // Sets the undoData (Swiped profileId) to empty on right swipe
      setUndoData('');
      // Sets UndoAvailable to false to disable the undo on right swipe
      setUndoAvailable(false);

      matched.push(idToDelete);
      characters.pop();

      console.log("MATCHED : ", matched);
      console.log("CHARACTERS : ", characters);

      // Call the populateMatched function to update the user
      populateMatched(idToDelete);
      
      // On right swipe, edits the user in the DB with decrement the swipe count
      const editCountSwipe = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`);
          const userDataForSwipe = response.data.data.swipe;
          const timerSwipe = response.data.data?.timerSwipe;
          console.log("LEFT SWIPE =>", userDataForSwipe)
          console.log("TIMER =>", timerSwipe)

          const swipeLeft = {
            swipe: userDataForSwipe-1,
          };
      
          const newSwipeLeft = await axios.put(`/api/users/${userId}`, swipeLeft);
          console.log(newSwipeLeft);

          // SETS A TIMESTAMP IF DOESN'T EXISTS
          if (!timerSwipe) {
            const timer = {
              timerSwipe: Date.now(),
            }
            const newTimer = await axios.put(`/api/users/${userId}`, timer);
            console.log(newTimer);
          }
        } catch (error) {
          console.log("Error updating user data:", error);
        }
      };
      editCountSwipe();
    }


    
    const populateOtherMatched = async ({userId}: any) => {
      try {
        const response = await axios.get(`/api/users/${idToDelete}`);
        const otherUserId = response.data.data;
        console.log("OTHERUSER", otherUserId)
        
        const newMatchedArrayOtherUser = [...otherUserId.matched, userId];
        
        const newMatchedDataOtherUser = {
          matched: newMatchedArrayOtherUser,
        };
    
        const updateOtherUser = await axios.put(`/api/users/${idToDelete}`, newMatchedDataOtherUser);
        // console.log(updateResponse);
      } catch (error) {
        console.log("Error updating user data:", error);
      }
    };
    populateOtherMatched({userId});
  };

  // UNDO FUNCTION :: BE CAREFUL : NEEDS TO FETCH THE DATA OF LAST UNLIKED PROFILE ID TO PUSH IT INTO THE ARRAY
  // const undo = () => {
  //   if (undoAvailable && undoData) {
  //     const userData = fetchUserData(undoData);
  //     rejected.pop();
  //     setUndoAvailable(false);
  //     setUndoData('');
  //     // console.log("userData, ", userData, characters)
  //     setCharacters([...characters, userData]);
  //   }
  //   console.log("Already liked: ", matched);
  //   console.log("Already unliked: ", rejected);
  //   // console.log("BASE DB", db);
  //   console.log("DB:", userDb);
  // };

  
  
  return (
    <>
    <div className="flex flex-col items-center">

      <div className="cardContainer">
        {characters.map((character: Character, index: number) => (
          <TinderCard
          ref={childRefs[index]}
          // stack={true}
          className="swipe"
          key={character._id}
          onSwipe={(dir: any) => swiped(dir, character._id)}
          preventSwipe={['up', 'down']}
          >
            <div
              // style={{ backgroundImage: "url(" + character.profilePicture + ")" }}
              className="card"
            >
              <div className="flex-col bg-white w-full h-20 absolute bottom-0 rounded-br-2xl rounded-bl-2xl px-4">
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg">{character.name}</h3>
                  {/* <h3 className="font-bold text-lg">{character.age}</h3> */}
                </div>
                <div className="flex-col">
                  {character.languages.map((language, index) => (
                    <p key={index} className="text-md">{language}</p>
                  ))}
                </div>
              </div>
            </div>
          </TinderCard>
        ))}
        
      {/* BUTTON TO CANCEL LAST UNLIKE */}
      <div className="flex justify-between -mt-40">
        <button className="btn" onClick={() => swipe('left')}>Swipe left!</button>
        {/* <button onClick={undo} id="undo_button" disabled={!undoAvailable}>
          <img src="arriere.png" style={{ width: "40px" }} alt="" />
        </button> */}
        <button className="btn" onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      </div>
    </div>
  </>
  );
}

export default ConsoleSwiper;
TinderCard.displayName = 'TinderCard';
