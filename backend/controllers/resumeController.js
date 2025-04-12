// import path from 'path';
// import fs from 'fs/promises';
// import pdfParse from 'pdf-parse';
// import { PrismaClient } from '@prisma/client';
// import { parseWithGemini } from '../utils/geminiParser.js';

// const prisma = new PrismaClient();

// // ✅ Upload & parse new resume
// export const uploadResume = async (req, res) => {
//   try {
//     const { file } = req;
//     const userId = parseInt(req.body.userId);

//     if (!userId || !file) {
//       return res.status(400).json({ error: 'User ID and resume file are required.' });
//     }

//     const filePath = path.resolve('uploads', file.filename);
//     const buffer = await fs.readFile(filePath);
//     const { text: resumeText } = await pdfParse(buffer);

//     const parsedData = await parseWithGemini(resumeText);

//     const savedResume = await prisma.resume.create({
//       data: {
//         userId,
//         fileUrl: filePath,
//         parsedData,
//       },
//     });

//     res.status(201).json({
//       message: '✅ Resume uploaded & parsed successfully!',
//       resume: savedResume,
//     });
//   } catch (error) {
//     console.error('❌ Upload failed:', error);
//     res.status(500).json({
//       error: 'Server error while uploading resume.',
//       details: error.message,
//     });
//   }
// };

// // ✅ Re-parse existing resume with latest Gemini version
// export const parseResume = async (req, res) => {
//   try {
//     const resumeId = parseInt(req.body.resumeId);

//     if (!resumeId) {
//       return res.status(400).json({ error: 'Resume ID is required.' });
//     }

//     const resume = await prisma.resume.findUnique({ where: { id: resumeId } });

//     if (!resume) {
//       return res.status(404).json({ error: 'Resume not found.' });
//     }

//     const buffer = await fs.readFile(path.resolve(resume.fileUrl));
//     const { text: resumeText } = await pdfParse(buffer);
//     const parsedData = await parseWithGemini(resumeText);

//     const updatedResume = await prisma.resume.update({
//       where: { id: resumeId },
//       data: { parsedData },
//     });

//     res.status(200).json({
//       message: '✅ Resume re-parsed successfully!',
//       parsedResume: updatedResume,
//     });
//   } catch (error) {
//     console.error('❌ Parsing failed:', error);
//     res.status(500).json({
//       error: 'Server error while parsing resume.',
//       details: error.message,
//     });
//   }
// };

// // ✅ Get all resumes (for admin or company dashboard)
// export const getAllResumes = async (req, res) => {
//   try {
//     const resumes = await prisma.resume.findMany({
//       include: { user: true },
//       orderBy: { createdAt: 'desc' },
//     });

//     res.status(200).json(resumes);
//   } catch (error) {
//     console.error('❌ Fetch failed:', error);
//     res.status(500).json({
//       error: 'Server error while fetching resumes.',
//       details: error.message,
//     });
//   }
// };

// // 🔄 (Optional) Generate formatted resume PDF (if needed)
// export const generatePDFResume = async (req, res) => {
//   // You can implement this if needed using html-pdf or puppeteer
//   res.status(200).json({ message: "PDF generation coming soon!" });
// };


// controllers/resumeController.js
import path from "path";
import fs from "fs/promises";
import pdfParse from "pdf-parse";
import { PrismaClient } from "@prisma/client";
import { parseWithGemini } from "../utils/geminiParser.js";

const prisma = new PrismaClient();

// ✅ Upload & parse new resume
export const uploadResume = async (req, res) => {
  try {
    const { file } = req;
    const { userId } = req.body;

    if (!userId || !file) {
      return res.status(400).json({ error: "User ID and resume file are required." });
    }

    const filePath = path.resolve("uploads", file.filename);

    // Read the file buffer and extract text
    const buffer = await fs.readFile(filePath);
    const { text: resumeText } = await pdfParse(buffer);

    // Parse the extracted resume text using Gemini parser
    const parsedData = await parseWithGemini(resumeText);

    // Save parsed data into the database
    const savedResume = await prisma.resume.create({
      data: {
        userId: parseInt(userId),
        fileUrl: filePath,
        parsedData,
      },
    });

    res.status(201).json({
      message: "✅ Resume uploaded & parsed successfully!",
      resume: savedResume,
    });
  } catch (error) {
    console.error("❌ Upload failed:", error);
    res.status(500).json({
      error: "Server error while uploading resume.",
      details: error.message,
    });
  }
};

// ✅ Re-parse existing resume with latest Gemini version
export const parseResume = async (req, res) => {
  try {
    const { resumeId } = req.body;

    if (!resumeId) {
      return res.status(400).json({ error: "Resume ID is required." });
    }

    const resume = await prisma.resume.findUnique({
      where: { id: resumeId },
    });

    if (!resume) {
      return res.status(404).json({ error: "Resume not found." });
    }

    const buffer = await fs.readFile(path.resolve(resume.fileUrl));
    const { text: resumeText } = await pdfParse(buffer);
    const parsedData = await parseWithGemini(resumeText);

    const updatedResume = await prisma.resume.update({
      where: { id: resumeId },
      data: { parsedData },
    });

    res.status(200).json({
      message: "✅ Resume re-parsed successfully!",
      parsedResume: updatedResume,
    });
  } catch (error) {
    console.error("❌ Parsing failed:", error);
    res.status(500).json({
      error: "Server error while parsing resume.",
      details: error.message,
    });
  }
};

// ✅ Get all resumes (for admin or company dashboard)
export const getAllResumes = async (req, res) => {
  try {
    const resumes = await prisma.resume.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    res.status(500).json({
      error: "Server error while fetching resumes.",
      details: error.message,
    });
  }
};

// 🔄 (Optional) Generate formatted resume PDF (if needed)
export const generatePDFResume = async (req, res) => {
  try {
    // Implement PDF generation logic, such as using html-pdf or puppeteer
    res.status(200).json({ message: "PDF generation coming soon!" });
  } catch (error) {
    console.error("❌ PDF generation failed:", error);
    res.status(500).json({
      error: "Error generating PDF.",
      details: error.message,
    });
  }
};
