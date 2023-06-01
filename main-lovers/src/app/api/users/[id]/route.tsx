import connectMongo from "../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../models/users";


// get specific user with ID
export async function GET(req: Request,{params}: { params: { id: string };
},
) {
const userId = params.id; 


await connectMongo();
try {
    const data = await users.findOne({ _id: userId });
    return NextResponse.json({ data }, { status: 200 });
  }catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

// update specific user with ID
export async function PUT(req: Request,{params}: { params: { id: string };
    },
  ) {
    const userId = params.id; 
    await connectMongo();
    const data = await users.findOne({ _id: userId });;
    console.log("JUPDATE USER ID => ", userId);
    const body = await req.json()
    console.log("THIS IS MY REQ => ", body);
  
    try {
      if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
      }
      const existingUser = await users.findOne({ _id: userId });
     

      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      } 
  
     const updatedUser = await users.updateOne({ _id: userId }, { $set: body });
      return NextResponse.json({ message: 'User successfully updated', data: updatedUser }, { status: 200 });
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error }, { status: 500 });
    }
  }
  

  export async function DELETE(req: Request,{params}: { params: { id: string };
  },
) {
  const userId = params.id; 
  await connectMongo();
  const data = await users.findOne({ _id: userId });;
  console.log("JE DELETE USER ID => ", userId);


  try {
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const existingUser = await users.findOne({ _id: userId });
     
    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    } 

   const deletedUser = await users.findByIdAndDelete({ _id: userId });
    return NextResponse.json({ message: 'User successfully deleted', data: deletedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
