// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors({
//     origin: "http://localhost:3000", // or your deployed frontend
//     credentials: true,
//   }));
  

// // Ensure the 'uploads' directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /pdf|doc|docx/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only .pdf, .doc, and .docx files are allowed!'));
//     }
//   },
// });

// // Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to the Resume Analyzer API');
// });

// app.post("/upload-resume", (req, res) => {
//   upload.single("resume")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ error: `Multer error: ${err.message}` });
//     } else if (err) {
//       return res.status(500).json({ error: `Error: ${err.message}` });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Log file path
//     console.log("Uploaded file:", req.file.path);

//     // TODO: Add Gemini parsing here (next step)
//     res.status(200).json({ message: "File received!", path: req.file.path });
//   });
// });

// // Start server
// app.listen(port, () => console.log(`Server running on port ${port}`));

// backend/server.js

// server.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import resumeRoutes from './routes/resumeRoutes.js';
// import jobRoutes from './routes/jobRoutes.js';
// import testRoute from './routes/testRoute.js'; // ✅ import testRoute correctly




// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;
// //const testRoute = require('./routes/testRoute');
// //const cors = require('cors');


// app.use(cors({
//   origin: "http://localhost:5173",  // Your frontend URL (Vite uses this)
//   credentials: true
// }));


// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // ✅ API routes
// app.use('/api/resume', resumeRoutes);
// app.use('/api/job', jobRoutes);
// app.use('/api', testRoute); // ✅ test route will respond to /api/ping

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
// server.js or index.js
// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import resumeRoutes from "./routes/resumeRoutes.js";


// ✅ Load environment variables
dotenv.config();

// ✅ Initialize app
const app = express();

// ✅ Middleware
app.use(cors());

// ✅ Serve static files from uploads directory
const uploadsDir = path.resolve("uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use("/uploads", express.static(uploadsDir));

// ❗ Skip express.json() globally — we'll use it in specific routes where needed

// ✅ Health check routes
app.get("/", (_, res) => {
  res.json({ message: "✅ Hello  world!" });
});

app.get("/api/test", (_, res) => {
  res.json({ message: "✅ Backend is working fine!" });
});

// ✅ Resume upload & processing route
app.use("/api/resume", resumeRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
