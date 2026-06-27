import { Compass, ArrowRight, Sparkles } from "lucide-react";

interface DiagnosticoViewProps {
  onStart: () => void;
}

const steps = [
  { n: 1, title: "Responda perguntas rápidas", desc: "São poucas perguntas sobre rotina, habilidades e o que você gosta de fazer." },
  { n: 2, title: "Receba seu perfil", desc: "Criador, vendedor, freelancer ou automatizador. Sem rótulo vazio, com explicação clara." },
  { n: 3, title: "Veja a trilha recomendada", desc: "O caminho de monetização que faz mais sentido para o seu momento." },
  { n: 4, title: "Comece pelo primeiro passo", desc: "Sai do diagnóstico já com uma ação prática para fazer hoje." },
];

const profiles = [
  { tag: "Criador", desc: "Curte gravar, escrever ou desenhar. Vende com conteúdo." },
  { tag: "Vendedor", desc: "Gosta de conversar, indicar e fechar. Vende com relacionamento." },
  { tag: "Freelancer", desc: "Prefere atender cliente direto, resolver dor específica." },
  { tag: "Automatizador", desc: "Gosta de processo, ferramenta e construir algo recorrente." },
];

export function DiagnosticoView({ onStart }: DiagnosticoViewProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10 mb-8">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-2">Diagnóstico Digital</p>
            <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 flex items-center gap-3">
              <Compass className="w-9 h-9 text-brand-purple" /> Descubra seu perfil em 2 minutos
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mb-6 leading-relaxed">
              O Diagnóstico entende como você funciona e mostra qual caminho no digital combina com seu momento, sem te empurrar para tendência.
            </p>
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-sm font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="w-4 h-4" /> Começar diagnóstico
            </button>
          </div>
        </div>

        <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-lg font-bold text-foreground mb-3">Como funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl glass-strong p-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-sm font-bold mb-3">
                {s.n}
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-lg font-bold text-foreground mb-3">Os 4 perfis possíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {profiles.map((p) => (
            <div key={p.tag} className="rounded-2xl glass-strong p-5 flex items-start gap-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-brand-purple/20 text-brand-purple">
                {p.tag}
              </span>
              <p className="text-[13px] text-muted-foreground leading-relaxed flex-1">{p.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-base font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.01] transition-transform"
        >
          Quero descobrir meu perfil agora <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
