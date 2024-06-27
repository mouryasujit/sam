import mongoose from "mongoose";
import { Schema } from "mongoose";
// google_ID=188007853627-3lug8s55dockg2tu9l5kfb5n2rjl7bqo.apps.googleusercontent.com
// google_SECRET=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
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
    students: [
      {
        name: { type: String },
        rollno: { type: Number },
        div: { type: String },
        Date: { type: Date },
        JoinedTime: { type: Date },
      },
    ],
    studentIp: [{ type: String }],
    location: { latitude: Number, longitude: Number },
    ipAddTeacher: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Class || mongoose.model("Class", classSchema);
