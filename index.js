import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./config/database.js"
import router from "./router.js";

const app = express();
const PORT = process.env.PORT || 3000;

async function startApp() {
  await connectDB();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
  app.use("/api", router)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApp();