import { Request, Response } from "express";
import { handleWebhookEvent } from "../../services/stripe";

export const stripeWebhookController = async (req: any, res: Response) => {
  try {
    const signature = req.headers["stripe-signature"] as string;

    if (!signature) {
      return res.status(400).json({ message: "Missing signature" });
    }

    // req.body is a Buffer when using express.raw()
    const result = await handleWebhookEvent(signature, req.body as Buffer);
    res.json(result);
  } catch (error: any) {
    console.error("Webhook error:", error);
    res.status(400).json({ message: error.message || "Webhook error" });
  }
};
