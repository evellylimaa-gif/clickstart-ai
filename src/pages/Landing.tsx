import { Link } from "react-router-dom";
import {
  Sparkles,
  Compass,
  Brain,
  MessageSquare,
  BookOpen,
  Package,
  ClipboardList,
  History,
  ShieldCheck,
  Check,
  ArrowRight,
  AlertTriangle,
  Target,
  Route as RouteIcon,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const includes = [
  { icon: Brain, label: "Diagnóstico digital com IA" },
  { icon: RouteIcon, label: "Trilhas de monetização" },
  { icon: MessageSquare, label: "Agentes especializados" },
  { icon: BookOpen, label: "Glossário inteligente" },
  { icon: History, label: "Histórico de conversas" },
  { icon: ClipboardList, label: "Planos de ação" },
  { icon: Package, label: "Kits digitais" },
];

const steps = [
  { n: "1", title: "Faça o diagnóstico", desc: "A IA entende seu perfil, seu tempo disponível e seu ponto de partida." },
  { n: "2", title: "Receba sua trilha recomendada", desc: "Um caminho claro entre TikTok Shop, infoprodutos, serviços com IA, YouTube sem aparecer ou micro-SaaS." },
  { n: "3", title: "Tire dúvidas com os agentes", desc: "Converse com especialistas em monetização, prompts e negócios digitais." },
  { n: "4", title: "Transforme respostas em plano de ação", desc: "Cada conversa vira passos práticos, salvos no seu painel." },
];

const planBenefits = [
  "Acesso aos agentes",
  "Diagnóstico digital",
  "Trilhas guiadas",
  "Glossário",
  "Kits digitais",
  "Histórico de conversas",
  "Planos salvos",
  "Garantia de 7 dias",
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-teal-500 grid place-items-center shadow-lg shadow-purple-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">ClickStart AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="#como-funciona" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Como funciona</a>
            <a href="#preco" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Preço</a>
            <Link to="/app">
              <Button variant="ghost" size="sm">Entrar no app</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-3xl" />
          <div className="absolute top-60 left-0 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-5 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur text-xs text-muted-foreground mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Sua bússola para começar no digital sem cair em guru
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Comece no digital{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
              sem cair em guru.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O ClickStart AI descobre seu perfil, explica os termos difíceis e monta um plano de ação com IA para você começar com
            <span className="text-foreground"> TikTok Shop, produtos digitais, serviços com IA, YouTube sem aparecer ou micro-SaaS.</span>
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/app">
              <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 shadow-lg shadow-purple-600/30">
                Começar por R$39,90/mês
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#como-funciona">
              <Button size="lg" variant="outline" className="h-12 px-6 border-border/60 bg-card/40 backdrop-blur">
                Ver como funciona
              </Button>
            </a>
          </div>

          <p className="mt-8 text-sm text-muted-foreground max-w-2xl mx-auto">
            Sem promessa falsa. Sem fórmula mágica. Sem enrolação.{" "}
            <span className="text-foreground">Primeiro a IA entende seu perfil, depois mostra o caminho.</span>
          </p>
        </div>
      </section>

      {/* Para quem é */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-purple-300 mb-3">
              <Target className="w-4 h-4" /> PARA QUEM É
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Para quem está começando e se sente perdido no digital.
            </h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Se você quer ganhar dinheiro na internet mas não sabe por onde começar, nunca vendeu nada online,
            não tem audiência e se sente travado com tantos termos em inglês — o ClickStart AI é pra você.
            Não importa se você nunca abriu um Canva ou já tentou várias coisas e desistiu.
          </p>
        </div>
      </section>

      {/* O problema */}
      <section className="border-y border-border/40 bg-card/20">
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs text-amber-300 mb-3">
              <AlertTriangle className="w-4 h-4" /> O PROBLEMA
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Caminhos demais. Clareza de menos.
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Afiliados, TikTok Shop, ebooks, SaaS, YouTube, templates, prompts, tráfego, funil, copy…
              cada vídeo fala uma coisa diferente e cada guru jura ter o método definitivo.
              Você termina o dia mais confuso do que começou — e ainda sem faturar nada.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {["Afiliados", "TikTok Shop", "Ebooks", "SaaS", "YouTube", "Templates", "Prompts", "Tráfego", "Funil", "Copy"].map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full text-sm border border-border/60 bg-background/60 text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs text-teal-300 mb-3 justify-center">
            <Compass className="w-4 h-4" /> COMO FUNCIONA
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Quatro passos para sair do zero com clareza.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative p-6 rounded-2xl border border-border/50 bg-gradient-to-b from-card/60 to-card/20 backdrop-blur hover:border-purple-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 grid place-items-center font-display font-bold text-white shadow-lg shadow-purple-600/20">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O que está incluso */}
      <section className="border-y border-border/40 bg-card/20">
        <div className="max-w-6xl mx-auto px-5 py-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 text-xs text-pink-300 mb-3 justify-center">
              <Map className="w-4 h-4" /> O QUE ESTÁ INCLUSO
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Tudo o que você precisa para começar — em um só lugar.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {includes.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-5 rounded-xl border border-border/50 bg-background/40 backdrop-blur hover:bg-background/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-teal-500/20 grid place-items-center text-purple-300">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section id="preco" className="max-w-6xl mx-auto px-5 py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs text-amber-300 mb-3 justify-center">
            <Sparkles className="w-4 h-4" /> PREÇO FUNDADOR
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
            Comece hoje com o preço de lançamento.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Preço fundador por tempo limitado. Novos assinantes poderão pagar
            <span className="text-foreground"> R$79,90/mês</span> após o período de lançamento.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-400 shadow-2xl shadow-purple-600/20">
            <div className="rounded-3xl bg-gradient-to-b from-card to-background p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-purple-300 font-semibold">ClickStart Plus</p>
                  <h3 className="font-display text-2xl font-bold mt-1">Plano único</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  FUNDADOR
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-5xl font-bold">R$39,90</span>
                <span className="text-muted-foreground">/mês</span>
              </div>

              <ul className="mt-7 space-y-3">
                {planBenefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-300 grid place-items-center">
                      <Check className="w-3 h-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <Link to="/app" className="block mt-8">
                <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-95 shadow-lg shadow-purple-600/30">
                  Começar por R$39,90/mês
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>
                  Você tem <span className="text-foreground">7 dias</span> para testar.
                  Se não fizer sentido para você, pode pedir reembolso.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-teal-500 grid place-items-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span>© {new Date().getFullYear()} ClickStart AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#preco" className="hover:text-foreground">Preço</a>
            <Link to="/app" className="hover:text-foreground">Entrar no app</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
