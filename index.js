import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function startApp() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    app.use("/api", router)

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

startApp();