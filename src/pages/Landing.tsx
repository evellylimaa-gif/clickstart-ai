import { useState } from "react";
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
  Lock,
  HelpCircle,
  Heart,
  Languages,
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
  { icon: ShieldCheck, label: "Garantia de 7 dias" },
];

const stepAccents = ["accent-l-purple", "accent-l-teal", "accent-l-amber", "accent-l-pink"];

const steps = [
  { n: "1", title: "Faça o diagnóstico", desc: "A IA entende seu perfil, seu tempo e seu ponto de partida." },
  { n: "2", title: "Receba sua trilha", desc: "TikTok Shop, produtos digitais, serviços com IA, YouTube ou micro-SaaS." },
  { n: "3", title: "Converse com os agentes", desc: "Tire dúvidas com especialistas em monetização e prompts." },
  { n: "4", title: "Transforme em plano", desc: "Cada conversa vira passos práticos salvos no seu painel." },
];

const planBenefits = [
  "Diagnóstico digital com IA",
  "Agentes especializados",
  "Trilhas guiadas",
  "Glossário completo",
  "Kits digitais",
  "Histórico de conversas",
  "Planos salvos",
  "Garantia de 7 dias",
];

const trailPreviews = [
  { title: "TikTok Shop sem aparecer", desc: "Venda produtos físicos com vídeos simples." },
  { title: "Produtos digitais", desc: "Ebooks, templates e ofertas que vendem sozinhas." },
  { title: "Serviços com IA", desc: "Entregas premium usando agentes." },
  { title: "Micro-SaaS", desc: "Software de assinatura pequeno e rentável." },
];

const kitPreviews = [
  { title: "Kit Lançamento Express", items: ["Checklist de 7 dias", "Roteiro de vídeo", "Modelo de oferta"] },
  { title: "Kit Conteúdo que Vende", items: ["20 ganchos prontos", "CTAs", "Calendário semanal"] },
  { title: "Kit Diagnóstico de Nicho", items: ["Validação", "Mapa de dores", "Critérios de público"] },
];

const glossaryPreviews = [
  { term: "SaaS", short: "Sistema online vendido por assinatura." },
  { term: "MVP", short: "Versão mínima de um produto, só com o essencial." },
  { term: "Funil", short: "Caminho que leva alguém de visitante a cliente." },
  { term: "Copy", short: "Texto escrito para vender ou convencer." },
];

const painCards = [
  {
    icon: Compass,
    title: "Não sei por onde começar",
    text: "A pessoa quer entrar no digital, mas fica perdida entre afiliados, TikTok Shop, ebooks, SaaS, YouTube e mil promessas diferentes.",
    accent: "accent-l-purple",
    iconColor: "text-purple-300",
  },
  {
    icon: Heart,
    title: "Comprei conteúdo, mas continuo travada",
    text: "O problema nem sempre é falta de informação. Muitas vezes é falta de direção, sequência e próximo passo.",
    accent: "accent-l-pink",
    iconColor: "text-pink-300",
  },
  {
    icon: Languages,
    title: "Os termos parecem outro idioma",
    text: "Funil, copy, SaaS, MVP, lead, CTA, tráfego. O ClickStart traduz esses termos e mostra quando eles realmente importam.",
    accent: "accent-l-teal",
    iconColor: "text-teal-300",
  },
];

