import { ClipboardList, Sparkles, Calendar, Map, Lightbulb, FileText, Tag, CheckSquare } from "lucide-react";

interface PlanosViewProps {
  onCreatePlan: () => void;
}

const categories = [
  { icon: Calendar, label: "Planos de 7 dias", desc: "Tarefas diárias para destravar a primeira semana." },
  { icon: Map, label: "Roadmaps de 30 dias", desc: "Visão do mês inteiro, por etapas claras." },
  { icon: Lightbulb, label: "Ideias de produto", desc: "Conceitos validados para começar a criar." },
  { icon: FileText, label: "Roteiros", desc: "Vídeos, posts e páginas prontos para publicar." },
  { icon: Tag, label: "Ofertas", desc: "Promessas, bônus e estrutura de venda." },
  { icon: CheckSquare, label: "Checklists", desc: "Passos práticos para revisar antes de publicar." },
];

export function PlanosView({ onCreatePlan }: PlanosViewProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink mb-2">Sua biblioteca</p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-brand-pink" /> Planos Salvos
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Aqui ficam todos os planos, roteiros e checklists que a IA gerar para você. Tudo organizado para continuar de onde parou.
          </p>
        </div>

        {/* Empty state */}
        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10 mb-8 text-center">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple opacity-20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-pink to-brand-purple items-center justify-center shadow-lg mb-5">
              <ClipboardList className="w-8 h-8 text-white" />
            </div>
            <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-2xl font-bold text-foreground mb-2">
              Você ainda não salvou nenhum plano.
            </h2>
            <p className="text-base text-muted-foreground max-w-xl mx-auto mb-6">
              Quando a IA gerar uma estratégia, roteiro, checklist ou plano de ação, você poderá salvar aqui para continuar depois.
            </p>
            <button
              onClick={onCreatePlan}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-sm font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform"
            >
              <Sparkles className="w-4 h-4" /> Criar meu primeiro plano
            </button>
          </div>
        </div>

        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
          Tipos de plano que você poderá salvar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.label} className="rounded-2xl glass-strong p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-pink/30 to-brand-purple/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-brand-pink" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-0.5">{c.label}</p>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
