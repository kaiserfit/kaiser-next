import { loadStripe, Stripe } from "@stripe/stripe-js";

const checkOut = async ({ lineItems }: any) => {
  let stripePromise: any = null;

  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
    }
    return stripePromise;
  };

  const stripe: Stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: "http://localhost:3000/checkout/success",
    cancelUrl: "http://localhost:3000/checkout",
  });
};

export default checkOut;
