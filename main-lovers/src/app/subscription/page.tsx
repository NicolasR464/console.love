"use client";
import stripeLoad from "../utils/StripeCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Confetti from "react-confetti";
import { getSession } from "next-auth/react";

// check if key is right again
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Subscription(params: any) {
  const [isSubscribed, setIsSubscribed] = useState("pending");
  const [session, setSession] = useState<{} | null>();

  useEffect(() => {
    const sessionHandler = async () => {
      const resSession = await getSession();
      console.log(resSession);
      setSession(resSession);
    };
    sessionHandler();
  }, []);

  useEffect(() => {
    if (params.searchParams.session_id) {
      setIsSubscribed("pending");

      axios
        .post(`${process.env.HOSTNAME}/api/stripe_check`, {
          sessionId: params.searchParams.session_id,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status == 204) {
            setIsSubscribed("confirmed");
          }
        })
        .catch((err) => console.log(err));
    } else {
      setIsSubscribed("waiting");
    }
  }, [params.searchParams.session_id]);

  const createCheckOutSession = async () => {
    const stripe: any = await stripePromise;
    const checkoutSession = await axios.post(
      `${process.env.HOSTNAME}/api/checkout_sessions`
    );
    console.log(checkoutSession.data);

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <main className="flex max-h-screen flex-col items-center justify-between absolute">
      <div className="flex ">
        <div className="border-solid w-[100%] h-[100%]  ">
          {isSubscribed == "confirmed" && (
            <div>
              <Confetti
                className="-translate-y-80"
                opacity={0.6}
                colors={["#001a82", "#9e0061"]}
              />
              <h1 className="text-2xl text-center mt-10 font-bold text-6xl flex items-center justify-center animate-text bg-gradient-to-r from-[#9e0061] via-[#001368] to-[#9e0061] bg-clip-text text-transparent text-5xl font-black">
                Congratulation, <br /> you are now a premium member!🔥
              </h1>

              <div className="flex w-full justify-center mt-10">
                <Image
                  src="/star.png"
                  width={150}
                  height={150}
                  alt="star logo"
                ></Image>
              </div>
            </div>
          )}
          {isSubscribed == "pending" && (
            <div className="translate-y-20 h-2/4 w-full flex justify-center items-center">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-pink-lover motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}
          {isSubscribed == "waiting" && (
            <>
              {" "}
              <div className="w-screen flex justify-center mt-4 font-bold text-2xl text-pink-lover ">
                <span className="w-8/12 max-w-md text-center p-3 bg-background-lover rounded-xl text-2xl ">
                  Subscription plan
                </span>
              </div>
              <div className="w-full flex justify-center items-center mt-10">
                <section className="bg-background-lover flex flex-col-reverse sm:flex-row rounded-xl flex justify-around max-w-4xl p-6 mx-2 ">
                  <article className="sm:border-r-2 border-blue-lover min-w-[230px]">
                    <h3 className="text-center border-blue-lover border-b-2 text-2xl font-bold text-pink-lover">
                      FREE
                    </h3>
                    <ul className="p-4 text-pink-lover text-md">
                      <li>
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited swipes/day</span>
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCircleXmark}
                          style={{ fontSize: "20px", color: "#1fd5b4" }}
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Can go back to the profiles you nexted</span>
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCircleXmark}
                          style={{ fontSize: "20px", color: "#1fd5b4" }}
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited chat with your matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                    </ul>
                  </article>
                  <article className="min-w-[230px] pb-4 border-blue-lover border-b-2 sm:border-b-0">
                    <h3 className="text-center border-blue-lover border-b-2 text-2xl font-bold text-pink-lover">
                      PREMIUM✨ <span className="text-base">8€/month</span>
                    </h3>
                    <ul className="p-4 text-pink-lover">
                      <li>
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited swipe</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Can go back to the profiles you nexted</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>

                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span>Unlimited chat with your matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                    </ul>
                    <div className="flex w-full justify-center">
                      <button
                        onClick={createCheckOutSession}
                        className="btn btn-outline btn-secondary shadow  shadow-secondary"
                      >
                        GO PREMIUM 🤩
                      </button>
                    </div>
                  </article>
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
