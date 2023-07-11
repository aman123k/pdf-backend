import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import web from "./routers/web.js";
import connection from "./db/connectDb.js";
import mongoose from "mongoose";
const app = express();
import path from "path";
const __dirname = path.resolve();
const comman = async () => {
  try {
    const DATABASE_URL = process.env.DATABASE_URL;
    await connection(DATABASE_URL);
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.log(error);
    });
    db.once("open", () => {
      console.log("connected successfuly");
    });
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    const port = process.env.PORT || "8080";
    app.use("/", web);
    app.listen(port, () => {
      console.log(`sever listen at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
comman();
