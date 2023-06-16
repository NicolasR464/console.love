import connectMongo from "../../../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../../../models/users";
import axios from "axios";

export async function GET(
  req: Request,
  { params }: { params: { id: string; targetId: string; chatId: string } }
) {
  const connectedUserId = params.id;
  const targetUserId = params.targetId;
  const chatId = String(params.chatId);

  await connectMongo();
  try {
    // Check the current state
    const connectorUserBefore = await users.findOne({ _id: connectedUserId });
    console.log(
      "Connector user chatIds before update:",
      connectorUserBefore.chatIds
    );

    const targetUserBefore = await users.findOne({ _id: targetUserId });
    console.log("Target user chatIds before update:", targetUserBefore.chatIds);

    // Delete the chat room
    const deleteResponse = await axios.delete(
      `${process.env.CHAT_ROOT}/room/${chatId}`
    );
    console.log(deleteResponse.data);

    // Find the connected user and update his matched, rejected, and ChatIds arrays
    await users.findOneAndUpdate(
      { _id: connectedUserId },
      { $push: { rejected: targetUserId } }
    );
    await users.findOneAndUpdate(
      { _id: connectedUserId },
      { $pull: { matched: targetUserId } }
    );
    const connectorUser = await users.findOneAndUpdate(
      { _id: connectedUserId },
      { $pull: { chatIds: chatId } },
      { new: true }
    );

    // Find the target user and update his matched, rejected, and ChatIds arrays
    await users.findOneAndUpdate(
      { _id: targetUserId },
      { $push: { rejected: connectedUserId } }
    );
    await users.findOneAndUpdate(
      { _id: targetUserId },
      { $pull: { matched: connectedUserId } }
    );
    const targetUser = await users.findOneAndUpdate(
      { _id: targetUserId },
      { $pull: { chatIds: chatId } },
      { new: true }
    );

    // Check the final state
    const connectorUserAfter = await users.findOne({ _id: connectedUserId });
    console.log(
      "Connector user chatIds after update:",
      connectorUserAfter.chatIds
    );

    const targetUserAfter = await users.findOne({ _id: targetUserId });
    console.log("Target user chatIds after update:", targetUserAfter.chatIds);

    return NextResponse.json(
      { user1: connectorUser, user2: targetUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}
