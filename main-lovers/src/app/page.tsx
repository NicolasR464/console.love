import HomeScreen from "./components/HomeScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Swiper from "./components/Swiper";
import axios from "axios";
import { redirect } from "next/navigation";
import Drawer from "./components/Drawer";
import { SocketProvider } from "./context/SocketContext";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const email = session?.user.email;
  const response = await axios.get(`/api/users?query=${email}`);
  const user = response.data.data?._id;

  if (!session || !session.user || !session.user.email) {
  } else {
    const email = session.user.email;
    const response = await axios.get(`/api/users?query=${email}`);
    const user = response.data.data?._id;

    if (user) {
      const resFirstime = await axios.get(`/api/users/${user}`);
      const userFirstime = resFirstime.data.data.address;
      if (!userFirstime) {
        redirect("/complete_profile");
      }
    }
  }

  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      {session ? (
        <div
          className="hero h-[90vh] w-full"
          style={{
            backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
          }}
        >
          <SocketProvider>
            <Drawer />
            <Swiper userId={user} />
          </SocketProvider>
        </div>
      ) : (
        <HomeScreen />
      )}
    </main>
  );
}
