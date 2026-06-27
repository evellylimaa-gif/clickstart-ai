import { Compass, Map, MessageSquare, BookOpen, Package, ClipboardList, Sparkles, ArrowRight, Zap } from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
  onOpenConversa: () => void;
  plansGenerated: number;
}

const heroFont = { fontFamily: "Sora, Inter, sans-serif" };

const primaryCards = [
  {
    id: "diagnostico",
    title: "Fazer Diagnóstico Digital",
    subtitle: "Descubra qual perfil digital combina com você em 2 minutos",
    icon: Compass,
    badge: "Comece aqui",
    gradient: "from-brand-purple via-brand-pink to-brand-amber",
    glow: "glow-purple",
  },
  {
    id: "trilhas",
    title: "Abrir minha trilha",
    subtitle: "Caminho passo a passo personalizado para o seu objetivo",
    icon: Map,
    badge: "Plano guiado",
    gradient: "from-brand-teal to-brand-purple",
    glow: "glow-teal",
  },
  {
    id: "conversas",
    title: "Continuar conversa",
    subtitle: "Volte para o agente de IA e siga seu plano de ação",
    icon: MessageSquare,
    badge: "Agente IA",
    gradient: "from-brand-purple to-brand-pink",
    glow: "glow-purple",
  },
];

const secondaryCards = [
  {
    id: "glossario",
    title: "Consultar Glossário",
    subtitle: "Traduza termos chatos do digital em português claro",
    icon: BookOpen,
    accent: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    id: "kits",
    title: "Ver Kits Digitais",
    subtitle: "Templates, prompts e ferramentas prontas para usar hoje",
    icon: Package,
    accent: "text-brand-amber",
    bg: "bg-brand-amber/10",
  },
  {
    id: "planos",
    title: "Plano de hoje",
    subtitle: "Sua próxima ação concreta — sem rolar feed sem rumo",
    icon: ClipboardList,
    accent: "text-brand-pink",
    bg: "bg-brand-pink/10",
  },
];

export function Dashboard({ onNavigate, onOpenConversa, plansGenerated }: DashboardProps) {
  const handleClick = (id: string) => {
    if (id === "conversas") return onOpenConversa();
    onNavigate(id);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-foreground/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse-glow" />
            ClickStart AI · Sua bússola digital
          </div>
          <h1
            style={heroFont}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground max-w-3xl"
          >
            Comece no digital{" "}
            <span className="gradient-text">com clareza.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            O ClickStart AI entende seu perfil e mostra qual caminho faz mais sentido para você começar — sem guru, sem inglês confuso, sem curso solto.
          </p>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
            <Stat label="Planos gerados" value={plansGenerated} accent="text-brand-amber" />
            <Stat label="Trilhas ativas" value={plansGenerated > 0 ? 1 : 0} accent="text-brand-teal" />
            <Stat label="Termos no glossário" value={120} accent="text-brand-pink" />
          </div>
        </div>
      </div>

      {/* Primary cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-2">
              Comece por aqui
            </p>
            <h2 style={heroFont} className="text-2xl sm:text-3xl font-bold text-foreground">
              Três cliques. Um caminho claro.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryCards.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              className={`group relative text-left p-6 rounded-3xl glass-strong hover:border-brand-purple/50 transition-all duration-300 hover:-translate-y-1 ${c.glow} hover:shadow-2xl overflow-hidden`}
            >
              {/* gradient halo */}
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${c.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />

              <div className="relative">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} shadow-lg mb-5`}>
                  <c.icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>

                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-foreground/70 mb-3">
                  {c.badge}
                </span>
                <h3 style={heroFont} className="text-lg font-bold text-foreground mb-2 leading-snug">
                  {c.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {c.subtitle}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-purple group-hover:gap-3 transition-all">
                  Abrir <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Secondary cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
            Ferramentas rápidas
          </p>
          <h2 style={heroFont} className="text-2xl font-bold text-foreground">
            Tudo no mesmo lugar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {secondaryCards.map((c) => (
            <button
              key={c.id}
              onClick={() => handleClick(c.id)}
              className="group text-left p-5 rounded-2xl bg-surface border border-border hover:border-brand-purple/40 transition-all hover:-translate-y-0.5"
            >
              <div className={`inline-flex w-11 h-11 rounded-xl ${c.bg} items-center justify-center mb-4`}>
                <c.icon className={`w-5 h-5 ${c.accent}`} strokeWidth={2.2} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">{c.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{c.subtitle}</p>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground group-hover:text-brand-purple transition-colors">
                Acessar <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom promise */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-10">
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-gradient-to-tr from-brand-purple via-brand-pink to-brand-amber opacity-20 blur-3xl" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-amber mb-3">
                <Sparkles className="w-4 h-4" /> Nossa promessa
              </div>
              <h3 style={heroFont} className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-2">
                Descubra seu perfil, escolha seu caminho e receba seu plano com IA.
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl">
                Sem fórmula mágica. Sem promessa de milhão. Só o próximo passo que faz sentido pra você hoje.
              </p>
            </div>
            <button
              onClick={() => onNavigate("diagnostico")}
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink text-white font-semibold text-sm shadow-lg shadow-brand-purple/30 hover:shadow-brand-purple/50 transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" /> Começar diagnóstico
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-2xl glass px-4 py-3">
      <div className={`text-2xl font-extrabold ${accent}`} style={heroFont}>
        {value}
      </div>
      <div className="text-[11px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
