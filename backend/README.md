# Backend

This folder contains a minimal FastAPI setup for the document chatbot project.

## Run locally

1. Create a virtual environment:

```bash
python -m venv .venv
```

2. Activate it:

- Windows (PowerShell): `.
venv\Scripts\Activate.ps1`
- Windows (cmd): `.\venv\Scripts\activate.bat`
- macOS / Linux: `source .venv/bin/activate`

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Start the server:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

## Endpoints

- `GET /` - basic health check
- `GET /health` - health status
