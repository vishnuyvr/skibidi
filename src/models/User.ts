import mongoose, { Schema, models } from "mongoose";

export const AppSchema = new Schema(
  {
    name: String,
    url: String,
    icon: String,
  },
  { _id: true }
);

const UserSchema = new Schema(
  {
    provider: { type: String, default: "google" },
    providerId: { type: String, index: true },
    name: String,
    email: { type: String, unique: true, index: true },
    image: String,
    apps: [AppSchema],
  },
  { timestamps: true }
);

export const User =
  models.User || mongoose.model("User", UserSchema);
