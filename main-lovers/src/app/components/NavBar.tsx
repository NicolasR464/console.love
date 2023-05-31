import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import LogOut from "./LogOut";

export default function NavBar() {
  // const session = await getServerSession(authOptions);
  // // si session existe l'utilisateur est connecté
  // console.log({ session });
  // console.log(session?.user?.name);
  // console.log(session?.user?.email);

  return (
    <div className="navbar z-999 bg-black-lover">
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
                <a>My Profile</a>
              </li>
            </div>
            <div className="flex flex-wrap justify-between w-86 mx-auto p-4">
              <div className="avatar online m-2">
                <div className="w-20 h-20 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </div>
              </div>
              <div className="avatar online m-2">
                <div className="w-20 h-20 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
                </div>
              </div>
              <div className="avatar online m-2">
                <div className="w-20 h-20 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </div>
              </div>
              <div className="avatar online m-2">
                <div className="w-20 h-20 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=female" />
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl text-white">
          console.love()
        </a>
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
        {/* {session && <LogOut />} */}
      </div>
    </div>
  );
}
