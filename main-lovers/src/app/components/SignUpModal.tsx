"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useState, useEffect } from "react";
import githubSvg from "../../../public/github.svg";
import React from "react";
import { getSession } from "next-auth/react";
// import { authOptions } from "../api/auth/[...nextauth]/route";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";

const emailSchema = z.string().email();

export default function SignUpModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [session, setSession] = useState<{} | null>();

  // const session = await getSession();
  // console.log(session);

  // const resSession = await getSession();
  // console.log(resSession);

  useEffect(() => {
    const sessionHandler = async () => {
      const resSession = await getSession();
      console.log(resSession);
      setSession(resSession);
    };
    sessionHandler();
  }, []);

  async function handleSubmit(e: any) {
    console.log("handleSubmitt ⤵️");

    // const emailCheck = emailSchema.parse(email);
    // z.string().email({ message: "Invalid email address" });
    console.log("email check");
    const emailCheck = emailSchema.safeParse(email);

    if (!emailCheck.success) {
      // handle error then return
      emailCheck.error;
      toast.error("Invalid email!", {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    }

    if (session) {
      toast.error("Please log out first !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    if (confPassword !== password) {
      console.log("passwords don't match");
      toast.error("Passwords don't match !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    if (password.length < 6) {
      toast.error("The password must have a minimum of 6 characters !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    const register = async () => {
      const res = await fetch("/api/a/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "*",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // console.log(res.data?.message);
      const message = res.json();
      console.log(message);

      return res.json();
    };
    console.log(email);
    console.log(password);

    try {
      const data = await register();

      console.log("DATAA");

      console.log({ data });
      if (!data.user) return null;
    } catch (err) {
      console.log(err);
    }

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
    toast.success("Account created!");
  }

  //////////////////////////
  // return (
  //   <div className="flex">
  //     <input onChange={(e) => console.log(e)} type="text" placeholder="email" />
  //     <input type="text" placeholder="password" />
  //     <button onClick={handleSubmit}>register</button>
  //   </div>
  // );

  ///////////////// GITHUB

  const handleGitSign = () => {
    if (session) {
      toast.error("Please log out first !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    signIn("github");
  };

  /////////////////////////////

  return (
    <>
      <ToastContainer />
      <input type="checkbox" id="my-modal-signup" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-10  bg-black-lover">
          <div className="flex justify-evenly modal-action ">
            <label
              htmlFor="my-modal-signup"
              className="absolute top-0 right-0 rounded-full btn btn-outline bg-blue-lover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          </div>
          <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">
            Welcome to console.love dear friend !
          </h3>

          <div className="carousel w-full h-100 flex justify-center">
            <div
              className="carousel-item flex flex-col 
              min-w-[90%] relative  mx-2"
            >
              <button
                className="btn border-[#FF66C4] "
                onClick={() => handleGitSign()}
              >
                <span>Sign in with Github</span>
                <Image
                  className="ml-1"
                  src={githubSvg}
                  width="18"
                  height="18"
                  alt=""
                />
              </button>
              <span className="text-center">OR</span>
              <div className="flex flex-col">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="email"
                  className="input input-bordered input-info w-full my-2 text-black-lover"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered input-info w-full my-2 text-black-lover"
                />
                <input
                  onChange={(e) => setConfPassword(e.target.value)}
                  type="password"
                  placeholder="password"
                  className="input input-bordered input-info w-full my-2 text-black-lover"
                />
                <button className="btn border-[#5271FF]" onClick={handleSubmit}>
                  Sign In with your credentials
                </button>

                {/* <span className="text-center">
                  already have an account? login!
                </span> */}
              </div>
              {/* <form
                className="flex flex-col mx-auto w-96"
                onSubmit={handleSubmit}
              >
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="input input-bordered input-info w-full my-2"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-info w-full my-2"
                  required
                />
                <div className="flex justify-evenly modal-action">
                  <label
                    htmlFor="my-modal-signup"
                    className="btn btn-outline bg-blue-lover"
                  >
                    Cancel
                  </label>
                  <button
                    type="submit"
                    className="btn btn-outline bg-pink-lover"
                  >
                    Register
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
