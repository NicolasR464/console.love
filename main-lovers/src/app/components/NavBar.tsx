import Image from "next/image";
import LogoDesktop from "../../../public/logo_desktop.png";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import LogOut from "./LogOut";
import Link from "next/link";

export default async function NavBar() {
  const session = await getServerSession(authOptions);
  // si session existe l'utilisateur est connecté
  console.log({ session });
  console.log(session?.user?.name);
  console.log(session?.user?.email);

  return (
    <div className="navbar top-0 h-[10vh] bg-black-lover">
      <div className="navbar-start">
       
      </div>

      <div className="navbar-center">
        <Image src={LogoDesktop} style={{ maxWidth: "300px" }} alt=""></Image>
      </div>

      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        {session && <LogOut />}
      </div>
    </div>
  );
}
