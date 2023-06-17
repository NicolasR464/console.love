import Image from "next/image";
import NavBar from "../components/NavBar";
import EditProfile from "../components/EditProfile";
import UserPictures from "../components/UserPictures";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import axios from "axios";
import { redirect } from "next/navigation";
import React from "react";
import SubActions from "../components/SubActions";

type UserData = {
  name: string;
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  password: string;
  address: string;
  city: string;
  premium: boolean;
  geoloc: number[];
  lukqhdsngvkfq: boolean;
  languages: string[];
  sex: string;
  attraction: string[];
  profileStatus: string;
  profilePicture: string;
  pictures: string[];
  swipe: number;
  timerSwipe: null | string;
  matched: string[];
  rejected: string[];
  chatIds: string[];
};
export default async function MyProfile() {
  let session: any;
  session = await getServerSession(authOptions);
  if (!session) redirect("/");

  // if (session && !session?.user?.city) redirect("/complete_profile");

  if (!session || !session.user || !session.user.email) {
    console.log("coucou");
    redirect("/");
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

  // const email = session?.user.email;
  // let user = null;

  // try {
  //   const response = await axios.get(
  //     `${process.env.HOSTNAME}/api/users?query=${email}`
  //   );
  //   user = response.data.data._id.toString();
  // } catch (error) {
  //   console.error("Error fetching user ID:", error);
  //   return;
  // }

  let userData: UserData | null = null;

  try {
    const response = await axios.get(
      `${process.env.HOSTNAME}/api/users/${session?.user.sub}`
    );
    userData = response.data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  console.log(userData);
  return (
    <main
      className="absolute flex flex-col items-center justify-between bg-white overflow-scroll h-[90vh] w-[100vw]"
      id="myProfile"
    >
      <div className="flex-col mt-10">
        <div className="hero rounded-3xl">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              alt="pictureprofile"
              src={
                userData?.profilePicture?.replace(
                  "/upload/",
                  "/upload/w_300,h_400,c_fill,g_auto/"
                ) || "/path/to/default/image.jpg"
              }
              width={300}
              height={400}
              className="max-w-sm rounded-lg shadow-2xl"
            />
            <div>
              <h1 className="text-4xl font-bold text-pink-lover">My Profile</h1>

              {userData?.premium ? (
                <h4>You are Premium ⭐️</h4>
              ) : (
                <SubActions />
              )}
              <div className="flex flex-col sm:flex">
                <div className="flex-col">
                  <input
                    readOnly
                    type="text"
                    placeholder="Username"
                    value={userData?.name}
                    className="input input-bordered input-info w-full my-2"
                  />
                  <input
                    readOnly
                    type="text"
                    placeholder="First Name"
                    value={userData?.firstName}
                    className="input input-bordered input-info w-full my-2"
                  />
                </div>
                <div className="flex-col">
                  <input
                    readOnly
                    type="text"
                    placeholder="Email"
                    value={userData?.email}
                    className="input input-bordered input-info w-full my-2"
                  />
                  <input
                    readOnly
                    type="text"
                    placeholder="Last Name"
                    value={userData?.lastName}
                    className="input input-bordered input-info w-full my-2"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex">
                <div className="flex-col">
                  <input
                    readOnly
                    type="text"
                    placeholder="City"
                    value={
                      userData?.languages ? userData?.languages.join(", ") : ""
                    }
                    className="input input-bordered input-info w-full my-2"
                  />

                  <input
                    readOnly
                    type="text"
                    placeholder="Adress"
                    value={userData?.address}
                    className="input input-bordered input-info w-full my-2"
                  />
                </div>
                <div className="flex-col">
                  <input
                    readOnly
                    type="text"
                    placeholder="City"
                    value={
                      userData?.attraction
                        ? userData?.attraction.join(", ")
                        : ""
                    }
                    className="input input-bordered input-info w-full my-2"
                  />
                  <input
                    readOnly
                    type="text"
                    placeholder="City"
                    value={userData?.city}
                    className="input input-bordered input-info w-full my-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <EditProfile userID={session?.user.sub} />
        </div>
        <UserPictures arrayPicturesUser={userData?.pictures || []} />
      </div>
    </main>
  );
}
