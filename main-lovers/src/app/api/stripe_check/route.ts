import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import connectMongo from "../../utils/mongoose";
import users from "../../models/users";

export async function POST(req: NextRequest) {
  console.log("STRIPE CHECK POST");

  const session = await getServerSession(authOptions);
  console.log({ session });
  console.log(session?.user?.name);
  console.log(session?.user?.email);

  const request = await req.json();

  console.log(request.sessionId);

  try {
    const resStripe = await axios.get(
      `https://api.stripe.com/v1/checkout/sessions/${request.sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    console.log(resStripe.data);

    if (resStripe.data.id === request.sessionId) {
      await connectMongo();
      console.log("MATCH 🍻");
      // UPDATE DB
      const filter = { _id: session?.user?.sub };
      const update = { premium: true };

      const updatedUserSub = await users.findByIdAndUpdate(filter, update, {
        new: true,
      });
      console.log(updatedUserSub);
      if (updatedUserSub) {
        return NextResponse.json({ message: "update successful", status: 204 });
      }
    } else {
      return NextResponse.json({ message: "invalid session id" });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
