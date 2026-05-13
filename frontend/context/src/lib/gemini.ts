import { GoogleGenerativeAI } from "@google/generative-ai";
import type { MenuItem, TastingNote } from "@/types/menu";

// ─────────────────────────────────────────────────────────────
// Gemini 1.5 Flash — sommelier-style tasting notes.
// SECURITY NOTE: For production, proxy this through a Cloud
// Function so the API key never lives in the client bundle.
// The current setup is fine for local dev / private demos.
// ─────────────────────────────────────────────────────────────

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

function client() {
  if (!apiKey) return null;
  return new GoogleGenerativeAI(apiKey);
}

const SYSTEM_PROMPT = `You are the sommelier and head chef of THE GOLDEN OAK,
a Michelin-aspiring restaurant. Voice: editorial, confident, sensual but precise.
You write 2-line tasting notes. No emoji. No clichés ("burst of flavor",
"taste sensation"). No marketing fluff. Pretend you write for the New York Times
food section.

Return STRICT JSON, no markdown fences:
{
  "description": "Two short evocative sentences. Max 220 characters total.",
  "pairing": "One short pairing — a wine, spirit, or side. Max 60 characters.",
  "highlights": ["3 to 4 short macro / texture / ingredient highlights, 2-3 words each"]
}`;

export async function generateTastingNote(
  item: MenuItem,
): Promise<TastingNote> {
  const c = client();
  if (!c) {
    // Graceful fallback so the UI never breaks.
    return {
      description: item.description,
      pairing: undefined,
      highlights: item.ingredients.slice(0, 4),
    };
  }

  const model = c.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: {
      temperature: 0.85,
      responseMimeType: "application/json",
    },
  });

  const userPrompt = `Dish: ${item.name}
Price: $${item.price.toFixed(2)}
Calories: ${item.calories}
Ingredients: ${item.ingredients.join(", ")}
Existing description: ${item.description}

Write the tasting note now.`;

  try {
    const res = await model.generateContent(userPrompt);
    const text = res.response.text();
    const parsed = JSON.parse(text) as TastingNote;
    return parsed;
  } catch (err) {
    console.warn("[gemini] falling back:", err);
    return {
      description: item.description,
      highlights: item.ingredients.slice(0, 4),
    };
  }
}

export function isGeminiConfigured(): boolean {
  return Boolean(apiKey);
}
