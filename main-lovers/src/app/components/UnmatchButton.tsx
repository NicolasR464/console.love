import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSocket } from "../context/SocketContext";

interface RejectUserComponentProps {
  currentUserId: string;
  targetUserId: string;
  roomId: string;
}

function RejectUserComponent({
  currentUserId,
  targetUserId,
  roomId,
}: RejectUserComponentProps) {
  const router = useRouter();
  const socket = useSocket().socket;

  const rejectUserAndDeleteRoom = async () => {
    if (socket)
      console.log(
        "JE UPDATE MA LIST",
        // socket.emit("fetch chat rooms", currentUserId)
        socket.emit(
          "update-chat-status",
          { roomId, status: "denied" },
          currentUserId
        )
      );

    router.push("/"); // Redirect to home page
  };

  return (
    <>
      <ToastContainer />
      <button
        onClick={rejectUserAndDeleteRoom}
        className="btn bg-pink-lover text-white"
      >
        UNMATCH{" "}
      </button>
    </>
  );
}

export default RejectUserComponent;
