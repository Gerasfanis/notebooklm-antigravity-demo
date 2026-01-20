import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";

// Serve the UI so the project is 1-command runnable.
const webDir = path.resolve(__dirname, "../web");
app.use("/", express.static(webDir));

function naiveFallback(text) {
  // Simple deterministic fallback so the app still works without a key.
  const cleaned = (text || "").replace(/\s+/g, " ").trim();
  const first = cleaned.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ");
  const words = cleaned.toLowerCase().match(/[\p{L}0-9]+/gu) || [];
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const keywords = [...freq.entries()]
    .filter(([w]) => w.length >= 5)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w);

  return {
    summary: first || "(No content)",
    actions: [
      "Review the text and clarify the goal.",
      "Extract 3 key tasks and assign owners.",
      "Decide next steps and deadline."
    ],
    keywords
  };
}

async function geminiSummarize({ text, language = "pl" }) {
  // Uses the Gemini API via REST. If the key is missing, caller should fall back.
  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const system =
    language === "ru"
      ? "Отвечай по-русски."
      : language === "en"
        ? "Answer in English."
        : "Odpowiadaj po polsku.";

  const prompt = `${system}\n\nZadanie: Z tekstu użytkownika wygeneruj: (1) krótkie streszczenie (2–4 zdania), (2) listę działań (3–6 punktów), (3) 5–8 słów kluczowych.\n\nTekst:\n"""\n${text}\n"""\n\nZwróć odpowiedź jako JSON w formacie: {"summary": "...", "actions": ["..."], "keywords": ["..."]}.`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.3, maxOutputTokens: 600 }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${res.status} ${errText}`);
  }

  const data = await res.json();
  const textOut = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Try to parse JSON from the model output.
  const match = textOut.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("Model did not return JSON.");
  return JSON.parse(match[0]);
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(GEMINI_API_KEY) });
});

app.post("/api/summarize", async (req, res) => {
  const { text, language } = req.body || {};
  const input = (text || "").toString().trim();
  if (!input) return res.status(400).json({ error: "Empty text" });

  try {
    if (!GEMINI_API_KEY) {
      return res.json({ ...naiveFallback(input), provider: "fallback" });
    }
    const out = await geminiSummarize({ text: input, language });
    return res.json({ ...out, provider: "gemini" });
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e), provider: "error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open UI: http://localhost:${PORT}`);
});
