import mongoose from "mongoose";

const Connect = async () => {
  try {
    // console.log(process.env.MONGO);
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    // Console.log("connection failed");
    throw new Error(`Connection failed! + ${error} `);
  }
};

export default Connect;
