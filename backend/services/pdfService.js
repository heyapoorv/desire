const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");
const fs = require("fs");

exports.generateResumePDF = async (resumeData, outputPath) => {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const { width, height } = page.getSize();

  const drawText = (text, y, size = 12) => {
    page.drawText(text, {
      x: 50,
      y: height - y,
      size,
      font,
      color: rgb(0, 0, 0.5),
    });
  };

  let yPos = 50;
  drawText(`Name: ${resumeData.name || "N/A"}`, yPos);
  drawText(`Email: ${resumeData.contact || "N/A"}`, (yPos += 20));
  drawText(`Summary: ${resumeData.summary || "N/A"}`, (yPos += 20));

  drawText("Skills:", (yPos += 30), 14);
  (resumeData.skills || []).forEach((s) => drawText(`- ${s}`, (yPos += 20)));

  drawText("Education:", (yPos += 30), 14);
  (resumeData.education || []).forEach((e) => drawText(`- ${e}`, (yPos += 20)));

  drawText("Experience:", (yPos += 30), 14);
  (resumeData.experience || []).forEach((ex) => drawText(`- ${ex}`, (yPos += 20)));

  drawText("Projects:", (yPos += 30), 14);
  (resumeData.projects || []).forEach((p) => drawText(`- ${p}`, (yPos += 20)));

  const pdfBytes = await doc.save();
  fs.writeFileSync(outputPath, pdfBytes);
};
