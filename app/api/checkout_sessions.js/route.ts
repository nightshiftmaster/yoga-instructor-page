import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface LineItem {
  price: string;
  quantity: number;
}

interface CheckoutSession {
  line_items: LineItem[];
  mode: "payment";
  success_url: string;
  cancel_url: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1OYzAaIyQwz6fEhABCDEF12", // <-- твой настоящий Price ID
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
  } as CheckoutSession);

  // вот это нужно!
  if (session.url) {
    res.redirect(303, session.url);
  } else {
    res.status(500).send("Session URL is null");
  }
}
