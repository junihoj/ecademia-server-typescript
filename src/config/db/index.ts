import "dotenv/config";
import mongoose, { ConnectOptions } from "mongoose";
const db = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("connected to Database Successfully");
  } catch (err) {
    console.log("UNABLE TO CONNECT TO DATABASE", err);
  }
};

export default db;
