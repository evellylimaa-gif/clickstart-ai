import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { Bot } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border px-6 py-4 flex items-center gap-3">
        <Bot className="w-7 h-7 text-primary" />
        <h1 className="text-xl font-bold tracking-tight">
          Evelly AI Hub{" "}
          <span className="text-muted-foreground font-normal text-base">
            — Agentes de Monetização
          </span>
        </h1>
      </header>

      {/* Tabs */}
      <div className="border-b border-border px-6 flex gap-1">
        {agents.map((agent, i) => (
          <button
            key={agent.id}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === i
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {agent.badge}
          </button>
        ))}
        {/* Placeholder tabs */}
        <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground/40 border-b-2 border-transparent cursor-not-allowed">
          Tab 2 (em breve)
        </button>
        <button className="px-4 py-2.5 text-sm font-medium text-muted-foreground/40 border-b-2 border-transparent cursor-not-allowed">
          Tab 3 (em breve)
        </button>
      </div>

      {/* Content */}
      <main className="p-6">
        <ChatPanel agent={agents[activeTab]} />
      </main>
    </div>
  );
};

export default Index;
