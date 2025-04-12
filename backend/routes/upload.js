const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);

    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: Buffer.from(fileBuffer).toString("base64"),
        },
      },
      {
        text: `Extract the following from this resume:
        - Full Name
        - Email
        - Phone
        - Skills
        - Education
        - Work Experience
        - Projects
        Return a structured JSON.`
      },
    ]);

    const response = await result.response;
    const parsedText = await response.text();

    fs.unlinkSync(filePath); // Cleanup temp file
    res.json({ parsed: parsedText });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

module.exports = router;
