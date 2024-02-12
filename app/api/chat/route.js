export async function POST(req) {

  const body = await req.json();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: body.message
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("response", responseData);

    return new Response(JSON.stringify(responseData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Erro ao comunicar com a API da OpenAI:", error);
    return new Response(JSON.stringify({ error: "Erro ao comunicar com a API da OpenAI" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
