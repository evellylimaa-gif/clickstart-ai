import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import { Agent } from "@/lib/agents";
import { Message, sendMessage } from "@/lib/anthropic";
import ReactMarkdown from "react-markdown";

export function ChatPanel({ agent }: { agent: Agent }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${agent.badgeColor}`}>
          {agent.badge}
        </span>
        <h2 className="text-lg font-bold mt-2 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          {agent.name}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-3 pr-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
            <Sparkles className="w-10 h-10 text-primary/40" />
            <p className="text-sm">Escolha um tema ou digite sua pergunta</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-[hsl(var(--chat-user))] ml-12"
                : "bg-[hsl(var(--chat-ai))] mr-4"
            }`}
          >
            <div className="prose prose-sm prose-invert max-w-none">
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="bg-[hsl(var(--chat-ai))] rounded-xl px-4 py-3 mr-4 flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Pensando...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Chips */}
      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2 my-3">
          {agent.chips.map((chip) => (
            <button
              key={chip}
              onClick={() => send(chip)}
              className="bg-[hsl(var(--chip))] text-[hsl(var(--chip-foreground))] text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
            >
              {chip}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2 mt-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua pergunta..."
          className="flex-1 bg-secondary text-foreground rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="bg-primary text-primary-foreground rounded-xl px-4 py-3 hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
