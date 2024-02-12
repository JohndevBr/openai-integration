"use client"
import React, { useState } from 'react';

export default function Home() {
  const [responseText, setResponseText] = useState('');

  async function callOpenAiApi() {
    const userInput = { message: "Bom dia, OpenAI" };
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput)
    });

    if (!response.ok) {
      console.error("Erro ao chamar a API");
      return;
    }

    console.log("resposta res", response)

    const data = await response.json();
    console.log("Resposta da OpenAI:", data.choices[0].message.content);
    setResponseText(data.choices[0].message.content);
  }

  return (
    <div>
      <button onClick={callOpenAiApi}>Olá, OpenAI</button>
      <div>Resposta da OpenAI: {responseText}</div>
    </div>
  );
}
