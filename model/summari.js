import mongoose from "mongoose";

// DEFINING SCHEMA

const summariseSchema = new mongoose.Schema({
  name: { type: "string", required: true, trim: true },
  summary: { type: "String", required: true, trim: true },
});

// Modle

const summaryModel = mongoose.model("summarizer", summariseSchema);

export default summaryModel;
