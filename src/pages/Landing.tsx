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
  Route as RouteIcon,
  Lock,
  Heart,
  Languages,
  FileText,
  Wrench,
  Boxes,
  Video,
  Youtube,
  Zap,
  Star,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const includes = [
  { icon: Brain, label: "Diagnóstico digital com IA", color: "text-purple-300", ring: "from-purple-500/25 to-indigo-500/25" },
  { icon: RouteIcon, label: "Trilhas de monetização", color: "text-teal-300", ring: "from-teal-500/25 to-cyan-500/25" },
  { icon: MessageSquare, label: "Agentes especializados", color: "text-indigo-300", ring: "from-indigo-500/25 to-purple-500/25" },
  { icon: BookOpen, label: "Glossário inteligente", color: "text-cyan-300", ring: "from-cyan-500/25 to-teal-500/25" },
  { icon: History, label: "Histórico de conversas", color: "text-purple-300", ring: "from-purple-500/25 to-pink-500/25" },
  { icon: ClipboardList, label: "Planos de ação salvos", color: "text-amber-300", ring: "from-amber-500/25 to-pink-500/25" },
  { icon: Package, label: "Kits digitais prontos", color: "text-pink-300", ring: "from-pink-500/25 to-purple-500/25" },
  { icon: ShieldCheck, label: "Garantia de 7 dias", color: "text-teal-300", ring: "from-teal-500/25 to-indigo-500/25" },
];

const stepAccents = ["accent-l-purple", "accent-l-indigo", "accent-l-teal", "accent-l-cyan"];

