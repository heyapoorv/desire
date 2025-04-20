
// const express = require("express");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");
// const router = express.Router();
// const generateResumePDF = require("../utils/generateResumePDF");

// // Set up multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

// // Route: POST /api/upload
// router.post("/", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const filename = req.file.filename;
//     const fileContent = fs.readFileSync(filePath, "utf8");

//     // Save the raw text into a .txt file
//     const txtPath = `uploads/${filename}.txt`;
//     fs.writeFileSync(txtPath, fileContent);

//     // Parse into structured format (placeholder)
//     const structuredData = {
//       name: "Robert Smith",
//       phone: "(123) 456 78 99",
//       email: "info@qwikresume.com",
//       website: "www.qwikresume.com",
//       linkedin: "linkedin.com/qwikresume",
//       address: "1737 Marshville Road, Alabama",
//       objective:
//         "Over 6 years of IT industry experience with 4+ years as a mobile application developer.",
//       skills: "Python, Java, C, Javascript, Matlab, R.",
//       education: "IT Technology - 2011 (Gyumri IT Center)",
//       experience: [
//         {
//           title: "Android Developer",
//           company: "ABC Corporation",
//           duration: "Jan 2011 – Mar 2012",
//           details:
//             "Developed front-end, UI, custom adapters, navigation drawers, and debugged code.",
//         },
//         {
//           title: "Android Developer",
//           company: "ABC Corporation",
//           duration: "2006 – 2011",
//           details:
//             "Developed Insight tablet app, retrieved data from cloud server, cleaned legacy code.",
//         },
//       ],
//     };

//     // Generate the resume PDF
//     const pdfOutputPath = path.join(__dirname, `../uploads/${filename}.resume.pdf`);
//     await generateResumePDF(structuredData, pdfOutputPath);

//     res.status(200).json({
//       message: "PDF uploaded and resume generated",
//       filename: filename,
//       resumeDownloadUrl: `/uploads/${filename}.resume.pdf`,
//     });
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// module.exports = router;


// routes/upload.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const generateResumePDF = require("../utils/generateResumePDF");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer Storage
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const userId = req.body.userId || "anonymous";
    const sanitizedName = file.originalname.replace(/\s+/g, "_");
    cb(null, `${timestamp}-${userId}-${sanitizedName}`);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const filename = req.file.filename;

    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Optionally write raw text to .txt
    fs.writeFileSync(`${filePath}.txt`, fileContent);

    // Placeholder: Replace with actual resume parsing logic
    const structuredData = {
      name: "Robert Smith",
      phone: "(123) 456 78 99",
      email: "info@qwikresume.com",
      website: "www.qwikresume.com",
      linkedin: "linkedin.com/qwikresume",
      address: "1737 Marshville Road, Alabama",
      objective:
        "Over 6 years of IT industry experience with 4+ years as a mobile application developer.",
      skills: "Python, Java, C, Javascript, Matlab, R.",
      education: "IT Technology - 2011 (Gyumri IT Center)",
      experience: [
        {
          title: "Android Developer",
          company: "ABC Corporation",
          duration: "Jan 2011 – Mar 2012",
          details:
            "Developed front-end, UI, custom adapters, navigation drawers, and debugged code.",
        },
        {
          title: "Android Developer",
          company: "ABC Corporation",
          duration: "2006 – 2011",
          details:
            "Developed Insight tablet app, retrieved data from cloud server, cleaned legacy code.",
        },
      ],
    };

    // Generate formatted PDF
    const pdfPath = path.join(uploadDir, `${filename}.resume.pdf`);
    await generateResumePDF(structuredData, pdfPath);

    res.status(200).json({
      message: "Resume processed and PDF generated successfully",
      downloadUrl: `/uploads/${path.basename(pdfPath)}`,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
