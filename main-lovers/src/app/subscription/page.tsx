import Stripe from "../components/Stripe";

export default function Subscription() {
  return (
    <main className="flex max-h-screen flex-col items-center justify-between absolute mt-10">
      <div className="flex mt-10 ">
        <div className="border-solid  w-screen">
          <h1 className="text-center">Your subscription</h1>
          <Stripe />
        </div>
      </div>
    </main>
  );
}
