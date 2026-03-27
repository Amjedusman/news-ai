import { summarizeText } from "../services/aiService.js";

export const summarize = async (req, res) => {
  const { text } = req.body;

  const summary = await summarizeText(text);

  res.json({ summary });
};