"use client";
import { loadStripe } from "@stripe/stripe-js";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { checkout } from "../utils/StripeCheckout";

export default function Stripe() {
  const [session, setSession] = useState<{} | null>(null);
  const [userId, setUserId] = useState<{} | null>();

  // console.log(process.env.NEXT_PUBLIC_STRIPE_SUB_ID);
  // console.log(session);

  useEffect(() => {
    const sessionHandler = async () => {
      const resSession = await getSession();
      console.log(resSession);
      setSession(resSession);
      setUserId(resSession?.user.sub);
      console.log(session);
    };
    if (!session) sessionHandler();
  }, [session]);

  const handleCheckout = () => {
    console.log("handleCheckout FUNCTION");

    console.log(userId);
    checkout({
      lineItems: [
        { price: process.env.NEXT_PUBLIC_STRIPE_SUB_ID, quantity: 1 },
      ],
    });
  };

  return (
    <div>
      <button
        onClick={() => handleCheckout()}
        className="btn btn-outline btn-success"
      >
        GO PREMIUMm
      </button>
    </div>
  );
}
