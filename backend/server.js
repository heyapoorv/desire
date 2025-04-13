// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const fs = require("fs");

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// // Ensure uploads directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// // Multer storage and file type filter (PDF only)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "application/pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Only PDF files are allowed"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });

// // PDF upload route
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "No PDF file uploaded" });
//   }

//   res.json({
//     message: "PDF uploaded successfully",
//     filename: req.file.filename,
//     filePath: `/uploads/${req.file.filename}`,
//   });
// });

// // Serve uploaded PDFs
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


const express = require("express");
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage and file type filter (PDF only)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Store uploaded files in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true); // Allow only PDF files
  } else {
    cb(new Error("Only PDF files are allowed"), false); // Reject non-PDF files
  }
};

const upload = multer({ storage, fileFilter });

// PDF upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No PDF file uploaded" });
  }

  try {
    const dataBuffer = fs.readFileSync(path.join(uploadDir, req.file.filename));

    // Attempt text extraction using pdf-parse
    const pdfData = await pdfParse(dataBuffer);

    if (pdfData.text.trim()) {
      // If text extraction is successful, save as a text file
      const textFilename = req.file.filename.replace(/\.pdf$/, ".txt");
      const textFilePath = path.join(uploadDir, textFilename);
      fs.writeFileSync(textFilePath, pdfData.text);

      return res.json({
        message: "PDF uploaded and content saved to text file",
        filename: req.file.filename,
        textFilePath: `/uploads/${textFilename}`, // Provide path to the new text file
        text: pdfData.text, // You can also return the extracted text directly if needed
      });
    } else {
      // If pdf-parse fails to extract meaningful text, fall back to OCR (Tesseract.js)
      console.log("Falling back to OCR for text extraction...");
      const ocrText = await performOCR(path.join(uploadDir, req.file.filename));
      
      // Save the OCR result to a text file
      const ocrFilename = req.file.filename.replace(/\.pdf$/, "-ocr.txt");
      const ocrFilePath = path.join(uploadDir, ocrFilename);
      fs.writeFileSync(ocrFilePath, ocrText);

      return res.json({
        message: "PDF uploaded and OCR content saved to text file",
        filename: req.file.filename,
        textFilePath: `/uploads/${ocrFilename}`,
        text: ocrText, // Return OCR extracted text
      });
    }
  } catch (err) {
    console.error("Error processing PDF:", err);
    res.status(500).json({ error: "Failed to process PDF" });
  }
});

// Function to perform OCR using Tesseract.js
const performOCR = (pdfPath) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      pdfPath,
      'eng', // language (change if necessary)
      {
        logger: (m) => console.log(m), // Log progress (optional)
      }
    ).then(({ data: { text } }) => {
      resolve(text); // Return extracted text
    }).catch((err) => {
      console.error("OCR error:", err);
      reject("OCR failed");
    });
  });
};

// Serve uploaded PDFs and text files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
