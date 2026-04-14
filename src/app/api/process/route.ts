import { NextRequest, NextResponse } from "next/server";
import PDFParser from "pdf2json";

/**
 * A robust PDF text extraction helper using pdf2json.
 */
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser(null, 1); // 1 for text only

    pdfParser.on("pdfParser_dataError", (errData: any) => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", () => {
      const rawText = pdfParser.getRawTextContent();
      resolve(rawText);
    });

    pdfParser.parseBuffer(buffer);
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 1. Extract text from PDF using pdf2json
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fullText = await extractTextFromPDF(buffer);

    if (!fullText || fullText.trim().length === 0) {
      return NextResponse.json({ error: "Could not extract text from this PDF format." }, { status: 422 });
    }

    // 2. Call OpenRouter
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const MODEL = process.env.OPENROUTER_MODEL || "mistralai/mistral-small-3-24b-instruct";

    const prompt = `
      You are "The Curator", an elite document analysis AI.
      Analyze the following document text and provide a structured JSON response.
      
      Document Text:
      ${fullText.substring(0, 30000)}
      
      Requirements:
      1. Provide a concise "summary" (max 3 sentences).
      2. Extract 4-6 "keyInsights" as an array of strings.
      3. Extract "metadata" including "filingDate", "leadAnalyst", "totalLiabilities", and a "confidenceScore" (0-100).
      4. Return ONLY valid JSON.
      
      JSON Structure:
      {
        "title": "A descriptive title",
        "summary": "...",
        "insights": ["...", "..."],
        "metadata": {
          "filingDate": "...",
          "leadAnalyst": "...",
          "totalLiabilities": "...",
          "confidenceScore": 95
        }
      }
    `;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "OpenRouter API error");
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;
    
    // Clean JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    const jsonString = jsonMatch ? jsonMatch[0] : responseText;
    const summaryResult = JSON.parse(jsonString);

    return NextResponse.json(summaryResult);
  } catch (error: any) {
    console.error("Processing error:", error);
    return NextResponse.json({ error: error.message || "Failed to process document" }, { status: 500 });
  }
}
