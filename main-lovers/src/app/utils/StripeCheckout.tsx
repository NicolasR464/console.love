import { loadStripe, Stripe } from "@stripe/stripe-js";

// const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

// const STRIPE_KEY: any = process.env.NEXT_PUBLIC_STRIPE_KEY;

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
  }
  console.log(stripePromise);

  return stripePromise;
};
export default getStripe;

//////
// import { loadStripe } from '@stripe/stripe-js';

// const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

/////////////////

// const createCheckOutSession = async () => {
//   const stripe = await stripePromise;
//   const checkoutSession = await axios.post('/api/create-stripe-session', {
//     item: item,
//   });
//   const result = await stripe.redirectToCheckout({
//     sessionId: checkoutSession.data.id,
//   });
//   if (result.error) {
//     alert(result.error.message);
//   }
// };
