import connectMongo from "../../utils/mongoose";
import Quizz from "../../models/quizz";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongo();

  const count = await Quizz.countDocuments({});
  console.log(`Count of documents in quizzquestions: ${count}`);

  const data = await Quizz.find();
  console.log(data);

  return NextResponse.json({ data });
}

// export async function GET(req: NextRequest) {
//   await connectMongo();

//   const language = req.query.language;

//   if (!language) {
//     return NextResponse.json({ error: 'Language query parameter is required' }, { status: 400 });
//   }

//   const count = await Quizz.countDocuments({ language });

//   if (count === 0) {
//     return NextResponse.json({ error: `No documents for language: ${language}` }, { status: 404 });
//   }

//   const random = Math.floor(Math.random() * count);

//   const data = await Quizz.findOne({ language }).skip(random);

//   return NextResponse.json({ data });
// }
