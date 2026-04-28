import { getCollection } from "../db.js";
import { Groq } from "groq-sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env"), override: true });

console.log('GROQ_API_KEY Loaded:', process.env.GROQ_API_KEY ? `Yes (${process.env.GROQ_API_KEY.substring(0, 10)}...)` : 'No');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `
You are a MongoDB Query Expert for a Merchant Navy Dashboard. 
Given a natural language prompt, you must translate it into a MongoDB query.

DATABASE SCHEMA:
- collection: 'ship' { ship_id (number), ship_name (string), ship_type (string), capacity (number), built_year (number) }
- collection: 'crew' { crew_id (number), crew_name (string), rank (string), joining_date (string), ship_id (number) }
- collection: 'port' { port_id (number), port_name (string), country (string) }
- collection: 'voyage' { voyage_id (number), voyage_name (string), ship_id (number), departure_port (string), arrival_port (string), departure_date (string), arrival_date (string), status (string: 'Active'|'Completed'|'Delayed') }
- collection: 'cargo' { cargo_id (number), cargo_type (string), weight (number), voyage_id (number) }

GUIDELINES:
1. Return a JSON object with:
   - "collection": (string) one of the 5 collection names.
   - "query": (object) a valid MongoDB query filter.
   - "explanation": (string) what you understood.
2. Use $regex with 'i' for string partial matches (e.g., { port_name: { $regex: "dubai", $options: "i" } }).
3. Use numerical comparisons ($gt, $lt) for numbers like capacity or weight.
4. Return ONLY the raw JSON object. No markdown backticks, no preamble.

EXAMPLE:
User: "ships with capacity more than 5000"
Response: { "collection": "ship", "query": { "capacity": { "$gt": 5000 } }, "explanation": "Filtering ships where capacity is greater than 5000." }
`;

export const processNaturalLanguageQuery = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_key_here") {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured in .env file." });
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
    });

    const responseText = completion.choices[0]?.message?.content;
    const result = JSON.parse(responseText);

    const collection = getCollection(result.collection);
    const results = await collection.find(result.query).limit(50).toArray();

    res.json({
      interpretation: {
        collection: result.collection,
        filter: result.query,
        explanation: result.explanation
      },
      results,
      count: results.length,
      message: results.length > 0 ? `AI found ${results.length} results.` : "AI found no matching records."
    });

  } catch (err) {
    console.error("Groq AI Error:", err);
    res.status(500).json({ 
      error: "Failed to process AI query with Groq.",
      details: err.message 
    });
  }
};