const faqQA: { q: string; a: string }[] = [
  { q: "O ClickStart AI é para mim?", a: "Se você quer começar no digital e se sente perdida entre tantos caminhos, sim. Foi feito para quem está no zero ou já tentou e desistiu." },
  { q: "Isso promete dinheiro rápido?", a: "Não. Nada de fórmula mágica. O ClickStart te ajuda a escolher um caminho honesto e dar os primeiros passos com clareza." },
  { q: "Preciso aparecer em vídeo?", a: "Não. Existem trilhas específicas para quem não quer aparecer, como TikTok Shop sem rosto, YouTube sem aparecer e produtos digitais." },
  { q: "Preciso saber inglês?", a: "Não. Tudo é em português, e o glossário traduz os termos técnicos que aparecem no digital." },
  { q: "Qual a diferença para o ChatGPT?", a: "O ChatGPT é genérico. O ClickStart tem agentes especializados em monetização, trilhas guiadas, glossário e plano de ação salvo no seu painel." },
  { q: "O que recebo por R$39,90?", a: "Acesso a todos os agentes, trilhas, diagnóstico, glossário, kits digitais, histórico de conversas e planos salvos." },
  { q: "Como funciona a garantia de 7 dias?", a: "Você testa por 7 dias. Se não fizer sentido para você, pede reembolso. Sem burocracia." },
  { q: "Posso cancelar quando quiser?", a: "Sim. A assinatura é mensal e o cancelamento é a qualquer momento, direto na sua conta." },
  { q: "Serve para quem começa do zero?", a: "Sim. O ponto de partida do ClickStart é justamente quem nunca vendeu nada online." },
  { q: "O que acontece depois que eu assino?", a: "Você cria sua conta, faz o diagnóstico, recebe sua trilha recomendada e começa a conversar com os agentes." },
];

const SectionLabel = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div className={`section-label section-dot ${color} mb-4 justify-center`}>{children}</div>
);

