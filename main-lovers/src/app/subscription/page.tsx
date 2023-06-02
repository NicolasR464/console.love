"use client";
// import Stripe from "../components/Stripe";
import stripeLoad from "../utils/StripeCheckout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// stripeLoad();
export default function Subscription() {
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
    <main className="flex max-h-screen flex-col items-center justify-between absolute mt-10">
      <div className="flex mt-10 ">
        <div className="border-solid  w-screen">
          <h1 className="text-center">Subscription plan</h1>

          <button onClick={createCheckOutSession} className="btn">
            SUBSCRIBE
          </button>
          {/* <Stripe /> */}
        </div>
      </div>
    </main>
  );
}
