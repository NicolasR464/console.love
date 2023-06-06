import connectMongo from "../../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../../models/users";


export async function GET(req: Request,{params}: { params: { id: string };
},
) {
const userId = params.id; 


await connectMongo();
try {
    const data = await users.findOne({ _id: userId });
    return NextResponse.json({url: data.pictures}, {status: 200})
    // return NextResponse.json({ data }, { status: 200 });
  }catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}