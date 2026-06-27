import { supabase } from "@/integrations/supabase/client";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const USER_FACING_ERROR = "Não consegui responder agora. Tente novamente em alguns segundos.";

/**
 * Sends a chat message via the `anthropic-chat` Edge Function.
 * The Anthropic API key lives server-side as a runtime secret —
 * never shipped to the browser.
 */
export async function sendMessage(
  messages: Message[],
  systemPrompt: string,
): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke("anthropic-chat", {
      body: {
        model: "claude-sonnet-4-5",
        system: systemPrompt,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        max_tokens: 2048,
      },
    });

    if (error) {
      console.error("[chat] edge function error", error);
      throw new Error(USER_FACING_ERROR);
    }

    const text = (data as { text?: string } | null)?.text;
    if (!text) throw new Error(USER_FACING_ERROR);
    return text;
  } catch (e) {
    console.error("[chat] request failed", e);
    throw new Error(USER_FACING_ERROR);
  }
}
