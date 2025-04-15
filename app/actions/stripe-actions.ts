"use server";

import { v4 as uuidv4 } from "uuid";
import type { Stripe } from "stripe";

// Mock implementation for development when Stripe keys aren't available
export async function createPaymentIntent({
  amount,
  currency = "usd",
  metadata,
}: {
  amount: number;
  currency: string;
  metadata: Record<string, any>;
}) {
  try {
    // Check if we have a valid Stripe key
    if (
      !process.env.STRIPE_SECRET_KEY ||
      process.env.STRIPE_SECRET_KEY.includes("your_secret_key")
    ) {
      console.log("Using mock payment intent (no valid Stripe key found)");

      // Create a mock client secret that will work with our frontend
      // In a real implementation, this would come from Stripe
      const mockClientSecret = `mock_${uuidv4()}_secret_${uuidv4()}`;

      //   return new Response(JSON.stringify({ clientSecret: mockClientSecret }), {
      //     status: 200,
      //     headers: { "Content-Type": "application/json" },
      //   });

      return {
        clientSecret: mockClientSecret,
        mockMode: true,
      };
    }

    // If we have a valid key, use the real Stripe implementation
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 10 * 100, // Stripe expects amounts in cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      mockMode: false,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
}

interface MockPaymentIntent {
  id: string;
  status: string;
  amount: number;
  currency: string;
  mockMode: boolean;
}

export async function getPaymentIntent(
  paymentIntentId: string
): Promise<MockPaymentIntent | Stripe.PaymentIntent> {
  // Mock implementation for development

  if (
    !process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET_KEY.includes("your_secret_key")
  ) {
    console.log("error");
    return {
      id: paymentIntentId,
      status: "succeeded",
      amount: 0,
      currency: "usd",
      mockMode: true,
    };
  }

  try {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const paymentIntent: Stripe.PaymentIntent =
      await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw new Error("Failed to retrieve payment intent");
  }
}
