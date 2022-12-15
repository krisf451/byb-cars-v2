import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

export const payWithStripe = asyncHandler(async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    submit_type: "pay",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_options: [{ shipping_rate: "shr_1LWCoQJOAH20zjTiW9B8Stvk" }],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${req.body.make} ${req.body.model}`,
            images: [req.body.image],
          },
          unit_amount: req.body.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/payment?canceled=true`,
  });

  if (session) {
    res.status(200).json(session);
  }
});
