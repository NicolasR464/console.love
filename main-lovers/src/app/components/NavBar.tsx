import Image from "next/image";
import LogoDesktop from "../../../public/logo_desktop.png";
import LogoMobile from "../../../public/logo_mobile.png";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LogOut from "./LogOut";
import Link from "next/link";
import React from "react";

let session: any;

// type ReactElement = any;

export default async function NavBar() {
  session = await getServerSession(authOptions);
  console.trace("SESSION NAV BAR ↴");
  console.log(session);

  let isAdmin = false;

  if (session) {
    isAdmin = session.user.admin;
  } else {
    // Not Signed in
    console.log("NOT SIGNED IN");
  }

  return (
    <div className="navbar top-0 h-[10vh] bg-black-lover">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <Link href="/">
          <Image
            src={LogoDesktop}
            style={{ maxWidth: "250px" }}
            alt=""
            className="desktop-image"
          />
        </Link>
        <Link href="/">
          <Image
            src={LogoMobile}
            style={{
              maxWidth: "150px",
              position: "absolute",
              left: 10,
              marginTop: "-30px",
            }}
            alt=""
            className="mobile-image"
          />
        </Link>
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
                <Link className="text-black" href="/">
                  Swiper
                </Link>
              </li>
              <li>
                <Link className="text-black" href="/myprofile">
                  My Profile
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link className="text-black" href="/admin">
                    Admin dashboard
                  </Link>
                </li>
              )}

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
