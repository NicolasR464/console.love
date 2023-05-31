import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectMongoose from "../../../utils/mongoose";
import User from "../../../models/users";
import bcrypt from "bcrypt";
import { log } from "console";

const registerUserSchema = z.object({
  email: z.string().email(),
  // name: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "Invalid username"),
  password: z.string().min(5, "Password should be minimum of 5 characters"),
});

// export async function GET(req: NextRequest, res: NextResponse) {
//   console.log("GET");
//   return NextResponse.json("HEY");
// }

export async function POST(request: Request, res: NextResponse) {
  console.log("POST FUNCTION");
  await connectMongoose();

  const body = await request.json();
  console.log(body);

  const { email, password } = registerUserSchema.parse(body);

  console.log(email);
  console.log(password);

  const user = await User.findOne({ email });
  console.log(user);

  if (user !== null) {
    console.log("User already exists");

    return NextResponse.json({ user: null, message: "User already exists" });
  }

  //   const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });
  return NextResponse.json({
    user: newUser,
    message: "User created successfully",
  });
}
