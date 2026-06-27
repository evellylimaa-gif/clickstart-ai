import { useState } from "react";
import { Package, ArrowLeft, ArrowRight, Copy, Sparkles, CheckCircle2, Check } from "lucide-react";
import { kits, type Kit } from "@/lib/kits";

const accent: Record<Kit["color"], string> = {
  purple: "from-brand-purple to-brand-pink",
  teal: "from-brand-teal to-brand-purple",
  amber: "from-brand-amber to-brand-pink",
  pink: "from-brand-pink to-brand-purple",
};

interface KitsViewProps {
  onGeneratePlan: (kit: Kit) => void;
}

export function KitsView({ onGeneratePlan }: KitsViewProps) {
  const [active, setActive] = useState<Kit | null>(null);
  const [copied, setCopied] = useState(false);

  if (active) {
    return (
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
          <button
            onClick={() => setActive(null)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Todos os kits
          </button>

          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 mb-6">
            <div className={`absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br ${accent[active.color]} opacity-20 blur-3xl`} />
            <div className="relative">
              <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${accent[active.color]} items-center justify-center shadow-lg mb-5`}>
                <Package className="w-7 h-7 text-white" />
              </div>
              <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl font-extrabold text-foreground mb-2">{active.title}</h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-2xl">{active.overview}</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Perfil recomendado</p>
              <p className="text-sm text-foreground mb-6">{active.recommendedProfile}</p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onGeneratePlan(active)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-sm font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-4 h-4" /> Gerar plano com IA
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(active.checklist.map((c) => `- ${c}`).join("\n"));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border text-sm font-semibold text-foreground hover:bg-white/10 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-teal" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Checklist copiado" : "Copiar checklist"}
                </button>
              </div>
            </div>
          </div>

          {/* First action */}
          <div className="rounded-2xl border border-brand-amber/30 bg-brand-amber/5 p-5 mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-amber mb-1">Primeira ação para hoje</p>
            <p className="text-sm text-foreground leading-relaxed">{active.firstAction}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Checklist */}
            <div className="rounded-2xl glass-strong p-5">
              <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-sm font-bold text-foreground mb-3">Checklist</h3>
              <ul className="space-y-2.5">
                {active.checklist.map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-brand-teal mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prompts */}
            <div className="rounded-2xl glass-strong p-5">
              <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-sm font-bold text-foreground mb-3">Prompts e templates</h3>
              <div className="space-y-3">
                {active.prompts.map((p, i) => (
                  <div key={i} className="rounded-xl bg-black/20 border border-border p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-purple mb-1.5">{p.label}</p>
                    <p className="text-[13px] text-foreground leading-relaxed mb-2 whitespace-pre-wrap">{p.prompt}</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(p.prompt)}
                      className="text-[11px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
                    >
                      <Copy className="w-3 h-3" /> Copiar prompt
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber mb-2">Kits prontos</p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Kits Digitais
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Cada kit reúne checklist, prompts e a primeira ação para você começar hoje. Escolha o que combina com seu momento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kits.map((k) => (
            <button
              key={k.id}
              onClick={() => setActive(k)}
              className="group relative text-left p-6 rounded-3xl glass-strong hover:border-brand-amber/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${accent[k.color]} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
              <div className="relative">
                <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${accent[k.color]} items-center justify-center shadow-lg mb-4`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-base font-bold text-foreground mb-2">
                  {k.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">{k.description}</p>
                <p className="text-[11px] text-muted-foreground mb-3">
                  <span className="font-semibold text-foreground/80">Perfil:</span> {k.recommendedProfile}
                </p>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Inclui</p>
                <ul className="space-y-1 mb-4">
                  {k.sections[0].items.slice(0, 3).map((it, i) => (
                    <li key={i} className="text-[12px] text-foreground/80 flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-brand-amber mt-2 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-amber group-hover:gap-3 transition-all">
                  Abrir kit <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
