import {
  Compass, Map, BookOpen, ClipboardList, Sparkles, ArrowRight,
  Target, RefreshCw, TrendingUp, CheckCircle2, User, Calendar, Lightbulb,
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

export function Dashboard({
  onNavigate, onOpenConversa, plansGenerated, userName, isAuthenticated,
  hasCompletedDiagnosis = false, onStartDiagnosis, onExploreTrails,
}: DashboardProps) {
  // FIRST-ACCESS GUIDED FLOW ------------------------------------------------
  if (isAuthenticated && !hasCompletedDiagnosis) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin bg-[#020617]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A]/80 backdrop-blur p-8 sm:p-12">
            <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-teal-500/10 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300 mb-3">
                Bem-vindo ao ClickStart AI
              </p>
              <h1 style={heroFont} className="text-3xl sm:text-4xl font-extrabold text-foreground leading-[1.15] mb-4">
                Vamos descobrir seu melhor caminho no digital
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Responda algumas perguntas rápidas para o ClickStart AI entender seu objetivo, seu tempo, seu nível e seu ponto de partida.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onStartDiagnosis}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:scale-[1.02] transition-all"
                >
                  <Compass className="w-4 h-4" /> Fazer diagnóstico agora
                </button>
                <button
                  onClick={onExploreTrails}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-foreground font-semibold text-sm hover:bg-white/10 transition-all"
                >
                  <Map className="w-4 h-4" /> Explorar trilhas
                </button>
              </div>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { n: 1, t: "Diagnóstico", d: "Suas respostas viram seu perfil." },
                  { n: 2, t: "Caminho recomendado", d: "Uma trilha que combina com você." },
                  { n: 3, t: "Primeira ação", d: "Algo concreto para fazer hoje." },
                ].map((s) => (
                  <div key={s.n} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <span className="inline-flex w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 items-center justify-center text-xs font-bold mb-2">
                      {s.n}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{s.t}</p>
                    <p className="text-[12px] text-muted-foreground mt-1">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FULL DASHBOARD ----------------------------------------------------------
  const greeting = isAuthenticated ? `Olá, ${userName}.` : "Bem-vindo.";

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-[#020617]">
      {/* Hero — dark cockpit */}
      <div className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.04] to-teal-500/[0.06] pointer-events-none" />
        <div className="absolute -top-40 -right-32 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 pt-10 sm:pt-14 pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-foreground/80 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            ClickStart AI · Sua bússola digital
          </div>
          <p className="text-sm text-muted-foreground mb-2">{greeting}</p>
          <h1 style={heroFont} className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-foreground max-w-3xl">
            Seu plano para começar no digital
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed">
            Acompanhe seu diagnóstico, sua trilha recomendada, suas tarefas e seus planos salvos em um só lugar.
          </p>
        </div>
      </div>

      {/* Cockpit cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CockpitCard
            tone="indigo"
            icon={User}
            label="Perfil digital"
            title={hasCompletedDiagnosis ? "Diagnóstico concluído" : "Pendente"}
            desc="Entenda seu estilo, seu tempo e seu ponto de partida."
            cta={hasCompletedDiagnosis ? "Revisar perfil" : "Fazer diagnóstico"}
            onAction={() => (hasCompletedDiagnosis ? onNavigate("diagnostico") : onStartDiagnosis?.())}
          />
          <CockpitCard
            tone="teal"
            icon={Map}
            label="Trilha recomendada"
            title="Produtos Digitais"
            desc="Caminho mais direto para iniciantes começarem a vender online."
            cta="Abrir trilha"
            onAction={() => onNavigate("trilhas")}
          />
          <CockpitCard
            tone="purple"
            icon={ArrowRight}
            label="Próxima ação"
            title="Escolher meu nicho"
            desc="Definir nicho vem antes de gerar roteiro ou página de venda."
            cta="Continuar com o agente"
            onAction={onOpenConversa}
          />
          <CockpitCard
            tone="cyan"
            icon={Calendar}
            label="Plano da semana"
            title={plansGenerated > 0 ? "Você tem planos salvos" : "Monte seu primeiro plano"}
            desc={plansGenerated > 0
              ? "Revise o que já decidiu e ajuste a próxima entrega."
              : "Em 1 conversa você sai com 7 dias de ação organizados."}
            cta="Abrir planos"
            onAction={() => onNavigate("planos")}
          />
          <CockpitCard
            tone="amber"
            icon={TrendingUp}
            label="Progresso"
            title={`${plansGenerated} plano${plansGenerated === 1 ? "" : "s"} salvo${plansGenerated === 1 ? "" : "s"}`}
            desc="Cada plano salvo é uma decisão tirada do papel."
            cta="Ver evolução"
            onAction={() => onNavigate("planos")}
          />
          <CockpitCard
            tone="pink"
            icon={ClipboardList}
            label="Planos salvos"
            title="Sua biblioteca"
            desc="Acesse rapidamente seus planos, checklists e roteiros."
            cta="Abrir biblioteca"
            onAction={() => onNavigate("planos")}
          />
        </div>
      </section>

      {/* Beginner journey order */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/70 backdrop-blur p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-300">
              Sua sequência sugerida
            </p>
          </div>
          <h2 style={heroFont} className="text-xl sm:text-2xl font-bold text-foreground mb-1">
            Faça na ordem certa e evite atalho furado
          </h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Iniciante que pula para "gerar roteiro" antes de escolher caminho, nicho e oferta perde tempo. Siga esta sequência.
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              "Diagnóstico",
              "Caminho recomendado",
              "Escolha de nicho",
              "Primeira oferta",
              "Produto mínimo",
              "Conteúdo ou roteiro",
              "Plano de 7 dias",
              "Execução",
            ].map((step, i) => (
              <li key={step} className="flex items-start gap-3 rounded-xl border border-white/5 bg-black/30 p-3">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 inline-flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <span className="text-sm text-foreground/90 leading-snug">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Value loop chips */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-12">
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/70 backdrop-blur p-6 sm:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300 mb-2">
            O que você quer fazer agora?
          </p>
          <h3 style={heroFont} className="text-xl font-bold text-foreground mb-5">
            Continue de onde parou
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "trail", label: "Escolher meu caminho", icon: Map, route: "trilhas" },
              { id: "niche", label: "Definir meu nicho", icon: Target, route: "conversas" },
              { id: "offer", label: "Montar minha primeira oferta", icon: Sparkles, route: "conversas" },
              { id: "review", label: "Revisar meu plano", icon: RefreshCw, route: "planos" },
              { id: "glossary", label: "Aprender um termo", icon: BookOpen, route: "glossario" },
            ].map(({ id, label, icon: Icon, route }) => (
              <button
                key={id}
                onClick={() => (route === "conversas" ? onOpenConversa() : onNavigate(route))}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-400/40 hover:bg-white/10 text-sm font-medium text-foreground transition-all"
              >
                <Icon className="w-4 h-4 text-indigo-300" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------

type Tone = "indigo" | "teal" | "purple" | "cyan" | "amber" | "pink";

const toneMap: Record<Tone, { grad: string; chip: string; text: string; border: string }> = {
  indigo: { grad: "from-indigo-500/20 to-indigo-500/0", chip: "bg-indigo-500/15 text-indigo-300", text: "text-indigo-300", border: "border-indigo-500/20" },
  teal:   { grad: "from-teal-500/20 to-teal-500/0",     chip: "bg-teal-500/15 text-teal-300",     text: "text-teal-300",   border: "border-teal-500/20" },
  purple: { grad: "from-purple-500/20 to-purple-500/0", chip: "bg-purple-500/15 text-purple-300", text: "text-purple-300", border: "border-purple-500/20" },
  cyan:   { grad: "from-cyan-500/20 to-cyan-500/0",     chip: "bg-cyan-500/15 text-cyan-300",     text: "text-cyan-300",   border: "border-cyan-500/20" },
  amber:  { grad: "from-amber-500/20 to-amber-500/0",   chip: "bg-amber-500/15 text-amber-300",   text: "text-amber-300",  border: "border-amber-500/20" },
  pink:   { grad: "from-pink-500/20 to-pink-500/0",     chip: "bg-pink-500/15 text-pink-300",     text: "text-pink-300",   border: "border-pink-500/20" },
};

function CockpitCard({
  tone, icon: Icon, label, title, desc, cta, onAction,
}: {
  tone: Tone;
  icon: React.ElementType;
  label: string;
  title: string;
  desc: string;
  cta: string;
  onAction: () => void;
}) {
  const c = toneMap[tone];
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${c.border} bg-gradient-to-br ${c.grad} backdrop-blur p-5 group hover:border-white/20 transition-colors`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl bg-white/5 grid place-items-center ${c.text}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${c.chip}`}>{label}</span>
      </div>
      <p className="text-base font-bold text-foreground leading-snug">{title}</p>
      <p className="text-[12px] text-muted-foreground mt-1 mb-4 leading-relaxed">{desc}</p>
      <button
        onClick={onAction}
        className={`inline-flex items-center gap-1.5 text-[12px] font-semibold ${c.text} hover:gap-2.5 transition-all`}
      >
        {cta} <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
