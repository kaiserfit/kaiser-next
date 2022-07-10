import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const id = body.paymentIntentId;
    const { itemBundle } = body;

    await stripe.paymentIntents.update(id, {
      description: JSON.parse(itemBundle?.productId!),
    });
    res.status(200).json({ message: "updated" });
  }
}
