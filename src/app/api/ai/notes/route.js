import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic) {
        return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Summarize the topic "${topic}" for a beginner.

Provide exactly in this JSON format without markdown code blocks:
{
  "summary": "Short explanation",
  "keyPoints": ["Point 1", "Point 2", "Point 3", "Point 4", "Point 5"],
  "example": "1 simple example"
}`
                }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Parse the JSON object from Gemini's response
    let rawText = data.candidates[0].content.parts[0].text;
    
    // Clean markdown if the AI includes it despite instructions
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedNotes = JSON.parse(rawText);

    return NextResponse.json({ notes: parsedNotes });
  } catch (error) {
    console.error('Notes Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate notes. Please try again.' }, { status: 500 });
  }
}
