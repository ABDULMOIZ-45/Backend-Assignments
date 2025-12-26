import mongoose from "mongoose";

export async function connectDB() {
  console.log("Abdul Moiz");
  console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.error("Error While Connecting", error);
  }
}