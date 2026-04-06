import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles, MessageSquare, ArrowRight } from "lucide-react";
import { Agent } from "@/lib/agents";
import { Message, sendMessage } from "@/lib/anthropic";
import ReactMarkdown from "react-markdown";
import { useIsMobile } from "@/hooks/use-mobile";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 mr-8 shadow-sm">
      <div className="flex gap-1">
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-primary/60" />
      </div>
      <span className="text-sm text-muted-foreground">Agente pensando...</span>
    </div>
  );
}

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

  return (
    <div className={`flex flex-col flex-1 ${isMobile ? "pb-[72px]" : ""}`}>
      {/* Agent description card + chips */}
      {messages.length === 0 && (
        <div className="px-4 sm:px-8 pt-6">
          <div className="max-w-4xl mx-auto">
            {/* Description card */}
            <div className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{agent.description}</p>
                </div>
              </div>
            </div>

            {/* Quick chips */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Perguntas rápidas
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {agent.chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => send(chip)}
                    className="flex items-center gap-2.5 text-left text-sm px-4 py-3 rounded-xl border border-primary/15 bg-card hover:bg-accent hover:border-primary/30 transition-all group shadow-sm"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-foreground">{chip}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`animate-fade-in ${m.role === "user" ? "flex justify-end" : "flex justify-start"}`}
            >
              <div
                className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed max-w-[85%] ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border shadow-sm text-foreground"
                }`}
              >
                {m.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-border">
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {agent.badge}
                    </span>
                  </div>
                )}
                <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {loading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="px-4 sm:px-8 pb-4 pt-3 border-t border-border bg-background/80 backdrop-blur-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex gap-2 items-end bg-card border border-border rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-shadow">
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
              className="flex-1 bg-transparent text-foreground px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl px-4 py-2.5 bg-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-30 shrink-0 shadow-sm"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Powered by Claude API • Respostas podem conter imprecisões
          </p>
        </form>
      </div>
    </div>
  );
}
