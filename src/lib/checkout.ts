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
        "pk_test_51LIQslAtSFPFrKY5mJdnQuad2wmALyct6SXkoXBaibPgsbyI5Lc3TZjU9avJBICFuY6vgJvvPNc8uhRraZo6YQ4S00qsiff8sZ"
      );
    }
    return stripePromise;
  };

  const stripe: Stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    customerEmail: email,
    successUrl: `https://www.queenformula.net/checkout/success?stripe_session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `https://www.queenformula.net/checkout`,
    clientReferenceId: `${email}${Date.now()}`,
  });
};

export default checkOut;
