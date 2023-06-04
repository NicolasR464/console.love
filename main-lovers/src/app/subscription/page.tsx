"use client";
// import Stripe from "../components/Stripe";
import stripeLoad from "../utils/StripeCheckout";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { log } from "console";
import Image from "next/image";
import Confetti from "react-confetti";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

export default function Subscription(params: any) {
  const [isSubscribed, setIsSubscribed] = useState("waiting");

  if (params.searchParams.session_id) {
    setIsSubscribed("pending");
    axios
      .post("/api/stripe_check", {
        sessionId: params.searchParams.session_id,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 204) {
          setIsSubscribed("confirmed");
        }
      })
      .catch((err) => console.log(err));
  }

  const createCheckOutSession = async () => {
    const stripe: any = await stripePromise;
    const checkoutSession = await axios.post("/api/checkout_sessions");
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
        <div className="border-solid  w-screen h-screen translate-y-20">
          {isSubscribed == "confirmed" && (
            <div>
              <Confetti opacity={0.6} colors={["#5271FF", "#FF66C4"]} />
              <h1 className="text-2xl text-center mt-10 font-bold text-6xl flex items-center justify-center animate-text bg-gradient-to-r from-pink-lover via-blue-lover to-pink-lover bg-clip-text text-transparent text-5xl font-black">
                Congratulation, <br /> you are now a premium member!🔥
              </h1>
              <div className="flex w-full justify-center mt-10">
                <Image
                  src="/star.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                ></Image>
              </div>
            </div>
          )}
          {isSubscribed == "pending" && <span>loading...</span>}
          {isSubscribed == "waiting" && (
            <>
              {" "}
              <div className="w-screen flex justify-center mt-4  ">
                <span className="w-8/12 max-w-md text-center p-3 bg-background-lover rounded-xl text-xl ">
                  Subscription plan
                </span>
              </div>
              <div className="w-full flex justify-center items-center mt-10">
                <section className="bg-background-lover flex-col sm:flex-row rounded-xl flex justify-around max-w-4xl p-6  ">
                  <article className="sm:border-r-2 border-blue-lover min-w-[230px]">
                    <h3 className="text-center  border-blue-lover border-b-2 text-2xl">
                      FREE
                    </h3>
                    <ul className="p-4">
                      <li>
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">Unlimited swipes/day</span>
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCircleXmark}
                          style={{ fontSize: "20px", color: "#1fd5b4" }}
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">
                          Go back to the profiles you nexted
                        </span>
                        <FontAwesomeIcon
                          className="ml-1"
                          icon={faCircleXmark}
                          style={{ fontSize: "20px", color: "#1fd5b4" }}
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">Unlimited matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">
                          Unlimited chat with your matches
                        </span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                    </ul>
                  </article>
                  <article className="min-w-[230px]">
                    <h3 className="text-center  border-blue-lover border-b-2 text-2xl">
                      PREMIUM✨ <span className="text-base">8€/month</span>
                    </h3>
                    <ul className="p-4">
                      <li>
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">Unlimited swipe</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">
                          Go back to the profiles you nexted
                        </span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>
                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">Unlimited matches</span>
                        <FontAwesomeIcon
                          style={{ fontSize: "20px", color: "#7400f8" }}
                          icon={faCircleCheck}
                          className="ml-1"
                        />
                      </li>

                      <li>
                        {" "}
                        <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                        <span className="text-xl">
                          Unlimited chat with your matches
                        </span>
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
