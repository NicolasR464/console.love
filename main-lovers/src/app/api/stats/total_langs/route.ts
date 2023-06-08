import connectMongo from "../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../models/users";

export async function GET(req: NextRequest, res: NextResponse) {
  // return " hey";
  // return NextResponse.json(" hey");

  await connectMongo();

  const pipeline = [
    { $unwind: "$languages" },
    { $group: { _id: "$languages", count: { $sum: 1 } } },
  ];

  const resp = await users.aggregate(pipeline);
  console.trace(res);
  return NextResponse.json(resp);
}
