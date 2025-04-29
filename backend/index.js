import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:4173"],
    credentials: true,
  })
);

// dbConnection.connect(function (err) {
//   if (err) throw err;
//   console.log(" Database Connected!");
// });

dbConnection.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database Connected!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get("/", (req,res)=>{
//     res.json({status: true, message: "working fine" });
// })

import userRouter from "./routes/userRoutes.js";
import itemRouter from "./routes/itemRoutes.js";

app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);
