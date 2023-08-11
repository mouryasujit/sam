import mongoose from "mongoose";
import { Schema } from "mongoose";

const classSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    classname: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    students: [{ name: String, rollno: Number, div: String }],
    location: [{ latitude: Number, longitude: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Class || mongoose.model("Class", classSchema);
