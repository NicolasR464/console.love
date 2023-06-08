"use client";
import React, { useState } from "react";

interface IQuizProps {
  roomId: string;
  socket: any;
  session: any;
  language: string;
}

export default function ChatQuiz({
  roomId,
  socket,
  session,
  language,
}: IQuizProps) {
  const [answer, setAnswer] = useState<string>("");
  console.log("ChatQuiz Component Called");
  console.log("language in quizTest", language);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!answer) return;

    socket.emit(
      "update-chat-status",
      { roomId, status: answer === "yes" ? "accepted" : "denied" },
      session
    );
  };

  return (
    <div className="quiz-box absolute top-0 left-0 bg-black-lover rounded-md min-w-[300px] text-white justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <p className="m-2">
          <b>Do you want to chat?</b>
        </p>
        <div className="flex">
          <div className="flex items-center m-2">
            <label>
              <input
                type="radio"
                value="yes"
                checked={answer === "yes"}
                onChange={handleChange}
              />
              Yes
            </label>
          </div>

          <div className="flex items-center">
            <label>
              <input
                type="radio"
                value="no"
                checked={answer === "no"}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>
        <div>
          <button className="btn bg-pink-lover m-2" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
