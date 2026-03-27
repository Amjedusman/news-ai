import axios from "axios";

export const summarizeText = async (text) => {
  try {
    const res = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant", // fast + free-tier friendly
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that summarizes news articles clearly and concisely.",
          },
          {
            role: "user",
            content: `Summarize this news article:\n${text}`,
          },
        ],
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data.choices[0].message.content;
  } catch (error) {
    console.error("Groq AI Error:", error.response?.data || error.message);
    throw new Error("AI summarization failed");
  }
};