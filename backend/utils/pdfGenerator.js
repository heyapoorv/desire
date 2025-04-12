const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateResumePDF = (data) => {
  const doc = new PDFDocument();
  const filename = `resume-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, "../public/resumes/", filename);
  const stream = fs.createWriteStream(filePath);

  doc.pipe(stream);

  doc.fontSize(22).text(data.name, { underline: true });
  doc.moveDown();
  doc.fontSize(14).text(`Email: ${data.email}`);
  doc.text(`Phone: ${data.phone}`);
  doc.moveDown();

  doc.fontSize(16).text("Education:", { underline: true });
  data.education?.forEach((edu) =>
    doc.text(`- ${edu.degree}, ${edu.institute} (${edu.year})`)
  );
  doc.moveDown();

  doc.fontSize(16).text("Skills:", { underline: true });
  doc.text(data.skills?.join(", "));
  doc.moveDown();

  doc.fontSize(16).text("Projects:", { underline: true });
  data.projects?.forEach((p) => doc.text(`- ${p.title}: ${p.description}`));
  doc.moveDown();

  doc.fontSize(16).text("Experience:", { underline: true });
  data.experience?.forEach((exp) =>
    doc.text(`- ${exp.role} at ${exp.company} (${exp.duration})`)
  );

  doc.end();

  return new Promise((resolve) => {
    stream.on("finish", () => resolve(filePath));
  });
};

module.exports = { generateResumePDF };
