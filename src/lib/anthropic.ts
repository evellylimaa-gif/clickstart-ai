export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function sendMessage(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const apiKey = localStorage.getItem("anthropic_api_key") || import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("API key não configurada. Vá em Configurações para adicionar sua chave.");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error: ${res.status} — ${err}`);
  }

  const data = await res.json();
  return data.content[0].text;
}
