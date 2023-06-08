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
  // console.log(session?.user?.name);
  // console.log(session?.user?.email);

  const email = session?.user.email;
  const response = await axios.get(
    `${process.env.HOSTNAME}/api/users?query=${email}`
  );
  const user = response.data.data?._id;

  if (!session || !session.user || !session.user.email) {
    console.log("coucou");
  } else {
    const email = session.user.email;
    const response = await axios.get(
      `${process.env.HOSTNAME}/api/users?query=${email}`
    );
    const user = response.data.data?._id;

    if (user) {
      const resFirstime = await axios.get(
        `${process.env.HOSTNAME}/api/users/${user}`
      );
      const userFirstime = resFirstime.data.data.address;
      if (!userFirstime) {
        redirect("/complete_profile");
      }
    }
  }

  return <>{session ? <Swiper userId={user} /> : <HomeScreen />}</>;
}
