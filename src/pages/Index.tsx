import { useState } from "react";
import { agents } from "@/lib/agents";
import { ChatPanel } from "@/components/ChatPanel";
import { Dashboard } from "@/components/Dashboard";
import { PlaceholderView } from "@/components/PlaceholderView";
import { ConversasPicker } from "@/components/ConversasPicker";
import { TrilhasView } from "@/components/TrilhasView";
import type { Trail } from "@/lib/trails";
import { SettingsPage } from "@/pages/Settings";
import {
  Compass, Map as MapIcon, MessageSquare, BookOpen, Package, ClipboardList,
  LayoutDashboard, Settings, Menu, X, Sun, Moon, ShieldCheck, Sparkles,
  ArrowLeft, History, Trash2, ChevronDown, ChevronRight,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/hooks/use-theme";
import { useHistory } from "@/hooks/use-history";

type View =
  | "dashboard"
  | "diagnostico"
  | "trilhas"
  | "conversas"
  | "chat"
  | "glossario"
  | "kits"
  | "planos"
  | "configuracoes"
  | "historico";

interface NavItem {
  id: View;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "diagnostico", label: "Diagnóstico Digital", icon: Compass },
  { id: "trilhas", label: "Trilhas", icon: MapIcon },
  { id: "conversas", label: "Conversas", icon: MessageSquare },
  { id: "glossario", label: "Glossário", icon: BookOpen },
  { id: "kits", label: "Kits Digitais", icon: Package },
  { id: "planos", label: "Planos Salvos", icon: ClipboardList },
  { id: "configuracoes", label: "Configurações", icon: Settings },
];

const heroFont = { fontFamily: "Sora, Inter, sans-serif" };

