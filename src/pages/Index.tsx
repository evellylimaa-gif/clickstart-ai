import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { Bot } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border px-4 sm:px-6 py-4 flex items-center gap-3">
        <Bot className="w-7 h-7 text-primary shrink-0" />
        <h1 className="text-lg sm:text-xl font-bold tracking-tight">
          Evelly AI Hub
          <span className="text-muted-foreground font-normal text-sm sm:text-base ml-1">
            — Agentes de Monetização
          </span>
        </h1>
      </header>

      {/* Tabs */}
      <div className="border-b border-border px-4 sm:px-6 flex gap-1 overflow-x-auto">
        {agents.map((agent, i) => (
          <button
            key={agent.id}
            onClick={() => setActiveTab(i)}
            className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-colors border-b-2 -mb-px whitespace-nowrap ${
              activeTab === i
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {agent.badge}
          </button>
        ))}
      </div>

      {/* Content */}
      <main className="p-4 sm:p-6">
        <ChatPanel key={agents[activeTab].id} agent={agents[activeTab]} />
      </main>
    </div>
  );
};

export default Index;
