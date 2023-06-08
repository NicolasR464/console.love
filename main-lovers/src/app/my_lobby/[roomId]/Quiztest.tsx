"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface IQuizProps {
  language: string;
  roomId: string;
  socket: any;
  session: any;
}

export default function ChatQuiz({
  language,
  roomId,
  socket,
  session,
}: IQuizProps) {
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/quizz/${language}`);
        if (res.data.questionData) {
          setQuestion(res.data.questionData.question);
          setCorrectAnswer(res.data.questionData.reponse);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestion();
  }, [language]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!answer) return;

    let isCorrect =
      (correctAnswer === "VRAI" && answer === "true") ||
      (correctAnswer === "FAUX" && answer === "false");

    if (isCorrect) {
      socket.emit(
        "update-chat-status",
        { roomId, status: "accepted" },
        session
      );
    } else {
      socket.emit("update-chat-status", { roomId, status: "denied" }, session);
    }
  };

  return (
    <div className="quiz-box absolute top-0 left-0 bg-black-lover rounded-md min-w-[300px] text-white justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <p className="m-2">
          <b>{question || "Loading question..."}</b>
        </p>
        <div className="flex">
          <div className="flex items-center m-2">
            <label>
              <input
                type="radio"
                value="true"
                checked={answer === "true"}
                onChange={handleChange}
              />
              True
            </label>
          </div>

          <div className="flex items-center">
            <label>
              <input
                type="radio"
                value="false"
                checked={answer === "false"}
                onChange={handleChange}
              />
              False
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
