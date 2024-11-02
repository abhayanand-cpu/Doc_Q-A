import pytest
import requests

BASE_URL = "http://localhost:3000"
PDF_FILE_PATH = "sample.pdf"

@pytest.fixture(scope="module")
def pdf_file():
    with open(PDF_FILE_PATH, "rb") as f:
        yield f

def test_pdf_upload(pdf_file):
    url = f"{BASE_URL}/upload"
    files = {"pdf": ("sample.pdf", pdf_file, "application/pdf")}
    response = requests.post(url, files=files)
    assert response.status_code == 200
    assert "docId" in response.json()
