import {
  Compass, Map, MessageSquare, BookOpen, Package, ClipboardList, Sparkles,
  ArrowRight, Zap, Calendar, Target, RefreshCw, TrendingUp, Plus, CheckCircle2,
} from "lucide-react";

interface DashboardProps {
  onNavigate: (view: string) => void;
  onOpenConversa: () => void;
  plansGenerated: number;
  userName: string;
  isAuthenticated: boolean;
  hasCompletedDiagnosis?: boolean;
  onStartDiagnosis?: () => void;
  onExploreTrails?: () => void;
}

const heroFont = { fontFamily: "Sora, Inter, sans-serif" };

const primaryCards = [
  {
    id: "diagnostico",
    title: "Fazer Diagnóstico Digital",
    subtitle: "Descubra qual perfil digital combina com você em 2 minutos.",
    icon: Compass,
    badge: "Comece aqui",
    gradient: "from-brand-purple via-brand-pink to-brand-amber",
    glow: "glow-purple",
  },
  {
    id: "trilhas",
    title: "Abrir minha trilha",
    subtitle: "Um caminho passo a passo, personalizado para o seu objetivo.",
    icon: Map,
    badge: "Plano guiado",
    gradient: "from-brand-teal to-brand-purple",
    glow: "glow-teal",
  },
  {
    id: "conversas",
    title: "Continuar conversa",
    subtitle: "Volte para o agente de IA e siga de onde você parou.",
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
    subtitle: "Traduza os termos chatos do digital para português claro.",
    icon: BookOpen,
    accent: "text-brand-teal",
    bg: "bg-brand-teal/10",
  },
  {
    id: "kits",
    title: "Ver Kits Digitais",
    subtitle: "Templates, prompts e ferramentas prontas para usar hoje.",
    icon: Package,
    accent: "text-brand-amber",
    bg: "bg-brand-amber/10",
  },
  {
    id: "planos",
    title: "Plano de hoje",
    subtitle: "Sua próxima ação concreta, sem rolar feed sem rumo.",
    icon: ClipboardList,
    accent: "text-brand-pink",
    bg: "bg-brand-pink/10",
  },
];

// Long-term journey — 5 stages the user advances through.
const phases = [
  { n: 1, label: "Descoberta", desc: "Você entende seu perfil e escolhe um caminho." },
  { n: 2, label: "Validação", desc: "Você testa a ideia rápido, antes de investir." },
  { n: 3, label: "Primeiras vendas", desc: "Você fecha as primeiras vendas e ajusta a oferta." },
  { n: 4, label: "Otimização", desc: "Você melhora o que funciona e corta o que não." },
  { n: 5, label: "Escala", desc: "Você multiplica resultados com processo e ferramentas." },
];

// Retention shortcuts — value loop chips that bring the user back.
const loopChips: { id: string; label: string; icon: typeof Plus; route: string }[] = [
  { id: "review", label: "Quero revisar meu plano", icon: RefreshCw, route: "planos" },
  { id: "next", label: "Quero o próximo passo", icon: ArrowRight, route: "conversas" },
  { id: "trail", label: "Quero uma nova trilha", icon: Map, route: "trilhas" },
  { id: "second", label: "Quero uma segunda fonte de renda", icon: TrendingUp, route: "trilhas" },
  { id: "transform", label: "Transformar meu progresso em novo plano", icon: Plus, route: "conversas" },
];

