import Stripe from "stripe";
import { formatAmountForStripe } from "utils/stripe-helpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    const { amount } = req.body;

    try {
      const params = {
        payment_method_types: ["card"],
        amount: formatAmountForStripe(amount, "usd"),
        currency: "usd",
      };

      const payment_intent = await stripe.paymentIntents.create(params);
      res.status(200).json(payment_intent);
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
