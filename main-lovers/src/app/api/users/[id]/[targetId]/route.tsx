import connectMongo from "../../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../../models/users";

export async function GET(req: Request, { params }: { params: { id: string, targetId: string }}) {
    const connectedUserId = params.id;
    const targetUserId = params.targetId;

    await connectMongo();
    try {
        // Find the connected user and update his matched and rejected arrays
        const connectorUser = await users.findOneAndUpdate(
            { _id: connectedUserId },
            { $push: { rejected: targetUserId }, $pull: { matched: targetUserId } }
        );

        // Find the target user and update his matched and rejected arrays
        const targetUser = await users.findOneAndUpdate(
            { _id: targetUserId },
            { $push: { rejected: connectedUserId }, $pull: { matched: connectedUserId } }
        );

        return NextResponse.json({ user1: connectedUserId, user2: targetUserId }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
}
