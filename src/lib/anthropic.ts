export interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * ⚠️ MVP TEMPORÁRIO — chave hardcoded para testes locais.
 * NÃO faça deploy público com esta chave preenchida: o bundle do Vite
 * expõe o valor para qualquer visitante. Substitua pela Edge Function
 * `anthropic-chat` assim que possível.
 */
const API_KEY = "COLOQUE_A_CHAVE_AQUI";

const USER_FACING_ERROR =
  "Não consegui responder agora. Tente novamente em alguns segundos.";

export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
): Promise<string> {
  if (!API_KEY || API_KEY === "COLOQUE_A_CHAVE_AQUI") {
    console.warn("[chat] API key não configurada em src/lib/anthropic.ts");
    throw new Error(USER_FACING_ERROR);
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
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
      try {
        const err = await res.text();
        console.error("[chat] provider error", res.status, err);
      } catch {
        /* ignore */
      }
      throw new Error(USER_FACING_ERROR);
    }

    const data = await res.json();
    return data?.content?.[0]?.text ?? USER_FACING_ERROR;
  } catch (e) {
    console.error("[chat] request failed", e);
    throw new Error(USER_FACING_ERROR);
  }
}
