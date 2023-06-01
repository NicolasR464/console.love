import React from "react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Question {
  _id: string;
  question: string;
  answer: boolean;
}

export default function Quizz() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/quizz/python")
      .then((response) => response.json())
      .then((data) => setQuestion(data.question));
  }, []);

  const handleAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value === "true");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userAnswer !== null) {
      const payload = {
        question: question?.question,
        userAnswer: userAnswer,
      };

      console.log("Sending payload:", payload);

      fetch("/api/quizz/python", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Received response:", data);
          if (data.isCorrect) {
            alert("Congratulations! Your answer is correct.");
          } else {
            alert("Sorry, your answer is incorrect.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="absolute hero-overlay bg-opacity-60 py-20 rounded-2xl">
        <div className="card w-[80%] h-auto m-auto mb-10 shadow-xl bg-black-lover">
          <div className="card-body items-center text-center text-white justify-between">
            <h2 className="card-title my-8 text-3xl font-bold">QUIZZ</h2>

            <div className="text-xl my-2 bg-black-lover">
              {question?.question}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex-col w-full justify-evenly items-center"
            >
              <div className="flex w-full justify-evenly mb-5">
                <label className="flex-col label cursor-pointer">
                  <span className="label-text mb-3 text-xl font-bold text-white">
                    FALSE
                  </span>
                  <input
                    type="radio"
                    value={"false"}
                    onChange={handleAnswerChange}
                    name="radio-10"
                    className="radio checked:bg-red-500 bg-white"
                  />
                </label>
                <label className="flex-col label cursor-pointer">
                  <span className="label-text mb-3 text-xl font-bold text-white">
                    TRUE
                  </span>
                  <input
                    type="radio"
                    value={"true"}
                    onChange={handleAnswerChange}
                    name="radio-10"
                    className="radio checked:bg-green-500 bg-white"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-pink-lover rounded-xl ml-3 w-28 h-10"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
