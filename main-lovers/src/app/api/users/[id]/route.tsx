import connectMongo from "../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../models/users";
import axios from "axios";
import { useSession } from "next-auth/react";

// get specific user with ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;

  await connectMongo();
  try {
    const data = await users.findOne({ _id: userId });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

// update specific user with ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  await connectMongo();
  const { update } = useSession();

  //// ADMIN RIGHTS UPDATE
  const param = req.nextUrl.searchParams;
  if (param.has("mod")) {
    console.log(param);
    const filter = { _id: params.id };
    const updateU = { lukqhdsngvkfq: param.get("mod") };

    try {
      const res = await users.findOneAndUpdate(filter, updateU, { new: true });
      console.log(res);
      update();
      return NextResponse.json(
        { message: "User admin status updated" },
        { status: 200 }
      );
    } catch (err) {
      console.log(err);
      return NextResponse.json({ error: "User not found" }, { status: 500 });
    }
  }

  //// PROFILE UPDATE
  const data = await users.findOne({ _id: userId });
  console.log("JUPDATE USER ID => ", userId);
  const body = await req.json();
  console.log("THIS IS MY REQ => ", body);

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const existingUser = await users.findOne({ _id: userId });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await users.updateOne({ _id: userId }, { $set: body });
    update();
    return NextResponse.json(
      { message: "User successfully updated", data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
// DELETE USER AND ITS ROOM (UPDATE ALL USER MATCH / REJECT / CHATIDS where that user was involved)
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  await connectMongo();
  console.log("JE DELETE USER ID => ", userId);

  try {
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const existingUser = await users.findOne({ _id: userId });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await users.updateMany({ matched: userId }, { $pull: { matched: userId } });

    await users.updateMany(
      { rejected: userId },
      { $pull: { rejected: userId } }
    );

    let deletedRoomsResponse = {} as any;
    try {
      deletedRoomsResponse = await axios.delete(
        `http://localhost:3001/rooms/${userId}`
      );
    } catch (err) {
      console.error(err);
    }

    if (deletedRoomsResponse.data && deletedRoomsResponse.data.deletedRoomIds) {
      for (let roomId of deletedRoomsResponse.data.deletedRoomIds) {
        await users.updateMany(
          { chatIds: roomId },
          { $pull: { chatIds: roomId } }
        );
      }
    }

    const deletedUser = await users.findByIdAndDelete({ _id: userId });
    return NextResponse.json(
      { message: "User successfully deleted", data: deletedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   console.log(params.id);
// }