const Divider = () => (
  <div className="max-w-6xl mx-auto px-5">
    <div className="gradient-divider" />
  </div>
);

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lockedOpen, setLockedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-foreground relative">
      <div className="noise-overlay fixed inset-0 z-[1]" />

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#020617]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 grid place-items-center shadow-lg shadow-indigo-600/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">ClickStart AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="#como-funciona" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Como funciona</a>
            <a href="#preco" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Preço</a>
            <a href="#faq" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Dúvidas</a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/checkout" className="hidden sm:block">
              <Button size="sm" className="btn-gradient text-white border-0">
                Assinar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-aura" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-purple-600/[0.10] blur-[120px]" />
          <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/[0.10] blur-3xl" />
          <div className="absolute top-60 left-0 w-[400px] h-[400px] rounded-full bg-indigo-600/[0.08] blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-5 pt-16 pb-10 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-xs text-muted-foreground mb-6">
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            Sua bússola no digital
          </div>

          <div className="relative inline-block">
            <div className="headline-aura" />
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]" style={{ fontWeight: 800 }}>
              Sua bússola para começar no digital{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-300 bg-clip-text text-transparent guru-pulse inline-block">
                sem cair em guru.
              </span>
            </h1>
          </div>

          <p className="mt-5 text-lg text-foreground/90 max-w-2xl mx-auto">
            Descubra por onde começar antes de comprar outro curso.
          </p>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O ClickStart AI entende seu perfil, traduz os termos difíceis e mostra qual caminho faz mais sentido para você começar:
            <span className="text-foreground"> TikTok Shop, produtos digitais, serviços com IA, YouTube sem aparecer ou micro-SaaS.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-6 btn-gradient text-white border-0">
                Assinar por R$39,90/mês
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 btn-stroke text-foreground hover:bg-transparent">
                Tirar dúvidas antes de assinar
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Sem promessa falsa. Sem fórmula mágica. Sem enrolação.
          </p>

          {/* Floating UI preview mockup */}
          <div className="mt-12 relative max-w-3xl mx-auto">
            <div className="ui-preview rounded-2xl p-4 text-left">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] text-muted-foreground">clickstart.ai / app</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="glass-card accent-l-purple rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Diagnóstico</div>
                  <div className="mt-1 text-sm font-semibold">Seu perfil hoje</div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-purple-500 to-teal-400" />
                  </div>
                </div>
                <div className="glass-card accent-l-teal rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-teal-300 font-bold">Trilha</div>
                  <div className="mt-1 text-sm font-semibold">TikTok Shop sem rosto</div>
                  <div className="mt-2 text-[11px] text-muted-foreground">Passo 2 de 7</div>
                </div>
                <div className="glass-card accent-l-amber rounded-xl p-3">
                  <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Agente</div>
                  <div className="mt-1 text-sm font-semibold">Plano de hoje</div>
                  <div className="mt-2 text-[11px] text-muted-foreground">3 passos prontos para aplicar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Problem */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="glass-card accent-l-amber rounded-3xl p-8 sm:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="section-label section-dot text-amber-300 mb-3">
                <AlertTriangle className="w-4 h-4" /> O PROBLEMA
              </div>
              <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontWeight: 800 }}>
                Caminhos demais. Clareza de menos.
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed">
                Afiliados, TikTok Shop, ebooks, SaaS, YouTube, templates, prompts, tráfego, funil, copy…
                cada vídeo fala uma coisa diferente e cada guru jura ter o método definitivo.
                Você termina o dia mais confuso do que começou, e ainda sem faturar nada.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Afiliados", "TikTok Shop", "Ebooks", "SaaS", "YouTube", "Templates", "Prompts", "Tráfego", "Funil", "Copy"].map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-xs border border-white/10 bg-[#020617]/60 text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* How it works */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <SectionLabel color="text-teal-300">COMO FUNCIONA</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Quatro passos para sair do zero com clareza.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className={`glass-card rounded-2xl p-5 ${stepAccents[i]}`}>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 grid place-items-center font-bold text-white shadow-lg shadow-indigo-600/20">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionLabel color="text-cyan-300">O QUE ESTÁ INCLUSO</SectionLabel>
            <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
              Tudo o que você precisa, em um só lugar.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {includes.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl glass-card">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/25 to-teal-500/25 grid place-items-center text-indigo-300 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Previews */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <SectionLabel color="text-purple-300">PRÉVIA DO QUE VEM DEPOIS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Veja por cima. O conteúdo completo libera com a assinatura.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <LockedCard accent="accent-l-purple" title="Trilhas de monetização" subtitle="5 caminhos guiados" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-2 text-sm">
              {trailPreviews.map((t) => (
                <li key={t.title} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </LockedCard>

          <LockedCard accent="accent-l-teal" title="Kits Digitais" subtitle="Prontos para aplicar" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-3 text-sm">
              {kitPreviews.map((k) => (
                <li key={k.title}>
                  <p className="font-semibold text-foreground text-sm">{k.title}</p>
                  <p className="text-xs text-muted-foreground">{k.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </LockedCard>

          <LockedCard accent="accent-l-cyan" title="Glossário inteligente" subtitle="Sem inglês confuso" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-3 text-sm">
              {glossaryPreviews.map((g) => (
                <li key={g.term}>
                  <p className="font-semibold text-foreground">{g.term}</p>
                  <p className="text-xs text-muted-foreground">{g.short}</p>
                </li>
              ))}
            </ul>
          </LockedCard>
        </div>
      </section>

      <Divider />

      {/* Pain validation */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <SectionLabel color="text-pink-300">DORES REAIS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Dores reais que o ClickStart resolve.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {painCards.map(({ icon: Icon, title, text, accent, iconColor }) => (
            <div key={title} className={`glass-card rounded-2xl p-6 ${accent}`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 grid place-items-center ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-semibold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          Sem depoimento inventado. As primeiras assinantes entram como fundadoras e ajudam a moldar a plataforma.
        </p>
      </section>

      <Divider />

      {/* Price */}
      <section id="preco" className="max-w-6xl mx-auto px-5 py-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <SectionLabel color="text-amber-300">PREÇO FUNDADOR</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Entre agora com preço fundador.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quem entrar no início mantém <span className="text-foreground">R$39,90/mês</span> enquanto a assinatura estiver ativa.
            Depois do lançamento, novos assinantes poderão pagar <span className="text-foreground">R$79,90/mês</span>.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rotating-border">
            <div className="rounded-[calc(1.5rem-1.5px)] p-8 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">ClickStart Plus</p>
                  <h3 className="text-2xl font-bold mt-1">Plano único</h3>
                </div>
                <span className="amber-glow px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-300">
                  FUNDADOR
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold" style={{ fontWeight: 800 }}>R$39,90</span>
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

              <Link to="/checkout" className="block mt-8">
                <Button className="w-full h-12 btn-gradient text-white border-0">
                  Assinar por R$39,90/mês
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

      <Divider />

      {/* FAQ assistant inline */}
      <section id="faq" className="max-w-6xl mx-auto px-5 py-12">
        <div className="glass-card accent-l-cyan rounded-3xl p-6 sm:p-10">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <SectionLabel color="text-cyan-300">ASSISTENTE DE COMPRA</SectionLabel>
              <h2 className="text-3xl tracking-tight" style={{ fontWeight: 800 }}>
                Tire suas dúvidas antes de assinar.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Um assistente honesto e direto, sem promessa de dinheiro rápido. Clique em uma pergunta para ver a resposta agora mesmo.
              </p>
              <Link to="/checkout" className="inline-block mt-6">
                <Button className="btn-gradient text-white border-0">
                  Assinar por R$39,90/mês
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-3 space-y-2">
              {faqQA.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="rounded-xl glass-card overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm font-medium">{item.q}</span>
                      <span className={`text-indigo-300 transition-transform ${open ? "rotate-90" : ""}`}>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </button>
                    {open && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-white/5 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="relative rounded-3xl glass-card p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/20 blur-3xl" />
            <div className="absolute -bottom-20 right-0 w-[500px] h-[300px] rounded-full bg-teal-600/15 blur-3xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl tracking-tight max-w-3xl mx-auto" style={{ fontWeight: 800 }}>
            Comece com clareza hoje.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            O próximo passo não precisa ser mais um curso solto. Entre como fundadora e construa do seu jeito.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-6 btn-gradient text-white border-0">
                Assinar por R$39,90/mês
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 btn-stroke text-foreground hover:bg-transparent">
                Tirar dúvidas antes
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-4">
        <div className="gradient-divider" />
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-teal-500 grid place-items-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span>© {new Date().getFullYear()} ClickStart AI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#preco" className="hover:text-foreground">Preço</a>
            <a href="#faq" className="hover:text-foreground">Dúvidas</a>
            <Link to="/login" className="hover:text-foreground">Entrar</Link>
          </div>
        </div>
      </footer>

      {/* Locked modal */}
      {lockedOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur-sm px-4" onClick={() => setLockedOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F172A] to-[#020617] p-6 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <Lock className="w-3 h-3" /> Conteúdo Plus
            </div>
            <h3 className="mt-4 text-xl font-bold">Este recurso faz parte do ClickStart Plus.</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Para acessar trilhas completas, kits e agentes, é preciso assinar. O preço fundador segue ativo.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/checkout">
                <Button className="w-full h-11 btn-gradient text-white border-0">
                  Assinar por R$39,90/mês
                </Button>
              </Link>
              <button
                onClick={() => {
                  setLockedOpen(false);
                  setTimeout(() => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }), 50);
                }}
                className="text-sm text-muted-foreground hover:text-foreground py-2"
              >
                Tirar dúvidas antes de assinar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LockedCard({
  title,
  subtitle,
  children,
  onLocked,
  accent = "accent-l-purple",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onLocked: () => void;
  accent?: string;
}) {
  return (
    <div className={`relative rounded-2xl glass-card p-6 overflow-hidden ${accent}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">{subtitle}</p>
          <h3 className="text-lg font-bold mt-1">{title}</h3>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          <Lock className="w-3 h-3" /> Plus
        </span>
      </div>
      <div className="text-muted-foreground">{children}</div>
      <div className="mt-5 pt-4 border-t border-white/5">
        <button onClick={onLocked} className="w-full">
          <span className="block w-full text-center text-sm font-medium px-4 py-2 rounded-lg btn-stroke text-foreground">
            Desbloquear com ClickStart Plus
          </span>
        </button>
      </div>
    </div>
  );
}
