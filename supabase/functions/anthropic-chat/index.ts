const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  model?: string;
  system?: string;
  messages: ChatMessage[];
  max_tokens?: number;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("ANTHROPIC_API_KEY");
    if (!apiKey) {
      console.error("[anthropic-chat] ANTHROPIC_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Server not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = (await req.json()) as RequestBody;
    const { model = "claude-sonnet-4-5", system, messages, max_tokens = 2048 } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "messages is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens,
        system,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("[anthropic-chat] upstream error", upstream.status, errText);
      return new Response(
        JSON.stringify({ error: "Provider error" }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await upstream.json();
    const text = data?.content?.[0]?.text ?? "";

    return new Response(
      JSON.stringify({ text, raw: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("[anthropic-chat] failed", e);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
