const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.extractText = async (filePath) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const prompt = `
You're an AI resume parser. Extract and summarize these sections clearly:
- Name
- Contact Info
- Summary
- Skills
- Education
- Experience
- Projects

Format your response as a JSON object.
  `;

  const result = await model.generateContent(`${prompt}\n\n${fileContent}`);
  const response = await result.response;
  const text = response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (e) {
    throw new Error("Gemini response not in valid JSON format.");
  }
};
