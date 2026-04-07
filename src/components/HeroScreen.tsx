import { Zap, TrendingUp, Rocket } from "lucide-react";

interface PathCard {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  agentIdx: number;
  prefill: string;
  gradient: string;
}

const paths: PathCard[] = [
  {
    icon: Zap,
    title: "Quero ganhar dinheiro RÁPIDO",
    subtitle: "Primeiros R$ em até 7 dias",
    agentIdx: 0,
    prefill: "Quero ganhar dinheiro rápido. Tenho pouco tempo e preciso dos primeiros reais em até 7 dias. Me dê um plano de ação imediato.",
    gradient: "from-[hsl(45_96%_53%)] to-[hsl(32_95%_44%)]",
  },
  {
    icon: TrendingUp,
    title: "Quero construir renda CONSISTENTE",
    subtitle: "Sistema que cresce todo mês",
    agentIdx: 1,
    prefill: "Quero construir uma renda online consistente que cresça mês a mês. Me mostre sistemas e estratégias para crescimento sustentável.",
    gradient: "from-primary to-[hsl(263_80%_65%)]",
  },
  {
    icon: Rocket,
    title: "Quero criar um NEGÓCIO escalável",
    subtitle: "Renda automática com IA",
    agentIdx: 2,
    prefill: "Quero criar um negócio digital escalável usando IA. Me ajude a arquitetar um sistema de renda automática.",
    gradient: "from-[hsl(263_70%_76%)] to-[hsl(174_84%_32%)]",
  },
];

interface HeroScreenProps {
  onSelectPath: (agentIdx: number, prefill: string) => void;
}

export function HeroScreen({ onSelectPath }: HeroScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-8">
      <div className="max-w-4xl mx-auto w-full text-center">
        {/* Hero banner */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" />
            Plataforma de Monetização com IA
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-4">
            Seu próximo{" "}
            <span className="text-gold">R$1.000</span>{" "}
            online{" "}
            <br className="hidden sm:block" />
            começa aqui
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto">
            Escolha seu caminho e receba um plano de ação completo em segundos.
          </p>
        </div>

        {/* Path cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {paths.map((path) => (
            <button
              key={path.title}
              onClick={() => onSelectPath(path.agentIdx, path.prefill)}
              className="group relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <path.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-base font-bold text-foreground mb-2 leading-snug">
                {path.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {path.subtitle}
              </p>

              {/* Hover arrow */}
              <div className="mt-4 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Começar agora →
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
