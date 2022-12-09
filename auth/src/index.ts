import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-hander";
import { NotFoundError } from "./errors/not-found";
import mongoose from "mongoose";
import cookieSession from "cookie-session";

const app = express();
app.use(json());
app.set("trust proxy", true);
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key not defined");
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("Connected to db");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("listening on port 3000!!!!");
  });
};

start();
