import "dotenv/config";
import mongoose, { ConnectOptions } from "mongoose";
const db = async () => {
  try {
    mongoose.connect("mongodb://127.0.0.1/ecademia2", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    console.log("connected to Database Successfully");
  } catch (err) {
    console.log("UNABLE TO CONNECT TO DATABASE", err);
  }
};

export default db;
