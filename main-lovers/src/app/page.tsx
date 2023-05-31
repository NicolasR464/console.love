import Image from "next/image";
import NavBar from "./components/NavBar";
import HomeScreen from "./components/HomeScreen";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import Stripe from "./components/Stripe";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log({ session });
  // console.log(session?.user?.name);
  // console.log(session?.user?.email);
  return (
    <main className="flex max-h-screen flex-col items-center justify-between">
      {session ? (
        <div>
          <span>swipper component</span>
        </div>
      ) : (
        <HomeScreen />
      )}
    </main>
  );
}
