
---

## Features

- **PDF Upload**: Users can upload PDF files, which are stored locally.
- **Metadata Storage**: Metadata of each uploaded PDF (filename, path, upload date) is stored in an SQLite database.
- **Real-Time Q&A**: Users can ask questions about the PDF content via WebSocket, and the server responds in real time.
- **HTML UI**: A simple front-end interface to upload PDFs and interact with the WebSocket-based Q&A service.

---

## Installation

1. **Clone the Repository**:
    ```bash
    git clone <repository-url>
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Environment Setup**:
    - Create a `.env` file in the root directory and configure the required environment variables, if any.
    - Example:
      ```plaintext
      PORT=3000
      ```

4. **Directory Setup**:
    - Ensure the `uploads` directory exists for storing uploaded PDFs:
      ```bash
      mkdir uploads
      ```

---

## Usage

1. **Start the Server**:
    ```bash
    node app/index.js
    ```

2. **Access the UI**:
    - Open a web browser and navigate to `http://localhost:3000`.
    - Use the UI to upload a PDF file and ask questions about the document content.

---

## Testing

### API Endpoint Tests

The project includes tests for API endpoints, which can be run using **Pytest**.

1. **Install Python Dependencies**:
     ```bash
     pip install -r requirements.txt
     ```

2. **Run Tests**:
   - API endpoint tests:
     ```bash
     pytest app/tests/testApi.py
     ```

   - WebSocket functionality tests:
     ```bash
     pytest app/tests/testWebSocket.py
     ```

---

## Technologies Used

- **Node.js** and **Express** for the backend server.
- **SQLite** for local data storage of document metadata.
- **Socket.IO** for real-time communication.
- **Multer** for handling file uploads.
- **pdf-parse** for extracting text from PDF files.
- **Axios** for making HTTP requests to an NLP API (e.g., OpenAI).
- **HTML/CSS/JavaScript** for the front-end user interface.

---

## Important Notes

- The project uses an external API for NLP question-answering (`nlpService.js`), which is currently set as a placeholder.
- Ensure the Node.js server is running on `http://localhost:3000` to enable successful communication between the front end and backend services.
  
---

## Future Enhancements

- Implement better error handling and validation for file uploads.
- Improve the NLP processing to support more complex questions.
- Add user authentication for secure access.
  
---

This completes the setup and usage documentation. Feel free to reach out if you encounter issues or have questions!
