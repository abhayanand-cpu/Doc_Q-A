const { askQuestion } = require('../services/nlpService');

const handleWebSocketConnection = (socket) => {
  let docId = null;

  socket.on('setDocId', (id) => {
    docId = id;
  });

  socket.on('question', async (question) => {
    if (!docId) {
      socket.emit('error', { message: 'Document ID not set for this session.' });
      return;
    }

    try {
      const answer = await askQuestion(docId, question);
      socket.emit('answer', { answer });
    } catch (error) {
      socket.emit('error', { message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
};

module.exports = { handleWebSocketConnection };
