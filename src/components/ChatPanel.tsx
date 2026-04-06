import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Agent } from "@/lib/agents";
import { Message, sendMessage } from "@/lib/anthropic";
import ReactMarkdown from "react-markdown";
import { useIsMobile } from "@/hooks/use-mobile";

export function ChatPanel({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    }
  }, [input]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await sendMessage(next, agent.systemPrompt);
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setMessages([
        ...next,
        { role: "assistant", content: `⚠️ Erro: ${e.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const accentVar = `var(--${agent.color})`;

  return (
    <div className={`flex flex-col h-full ${isMobile ? "pb-[72px]" : ""}`}>
      {/* Colored header banner */}
      <div
        className="px-6 py-6 sm:px-8 sm:py-8"
        style={{ background: `linear-gradient(135deg, hsl(${accentVar}), hsl(${accentVar} / 0.8))` }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-white/80" />
            <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">
              {agent.badge}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">{agent.name}</h2>
          <p className="text-white/70 text-sm mt-1">{agent.description}</p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-8 py-4">
        <div className="max-w-3xl mx-auto space-y-3">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center opacity-20"
                style={{ backgroundColor: `hsl(${accentVar})` }}
              >
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm">Escolha um tema ou digite sua pergunta</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-[hsl(var(--chat-user))] ml-8 sm:ml-16"
                  : "bg-card mr-4 border border-border shadow-sm"
              }`}
            >
              <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="bg-card border border-border rounded-xl px-4 py-3 mr-4 flex items-center gap-2 text-muted-foreground text-sm shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Agente pensando...
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Chips */}
      {messages.length === 0 && (
        <div className="px-4 sm:px-8">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2 pb-3">
            {agent.chips.map((chip) => (
              <button
                key={chip}
                onClick={() => send(chip)}
                className="text-xs font-medium px-3 py-1.5 rounded-full transition-all hover:opacity-80 text-white"
                style={{ backgroundColor: `hsl(${accentVar})` }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 sm:px-8 pb-4 pt-2 border-t border-border bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="max-w-3xl mx-auto flex gap-2 items-end"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder="Digite sua pergunta..."
            rows={1}
            className="flex-1 bg-card text-foreground border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0 text-white"
            style={{ backgroundColor: `hsl(${accentVar})` }}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
