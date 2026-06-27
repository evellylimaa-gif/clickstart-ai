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
 *   - Move this call to a Supabase Edge Function.
 *   - Store the Anthropic key as a server-side secret only (never VITE_*).
 *   - Subscribers must never see API keys, models, providers, or config UI.
 *
 * Today, for local/admin development only, the call reads:
 *   1. VITE_ANTHROPIC_API_KEY (preferred, dev env)
 *   2. localStorage `anthropic_api_key` (legacy fallback)
 * If neither is present, fail SILENTLY with a generic friendly error.
 */
export async function sendMessage(
  messages: Message[],
  systemPrompt: string
): Promise<string> {
  const apiKey =
    (import.meta as any).env?.VITE_ANTHROPIC_API_KEY ||
    (typeof localStorage !== "undefined" && localStorage.getItem("anthropic_api_key"));


  if (!apiKey) {
    // Do NOT instruct users to configure anything. Silent fail with generic copy.
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
        model: "claude-sonnet-4-5-20250929",
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
