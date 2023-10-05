import mongoose from "mongoose";
import { createHash } from "../util/cryptoUtil.js";
const userCollection = "users";
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  role: { type: String, required: true, default: "user" },
});

userSchema.pre("save", function () {
  this.password = createHash(this.password);
});
userSchema.pre("findOne", function () {
  this.populate("cart");
});
export const userModel = mongoose.model(userCollection, userSchema);
