import { loadStripe, Stripe } from "@stripe/stripe-js";

const checkOut = async ({
  lineItems,
  email,
}: {
  lineItems: {
    price?: string | undefined;
    quantity?: number | undefined;
  }[];
  email: string;
}) => {
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
    customerEmail: email,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/checkout/success?stripe_session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    clientReferenceId: `${email}${Date.now()}`,
  });
};

export default checkOut;
