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
    <div>
      <div className="navbar fixed top-0 z-999 bg-black-lover">
        <div className="navbar-start">
          <div className="dropdown">
            <label className="btn btn-circle swap swap-rotate">
              {/* <!-- this hidden checkbox controls the state --> */}
              <input type="checkbox" />
              {/* <!-- hamburger icon --> */}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-2 -ml-2 p-2 shadow bg-black-lover w-52 h-screen w-96"
            >
              <div className="flex text-pink-lover w-full justify-evenly">
                <li>
                  <a>My Matches</a>
                </li>
                <li>
                  <Link href="/myprofile">My Profile</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div className="navbar-center">
          <Image src={LogoDesktop} style={{ maxWidth: "300px" }} alt=""></Image>
        </div>

        <div className="navbar-end">
          {session && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                🔥
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <LogOut />
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
