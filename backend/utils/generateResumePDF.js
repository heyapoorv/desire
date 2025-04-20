const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateResumePDF(data, filename, includeATS = false) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, "../uploads", `${filename}-formatted.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(outputPath);

    doc.pipe(stream);

    // Title/Header
    doc.fontSize(24).fillColor("#003366").text(data.name || "Resume", { align: "center" }).moveDown();

    // Contact Info
    if (data.phone || data.email || data.linkedin || data.website || data.address) {
      doc.fontSize(10).fillColor("black");
      if (data.phone) doc.text(`Phone: ${data.phone}`);
      if (data.email) doc.text(`Email: ${data.email}`);
      if (data.linkedin) doc.text(`LinkedIn: ${data.linkedin}`);
      if (data.website) doc.text(`Website: ${data.website}`);
      if (data.address) doc.text(`Address: ${data.address}`);
      doc.moveDown();
    }

    // Section generator helper
    const addSection = (title, content, fontSize = 11) => {
      if (!content) return;
      doc.fontSize(14).fillColor("#003366").text(title, { underline: true });
      doc.fontSize(fontSize).fillColor("black").text(content).moveDown();
    };

    // Objective, Skills, Education
    addSection("Objective", data.objective);
    addSection("Skills", data.skills);
    addSection("Education", data.education);

    // Experience (array)
    if (data.experience?.length) {
      doc.fontSize(14).fillColor("#003366").text("Experience", { underline: true });
      data.experience.forEach((exp) => {
        doc.fontSize(12).fillColor("black").text(`${exp.title} at ${exp.company}`);
        doc.fontSize(10).fillColor("gray").text(`${exp.duration}`);
        doc.fontSize(11).fillColor("black").text(exp.details);
        doc.moveDown();
      });
    }

    // ATS Score Section
    if (includeATS && typeof data.atsScore === "number") {
      doc.addPage();
      doc.fontSize(18).fillColor("#003366").text("ATS Evaluation", { align: "center" }).moveDown();
      doc.fontSize(14).fillColor("black").text(`ATS Score: ${data.atsScore}%`).moveDown();

      if (data.missingKeywords?.length > 0) {
        doc.fontSize(12).fillColor("red").text("Missing Keywords:", { underline: true });
        data.missingKeywords.forEach((word) => doc.text(`- ${word}`));
      }
    }

    doc.end();

    stream.on("finish", () => resolve(outputPath));
    stream.on("error", reject);
  });
}

module.exports = generateResumePDF;
