import { useMemo, useState } from "react";
import { ClipboardList, Sparkles, Calendar, Map, Lightbulb, FileText, Tag, CheckSquare, Search, Trash2, Copy, Check } from "lucide-react";
import { useSavedPlans, type SavedPlanCategory } from "@/hooks/use-saved-plans";

interface PlanosViewProps {
  onCreatePlan: () => void;
}

const categoryMeta: Record<SavedPlanCategory, { icon: React.ElementType; color: string; desc: string }> = {
  "Planos de 7 dias": { icon: Calendar, color: "text-brand-purple", desc: "Tarefas diárias para destravar a primeira semana." },
  "Roadmaps de 30 dias": { icon: Map, color: "text-brand-teal", desc: "Visão do mês inteiro, por etapas claras." },
  "Ideias de produto": { icon: Lightbulb, color: "text-brand-amber", desc: "Conceitos validados para começar a criar." },
  "Roteiros": { icon: FileText, color: "text-brand-pink", desc: "Vídeos, posts e páginas prontos para publicar." },
  "Ofertas": { icon: Tag, color: "text-brand-amber", desc: "Promessas, bônus e estrutura de venda." },
  "Checklists": { icon: CheckSquare, color: "text-brand-teal", desc: "Passos práticos para revisar antes de publicar." },
  "Pesquisas de nicho": { icon: Search, color: "text-brand-purple", desc: "Mapeamentos de público, dor e concorrência." },
};

const allCategories = Object.keys(categoryMeta) as SavedPlanCategory[];

export function PlanosView({ onCreatePlan }: PlanosViewProps) {
  const { plans, removePlan, clearPlans } = useSavedPlans();
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"Todos" | SavedPlanCategory>("Todos");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const grouped = useMemo(() => {
    const map = new Map<SavedPlanCategory, typeof plans>();
    for (const cat of allCategories) map.set(cat, []);
    for (const p of plans) {
      if (filter !== "Todos" && p.category !== filter) continue;
      const arr = map.get(p.category) || [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return map;
  }, [plans, filter]);

  const empty = plans.length === 0;

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-pink mb-2">Sua biblioteca</p>
            <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-brand-pink" /> Planos Salvos
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl">
              Tudo que você salvou pelos agentes fica organizado aqui por tipo, pronto para continuar de onde parou.
            </p>
          </div>
          {!empty && (
            <button
              onClick={clearPlans}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Limpar tudo
            </button>
          )}
        </div>

        {empty ? (
          <>
            <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-10 mb-8 text-center">
              <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple opacity-20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-teal items-center justify-center shadow-lg mb-5">
                  <ClipboardList className="w-8 h-8 text-white" />
                </div>
                <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-2xl font-bold text-foreground mb-2">
                  Você ainda não salvou nenhum plano.
                </h2>
                <p className="text-base text-muted-foreground max-w-xl mx-auto mb-6">
                  Quando a IA gerar uma estratégia, roteiro, checklist ou plano de ação, é só clicar em "Salvar plano" e ele aparece aqui.
                </p>
                <button
                  onClick={onCreatePlan}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-teal text-white text-sm font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform"
                >
                  <Sparkles className="w-4 h-4" /> Criar meu primeiro plano
                </button>
              </div>
            </div>

            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Tipos de plano que você poderá salvar
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allCategories.map((cat) => {
                const meta = categoryMeta[cat];
                const Icon = meta.icon;
                return (
                  <div key={cat} className="rounded-2xl glass-strong p-4 flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple/20 to-brand-teal/20 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${meta.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">{cat}</p>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">{meta.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["Todos", ...allCategories] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    filter === c
                      ? "bg-gradient-to-r from-brand-purple to-brand-teal text-white shadow"
                      : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-border"
                  }`}
                >
                  {c} {c !== "Todos" && plans.filter((p) => p.category === c).length > 0 && (
                    <span className="ml-1 opacity-70">({plans.filter((p) => p.category === c).length})</span>
                  )}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {allCategories.map((cat) => {
                const list = grouped.get(cat) || [];
                if (list.length === 0) return null;
                const meta = categoryMeta[cat];
                const Icon = meta.icon;
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Icon className={`w-4 h-4 ${meta.color}`} />
                      <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-sm font-bold text-foreground">{cat}</h2>
                      <span className="text-[11px] text-muted-foreground">· {list.length}</span>
                    </div>
                    <div className="space-y-2.5">
                      {list.map((p) => {
                        const open = openId === p.id;
                        const date = new Date(p.createdAt);
                        const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
                        return (
                          <div key={p.id} className="rounded-2xl glass-strong overflow-hidden">
                            <button
                              onClick={() => setOpenId(open ? null : p.id)}
                              className="w-full flex items-start gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-purple/15 text-brand-purple">
                                    {p.agentBadge}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground">{dateStr}</span>
                                </div>
                                <p className="text-sm font-medium text-foreground truncate">{p.title}</p>
                              </div>
                            </button>
                            {open && (
                              <div className="border-t border-border bg-black/20 px-5 py-4">
                                <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-[400px] overflow-y-auto scrollbar-thin">
                                  {p.content}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(p.content);
                                      setCopiedId(p.id);
                                      setTimeout(() => setCopiedId(null), 2000);
                                    }}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-border text-xs font-semibold text-foreground hover:bg-white/10 transition-colors"
                                  >
                                    {copiedId === p.id ? <Check className="w-3.5 h-3.5 text-brand-teal" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copiedId === p.id ? "Copiado" : "Copiar"}
                                  </button>
                                  <button
                                    onClick={() => removePlan(p.id)}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-destructive/10 text-destructive text-xs font-semibold hover:bg-destructive/20 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Excluir
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
