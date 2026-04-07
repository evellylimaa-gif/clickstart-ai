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

const sidebarChips: { emoji: string; title: string; agentIdx: number; chips: string[] }[] = [
  {
    emoji: "💰", title: "Agentes de IA", agentIdx: 0,
    chips: [
      "O que as empresas mais compram",
      "Como precificar agentes",
      "Primeiros clientes sem experiência",
      "Melhores nichos no Brasil",
      "Portfólio partindo do zero",
      "Quanto cobrar por um agente de atendimento",
      "Como vender agentes para dentistas e clínicas",
      "Criar agente de onboarding para SaaS",
      "Automação de follow-up com IA para vendas",
      "Como apresentar um agente de IA numa reunião de vendas",
    ],
  },
  {
    emoji: "🌐", title: "Monetização Web", agentIdx: 1,
    chips: [
      "Renda rápida com IA",
      "Vender templates e prompts",
      "Micro-SaaS no-code",
      "Melhores plataformas para vender",
      "Curso de IA online",
      "Como criar e vender pacote de automações no Make",
      "Monetizar canal do YouTube com IA em 2026",
      "Criar comunidade paga no Skool sobre IA",
      "Vender serviço de criação de GPTs personalizados",
      "Lançar infoproduto digital em 7 dias com IA",
    ],
  },
  {
    emoji: "🧠", title: "Engenheiro de Prompts", agentIdx: 2,
    chips: [
      "Prompt para agente de vendas B2B",
      "Prompt para coach de finanças",
      "Prompt para atendimento ao cliente",
      "Prompt para criador de conteúdo",
      "Revisão do meu prompt atual",
      "Prompt para agente de qualificação de leads",
      "System prompt para assistente jurídico",
      "Criar prompt que gera copy de vendas automaticamente",
      "Prompt para agente de suporte técnico nível 1",
      "Como estruturar guardrails para agentes sensíveis",
    ],
  },
];

const Index = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [view, setView] = useState<"hero" | "agent" | "settings" | "history">("hero");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [plansGenerated, setPlansGenerated] = useState(() => {
    try { return parseInt(localStorage.getItem("evelly_plans_generated") || "0", 10); } catch { return 0; }
  });
  const [expandedConvoId, setExpandedConvoId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const { dark, toggle: toggleTheme } = useTheme();
  const { history, saveConversation, clearHistory } = useHistory();

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
  };

  const incrementPlans = () => {
    setPlansGenerated((p) => {
      const next = p + 1;
      localStorage.setItem("evelly_plans_generated", String(next));
      return next;
    });
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

            {/* Histórico nav item */}
            <button
              onClick={() => { setView("history"); setActiveIdx(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left group ${
                view === "history"
                  ? "bg-[hsl(263_50%_15%)] text-[hsl(var(--sidebar-foreground))] shadow-sm"
                  : "text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-[hsl(var(--sidebar-muted)/0.5)] hover:text-[hsl(var(--sidebar-foreground)/0.85)]"
              }`}
            >
              <span className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-primary/20">
                <History className="w-4 h-4 text-primary" />
              </span>
              <span>📝 Histórico</span>
              {history.length > 0 && (
                <span className="ml-auto text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded-full font-bold">
                  {history.length}
                </span>
              )}
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
        {view === "history" && (
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">📝 Histórico de Conversas</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {history.length === 0 ? "Nenhuma conversa salva ainda." : `${history.length} conversa${history.length > 1 ? "s" : ""} salva${history.length > 1 ? "s" : ""}`}
                  </p>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpar histórico
                  </button>
                )}
              </div>
              <div className="space-y-3">
                {history.map((convo) => {
                  const isExpanded = expandedConvoId === convo.id;
                  const date = new Date(convo.date);
                  const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
                  const timeStr = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                  return (
                    <div key={convo.id} className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
                      <button
                        onClick={() => setExpandedConvoId(isExpanded ? null : convo.id)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <History className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                              {convo.agentBadge}
                            </span>
                            <span className="text-[11px] text-muted-foreground">{dateStr} · {timeStr}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">{convo.firstQuestion}</p>
                        </div>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />}
                      </button>
                      {isExpanded && (
                        <div className="border-t border-border px-5 py-4 space-y-3 bg-muted/10 max-h-[400px] overflow-y-auto">
                          {convo.messages.map((m, i) => (
                            <div key={i} className={`text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
                              <span className={`inline-block max-w-[90%] px-4 py-2.5 rounded-2xl ${
                                m.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card border border-border text-foreground"
                              }`}>
                                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1 opacity-60">
                                  {m.role === "user" ? "Você" : convo.agentName}
                                </span>
                                <span className="whitespace-pre-wrap break-words">{m.content.slice(0, 500)}{m.content.length > 500 ? "..." : ""}</span>
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {view === "agent" && activeIdx !== null && (
          <ChatPanel
            key={`${agents[activeIdx].id}-${initialMessage || ""}`}
            agent={agents[activeIdx]}
            initialMessage={initialMessage}
            onSaveConversation={(data) => saveConversation(data)}
            onPlanSaved={incrementPlans}
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
