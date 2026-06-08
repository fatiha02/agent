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
                  text: `You are an expert tutor. Create 3 multiple-choice questions to test a student's knowledge about the topic: "${topic}".
                  Each question must have exactly 4 options and 1 correct answer.
                  Keep it beginner friendly but educational.
                  Return the response STRICTLY as a JSON array. Do NOT include any markdown formatting like \`\`\`json. Just the raw array.
                  Format:
                  [
                    {
                      "question": "The question text",
                      "options": ["Option A", "Option B", "Option C", "Option D"],
                      "correctAnswerIndex": 0
                    }
                  ]`
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
    
    // Parse the JSON array from Gemini's response
    let rawText = data.candidates[0].content.parts[0].text;
    
    // Clean markdown if the AI includes it despite instructions
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedQuiz = JSON.parse(rawText);

    return NextResponse.json({ questions: parsedQuiz });
  } catch (error) {
    console.error('Quiz Generation Error:', error);
    return NextResponse.json({ error: 'Failed to generate quiz. Please try again.' }, { status: 500 });
  }
}
