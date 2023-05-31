import connectMongo from "../../../utils/connectMongo";
import mongoose from "../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import User from "../../../models/users";
import { signIn } from "next-auth/react";
import connectMongoose from "../../../utils/mongoose";
import { log } from "console";

export async function POST(request: NextRequest, res: NextResponse) {
  await connectMongoose();
  console.log("POST A LOGIN");

  const body = await request.json();

  const { email, password } = body;

  const userRes = await User.findOne({ email });
  console.log({ userRes });

  if (userRes == null) {
    return NextResponse.json({ user: null, message: "Wrong email" });
  }
  return NextResponse.json({ user: userRes, message: "User found" });
}
