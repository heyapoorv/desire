// // const express = require("express");
// // const multer = require("multer");
// // const path = require("path");
// // const resumeController = require("../controllers/resumeController");

// // const router = express.Router();

// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => cb(null, "uploads/"),
// //   filename: (req, file, cb) =>
// //     cb(null, `${Date.now()}-${file.originalname}`),
// // });

// // const upload = multer({
// //   storage,
// //   fileFilter: (req, file, cb) => {
// //     const filetypes = /pdf|doc|docx/;
// //     const isValid =
// //       filetypes.test(path.extname(file.originalname).toLowerCase()) &&
// //       filetypes.test(file.mimetype);
// //     isValid ? cb(null, true) : cb("Only PDF/DOC/DOCX allowed!");
// //   },
// // });

// // router.post("/upload-resume", upload.single("resume"), resumeController.handleResumeUpload);

// // module.exports = router;
// const express = require("express");
// const multer = require("multer");
// const { parseResume } = require("../controllers/resumeController");

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("resume"), parseResume);

// module.exports = router;

// backend/routes/resumeRoutes.js

// backend/routes/resumeRoutes.js

// import express from 'express';
// import multer from 'multer';
// import {
//   uploadResume,
//   parseResume,
//   getAllResumes
// } from '../controllers/resumeController.js';

// const router = express.Router();

// // Configure Multer for file upload
// const storage = multer.diskStorage({
//   destination: 'uploads/', // Saves in /uploads directory
//   filename: (req, file, cb) => {
//     const timestamp = Date.now();
//     const cleanFileName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores
//     cb(null, `${timestamp}-${cleanFileName}`);
//   }
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit: 5MB
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname.match(/\.(pdf|docx?)$/i)) {
//       return cb(new Error('Only PDF and DOC/DOCX files are allowed'), false);
//     }
//     cb(null, true);
//   }
// });

// // Route: Upload resume
// router.post('/upload', upload.single('resume'), uploadResume);

// // Route: Parse resume using Gemini
// router.post('/parse', parseResume);

// // Route: Get all resumes
// router.get('/all', getAllResumes);

// export default router;


// routes/resumeRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  uploadResume,
  parseResume,
  getAllResumes,
} from "../controllers/resumeController.js";

const router = express.Router();

// ✅ Ensure uploads directory exists
const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ⚙️ Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${sanitized}`);
  },
});

// 🛡️ Accept only PDF/DOC/DOCX
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/msword", // .doc
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("❌ Only PDF, DOC, and DOCX files are allowed."),
      false
    );
  }
};

// 📥 Multer Upload Middleware
const upload = multer({ storage, fileFilter });

// 📌 Resume Routes
router.post("/upload", upload.single("file"), uploadResume); // ⬆️ Upload Resume
router.post("/parse", parseResume);                          // 🧠 AI Resume Parsing
router.get("/all", getAllResumes);                           // 📂 Get All Resumes

export default router;
