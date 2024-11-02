const fs = require('fs');
const pdfParse = require('pdf-parse');
const { insertDocument } = require('../models/documentModel');

const uploadPDF = async (file) => {
  const filePath = `uploads/${Date.now()}-${file.originalname}`;
  fs.writeFileSync(filePath, file.buffer);
  return filePath;
};

const extractTextFromPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
};

const saveDocumentMetadata = async (filename, path) => {
  return await insertDocument(filename, path);
};

module.exports = { uploadPDF, extractTextFromPDF, saveDocumentMetadata };
