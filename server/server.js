import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./databases/dbConnection.js";
import userRouter from "./routers/userInfo.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });

const app = express();
console.log("after app");
// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

// Database Connection
dbConnection();

// Routes
app.use("/api/v1/", userRouter);
console.log("after routes");
// Export as a serverless function
export default app;
