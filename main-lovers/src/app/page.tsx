import Image from "next/image";
import NavBar from "./components/NavBar";
import HomeScreen from "./components/HomeScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Swiper from "./components/Swiper";
import axios from "axios";
import { redirect } from "next/navigation";
import Drawer from "./components/Drawer";
import { SocketProvider } from "./context/SocketContext";
// import DrawerLayout from "./components/drawerLayout"

export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log({ session });
  // IF JUST REGISTERED - REDIRECTION ↴
  // if (session && !session?.user?.city) redirect("/complete_profile");

  ///////////OLD
  if (session?.user.sub) {
    const resFirstime = await axios.get(
      `http://localhost:3000/api/users/${session?.user.sub}`
    );
    // console.trace(resFirstime);
    const userFirstime = resFirstime.data.data.address;
    if (!userFirstime) {
      redirect("/complete_profile");
    }
  }

  return (
    <>{session ? <Swiper userId={session?.user.sub} /> : <HomeScreen />}</>
  );
}
