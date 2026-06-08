export async function askTutor(question, contextTopic = "") {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

    const prompt = `You are an expert AI Learning Assistant. 
${contextTopic ? `The student is currently watching a video lesson titled: "${contextTopic}".` : ''} 

Please answer the student's question clearly and in simple terms. Limit the response to a short explanation and 1 simple example.

Student Question: "${question}"`;

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
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    if (!response.ok) throw new Error("Failed to connect to AI");
    
    const data = await response.json();
    
    let answer = "";
    try {
        answer = data.candidates[0].content.parts[0].text;
    } catch(e) {
        answer = "I'm sorry, I could not process that request currently.";
    }
    
    return answer;
}
