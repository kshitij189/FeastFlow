import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set in environment variables");
    }
    await mongoose.connect(uri);
    console.log(`connected to DataBase ${mongoose.connection.host}`);
  } catch (error) {
    console.log("Db Error", error);
    process.exit(1);
  }
};

export default connectDB