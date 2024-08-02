import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import commentRoutes from "./routes/comment.route.js";
import chatRoutes from "./routes/chat.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/blog")
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
  });
// mongoose
//   .connect(
//     "mongodb+srv://akash:akash@blogit-cluster.ohyogjg.mongodb.net/blog-it?retryWrites=true&w=majority&appName=Blogit-Cluster"
//   )
//   .then(() => {
//     console.log("mongo connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () => {
  console.log("Server running on 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/chat", chatRoutes);
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
