// require('dotenv').config({path: "./env"})

import dotenv from "dotenv";
import { connectMongoDB } from "./db/index.js";
import { app } from "./app.js";
const port = process.env.PORT || 3000;

// path will tell from where env vairables has to pick.
dotenv.config({
  path: "./env",
});

// since this function returns promise
connectMongoDB()
  .then(() => {
    app.listen(port, () => {
      console.log("server is running at port", port);
    });
  })
  .catch((err) => {
    console.log("MONGODB error connection fail", err);
  });
