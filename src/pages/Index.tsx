import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import {
  Bot, Briefcase, TrendingUp, Wand2, Menu, X,
  Sun, Moon, Zap, Shield, Users, Crown,
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
    { icon: Crown, label: "Premium", sub: "Active" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-[240px] bg-[hsl(var(--sidebar-bg))] flex flex-col shrink-0 min-h-screen">
          {/* Logo */}
          <div className="px-5 pt-6 pb-5">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold text-primary tracking-tight">Evelly AI Hub</span>
                <p className="text-[10px] text-[hsl(var(--accent-secondary))] leading-none mt-0.5">Agentes de Monetização</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-[hsl(var(--sidebar-border))]" />

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
                      ? "bg-[hsl(263_50%_15%)] text-[hsl(var(--sidebar-foreground))] shadow-sm"
                      : "text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)]"
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
                        {a.name.slice(0, 28)}…
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom: theme toggle + profile */}
          <div className="mt-auto">
            <div className="mx-5 h-px bg-[hsl(var(--sidebar-border))]" />
            <div className="px-3 py-3 space-y-1">
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)] transition-all"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{dark ? "Modo Claro" : "Modo Escuro"}</span>
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">E</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[hsl(var(--sidebar-foreground))] truncate">Evelly User</p>
                  <p className="text-[10px] text-primary/60">Premium Plan</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[hsl(var(--sidebar-bg))] px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bot className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold text-primary flex-1">Evelly AI Hub</span>
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
        <div className="fixed top-[52px] left-0 right-0 z-30 bg-[hsl(var(--sidebar-bg))] px-3 py-2 space-y-1 animate-fade-in">
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i;
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                  isActive
                    ? "bg-[hsl(263_50%_15%)] text-[hsl(var(--sidebar-foreground))]"
                    : "text-[hsl(var(--sidebar-foreground)/0.5)] hover:text-[hsl(var(--sidebar-foreground))]"
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
        {/* Top bar with agent title + stats */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-lg font-bold text-foreground">{agent.name}</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{agent.badge}</p>
            </div>
            <div className="flex items-center gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground border border-primary/10"
                >
                  <s.icon className="w-3.5 h-3.5" />
                  <span className="font-semibold">{s.label}</span>
                  <span className="text-muted-foreground hidden sm:inline">{s.sub}</span>
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
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform ${
                    isActive ? "scale-110 shadow-md" : "opacity-40"
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
