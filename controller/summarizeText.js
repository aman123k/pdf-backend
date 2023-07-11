import { TextServiceClient } from "@google-ai/generativelanguage";
import { GoogleAuth } from "google-auth-library";
const MODEL_NAME = "models/text-bison-001";

const sumarizeTextbyAI = async (KEY, text) => {
  console.log(KEY);
  const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(KEY),
  });
  const stopSequences = [];

  const respose = await client.generateText({
    model: MODEL_NAME,
    temperature: 0.6,
    top_k: 40,
    top_p: 0.95,
    max_output_tokens: 1024,
    stop_sequences: stopSequences,
    prompt: {
      text: `Summarize this paragraph and detail some relevant context. Text : ${text}`,
    },
  });
  const result = JSON.stringify(respose[0].candidates[0].output);
  return result;
};

export default sumarizeTextbyAI;
