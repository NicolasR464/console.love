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

export default async function Home() {
  const session = await getServerSession(authOptions);
  // if (!session) redirect("/");

  console.log(session);

  console.trace({ session });
  console.log("🚀");

  console.log(session?.user?.city);

  if (session && !session?.user?.city) redirect("/complete_profile");

  // if (session?.user.sub) {
  //   const resFirstime = await axios.get(
  //     `${process.env.HOSTNAME}/api/users/${session?.user.sub}`
  //   );
  //   // console.trace(resFirstime);
  //   const userFirstime = resFirstime.data.data.address;
  //   if (!userFirstime) {
  //     redirect("/complete_profile");
  //   }
  // }

  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      {session ? (
        <div
          className="hero h-[90vh] w-full"
          style={{
            backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
            // filter: "brightness(0.6) saturate(1.2)",
          }}
        >
          <SocketProvider>
            <Drawer />
            <Swiper userId={session?.user.sub} />
          </SocketProvider>
        </div>
      ) : (
        <HomeScreen />
      )}
    </main>
  );
}
