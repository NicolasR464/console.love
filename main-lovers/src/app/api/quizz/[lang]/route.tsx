import { NextRequest, NextResponse } from "next/server";
import Quizz from "../../../models/quizz";
import connectMongo from "../../../utils/connectMongo";

export async function POST(
    request: NextRequest,
    { params }: { params: { lang: string } }
  ) {
    await connectMongo();
    
    // Parse the JSON body of the request
    const body = JSON.parse(await request.text());
    const { question, userAnswer } = body;

    console.log('Received question and user answer:', question, userAnswer);
  
    // Fetch the quiz from the database
    const quiz = await Quizz.findOne({ language: params.lang });
    
    // Check if the quiz and question exist
    if (!quiz || !quiz.questions[0].question === question) {
      return NextResponse.json({ error: "Invalid question." });
    }
  
    // Check the user's answer against the correct answer
    const correctAnswer = quiz.questions[0].answer;
  
    console.log('Comparing user answer and correct answer:', userAnswer, correctAnswer);

    const isCorrect = (userAnswer === correctAnswer);
  
    // Return the result
    return NextResponse.json({ isCorrect });
  }



// display random questions in a chosen language
export async function GET(request: NextRequest, { params }: { params: { lang: string } } ) {
    await connectMongo();

    const data = await Quizz.findOne({language : params.lang });
    
    if (!data || !data.questions || data.questions.length === 0) {
        return NextResponse.json({ error: 'No questions found for the specified language.' });
    }

    const randomIndex = Math.floor(Math.random() * data.questions.length);
    const question = data.questions[randomIndex];

    console.log(question);
  
    return NextResponse.json({ question });
}
