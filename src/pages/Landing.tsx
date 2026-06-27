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
  },
  {
    icon: Heart,
    title: "Comprei conteúdo, mas continuo travada",
    text: "O problema nem sempre é falta de informação. Muitas vezes é falta de direção, sequência e próximo passo.",
  },
  {
    icon: Languages,
    title: "Os termos parecem outro idioma",
    text: "Funil, copy, SaaS, MVP, lead, CTA, tráfego. O ClickStart traduz esses termos e mostra quando eles realmente importam.",
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

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lockedOpen, setLockedOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-foreground">
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
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-600/20">
                Assinar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full bg-indigo-600/25 blur-[120px]" />
          <div className="absolute top-40 right-0 w-[500px] h-[500px] rounded-full bg-teal-500/15 blur-3xl" />
          <div className="absolute top-60 left-0 w-[400px] h-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-10 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-600/20 blur-3xl" />
        </div>

        <div className="max-w-5xl mx-auto px-5 pt-16 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur text-xs text-muted-foreground mb-6">
            <Compass className="w-3.5 h-3.5 text-teal-300" />
            Sua bússola no digital
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Sua bússola para começar no digital{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-teal-300 bg-clip-text text-transparent">
              sem cair em guru.
            </span>
          </h1>

          <p className="mt-5 text-lg text-foreground/90 max-w-2xl mx-auto">
            Descubra por onde começar antes de comprar outro curso.
          </p>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            O ClickStart AI entende seu perfil, traduz os termos difíceis e mostra qual caminho faz mais sentido para você começar:
            <span className="text-foreground"> TikTok Shop, produtos digitais, serviços com IA, YouTube sem aparecer ou micro-SaaS.</span>
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30">
                Assinar por R$39,90/mês
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 border-white/10 bg-white/5 backdrop-blur hover:bg-white/10">
                Tirar dúvidas antes de assinar
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Sem promessa falsa. Sem fórmula mágica. Sem enrolação.
          </p>
        </div>
      </section>

      {/* Problem */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] to-[#0F172A]/40 backdrop-blur p-8 sm:p-10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="inline-flex items-center gap-2 text-xs text-amber-300 mb-3">
                <AlertTriangle className="w-4 h-4" /> O PROBLEMA
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
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

      {/* How it works */}
      <section id="como-funciona" className="max-w-6xl mx-auto px-5 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-teal-300 mb-3 justify-center">
            <Compass className="w-4 h-4" /> COMO FUNCIONA
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Quatro passos para sair do zero com clareza.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="p-5 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F172A] to-[#0F172A]/40 backdrop-blur hover:border-indigo-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-500 grid place-items-center font-bold text-white shadow-lg shadow-indigo-600/20">
                {s.n}
              </div>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="rounded-3xl border border-white/10 bg-[#0F172A]/60 backdrop-blur p-8 sm:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs text-cyan-300 mb-3 justify-center">
              <Map className="w-4 h-4" /> O QUE ESTÁ INCLUSO
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Tudo o que você precisa, em um só lugar.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {includes.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-[#020617]/70 hover:bg-[#020617] transition-colors">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-teal-500/20 grid place-items-center text-indigo-300 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previews */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-purple-300 mb-3 justify-center">
            <Lock className="w-4 h-4" /> PRÉVIA DO QUE VEM DEPOIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Veja por cima. O conteúdo completo libera com a assinatura.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <LockedCard title="Trilhas de monetização" subtitle="5 caminhos guiados" onLocked={() => setLockedOpen(true)}>
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

          <LockedCard title="Kits Digitais" subtitle="Prontos para aplicar" onLocked={() => setLockedOpen(true)}>
            <ul className="space-y-3 text-sm">
              {kitPreviews.map((k) => (
                <li key={k.title}>
                  <p className="font-semibold text-foreground text-sm">{k.title}</p>
                  <p className="text-xs text-muted-foreground">{k.items.join(" · ")}</p>
                </li>
              ))}
            </ul>
          </LockedCard>

          <LockedCard title="Glossário inteligente" subtitle="Sem inglês confuso" onLocked={() => setLockedOpen(true)}>
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

      {/* Pain validation */}
      <section className="max-w-6xl mx-auto px-5 py-14">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-pink-300 mb-3 justify-center">
            <Target className="w-4 h-4" /> DORES REAIS
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Dores reais que o ClickStart resolve.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {painCards.map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F172A] to-[#0F172A]/40 backdrop-blur">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 grid place-items-center text-purple-300">
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

      {/* Price */}
      <section id="preco" className="max-w-6xl mx-auto px-5 py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs text-amber-300 mb-3 justify-center">
            <Sparkles className="w-4 h-4" /> PREÇO FUNDADOR
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Entre agora com preço fundador.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Quem entrar no início mantém <span className="text-foreground">R$39,90/mês</span> enquanto a assinatura estiver ativa.
            Depois do lançamento, novos assinantes poderão pagar <span className="text-foreground">R$79,90/mês</span>.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 shadow-2xl shadow-indigo-600/20">
            <div className="rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#020617] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">ClickStart Plus</p>
                  <h3 className="text-2xl font-bold mt-1">Plano único</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                  FUNDADOR
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold">R$39,90</span>
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
                <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30">
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

      {/* FAQ assistant inline */}
      <section id="faq" className="max-w-6xl mx-auto px-5 py-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F172A] via-[#0F172A] to-indigo-950/40 p-6 sm:p-10">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 text-xs text-cyan-300 mb-3">
                <HelpCircle className="w-4 h-4" /> ASSISTENTE DE COMPRA
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Tire suas dúvidas antes de assinar.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Um assistente honesto e direto, sem promessa de dinheiro rápido. Clique em uma pergunta para ver a resposta agora mesmo.
              </p>
              <Link to="/checkout" className="inline-block mt-6">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 shadow-lg shadow-indigo-600/30">
                  Assinar por R$39,90/mês
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-3 space-y-2">
              {faqQA.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div key={item.q} className="rounded-xl border border-white/10 bg-[#020617]/70 overflow-hidden">
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

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/15 via-[#0F172A] to-teal-600/15 p-8 sm:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-600/20 blur-3xl" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl mx-auto">
            Comece com clareza hoje.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            O próximo passo não precisa ser mais um curso solto. Entre como fundadora e construa do seu jeito.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/checkout">
              <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30">
                Assinar por R$39,90/mês
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a href="#faq">
              <Button size="lg" variant="outline" className="h-12 px-6 border-white/10 bg-white/5 hover:bg-white/10">
                Tirar dúvidas antes
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5">
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
                <Button className="w-full h-11 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95">
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
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onLocked: () => void;
}) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-gradient-to-b from-[#0F172A] to-[#0F172A]/60 backdrop-blur p-6 overflow-hidden">
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
          <span className="block w-full text-center text-sm font-medium px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            Desbloquear com ClickStart Plus
          </span>
        </button>
      </div>
    </div>
  );
}
