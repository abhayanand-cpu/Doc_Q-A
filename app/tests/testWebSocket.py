import pytest
import websockets
import asyncio
import json

WS_URL = "ws://localhost:3000"

@pytest.mark.asyncio
async def test_websocket_question_answer():
    async with websockets.connect(f"{WS_URL}/ws") as websocket:
        question_payload = json.dumps({"docId": 1, "question": "What is this document about?"})
        await websocket.send(question_payload)
        
        response = await websocket.recv()
        response_json = json.loads(response)
        assert "answer" in response_json or "error" in response_json
