import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    division: {
      type: String,
    },
    rollno: {
      type: Number,
    },
    email: {
      type: String,
      required: [true, "Please Provide a username"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide with a password"],
    },
    typeIs: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