export function Dashboard({
  onNavigate, onOpenConversa, plansGenerated, userName, isAuthenticated,
}: DashboardProps) {
  const handleClick = (id: string) => {
    if (id === "conversas") return onOpenConversa();
    onNavigate(id);
  };

  // Heuristic for journey position based on plans generated.
  const currentPhase = plansGenerated === 0 ? 1 : Math.min(5, 1 + Math.floor(plansGenerated / 2));
  const greeting = isAuthenticated ? `Olá, ${userName}.` : "Bem-vindo.";

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-semibold text-foreground/80 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse-glow" />
            ClickStart AI · Sua bússola digital
          </div>
          <p className="text-sm text-muted-foreground mb-2">{greeting}</p>
          <h1
            style={heroFont}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground max-w-3xl"
          >
            Comece no digital{" "}
            <span className="gradient-text">com clareza.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            O ClickStart AI entende seu perfil e mostra qual caminho faz mais sentido para você começar
            com clareza, sem guru, sem inglês confuso e sem curso solto.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
            <Stat label="Planos gerados" value={plansGenerated} accent="text-brand-amber" />
            <Stat label="Trilhas ativas" value={plansGenerated > 0 ? 1 : 0} accent="text-brand-teal" />
            <Stat label="Termos no glossário" value={120} accent="text-brand-pink" />
          </div>
        </div>
      </div>

      {/* Seu momento atual + Próximo passo + Plano da semana */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MomentCard
            phase={currentPhase}
            phaseLabel={phases[currentPhase - 1].label}
            phaseDesc={phases[currentPhase - 1].desc}
          />
          <NextStepCard onAction={() => onOpenConversa()} />
          <WeekPlanCard onAction={() => onNavigate("planos")} plansGenerated={plansGenerated} />
        </div>
      </section>

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

      {/* Sua jornada (long-term phases) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
            Sua jornada no digital
          </p>
          <h2 style={heroFont} className="text-2xl font-bold text-foreground">
            Cada fase prepara a próxima.
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
            Você não termina o ClickStart AI no primeiro plano. A cada conquista, abrimos a próxima etapa.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {phases.map((p) => {
            const done = p.n < currentPhase;
            const active = p.n === currentPhase;
            return (
              <div
                key={p.n}
                className={`relative p-4 rounded-2xl border transition-all ${
                  active
                    ? "border-brand-purple/60 bg-gradient-to-br from-brand-purple/15 to-brand-pink/5 shadow-lg"
                    : done
                    ? "border-brand-teal/40 bg-brand-teal/5"
                    : "border-border bg-surface"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    active ? "text-brand-purple" : done ? "text-brand-teal" : "text-muted-foreground"
                  }`}>
                    Fase {p.n}
                  </span>
                  {done && <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal" />}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1">{p.label}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Value loop chips */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-10">
        <div className="rounded-3xl glass-strong p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-5 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber mb-2">
                Continue de onde parou
              </p>
              <h3 style={heroFont} className="text-xl font-bold text-foreground">
                O que você quer fazer agora?
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {loopChips.map(({ id, label, icon: Icon, route }) => (
              <button
                key={id}
                onClick={() => handleClick(route)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-brand-purple/50 hover:bg-brand-purple/5 text-sm font-medium text-foreground transition-all"
              >
                <Icon className="w-4 h-4 text-brand-purple" />
                {label}
              </button>
            ))}
          </div>
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

      {/* Promise */}
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

function MomentCard({ phase, phaseLabel, phaseDesc }: { phase: number; phaseLabel: string; phaseDesc: string }) {
  return (
    <div className="rounded-3xl glass-strong p-5 border border-brand-purple/30">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brand-purple mb-3">
        <Target className="w-3.5 h-3.5" /> Seu momento atual
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-[11px] text-muted-foreground">Fase {phase} de 5</span>
        <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-pink"
            style={{ width: `${(phase / 5) * 100}%` }}
          />
        </div>
      </div>
      <h3 style={heroFont} className="text-lg font-bold text-foreground mt-2">{phaseLabel}</h3>
      <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">{phaseDesc}</p>
    </div>
  );
}

function NextStepCard({ onAction }: { onAction: () => void }) {
  return (
    <div className="rounded-3xl glass-strong p-5 border border-brand-teal/30">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brand-teal mb-3">
        <ArrowRight className="w-3.5 h-3.5" /> Próximo passo
      </div>
      <h3 style={heroFont} className="text-lg font-bold text-foreground">Falar com um agente.</h3>
      <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
        Pegue a próxima ação prática a partir do que você já decidiu.
      </p>
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-teal/15 hover:bg-brand-teal/25 text-brand-teal text-sm font-semibold transition-colors"
      >
        Continuar agora <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function WeekPlanCard({ onAction, plansGenerated }: { onAction: () => void; plansGenerated: number }) {
  return (
    <div className="rounded-3xl glass-strong p-5 border border-brand-amber/30">
      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-brand-amber mb-3">
        <Calendar className="w-3.5 h-3.5" /> Plano da semana
      </div>
      <h3 style={heroFont} className="text-lg font-bold text-foreground">
        {plansGenerated > 0 ? "Revisar meu progresso" : "Montar meu primeiro plano"}
      </h3>
      <p className="text-[13px] text-muted-foreground mt-1 leading-relaxed">
        {plansGenerated > 0
          ? "Veja o que foi feito, o que ficou pendente e o que vem nesta semana."
          : "Em 1 conversa, você sai com 7 dias de ação organizados."}
      </p>
      <button
        onClick={onAction}
        className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-amber/15 hover:bg-brand-amber/25 text-brand-amber text-sm font-semibold transition-colors"
      >
        Abrir planos <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
