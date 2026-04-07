import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { HeroScreen } from "@/components/HeroScreen";
import { SettingsPage } from "@/pages/Settings";
import {
  Bot, Briefcase, TrendingUp, Wand2, Menu, X,
  Sun, Moon, Zap, BarChart3, Settings, DollarSign,
  History, Trash2, ChevronDown, ChevronRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { Progress } from "@/components/ui/progress";
import { useHistory, ConversationRecord } from "@/hooks/use-history";

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  "wand-2": Wand2,
};

const sidebarLabels = [
  { emoji: "💰", label: "Ganhar Dinheiro Agora" },
  { emoji: "🌐", label: "Monetizar na Web" },
  { emoji: "🧠", label: "Criar Prompts que Vendem" },
];

const Index = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [view, setView] = useState<"hero" | "agent" | "settings">("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [plansGenerated, setPlansGenerated] = useState(0);
  const isMobile = useIsMobile();
  const { dark, toggle: toggleTheme } = useTheme();

  const handleSelect = (i: number) => {
    setActiveIdx(i);
    setView("agent");
    setInitialMessage(undefined);
    setSidebarOpen(false);
  };

  const handleHeroPath = (agentIdx: number, prefill: string) => {
    setActiveIdx(agentIdx);
    setInitialMessage(prefill);
    setView("agent");
    setPlansGenerated((p) => p + 1);
  };

  const goHome = () => {
    setView("hero");
    setActiveIdx(null);
    setInitialMessage(undefined);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside className="w-[260px] bg-[hsl(var(--sidebar-bg))] flex flex-col shrink-0 min-h-screen">
          {/* Logo */}
          <button onClick={goHome} className="px-5 pt-6 pb-4 text-left hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold text-primary tracking-tight">Evelly AI Hub</span>
                <p className="text-[10px] text-[hsl(var(--accent-secondary))] leading-none mt-0.5">Agentes de Monetização</p>
              </div>
            </div>
          </button>

          {/* Progress summary */}
          <div className="mx-4 mb-3 p-3 rounded-xl bg-[hsl(var(--sidebar-muted))] space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[hsl(var(--sidebar-foreground)/0.5)]">Planos gerados</span>
              <span className="font-bold text-gold">{plansGenerated}</span>
            </div>
            <Progress value={Math.min(plansGenerated * 20, 100)} className="h-1.5 bg-[hsl(var(--sidebar-border))]" />
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-[hsl(var(--sidebar-foreground)/0.5)]">Potencial</span>
              <span className="font-bold text-gold">R${plansGenerated > 0 ? "1.000+" : "0"}</span>
            </div>
          </div>

          <div className="mx-5 h-px bg-[hsl(var(--sidebar-border))]" />

          {/* Nav label */}
          <div className="px-5 pt-4 pb-2">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.35)]">
              Seus agentes
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 px-3 space-y-1">
            {agents.map((a, i) => {
              const Icon = iconMap[a.icon] || Bot;
              const isActive = activeIdx === i && view === "agent";
              const sl = sidebarLabels[i];
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
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                    style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                  >
                    <Icon className="w-4 h-4 text-primary-foreground" />
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate">
                      {sl.emoji} {sl.label}
                    </span>
                  </div>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  )}
                </button>
              );
            })}

            {/* Progress nav item */}
            <button
              onClick={goHome}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left group ${
                view === "hero"
                  ? "bg-[hsl(263_50%_15%)] text-[hsl(var(--sidebar-foreground))] shadow-sm"
                  : "text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)]"
              }`}
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-gold/20">
                <BarChart3 className="w-4 h-4 text-gold" />
              </span>
              <span>📊 Meu Progresso</span>
            </button>
          </nav>

          {/* Bottom */}
          <div className="mt-auto">
            <div className="mx-5 h-px bg-[hsl(var(--sidebar-border))]" />
            <div className="px-3 py-3 space-y-1">
              <button
                onClick={() => { setView("settings"); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] transition-all ${
                  view === "settings"
                    ? "bg-[hsl(263_50%_15%)] text-[hsl(var(--sidebar-foreground))] font-medium"
                    : "text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)]"
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </button>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)] transition-all"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{dark ? "Modo Claro" : "Modo Escuro"}</span>
              </button>
              <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-gold">E</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-[hsl(var(--sidebar-foreground))] truncate">Evelly</p>
                  <p className="text-[10px] text-gold/60">Premium Plan</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-[hsl(var(--sidebar-bg))] px-4 py-3 flex items-center gap-3">
          <button onClick={goHome} className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-primary">Evelly AI Hub</span>
          </button>
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
            const isActive = activeIdx === i && view === "agent";
            const sl = sidebarLabels[i];
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
                <span>{sl.emoji} {sl.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 flex flex-col min-h-screen ${isMobile ? "pt-[52px]" : ""}`}>
        {view === "hero" && <HeroScreen onSelectPath={handleHeroPath} />}
        {view === "settings" && <SettingsPage />}
        {view === "agent" && activeIdx !== null && (
          <ChatPanel
            key={`${agents[activeIdx].id}-${initialMessage || ""}`}
            agent={agents[activeIdx]}
            initialMessage={initialMessage}
          />
        )}
      </main>

      {/* Mobile bottom navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border flex backdrop-blur-lg">
          <button
            onClick={goHome}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all ${
              view === "hero" ? "text-gold" : "text-muted-foreground"
            }`}
          >
            <DollarSign className={`w-5 h-5 ${view === "hero" ? "text-gold" : ""}`} />
            <span>Início</span>
          </button>
          {agents.map((a, i) => {
            const Icon = iconMap[a.icon] || Bot;
            const isActive = activeIdx === i && view === "agent";
            return (
              <button
                key={a.id}
                onClick={() => handleSelect(i)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform ${
                    isActive ? "scale-110 shadow-md" : "opacity-40"
                  }`}
                  style={{ backgroundColor: `hsl(var(--${a.color}))` }}
                >
                  <Icon className="w-4 h-4 text-primary-foreground" />
                </span>
                <span className="truncate max-w-[60px]">{sidebarLabels[i].label.split(" ")[0]}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Index;
