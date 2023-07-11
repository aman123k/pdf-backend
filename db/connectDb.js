import mongoose from "mongoose";

const connection = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(DATABASE_URL);
    console.log("connection successfull");
  } catch (err) {
    console.log(err);
  }
};

export default connection;
