"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import githubSvg from "../../../public/github.svg";
import { getSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState<{} | null>();

  useEffect(() => {
    const sessionHandler = async () => {
      const resSession = await getSession();
      console.log(resSession);
      setSession(resSession);
    };
    sessionHandler();
  }, []);

  const handleGitSign = () => {
    if (session) {
      toast.error("Please log out first !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    signIn("github", { callbackUrl: "/" });
  };

  const handleLogin = async () => {
    if (session) {
      toast.error("Please log out first !", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    const login = async () => {
      const userData = await fetch("/api/a/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: "*",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log({ userData });
    };

    try {
      const data = await login();

      console.log("DATAA");

      console.log({ data });
      // if (!data.user) return null;
    } catch (err) {
      console.log(err);
    }

    await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <ToastContainer />
      <input type="checkbox" id="my-modal-login" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box p-10 bg-black-lover flex flex-col">
          <h3 className="font-bold text-lg text-center mb-4 text-pink-lover">
            Welcome again! Please Login to continue your experience...
          </h3>
          <button
            className="btn border-[#FF66C4] self-center"
            onClick={() => handleGitSign()}
          >
            <span>Log in with Github</span>
            <Image
              className="ml-1"
              src={githubSvg}
              width="18"
              height="18"
              alt=""
            />
          </button>
          <span className="text-center">OR</span>
          <div className="carousel w-full">
            <form className="flex flex-col mx-auto w-96 ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
                className="input input-bordered input-info w-full my-2"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
                placeholder="Password"
                className="input input-bordered input-info w-full my-2"
              />
            </form>
          </div>
          <Link href="/reset-pwd" className="link  mb-3 ml-8">
            Forgot your password?
          </Link>
          <div className="flex justify-evenly modal-action">
            <label
              htmlFor="my-modal-login"
              className="btn btn-outline bg-blue-lover"
            >
              Cancel
            </label>
            <label
              onClick={handleLogin}
              htmlFor="my-modal-login"
              className="btn btn-outline bg-pink-lover mt-0"
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
