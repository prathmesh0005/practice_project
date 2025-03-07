import express from "express";
import dotenv from "dotenv";
import { dbConection } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const port = process.env.PORT;

dbConection.connect(function (err) {
  if (err) throw err;
  console.log(" Database Connected!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get("/", (req,res)=>{
//     res.json({status: true, message: "working fine" });
// })

import userRouter from "./routes/userRoutes.js";

app.use("/api/user", userRouter);
