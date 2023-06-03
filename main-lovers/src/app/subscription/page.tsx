"use client";
// import Stripe from "../components/Stripe";
import stripeLoad from "../utils/StripeCheckout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// stripeLoad();
export default function Subscription(params: any) {
  // console.log(params.searchParams.session_id);

  if (params.searchParams.session_id) {
    axios
      .post("/api/stripe_check", {
        sessionId: params.searchParams.session_id,
      })
      .then((res) => {
        console.log(res.data);
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
        <div className="border-solid  w-screen h-screen ">
          {" "}
          <div className="w-screen flex justify-center mt-4">
            <span className="w-6/12 text-center p-3 bg-background-lover rounded-xl text-xl translate-y-20">
              Subscription plan
            </span>
          </div>
          <div className="w-full flex justify-center items-center h-4/6 ">
            <section className="bg-background-lover rounded-xl flex justify-around max-w-4xl p-6  ">
              <article className="border-r-2 border-blue-lover">
                <h3 className="text-center  border-blue-lover border-b-2 text-2xl">
                  FREE
                </h3>
                <ul className="p-2">
                  <li>
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">Unlimited swipe</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">
                      Go back to the profiles you nexted
                    </span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">Unlimited matches</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">
                      Unlimited chat with your matches
                    </span>
                  </li>
                </ul>
              </article>
              <article>
                <h3 className="text-center  border-blue-lover border-b-2 text-2xl">
                  PREMIUM✨ <span className="text-base">8€/month</span>
                </h3>
                <ul className="p-2">
                  <li>
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">Unlimited swipe</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">
                      Go back to the profiles you nexted
                    </span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">Unlimited matches</span>
                  </li>
                  <li>
                    {" "}
                    <i className="fa-solid fa-circle fa-2xs mr-2"></i>
                    <span className="text-xl">
                      Unlimited chat with your matches
                    </span>
                  </li>
                </ul>
                <div className="flex w-full justify-center">
                  <button
                    onClick={createCheckOutSession}
                    className="btn btn-outline btn-secondary"
                  >
                    SUBSCRIBE 🤩
                  </button>
                </div>
              </article>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
