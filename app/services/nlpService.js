const axios = require('axios');

const processPDF = async (filePath) => {
  try {
    const response = await axios.post("http://localhost:5001/process-pdf/", { path: filePath });
    return response.data.doc_id;
  } catch (error) {
    console.error("Error processing PDF:", error.message);
    throw error;
  }
};

const askQuestion = async (docId, question) => {
  try {
    const response = await axios.post("http://localhost:5001/ask-question/", { doc_id: docId, question });
    return response.data.answer;
  } catch (error) {
    console.error("Error asking question:", error.message);
    throw error;
  }
};

module.exports = { processPDF, askQuestion };
