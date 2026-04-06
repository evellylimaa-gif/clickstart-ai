import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { Bot, Briefcase, TrendingUp, Wand2, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  "wand-2": Wand2,
};

const Index = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const agent = agents[activeIdx];

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-64 bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] flex flex-col shrink-0 min-h-screen">
          <div className="px-5 py-6 flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-[hsl(var(--agent-purple))]" />
            <span className="text-lg font-bold tracking-tight">Evelly AI Hub</span>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {agents.map((a, i) => {
              const Icon = iconMap[a.icon] || Bot;
              const isActive = activeIdx === i;
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelect(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                    isActive
                      ? "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))]"
                      : "text-[hsl(var(--sidebar-foreground)/0.6)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground))]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}
                    style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </span>
                  <span className="truncate">{a.badge}</span>
                </button>
              );
            })}
          </nav>
          <div className="px-5 py-4 text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
            Agentes de Monetização
          </div>
        </aside>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-foreground))] px-4 py-3 flex items-center gap-3">
          <Bot className="w-6 h-6 text-[hsl(var(--agent-purple))]" />
          <span className="text-base font-bold flex-1">Evelly AI Hub</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Mobile slide-down menu */}
      {isMobile && sidebarOpen && (
        <div className="fixed top-[52px] left-0 right-0 z-30 bg-[hsl(var(--sidebar-bg))] border-b border-[hsl(var(--sidebar-muted))] px-3 py-2 space-y-1">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground)/0.6)] hover:text-[hsl(var(--sidebar-foreground))]"
                }`}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <span>{a.badge}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 flex flex-col min-h-screen ${isMobile ? "pt-[52px]" : ""}`}>
        <ChatPanel key={agent.id} agent={agent} />
      </main>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? "" : "opacity-50"
                  }`}
                  style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </span>
                <span className="truncate max-w-[80px]">{a.badge.split(" ").slice(0, 2).join(" ")}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Index;
