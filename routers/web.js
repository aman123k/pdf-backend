import dotenv from "dotenv";
dotenv.config();
import express from "express";
import upload from "../middelware/multer.js";
import extractStrings from "../controller/Textextractor.js";
import fs from "fs";
import PDFExtract from "pdf.js-extract";
import summaryModel from "../model/summari.js";

import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";

const router = express.Router();
const pdfExtract = new PDFExtract.PDFExtract();
const options = {};
const MODEL_NAME = "models/text-bison-001";

const API_KEY = process.env.API_KEY;

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});
const stopSequences = [];

router.post("/", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  pdfExtract.extract(filePath, options, async (err, data) => {
    if (err) throw err;
    const text = await extractStrings(data.pages);

    const respose = await client.generateText({
      model: MODEL_NAME,
      temperature: 0.6,
      top_k: 40,
      top_p: 0.95,
      max_output_tokens: 10000,
      stop_sequences: stopSequences,
      prompt: {
        text: `Summarize this paragraph and detail some relevant context. Text : ${text}`,
      },
    });
    const result = JSON.stringify(respose[0].candidates[0].output);
    res.send(result);
    //   saving document
    const doc = new summaryModel({
      name: req.file.originalname,
      summary: result,
    });
    const summary = await doc.save();
  });
  fs.unlink(filePath, (err) => {
    if (err) throw err;
  });
});

router.get("/history", async (req, res) => {
  try {
    const data = await summaryModel.find().maxTimeMS(20000);
    res.send(data);
    //
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.get("/history/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await summaryModel.findByIdAndDelete(id).maxTimeMS(20000);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});
export default router;
