import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession();
  console.log("SERVER SIDE POSTS");
  console.log(session);

  return NextResponse.json("coucou");
}
