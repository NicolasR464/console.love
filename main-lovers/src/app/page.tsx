import HomeScreen from "./components/HomeScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Swiper from "./components/Swiper";
import axios from "axios";
import { redirect } from "next/navigation";
import Drawer from "./components/Drawer";
import { SocketProvider } from "./context/SocketContext";
// import DrawerLayout from "./components/drawerLayout"

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log({ session });
  // IF JUST REGISTERED - REDIRECTION ↴

  /////////// VERSION#1
  if (session?.user.sub) {
    const data = await fetch(
      `${process.env.HOSTNAME}/api/users/${session?.user.sub}`,
      { cache: "no-store" }
    );
    // console.trace(resFirstime);
    // const userFirstime = resFirstime.data.data.address;
    // if (!userFirstime) {
    //   redirect("/complete_profile");
    // }
    const resFirstime = await data.json();
    const userFirstime = resFirstime.data.address;

    console.log("USER INFO");

    console.trace(userFirstime);

    if (!userFirstime) {
      redirect("/complete_profile");
    }
  }

  ///////// VERSION#2
  // if (session && !session?.user?.city) redirect("/complete_profile");

  return (
    <>{session ? <Swiper userId={session?.user.sub} /> : <HomeScreen />}</>
  );
}
