import { NextRequest, NextResponse } from "next/server";
import Quizz from "../../../models/quizz";
import connectMongo from "../../../utils/mongoose";

// display random questions in a chosen language
export async function GET(
  request: NextRequest,
  { params }: { params: { lang: string } }
) {
  await connectMongo();

  const data = await Quizz.findOne({ language: params.lang });
  console.log("FETCHING QUESTION", data);
  if (!data || !data.questions || data.questions.length === 0) {
    return NextResponse.json({
      error: "No questions found for the specified language.",
    });
  }

  const randomIndex = Math.floor(Math.random() * data.questions.length);
  const questionData = data.questions[randomIndex];

  console.log(questionData);

  return NextResponse.json({ questionData });
}
