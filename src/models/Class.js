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
    email: {
      type: String,
      required: true,
    },
    passcode: {
      type: String,
      required: true,
    },
    students: [{ name: String, rollno: Number, div: String }],
    studentIp: [{ type: String }],
    location: { latitude: Number, longitude: Number },
    ipAddTeacher: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Class || mongoose.model("Class", classSchema);
