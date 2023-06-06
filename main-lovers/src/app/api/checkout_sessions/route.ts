// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});
// import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from "../../../config";
// import { formatAmountForStripe } from "../../../utils/stripe-helpers";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1NDklpLVLdoU9GIiRhxQvXJE",
        quantity: 1,
      },
    ],
    success_url: `${process.env.HOSTNAME}/subscription?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.HOSTNAME}/subscription?status=cancel`,
  });
  return NextResponse.json({ id: session.id, session: session });
}
