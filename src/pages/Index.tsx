import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import {
  Bot, Briefcase, TrendingUp, Wand2, Menu, X,
  Sun, Moon, Zap, Shield, Users,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  "wand-2": Wand2,
};

const Index = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { dark, toggle: toggleTheme } = useTheme();
  const agent = agents[activeIdx];

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setSidebarOpen(false);
  };

  const stats = [
    { icon: Users, label: "3 Agents", sub: "Available" },
    { icon: Zap, label: "API", sub: "Connected" },
    { icon: Shield, label: "Premium", sub: "Active" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-[260px] bg-[hsl(var(--sidebar-bg))] flex flex-col shrink-0 min-h-screen border-r border-[hsl(var(--sidebar-border))]">
          {/* Logo */}
          <div className="px-5 py-5 flex items-center gap-3 border-b border-[hsl(var(--sidebar-border))]">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] tracking-tight">Evelly AI Hub</span>
              <p className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.4)] leading-none mt-0.5">Agentes de Monetização</p>
            </div>
          </div>

          {/* Nav label */}
          <div className="px-5 pt-5 pb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.35)]">
              Agentes
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 space-y-1">
            {agents.map((a, i) => {
              const Icon = iconMap[a.icon] || Bot;
              const isActive = activeIdx === i;
              return (
                <button
                  key={a.id}
                  onClick={() => handleSelect(i)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left group ${
                    isActive
                      ? "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))] shadow-sm"
                      : "text-[hsl(var(--sidebar-foreground)/0.55)] hover:bg-[hsl(var(--sidebar-muted)/0.4)] hover:text-[hsl(var(--sidebar-foreground)/0.85)]"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105`}
                    style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                  >
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate">{a.badge}</span>
                    {isActive && (
                      <span className="block text-[10px] text-[hsl(var(--sidebar-foreground)/0.4)] truncate mt-0.5">
                        {a.name.slice(0, 30)}…
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: `hsl(var(--${a.color}))` }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom: theme toggle + profile */}
          <div className="border-t border-[hsl(var(--sidebar-border))] px-3 py-3 space-y-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-[hsl(var(--sidebar-foreground)/0.55)] hover:bg-[hsl(var(--sidebar-muted)/0.4)] hover:text-[hsl(var(--sidebar-foreground)/0.85)] transition-all"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span>{dark ? "Modo Claro" : "Modo Escuro"}</span>
            </button>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">E</span>
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-[hsl(var(--sidebar-foreground))] truncate">Evelly User</p>
                <p className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.4)]">Premium Plan</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[hsl(var(--sidebar-bg))] px-4 py-3 flex items-center gap-3 border-b border-[hsl(var(--sidebar-border))]">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-[hsl(var(--sidebar-foreground))] flex-1">Evelly AI Hub</span>
          <button onClick={toggleTheme} className="p-1.5 text-[hsl(var(--sidebar-foreground)/0.6)]">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 text-[hsl(var(--sidebar-foreground))]">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Mobile slide-down menu */}
      {isMobile && sidebarOpen && (
        <div className="fixed top-[52px] left-0 right-0 z-30 bg-[hsl(var(--sidebar-bg))] border-b border-[hsl(var(--sidebar-border))] px-3 py-2 space-y-1 animate-fade-in">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? "bg-[hsl(var(--sidebar-muted))] text-[hsl(var(--sidebar-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground)/0.55)] hover:text-[hsl(var(--sidebar-foreground))]"
                }`}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </span>
                <span>{a.badge}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 flex flex-col min-h-screen ${isMobile ? "pt-[52px]" : ""}`}>
        {/* Top bar with stats */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-lg font-bold text-foreground">{agent.name}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{agent.badge}</p>
            </div>
            <div className="flex items-center gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-xs">
                  <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  <div>
                    <span className="font-semibold text-foreground">{s.label}</span>
                    <span className="text-muted-foreground ml-1 hidden sm:inline">{s.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ChatPanel key={agent.id} agent={agent} />
      </main>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex backdrop-blur-lg">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform ${
                    isActive ? "scale-110 shadow-md" : "opacity-50"
                  }`}
                  style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
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
