import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/user", userRouter);
/* 
1. user will add as prefix and then routes defined for user.
2. To maintain version of api we can add like above /api/v1 and
its good practice to add api in front for prod level code.

https://locaclhost:4000/user/register
https://locaclhost:4000/user/login

*/

export { app };
