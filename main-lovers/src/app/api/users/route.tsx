import connectMongo from "../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../models/users";

export async function GET(req: NextRequest, { params }: { params: { query: string }; }) {
  await connectMongo();
  const email = req.nextUrl.searchParams.get("query");

  if (email) {
    const user = await users.findOne({ email: email }, { _id: 1 });
    return NextResponse.json({ data: user });
  } else {
    const data = await users.find();
    return NextResponse.json({ data });
  }
}

export async function POST(req: Request) {
  await connectMongo();
  const body = await req.json();
  console.log("MY REQ ", body);

  try {
    const existingUser = await users.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );
    }

    const createdUser = await users.create(body);
    return NextResponse.json(
      { message: "User successfully created", data: createdUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
