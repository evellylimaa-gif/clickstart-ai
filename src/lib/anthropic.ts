export interface Message {
  role: "user" | "assistant";
  content: string;
}

/**
 * Generic, user-facing error message. Never expose API key, provider, or
 * configuration details to subscribers.
 */
const USER_FACING_ERROR = "Não consegui responder agora. Tente novamente em alguns segundos.";

/**
 * Sends a chat message.
 *
 * TODO (backend migration):
 *   - Move this call to a Supabase Edge Function for production security.
 *   - Store the Anthropic key as a server-side secret only.
 *   - Subscribers must never see API keys, models, providers, or config UI.
 *
 * Today, for MVP testing only, the browser call reads VITE_ANTHROPIC_API_KEY.
 * If it is not present in the app environment, fail with generic friendly copy.
 */
export async function sendMessage(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const apiKey = String((import.meta as any).env?.VITE_ANTHROPIC_API_KEY || "").trim();

  if (!apiKey) {
    // eslint-disable-next-line no-console
    console.warn("Missing VITE_ANTHROPIC_API_KEY environment variable.");
    throw new Error(USER_FACING_ERROR);
  }

  try {
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
      // Log details for developers (visible in console), but throw friendly copy.
      try {
        const err = await res.text();
        // eslint-disable-next-line no-console
        console.error("[chat] provider error", res.status, err);
      } catch { /* ignore */ }
      throw new Error(USER_FACING_ERROR);
    }

    const data = await res.json();
    return data?.content?.[0]?.text ?? USER_FACING_ERROR;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[chat] request failed", e);
    throw new Error(USER_FACING_ERROR);
  }
}
