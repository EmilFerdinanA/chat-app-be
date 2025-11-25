import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
});

export const UserModel = mongoose.model("user", userSchema);
