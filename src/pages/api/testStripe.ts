import type { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

type Data = {
  key: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    res.status(200).json({
      key: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    });
  }
}
