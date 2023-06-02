import { loadStripe } from "@stripe/stripe-js";

const STRIPE_KEY: any = process.env.NEXT_PUBLIC_STRIPE_KEY;

export async function checkout({ lineItems }: any) {
  let stripePromise: any = null;
  let stripe: any = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(STRIPE_KEY);
    }
    return stripePromise;
  };
  if (!stripe) stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: window.location.origin,
  });
  console.log("finish checkout");
}
