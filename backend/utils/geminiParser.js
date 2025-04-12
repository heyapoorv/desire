// // backend/utils/geminiParser.js

// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';
// import { GoogleGenerativeAI } from '@google/generative-ai';

// dotenv.config();

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Reads file as base64 from absolute path
//  * @param {string} absolutePath
//  * @returns {string} base64 encoded string
//  */
// const readFileAsBase64 = (absolutePath) => {
//   if (!fs.existsSync(absolutePath)) {
//     throw new Error(`File not found at path: ${absolutePath}`);
//   }

//   const fileBuffer = fs.readFileSync(absolutePath);
//   return fileBuffer.toString('base64');
// };

// /**
//  * Ensures the content from Gemini is valid JSON
//  * @param {string} content
//  * @returns {Object} parsed JSON object
//  */
// const safeParseJson = (content) => {
//   try {
//     // Remove any extra characters before/after JSON
//     const jsonStart = content.indexOf('{');
//     const jsonEnd = content.lastIndexOf('}');
//     const cleanJson = content.slice(jsonStart, jsonEnd + 1);
//     return JSON.parse(cleanJson);
//   } catch (err) {
//     console.error('[JSON Parse Error]', err.message);
//     throw new Error('Invalid JSON format returned by Gemini');
//   }
// };

// /**
//  * Parses a resume PDF using Google Gemini Pro Vision.
//  * @param {string} relativePath - Relative file path to the PDF resume
//  * @returns {Promise<Object>} Parsed structured resume data
//  */
// export const parseWithGemini = async (relativePath) => {
//   try {
//     const absolutePath = path.resolve('backend', relativePath);
//     const base64Data = readFileAsBase64(absolutePath);

//     const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

//     const prompt = `Extract the following structured resume details:
//     - name
//     - email
//     - phone
//     - education
//     - skills
//     - projects
//     - experience
//     Return the output strictly in valid JSON format only.`;

//     const result = await model.generateContent([
//       {
//         inlineData: {
//           mimeType: 'application/pdf',
//           data: base64Data,
//         },
//       },
//       { text: prompt },
//     ]);

//     const response = await result.response;
//     const content = await response.text();

//     return safeParseJson(content);
//   } catch (error) {
//     console.error('[Gemini Parsing Error]', error.message);
//     throw new Error('Failed to parse resume with Gemini');
//   }
// };

// utils/geminiParser.js

import { google } from 'googleapis';
import { getAccessToken } from '../auth/googleOAuth.js';

export const parseWithGemini = async (resumeText) => {
  try {
    const auth = await getAccessToken();

    const gemini = google.generativelanguage({
      version: 'v1beta',
      auth,
    });

    const response = await gemini.models.generateContent({
      model: 'models/gemini-pro',
      requestBody: {
        contents: [
          {
            parts: [{ text: `Parse this resume:\n\n${resumeText}` }],
          },
        ],
      },
    });

    const reply = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return reply;
  } catch (err) {
    console.error('❌ Gemini Parsing Error:', err);
    throw err;
  }
};