const Index = () => {
  const [view, setView] = useState<View>("dashboard");
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedConvoId, setExpandedConvoId] = useState<string | null>(null);
  const [plansGenerated, setPlansGenerated] = useState(() => {
    try { return parseInt(localStorage.getItem("evelly_plans_generated") || "0", 10); } catch { return 0; }
  });

  const isMobile = useIsMobile();
  const { dark, toggle: toggleTheme } = useTheme();
  const { history, saveConversation, clearHistory } = useHistory();

  const goView = (v: View) => {
    setView(v);
    setSidebarOpen(false);
    if (v !== "chat") {
      setInitialMessage(undefined);
    }
  };

  const openAgent = (idx: number, prefill?: string) => {
    setActiveIdx(idx);
    setInitialMessage(prefill);
    setView("chat");
    setSidebarOpen(false);
  };

  const incrementPlans = () => {
    setPlansGenerated((p) => {
      const next = p + 1;
      localStorage.setItem("evelly_plans_generated", String(next));
      return next;
    });
  };

  // Sidebar (desktop & mobile drawer share markup)
  const Sidebar = (
    <aside className="w-[260px] bg-[hsl(var(--sidebar-bg))] flex flex-col shrink-0 h-screen border-r border-[hsl(var(--sidebar-border))]">
      {/* Brand */}
      <button onClick={() => goView("dashboard")} className="px-5 pt-6 pb-5 text-left hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-purple via-brand-pink to-brand-amber flex items-center justify-center shadow-lg glow-purple">
            <Compass className="w-5 h-5 text-white" strokeWidth={2.4} />
          </div>
          <div>
            <div style={heroFont} className="text-sm font-extrabold text-[hsl(var(--sidebar-foreground))] tracking-tight">
              ClickStart <span className="gradient-text">AI</span>
            </div>
            <p className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.5)] leading-none mt-1">
              Sua bússola digital
            </p>
          </div>
        </div>
      </button>

      <div className="mx-5 h-px bg-[hsl(var(--sidebar-border))]" />

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 pt-4 pb-4 space-y-1">
        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[hsl(var(--sidebar-foreground)/0.4)]">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = view === item.id || (item.id === "conversas" && view === "chat");
          return (
            <button
              key={item.id}
              onClick={() => goView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
                isActive
                  ? "bg-gradient-to-r from-brand-purple/20 to-brand-pink/10 text-[hsl(var(--sidebar-foreground))] border border-brand-purple/30 shadow-sm"
                  : "text-[hsl(var(--sidebar-foreground)/0.6)] hover:bg-white/5 hover:text-[hsl(var(--sidebar-foreground))]"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-purple" : ""}`} />
              <span className="truncate">{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-amber" />}
            </button>
          );
        })}

        {/* Histórico */}
        <button
          onClick={() => goView("historico")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all text-left ${
            view === "historico"
              ? "bg-gradient-to-r from-brand-purple/20 to-brand-pink/10 text-[hsl(var(--sidebar-foreground))] border border-brand-purple/30"
              : "text-[hsl(var(--sidebar-foreground)/0.6)] hover:bg-white/5 hover:text-[hsl(var(--sidebar-foreground))]"
          }`}
        >
          <History className="w-4 h-4 shrink-0" />
          <span>Histórico</span>
          {history.length > 0 && (
            <span className="ml-auto text-[10px] bg-brand-purple/20 text-brand-purple px-1.5 py-0.5 rounded-full font-bold">
              {history.length}
            </span>
          )}
        </button>
      </nav>

      {/* Bottom: account / plan */}
      <div className="px-3 pb-4 space-y-2">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-brand-purple/15 via-brand-pink/8 to-transparent border border-brand-purple/25">
          {/* Account header */}
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
              user.isAuthenticated
                ? "bg-gradient-to-br from-brand-purple to-brand-pink text-white"
                : "bg-white/5 text-[hsl(var(--sidebar-foreground)/0.6)] border border-[hsl(var(--sidebar-border))]"
            }`}>
              {user.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--sidebar-foreground)/0.45)] font-semibold leading-none">
                {user.isAuthenticated ? "Meu perfil" : "Sua conta"}
              </p>
              <p className="text-[13px] font-semibold text-[hsl(var(--sidebar-foreground))] truncate mt-1">
                {user.displayName}
              </p>
            </div>
          </div>

          {/* Plan row */}
          <div className="flex items-center justify-between rounded-lg bg-black/20 px-2.5 py-2 mb-2">
            <span className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.55)]">Plano atual</span>
            <span className="text-[11px] font-semibold text-brand-amber">ClickStart Plus</span>
          </div>

          {/* Guarantee row */}
          <div className="flex items-center gap-1.5 text-[10px] text-[hsl(var(--sidebar-foreground)/0.65)] mb-3 px-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
            Garantia de 7 dias
          </div>

          <button className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-[12px] font-semibold shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-all hover:scale-[1.02]">
            <Sparkles className="w-3.5 h-3.5" />
            Assinar por R$39,90/mês
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[11px] text-[hsl(var(--sidebar-foreground)/0.5)] hover:bg-white/5 hover:text-[hsl(var(--sidebar-foreground))] transition-all"
        >
          {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {dark ? "Modo claro" : "Modo escuro"}
        </button>
      </div>
    </aside>
  );

  // Render current view body
  const renderBody = () => {
    switch (view) {
      case "dashboard":
        return (
          <Dashboard
            onNavigate={(v) => goView(v as View)}
            onOpenConversa={() => goView("conversas")}
            plansGenerated={plansGenerated}
            userName={user.displayName}
            isAuthenticated={user.isAuthenticated}
          />
        );
      case "diagnostico":
        return (
          <PlaceholderView
            title="Diagnóstico Digital"
            description="Em 2 minutos, descobrimos seu perfil digital (criador, vendedor, freelancer, automatizador) e indicamos o caminho ideal pra começar."
            icon={Compass}
            accent="purple"
            onBack={() => goView("dashboard")}
          />
        );
      case "trilhas":
        return (
          <TrilhasView
            onOpenTrail={(trail: Trail) => {
              const idx = trail.agentId ? agents.findIndex((a) => a.id === trail.agentId) : -1;
              if (idx >= 0) openAgent(idx, `Quero seguir a trilha "${trail.title}". Me ajude com o primeiro passo prático.`);
              else goView("conversas");
            }}
          />
        );
      case "glossario":
        return (
          <PlaceholderView
            title="Glossário"
            description="Funil, lead, copy, CTA, SaaS, dropship... Traduzimos cada termo do digital em português claro, com exemplos do dia a dia."
            icon={BookOpen}
            accent="teal"
            onBack={() => goView("dashboard")}
          />
        );
      case "kits":
        return (
          <PlaceholderView
            title="Kits Digitais"
            description="Templates, prompts, planilhas e automações prontas para usar hoje. Você baixa, adapta e já está pronto pra publicar."
            icon={Package}
            accent="amber"
            onBack={() => goView("dashboard")}
          />
        );
      case "planos":
        return (
          <PlaceholderView
            title="Planos Salvos"
            description="Todos os planos de ação que você gerou ficam aqui — organizados por data, pra você acompanhar sua jornada sem perder nada."
            icon={ClipboardList}
            accent="pink"
            onBack={() => goView("dashboard")}
          />
        );
      case "configuracoes":
        return <SettingsPage />;
      case "conversas":
        return <ConversasPicker onSelectAgent={(idx) => openAgent(idx)} />;
      case "chat":
        if (activeIdx === null) {
          return <ConversasPicker onSelectAgent={(idx) => openAgent(idx)} />;
        }
        return (
          <div className="flex flex-col flex-1 min-h-0">
            <div className="px-4 sm:px-8 pt-4 pb-2 border-b border-border flex items-center gap-3">
              <button
                onClick={() => goView("conversas")}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Conversas
              </button>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-sm font-medium text-foreground truncate">{agents[activeIdx].badge}</span>
            </div>
            <ChatPanel
              key={`${agents[activeIdx].id}-${initialMessage || ""}`}
              agent={agents[activeIdx]}
              initialMessage={initialMessage}
              extraChips={[]}
              onSaveConversation={(data) => saveConversation(data)}
              onPlanSaved={incrementPlans}
            />
          </div>
        );
      case "historico":
        return (
          <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-8 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-1">
                    Sua jornada
                  </p>
                  <h2 style={heroFont} className="text-2xl font-bold text-foreground">Histórico de conversas</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {history.length === 0 ? "Nenhuma conversa salva ainda." : `${history.length} conversa${history.length > 1 ? "s" : ""} salva${history.length > 1 ? "s" : ""}`}
                  </p>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Limpar
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
                    <div key={convo.id} className="rounded-2xl glass-strong overflow-hidden">
                      <button
                        onClick={() => setExpandedConvoId(isExpanded ? null : convo.id)}
                        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shrink-0">
                          <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-purple/15 text-brand-purple">
                              {convo.agentBadge}
                            </span>
                            <span className="text-[11px] text-muted-foreground">{dateStr} · {timeStr}</span>
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">{convo.firstQuestion}</p>
                        </div>
                        {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                      </button>
                      {isExpanded && (
                        <div className="border-t border-border px-5 py-4 space-y-3 bg-black/20 max-h-[400px] overflow-y-auto">
                          {convo.messages.map((m, i) => (
                            <div key={i} className={`text-sm ${m.role === "user" ? "text-right" : "text-left"}`}>
                              <span className={`inline-block max-w-[90%] px-4 py-2.5 rounded-2xl ${
                                m.role === "user"
                                  ? "bg-gradient-to-br from-brand-purple to-brand-pink text-white"
                                  : "bg-surface border border-border text-foreground"
                              }`}>
                                <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1 opacity-70">
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
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      {!isMobile && Sidebar}

      {/* Mobile top bar */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-40 glass-strong px-4 py-3 flex items-center gap-3 border-b border-border">
          <button onClick={() => goView("dashboard")} className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-purple via-brand-pink to-brand-amber flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span style={heroFont} className="text-sm font-extrabold text-foreground">
              ClickStart <span className="gradient-text">AI</span>
            </span>
          </button>
          <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-foreground">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      )}

      {/* Mobile drawer */}
      {isMobile && sidebarOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 z-40 animate-fade-in">
            {Sidebar}
          </div>
        </>
      )}

      {/* Main */}
      <main className={`flex-1 flex flex-col min-h-screen min-w-0 ${isMobile ? "pt-[60px] pb-[72px]" : ""}`}>
        {renderBody()}
      </main>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 glass-strong border-t border-border flex">
          {([
            { id: "dashboard", label: "Início", icon: LayoutDashboard },
            { id: "diagnostico", label: "Diagnóstico", icon: Compass },
            { id: "conversas", label: "Conversas", icon: MessageSquare },
            { id: "kits", label: "Kits", icon: Package },
            { id: "configuracoes", label: "Ajustes", icon: Settings },
          ] as { id: View; label: string; icon: React.ElementType }[]).map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id || (item.id === "conversas" && view === "chat");
            return (
              <button
                key={item.id}
                onClick={() => goView(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-all ${
                  isActive ? "text-brand-purple" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "" : "opacity-70"}`} />
                <span className="truncate max-w-[60px]">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Index;
