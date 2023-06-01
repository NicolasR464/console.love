"use client";
// import { loadStripe } from "@stripe/stripe-js";

export default function Stripe() {
  // console.log(process.env.STRIPE_KEY);

  //   const stripe = await loadStripe(process.env.STRIPE_KEY);

  return (
    <div>
      <button className="btn translate-y-20">BUY</button>
    </div>
  );
}
