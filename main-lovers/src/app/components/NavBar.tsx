// "use client";
import Image from "next/image";
import LogoDesktop from "../../../public/logo_desktop.png";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogOut from "./LogOut";
import Link from "next/link";
import React from "react";

let session: object | null;
// type ReactElement = any;

export default async function NavBar() {
  session = await getServerSession(authOptions);
  console.log("🤩");
  // console.log({ session });
  // console.log(session?.user?.name);
  // console.log(session?.user?.email);
  if (session) {
    // Signed in
    console.log("SIGNED IN");

    console.log("Session", JSON.stringify(session, null, 2));
  } else {
    // Not Signed in
    console.log("NOT SIGNED IN");
    // res.status(401);
  }

  return (
    <div className="navbar top-0 h-[10vh] bg-black-lover">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Image src={LogoDesktop} style={{ maxWidth: "250px" }} alt=""></Image>
      </div>

      <div className="navbar-end">
        {session && (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="absolute right-1 sm:right-3 top-0 -translate-y-6 cursor-pointer text-2xl border border-blue-lover rounded-lg p-2"
            >
              🔥
            </label>
            <ul
              tabIndex={0}
              className="translate-y-7 dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/myprofile">My Profile</Link>
              </li>
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
