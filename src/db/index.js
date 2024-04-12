import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectMongoDB = async () => {
  try {
    const mongooseConnectUrl = `${process.env.MONGODB_URL}/${DB_NAME}`;
    const connectionInstance = await mongoose.connect(mongooseConnectUrl);
    console.log(
      "MONGOEB connected SUCCESS!! DB host",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.log("MONGODB connection error", error);

    /* nodejs has this process which is currently going
    on and it has refernce of that process.

    If MONGODB fails to connect exit nodejs process.
    There are many other codes (Please do check)
    */
    process.exit(1);
  }
};

export { connectMongoDB };