const steps = [
  { n: "1", title: "Faça o diagnóstico", desc: "A IA entende seu perfil, seu tempo e seu ponto de partida." },
  { n: "2", title: "Receba sua trilha", desc: "Produtos digitais, serviços com IA, micro-SaaS, TikTok Shop ou YouTube sem aparecer." },
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

// Strategic order: Produtos Digitais → Serviços IA → Micro-SaaS → TikTok Shop → YouTube
const trailPreviews = [
  { icon: FileText, title: "Produtos digitais", desc: "Ebooks, templates e ofertas que vendem sozinhas.", color: "text-pink-300" },
  { icon: Wrench, title: "Serviços com IA", desc: "Entregas premium usando agentes.", color: "text-teal-300" },
  { icon: Boxes, title: "Micro-SaaS", desc: "Software de assinatura pequeno e rentável.", color: "text-purple-300" },
  { icon: Video, title: "TikTok Shop", desc: "Venda produtos físicos com vídeos simples.", color: "text-cyan-300" },
  { icon: Youtube, title: "YouTube sem aparecer", desc: "Canais com voz, imagem e edição por IA.", color: "text-amber-300" },
];

const kitPreviews = [
  { title: "Kit Lançamento Express", items: ["Checklist de 7 dias", "Roteiro de vídeo", "Modelo de oferta"] },
  { title: "Kit Oferta que Converte", items: ["Estrutura de página", "20 gatilhos", "Garantia pronta"] },
  { title: "Kit Diagnóstico de Nicho", items: ["Validação", "Mapa de dores", "Critérios de público"] },
  { title: "Kit Roteiro de Venda", items: ["Abertura", "Quebra de objeção", "Fechamento"] },
  { title: "Kit Primeira Oferta Digital", items: ["Promessa", "Entregáveis", "Preço inicial"] },
];

const glossaryPreviews = [
  { term: "SaaS", short: "Sistema online vendido por assinatura." },
  { term: "MVP", short: "Versão mínima de um produto, só com o essencial." },
  { term: "Funil", short: "Caminho que leva alguém de visitante a cliente." },
  { term: "Copy", short: "Texto escrito para vender ou convencer." },
  { term: "Lead", short: "Pessoa interessada que ainda não comprou." },
  { term: "CTA", short: "Chamada que pede uma ação clara." },
];

const painCards = [
  {
    icon: Compass,
    title: "Não sei o que vender.",
    text: "Para quem está entre produtos digitais, afiliados, TikTok Shop, SaaS, serviços com IA e várias promessas diferentes.",
    accent: "accent-l-purple",
    iconColor: "text-purple-300",
  },
  {
    icon: Heart,
    title: "Já vi muito conteúdo, mas continuo sem direção.",
    text: "O problema nem sempre é falta de informação. Muitas vezes é falta de sequência, clareza e próximo passo.",
    accent: "accent-l-pink",
    iconColor: "text-pink-300",
  },
  {
    icon: ShieldCheck,
    title: "Quero começar sem cair em promessa falsa.",
    text: "O ClickStart AI organiza os caminhos, traduz os termos difíceis e mostra uma ação prática para começar com mais clareza.",
    accent: "accent-l-teal",
    iconColor: "text-teal-300",
  },
];

const validationCards = [
  { intent: "Quero começar com produtos digitais, mas não sei o que vender.", tag: "Produtos digitais", color: "text-pink-300", accent: "accent-l-pink" },
  { intent: "Quero oferecer serviços com IA, mas não sei como empacotar e cobrar.", tag: "Serviços com IA", color: "text-teal-300", accent: "accent-l-teal" },
  { intent: "Quero algo mais avançado, como micro-SaaS, mas ainda não entendo o básico.", tag: "Micro-SaaS", color: "text-purple-300", accent: "accent-l-purple" },
];


const faqQA: { q: string; a: string }[] = [
  { q: "O ClickStart AI é para mim?", a: "Se você quer começar no digital e se sente sem direção entre tantos caminhos, sim. Foi feito para quem está no zero ou já tentou e ainda não conseguiu avançar." },
  { q: "Isso promete dinheiro rápido?", a: "Não. Nada de fórmula mágica. O ClickStart te ajuda a escolher um caminho honesto e dar os primeiros passos com clareza." },
  { q: "Preciso aparecer em vídeo?", a: "Não. Existem trilhas específicas para quem não quer aparecer, como produtos digitais, YouTube sem aparecer e TikTok Shop sem rosto." },
  { q: "Preciso saber inglês?", a: "Não. Tudo é em português, e o glossário traduz os termos técnicos que aparecem no digital." },
  { q: "Qual a diferença para o ChatGPT?", a: "O ChatGPT é genérico. O ClickStart tem agentes especializados em monetização, trilhas guiadas, glossário e plano de ação salvo no seu painel." },
  { q: "Quais são os planos?", a: "São três: Essencial (R$39,90/mês), Plus (R$79,90/mês, recomendado) e Pro (R$149,90/mês). Você pode trocar de plano quando quiser." },
  { q: "Existe limite de uso?", a: "O ClickStart AI inclui uso mensal suficiente para seguir sua trilha, tirar dúvidas e gerar planos. Para manter a qualidade da plataforma para todos, usamos uma política de uso justo." },
  { q: "Como funciona a garantia de 7 dias?", a: "Você testa por 7 dias. Se não fizer sentido para você, pede reembolso. Sem burocracia." },
  { q: "Posso cancelar quando quiser?", a: "Sim. A assinatura é mensal e o cancelamento é a qualquer momento, direto na sua conta." },
  { q: "O que acontece depois que eu assino?", a: "Você cria sua conta, faz o diagnóstico, recebe sua trilha recomendada e começa a conversar com os agentes." },
];

const plans = [
  {
    id: "essencial",
    name: "ClickStart Essencial",
    price: "R$39,90",
    tagline: "Para começar com direção.",
    cta: "Começar no Essencial",
    recommended: false,
    features: [
      "Diagnóstico digital",
      "Trilhas guiadas",
      "Glossário inteligente",
      "Kits digitais",
      "Planos salvos",
      "Uso justo básico de IA",
    ],
  },
  {
    id: "plus",
    name: "ClickStart Plus",
    price: "R$79,90",
    tagline: "Para executar com mais apoio.",
    cta: "Começar no Plus",
    recommended: true,
    features: [
      "Tudo do Essencial",
      "Mais conversas com agentes",
      "Plano de 7 dias",
      "Roadmap de 30 dias",
      "Revisão de rota",
      "Respostas mais completas",
      "Mais planos salvos",
    ],
  },
  {
    id: "pro",
    name: "ClickStart Pro",
    price: "R$149,90",
    tagline: "Para uso avançado e análises mais profundas.",
    cta: "Começar no Pro",
    recommended: false,
    features: [
      "Tudo do Plus",
      "Mais análises estratégicas",
      "Revisão de ofertas",
      "Análise de nicho",
      "Planos avançados",
      "Uso ampliado de IA",
    ],
  },
];

const SectionLabel = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div className={`section-label-xl ${color} mb-4`}>{children}</div>
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
          <Link to="/" className="flex items-center gap-2.5">
            <div className="logo-mark w-9 h-9 rounded-xl grid place-items-center">
              <Compass className="w-[18px] h-[18px] text-white relative z-10" strokeWidth={2.4} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[15px] tracking-tight">ClickStart <span className="bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-transparent">AI</span></span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">Bússola digital</span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <a href="#como-funciona" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Como funciona</a>
            <a href="#preco" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Preço</a>
            <a href="#faq" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3 py-2">Dúvidas</a>
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/checkout" className="hidden sm:block">
              <Button size="sm" className="btn-gradient text-white border-0">Assinar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-aura" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] rounded-full bg-purple-600/[0.14] blur-[140px]" />
          <div className="absolute top-40 right-0 w-[560px] h-[560px] rounded-full bg-teal-500/[0.12] blur-3xl" />
          <div className="absolute top-60 left-0 w-[460px] h-[460px] rounded-full bg-indigo-600/[0.10] blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-5 pt-14 pb-8 text-center relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur text-xs text-muted-foreground mb-7 shadow-[0_0_20px_-8px_rgba(99,102,241,0.4)]">
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            <span className="font-medium tracking-wide">Sua bússola no digital</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-cyan-300/90 font-semibold">Condição de lançamento</span>
          </div>

          <div className="relative inline-block pb-3">
            <div className="headline-aura" />
            <h1
              className="text-[2.5rem] sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.18] pb-2"
              style={{ fontWeight: 800 }}
            >
              Sua bússola para começar no digital{" "}
              <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent guru-pulse inline-block pb-1">
                sem cair em guru.
              </span>
            </h1>
          </div>

          <p className="mt-6 text-lg text-foreground/90 max-w-2xl mx-auto font-medium">
            Descubra por onde começar antes de comprar outro curso.
          </p>

          <p className="mt-4 text-base sm:text-[17px] text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O ClickStart AI entende seu perfil, traduz os termos difíceis e mostra qual caminho faz mais sentido para você começar:
            <span className="text-foreground"> produtos digitais, serviços com IA, micro-SaaS, TikTok Shop ou YouTube sem aparecer.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-7 btn-gradient text-white border-0 text-[15px]">
                Começar agora
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 btn-stroke-glow text-foreground hover:bg-transparent">
                Tirar dúvidas antes de assinar
              </Button>
            </a>
          </div>

          <p className="mt-5 text-xs text-muted-foreground tracking-wide">
            Sem promessa falsa · Sem fórmula mágica · 7 dias de garantia
          </p>

          {/* Hero product mockup */}
          <div className="mt-12 relative max-w-4xl mx-auto">
            <div className="absolute -inset-8 bg-gradient-to-r from-purple-600/20 via-indigo-600/10 to-teal-500/20 blur-3xl -z-10" />
            <div className="ui-preview rounded-2xl p-4 sm:p-5 text-left">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] text-muted-foreground font-mono">clickstart.ai / app</span>
              </div>

              <div className="grid lg:grid-cols-12 gap-3">
                {/* Left: diagnostic + trail */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="glass-card accent-l-purple card-bloom rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-widest text-purple-300 font-bold">Diagnóstico</div>
                      <span className="text-[10px] text-muted-foreground">76%</span>
                    </div>
                    <div className="mt-1.5 text-sm font-semibold">Seu perfil hoje</div>
                    <div className="mt-2.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[76%] bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400" />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200">Iniciante</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-200">Sem aparecer</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-200">1h/dia</span>
                    </div>
                  </div>

                  <div className="glass-card accent-l-teal card-bloom rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-widest text-teal-300 font-bold">Trilha recomendada</div>
                    <div className="mt-1.5 text-sm font-semibold flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-pink-300" /> Produtos digitais
                    </div>
                    <div className="mt-2.5 text-[11px] text-muted-foreground">Passo 2 de 7 · próximo: definir oferta</div>
                    <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[28%] bg-gradient-to-r from-teal-400 to-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Middle: AI plan response */}
                <div className="lg:col-span-4">
                  <div className="glass-card accent-l-indigo card-bloom rounded-xl p-4 h-full">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Agente · Plano de hoje</div>
                      <Sparkles className="w-3 h-3 text-indigo-300" />
                    </div>
                    <div className="mt-2 space-y-2 text-[12px]">
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-md bg-indigo-500/20 text-indigo-200 grid place-items-center text-[9px] font-bold shrink-0">1</span>
                        <span className="text-foreground/90">Escolher um nicho de partida</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-md bg-indigo-500/20 text-indigo-200 grid place-items-center text-[9px] font-bold shrink-0">2</span>
                        <span className="text-foreground/90">Definir uma promessa simples</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-md bg-indigo-500/20 text-indigo-200 grid place-items-center text-[9px] font-bold shrink-0">3</span>
                        <span className="text-foreground/90">Rascunhar a primeira oferta</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">Modo simples</span>
                      <span className="text-[10px] text-teal-300">Salvar plano →</span>
                    </div>
                  </div>
                </div>

                {/* Right: glossary + saved plan */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="glass-card accent-l-cyan card-bloom rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-widest text-cyan-300 font-bold">Glossário</div>
                    <div className="mt-2 text-sm font-semibold">Funil</div>
                    <p className="mt-1 text-[11px] text-muted-foreground leading-snug">Caminho que leva alguém de visitante a cliente.</p>
                  </div>
                  <div className="glass-card accent-l-amber card-bloom rounded-xl p-4">
                    <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Plano salvo</div>
                    <div className="mt-1.5 text-sm font-semibold">Primeira oferta</div>
                    <div className="mt-1 text-[11px] text-muted-foreground">7 passos · 3 feitos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Problem */}
      <section className="max-w-6xl mx-auto px-5 py-9">
        <div className="glass-card accent-l-amber card-bloom rounded-3xl p-8 sm:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="section-label-xl text-amber-300 mb-3">
                <AlertTriangle className="w-3.5 h-3.5" /> O PROBLEMA
              </div>
              <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontWeight: 800 }}>
                Caminhos demais. Clareza de menos.
              </h2>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground leading-relaxed">
                Afiliados, TikTok Shop, ebooks, SaaS, YouTube, templates, prompts, tráfego, funil, copy. Cada vídeo diz uma coisa diferente. Cada guru jura ter o método definitivo. Você termina o dia mais confuso do que começou, e ainda sem faturar nada.
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
      <section id="como-funciona" className="max-w-6xl mx-auto px-5 py-10 section-tone">
        <div className="text-center max-w-2xl mx-auto mb-9 flex flex-col items-center">
          <SectionLabel color="text-teal-300">COMO FUNCIONA</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Quatro passos para sair do zero com clareza.
          </h2>
          <p className="mt-3 text-muted-foreground">Um sistema guiado, não mais uma lista de aulas.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.n} className={`relative glass-card card-bloom rounded-2xl p-5 fade-up fade-up-${i + 1} ${stepAccents[i]}`}>

              {i < steps.length - 1 && <div className="hidden lg:block step-connector" />}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500 grid place-items-center font-extrabold text-white shadow-lg shadow-indigo-600/30 text-lg relative z-10">
                  {s.n}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Passo {s.n}</span>
              </div>
              <h3 className="mt-4 font-bold text-[15px]">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
          <div className="text-center max-w-2xl mx-auto mb-9 flex flex-col items-center relative">
            <SectionLabel color="text-cyan-300">O QUE ESTÁ INCLUSO</SectionLabel>
            <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
              Um sistema operacional para começar no digital.
            </h2>
            <p className="mt-3 text-muted-foreground">Tudo conectado. Sem precisar montar nada por fora.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
            {includes.map(({ icon: Icon, label, color, ring }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl glass-card card-bloom hover:border-white/20 transition-all">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ring} grid place-items-center ${color} shrink-0 border border-white/5`}>
                  <Icon className="w-[18px] h-[18px]" />
                </div>
                <span className="text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* Previews */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-9 flex flex-col items-center">
          <SectionLabel color="text-purple-300">PRÉVIA PREMIUM</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Veja por cima. O conteúdo completo libera com a assinatura.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <LockedCard accent="accent-l-purple" title="Trilhas de monetização" subtitle="5 caminhos guiados" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-2.5 text-sm">
              {trailPreviews.map(({ icon: Icon, title, desc, color }) => (
                <li key={title} className="flex items-start gap-2.5">
                  <span className={`w-6 h-6 rounded-lg bg-white/[0.04] border border-white/5 grid place-items-center ${color} shrink-0 mt-0.5`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-[13px]">{title}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </LockedCard>

          <LockedCard accent="accent-l-teal" title="Kits Digitais" subtitle="Prontos para aplicar" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-3 text-sm">
              {kitPreviews.map((k) => (
                <li key={k.title} className="pb-2.5 border-b border-white/5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-teal-300" />
                    <p className="font-semibold text-foreground text-[13px]">{k.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 ml-5">{k.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </LockedCard>

          <LockedCard accent="accent-l-cyan" title="Glossário inteligente" subtitle="Sem inglês confuso" onLocked={() => setLockedOpen(true)}>
            <ul className="grid grid-cols-1 gap-2.5 text-sm">
              {glossaryPreviews.map((g) => (
                <li key={g.term} className="rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2">
                  <p className="font-bold text-foreground text-[13px] text-cyan-200">{g.term}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{g.short}</p>
                </li>
              ))}
            </ul>
          </LockedCard>
        </div>
      </section>

      <Divider />

      {/* Por que isso existe */}
      <section className="max-w-6xl mx-auto px-5 py-10">
        <div className="text-center max-w-2xl mx-auto mb-9 flex flex-col items-center">
          <SectionLabel color="text-pink-300">POR QUE ISSO EXISTE</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Dores reais que o ClickStart resolve.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {painCards.map(({ icon: Icon, title, text, accent, iconColor }) => (
            <div key={title} className={`glass-card card-bloom rounded-2xl p-6 ${accent}`}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/5 grid place-items-center ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 font-bold text-lg">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Validação inicial */}
      <section className="max-w-6xl mx-auto px-5 py-8">
        <div className="text-center max-w-2xl mx-auto mb-7 flex flex-col items-center">
          <SectionLabel color="text-indigo-300">VALIDAÇÃO INICIAL</SectionLabel>
          <h2 className="text-2xl sm:text-3xl tracking-tight" style={{ fontWeight: 800 }}>
            Intenções reais de quem está começando.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">Não é depoimento. É o ponto de partida que ouvimos com mais frequência.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {validationCards.map((v) => (
            <div key={v.tag} className={`glass-card card-bloom rounded-2xl p-5 ${v.accent}`}>
              <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold ${v.color}`}>
                <Star className="w-3 h-3" /> {v.tag}
              </span>
              <p className="mt-3 text-[15px] text-foreground/90 leading-relaxed">"{v.intent}"</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Price — três planos */}
      <section id="preco" className="max-w-6xl mx-auto px-5 py-12 relative">
        <div className="text-center max-w-2xl mx-auto mb-9 flex flex-col items-center">
          <SectionLabel color="text-amber-300">PLANOS</SectionLabel>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ fontWeight: 800 }}>
            Escolha como quer começar.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Todos os planos incluem acesso imediato, uso justo mensal de IA e garantia de 7 dias.
          </p>
          <p className="mt-3 text-[11px] text-amber-300/90 tracking-wide">
            Condição de lançamento por tempo limitado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {plans.map((p) => {
            const recommended = p.recommended;
            const Card = (
              <div className={`h-full rounded-[calc(1.5rem-1.5px)] p-7 relative z-10 flex flex-col ${recommended ? "" : "glass-card"}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${recommended ? "text-indigo-300" : "text-muted-foreground"}`}>
                      {p.name}
                    </p>
                    <h3 className="text-lg sm:text-xl font-bold mt-1 leading-snug">{p.tagline}</h3>
                  </div>
                  {recommended && (
                    <span className="amber-glow inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/20 shrink-0">
                      <Zap className="w-3 h-3" /> RECOMENDADO
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[2rem] sm:text-[2.25rem] font-bold leading-none bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent" style={{ fontWeight: 700 }}>
                    {p.price}
                  </span>
                  <span className="text-muted-foreground text-sm">/mês</span>
                </div>

                <ul className="mt-6 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-300 grid place-items-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </span>
                      <span className="text-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link to={`/checkout?plan=${p.id}`} className="block mt-7">
                  <Button className={`w-full h-11 text-[14px] ${recommended ? "btn-gradient text-white border-0" : "bg-white/5 text-foreground border border-white/10 hover:bg-white/10"}`}>
                    {p.cta}
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>

                <div className="mt-4 flex items-start gap-2 text-[11px] text-muted-foreground leading-relaxed">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                  Você acessa hoje. Se não fizer sentido para você, pode pedir reembolso em até 7 dias.
                </div>
              </div>
            );
            return recommended ? (
              <div key={p.id} className="relative">
                <div className="pricing-bloom" />
                <div className="rotating-border h-full">{Card}</div>
              </div>
            ) : (
              <div key={p.id} className="h-full">{Card}</div>
            );
          })}
        </div>

        <p className="text-center mt-6 text-[11px] text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          O pagamento e a recorrência são processados pela plataforma de checkout. O ClickStart AI não armazena dados do seu cartão.
        </p>

        <p className="text-center mt-7 text-xs text-muted-foreground max-w-2xl mx-auto">
          Todos os planos seguem nossa <span className="text-foreground font-semibold">política de uso justo</span>: uso mensal inteligente para manter a qualidade da plataforma para todos.
        </p>
      </section>


      <Divider />

      {/* FAQ assistant inline */}
      <section id="faq" className="max-w-6xl mx-auto px-5 py-12">
        <div className="glass-card accent-l-cyan card-bloom rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
          <div className="grid lg:grid-cols-5 gap-8 relative">
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
                  Começar agora
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-3 space-y-2">
              {faqQA.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className={`rounded-xl glass-card overflow-hidden transition-all ${open ? "border-cyan-400/30" : ""}`}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 hover:bg-white/[0.03] transition-colors"
                    >
                      <span className="text-sm font-semibold">{item.q}</span>
                      <span className={`text-cyan-300 transition-transform ${open ? "rotate-90" : ""}`}>
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
        <div className="relative rounded-3xl glass-card p-10 sm:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-purple-600/25 blur-3xl" />
            <div className="absolute -bottom-20 right-0 w-[500px] h-[300px] rounded-full bg-teal-600/20 blur-3xl" />
            <div className="absolute -bottom-20 left-0 w-[400px] h-[300px] rounded-full bg-indigo-600/15 blur-3xl" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] tracking-widest uppercase font-bold text-cyan-300 mb-5">
            <Zap className="w-3 h-3" /> Acesso de lançamento aberto
          </div>
          <h2 className="text-3xl sm:text-5xl tracking-tight max-w-3xl mx-auto leading-[1.12] pb-1" style={{ fontWeight: 800 }}>
            Comece com <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">clareza</span> hoje.
          </h2>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto text-[15px]">
            O próximo passo não precisa ser mais um curso solto. Escolha o plano que faz sentido para você e comece com clareza.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-7 btn-gradient text-white border-0 text-[15px]">
                Começar agora
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 btn-stroke-glow text-foreground hover:bg-transparent">
                Tirar dúvidas antes de assinar
              </Button>
            </a>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">7 dias de garantia · cancela quando quiser</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-4">
        <div className="gradient-divider" />
        <div className="max-w-6xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2.5">
            <div className="logo-mark w-7 h-7 rounded-lg grid place-items-center">
              <Compass className="w-3.5 h-3.5 text-white relative z-10" strokeWidth={2.4} />
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
              Para acessar trilhas completas, kits e agentes, é preciso assinar. O preço de lançamento segue ativo.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Link to="/checkout">
                <Button className="w-full h-11 btn-gradient text-white border-0">
                  Ver planos
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
    <div className={`relative rounded-2xl glass-card card-bloom p-6 overflow-hidden ${accent}`}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{subtitle}</p>
          <h3 className="text-lg font-bold mt-1">{title}</h3>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 border border-indigo-400/30 shadow-[0_0_12px_-2px_rgba(99,102,241,0.5)]">
          <Lock className="w-3 h-3" /> PLUS
        </span>
      </div>
      <div className="text-muted-foreground">{children}</div>
      <div className="mt-5 pt-4 border-t border-white/5">
        <button onClick={onLocked} className="w-full">
          <span className="block w-full text-center text-sm font-semibold px-4 py-2.5 rounded-lg btn-stroke text-foreground">
            Desbloquear com ClickStart Plus
          </span>
        </button>
      </div>
    </div>
  );
}
