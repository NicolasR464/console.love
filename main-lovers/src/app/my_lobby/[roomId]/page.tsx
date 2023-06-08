import Image from "next/image";
import ChatBox from "./ChatBox";
import Drawer from "../../components/Drawer";
import { SocketProvider } from "../../context/SocketContext";
import DrawerProfile from "../../components/Drawer_profile";
import DrawerLayout from "../../components/DrawerLayout";
import { useEffect } from "react";

const ChangeRoom = ({ roomId }: any) => {
  return (
    <>
      <ChatBox roomId={roomId} />
      <DrawerProfile roomId={roomId} />
    </>
  );
};

export default function page({ params }: any) {
  const urlRoomId = params;

  const { roomId }: any = urlRoomId;
  // console.log("MY ROOM ID", roomId);

  return (
    <>
      {/* <Drawer /> */}
      {/* <DrawerLayout> */}
      <ChangeRoom roomId={roomId} />
      {/* </DrawerLayout> */}
    </>
  );
}
