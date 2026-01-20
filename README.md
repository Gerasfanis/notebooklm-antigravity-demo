# NotebookLM + AI Studio + Antigravity — demo project

This repo is a small **Summarizer & Action Items** app used as a course assignment:
- NotebookLM: sources → Q&A → summaries → **Slide Deck**
- Google AI Studio: generate/export the initial app to GitHub
- Google Antigravity: continue development (feature/refactor) + commit, keeping secrets safe

## What the app does
Paste text → get:
1) short summary (2–4 sentences)
2) 3–6 action items
3) 5–8 keywords

Backend uses Gemini via API **only on the server**. The UI never sees your API key.

## Run locally

### 1) Server

```bash
cd server
cp .env.example .env
# put your key into .env as GEMINI_API_KEY=...
npm install
npm run dev
```

Open: http://localhost:8787

### 2) No API key?
If `GEMINI_API_KEY` is empty, the server returns a deterministic **fallback** output so the app still runs.

## Security
- `.env` is ignored by git
- only `.env.example` is committed
- never put API keys in frontend code

