import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  email: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: "stripe" | "bkash";
  planId: string;
  credits: number;
  stripeSessionId?: string;
  bkashTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "usd",
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "bkash"],
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    stripeSessionId: {
      type: String,
    },
    bkashTransactionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ stripeSessionId: 1 });

export const Payment = mongoose.model<IPayment>("Payment", paymentSchema);
