from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import fitz  # PyMuPDF for PDF processing
from langchain import OpenAI, TextSplitter, DocumentRetriever
from llama_index import Index

app = FastAPI()
document_index = {}  # Stores document text by doc_id

class QuestionRequest(BaseModel):
    doc_id: int
    question: str

@app.post("/process-pdf/")
async def process_pdf(request: Request):
    file_path = (await request.json()).get("path")
    doc_id = len(document_index) + 1

    # Extract text from PDF
    pdf_content = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            pdf_content += page.get_text()
    document_index[doc_id] = pdf_content

    return {"message": "PDF processed", "doc_id": doc_id}

@app.post("/ask-question/")
async def ask_question(question_request: QuestionRequest):
    doc_id = question_request.doc_id
    question = question_request.question

    # Retrieve document content
    content = document_index.get(doc_id)
    if not content:
        raise HTTPException(status_code=404, detail="Document not found")

    # Process the question using LangChain and LlamaIndex
    doc_retriever = DocumentRetriever(TextSplitter(), OpenAI())
    index = Index([content])  # Index the document content
    answer = doc_retriever.retrieve_answer(index, question)

    return {"answer": answer}
