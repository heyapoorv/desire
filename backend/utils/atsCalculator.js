// const fs = require("fs");
// const PDFDocument = require("pdfkit");

// // Sample ATS keywords (can vary based on job role)
// const keywords = [
//   "JavaScript", "React", "Node.js", "MongoDB", "Express", "REST API", "Git", "Agile"
// ];

// function calculateATSScore(text) {
//   const textLower = text.toLowerCase();
//   let matchedKeywords = [];
//   let missingKeywords = [];

//   keywords.forEach((kw) => {
//     if (textLower.includes(kw.toLowerCase())) {
//       matchedKeywords.push(kw);
//     } else {
//       missingKeywords.push(kw);
//     }
//   });

//   const score = Math.round((matchedKeywords.length / keywords.length) * 100);
//   return { score, matchedKeywords, missingKeywords };
// }

// function generateATSResultPDF(userId, text, score, missingKeywords, outputPath) {
//   const doc = new PDFDocument();
//   doc.pipe(fs.createWriteStream(outputPath));

//   doc.fontSize(20).text(`ATS Report for ${userId}`, { underline: true });
//   doc.moveDown();

//   doc.fontSize(14).text(`ATS Score: ${score}%`, { color: "blue" });
//   doc.moveDown();

//   doc.fontSize(12).text(`Missing Keywords:`, { underline: true });
//   missingKeywords.forEach((kw) => {
//     doc.fillColor("red").text(`- ${kw}`);
//   });

//   doc.moveDown();
//   doc.fillColor("black").fontSize(12).text(`Extracted Resume Text:`, { underline: true });
//   doc.font("Times-Roman").fontSize(10).text(text, {
//     width: 500,
//     align: "left"
//   });

//   doc.end();
// }

// module.exports = {
//   calculateATSScore,
//   generateATSResultPDF
// };


// utils/atsCalculator.js
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Sample ATS keywords (can vary based on job role)
const jobKeywords = [
  "JavaScript", "Node.js", "React", "SQL", "communication", 
  "teamwork", "project management", "Python", "Java", "machine learning",
  "MongoDB", "Express", "REST API", "Git", "Agile"
];

// Function to calculate ATS score
const calculateATSScore = (resumeText) => {
  const resumeTextLower = resumeText.toLowerCase();
  let matchedKeywords = [];

  jobKeywords.forEach((keyword) => {
    if (resumeTextLower.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    }
  });

  const atsScore = Math.round((matchedKeywords.length / jobKeywords.length) * 100);

  return {
    score: atsScore,
    matchedKeywords,
    missingKeywords: jobKeywords.filter((kw) => !matchedKeywords.includes(kw))
  };
};

// Function to generate an ATS result PDF
const generateATSResultPDF = (userId, resumeText, score, missingKeywords, outputPath) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(outputPath));

  // Title and ATS Score
  doc.fontSize(20).text(`ATS Report for ${userId}`, { underline: true }).moveDown();
  doc.fontSize(14).text(`ATS Score: ${score}%`, { color: "blue" }).moveDown();

  // Missing Keywords
  doc.fontSize(12).text(`Missing Keywords:`, { underline: true });
  if (missingKeywords.length > 0) {
    missingKeywords.forEach((kw) => {
      doc.fillColor("red").text(`- ${kw}`);
    });
  } else {
    doc.fillColor("green").text("No missing keywords");
  }
  doc.moveDown();

  // Extracted Resume Text
  doc.fillColor("black").fontSize(12).text(`Extracted Resume Text:`, { underline: true });
  doc.font("Times-Roman").fontSize(10).text(resumeText, {
    width: 500,
    align: "left"
  });

  doc.end();
};

module.exports = {
  calculateATSScore,
  generateATSResultPDF
};
