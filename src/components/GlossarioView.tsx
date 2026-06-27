import { useMemo, useState } from "react";
import { BookOpen, Search, Sparkles, FileText, Map } from "lucide-react";
import { glossaryTerms, glossaryCategories, type GlossaryCategory, type GlossaryTerm } from "@/lib/glossary";

type Filter = "Todos" | GlossaryCategory;

interface GlossarioViewProps {
  onExplainInMyCase?: (term: GlossaryTerm) => void;
  onSeeExample?: (term: GlossaryTerm) => void;
}

export function GlossarioView({ onExplainInMyCase, onSeeExample }: GlossarioViewProps) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      const matchesQ = !query || t.term.toLowerCase().includes(query) || t.meaning.toLowerCase().includes(query);
      const matchesC = filter === "Todos" || t.category === filter;
      return matchesQ && matchesC;
    });
  }, [q, filter]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-teal mb-2">
            Dicionário digital
          </p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-brand-teal" /> Glossário
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Cada termo do digital traduzido em português simples, com exemplo real, erro comum de quem está começando e a trilha do ClickStart onde isso aparece.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar termo"
            className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {glossaryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === c
                  ? "bg-gradient-to-r from-brand-teal to-brand-purple text-white shadow"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-border"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl glass-strong p-8 text-center text-muted-foreground">
            Nenhum termo encontrado para essa busca.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((t) => {
              const open = openTerm === t.term;
              return (
                <div key={t.term} className="rounded-2xl glass-strong overflow-hidden">
                  <button
                    onClick={() => setOpenTerm(open ? null : t.term)}
                    className="w-full flex items-start gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-base font-bold text-foreground">
                          {t.term}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal">
                          {t.category}
                        </span>
                        {t.relatedTrail && (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-purple/15 text-brand-purple">
                            Trilha: {t.relatedTrail}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">{t.meaning}</p>
                    </div>
                  </button>
                  {open && (
                    <div className="border-t border-border px-5 py-5 space-y-4 bg-black/20 text-sm">
                      <Field label="O que significa" value={t.meaning} />
                      <Field label="Para que serve" value={t.purpose} />
                      <Field label="Exemplo real" value={t.example} />
                      {t.whereSeen && <Field label="Onde isso aparece no digital" value={t.whereSeen} />}
                      {t.commonMistake && <Field label="Erro comum de iniciante" value={t.commonMistake} accent="amber" />}
                      <Field label="Preciso disso agora ou depois?" value={t.whenNeeded} />
                      {t.relatedTrail && <Field label="Trilha relacionada" value={t.relatedTrail} />}
                      <Field label="Próximo passo recomendado" value={t.nextStep} accent="purple" />

                      <div className="flex flex-wrap gap-2 pt-2">
                        <button
                          onClick={() => onExplainInMyCase?.(t)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-teal text-white text-xs font-semibold shadow hover:scale-[1.02] transition-transform"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Explicar no meu caso
                        </button>
                        <button
                          onClick={() => onSeeExample?.(t)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-border text-xs font-semibold text-foreground hover:bg-white/10 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" /> Ver exemplo prático
                        </button>
                        {t.relatedTrail && (
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-border text-xs font-semibold text-muted-foreground">
                            <Map className="w-3.5 h-3.5" /> Trilha: {t.relatedTrail}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: "purple" | "amber" }) {
  const color = accent === "amber" ? "text-brand-amber" : accent === "purple" ? "text-brand-purple" : "text-foreground";
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-sm leading-relaxed ${color} ${accent ? "font-medium" : ""}`}>{value}</p>
    </div>
  );
}
