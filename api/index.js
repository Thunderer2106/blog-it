import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.listen(3000, () => {
  console.log("Server running on 3000");
});
