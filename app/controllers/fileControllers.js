const { uploadPDF, saveDocumentMetadata } = require('../services/fileService');
const { processPDF } = require('../services/nlpService');

const handlePDFUpload = async (req, res) => {
  try {
    const filePath = await uploadPDF(req.file);
    const docId = await saveDocumentMetadata(req.file.originalname, filePath);

    // Send the PDF for NLP processing
    await processPDF(filePath);
    res.status(200).json({ message: 'File uploaded and processed successfully', docId });
  } catch (error) {
    console.error('Error in file upload:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

module.exports = { handlePDFUpload };
