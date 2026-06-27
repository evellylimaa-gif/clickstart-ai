import { useMemo, useState } from "react";
import { BookOpen, Search, Sparkles, ArrowRight, X, Map as MapIcon } from "lucide-react";
import { glossaryTerms, glossaryCategories, type GlossaryCategory, type GlossaryTerm } from "@/lib/glossary";

type Filter = "Todos" | GlossaryCategory;

interface GlossarioViewProps {
  onExplainInMyCase?: (term: GlossaryTerm) => void;
  onSeeExample?: (term: GlossaryTerm) => void;
}

export function GlossarioView({ onExplainInMyCase, onSeeExample }: GlossarioViewProps) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [openTerm, setOpenTerm] = useState<GlossaryTerm | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return glossaryTerms.filter((t) => {
      const matchesQ = !query || t.term.toLowerCase().includes(query) || t.meaning.toLowerCase().includes(query);
      const matchesC = filter === "Todos" || t.category === filter;
      return matchesQ && matchesC;
    });
  }, [q, filter]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin bg-[#020617]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300 mb-2">
            Dicionário digital
          </p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-teal-300" /> Glossário
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Cada termo do digital traduzido em português simples, com exemplo real, erro comum de quem está começando e a trilha onde isso aparece.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar termo"
            className="w-full bg-[#0F172A]/70 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-400/30"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {glossaryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filter === c
                  ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground border border-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#0F172A]/70 p-8 text-center text-muted-foreground">
            Nenhum termo encontrado para essa busca.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <button
                key={t.term}
                onClick={() => setOpenTerm(t)}
                className="group text-left rounded-2xl border border-white/10 bg-[#0F172A]/70 backdrop-blur p-5 hover:border-teal-400/40 hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300">
                    {t.category}
                  </span>
                  {t.relatedTrail && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300">
                      {t.relatedTrail}
                    </span>
                  )}
                </div>
                <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-lg font-bold text-foreground mb-2">
                  {t.term}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {t.meaning}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-teal-300 group-hover:gap-2 transition-all">
                    Ver explicação completa <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[11px] text-muted-foreground hover:text-foreground">
                    Aplicar no meu caso
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {openTerm && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpenTerm(null)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0F172A] p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenTerm(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 grid place-items-center"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300">
                {openTerm.category}
              </span>
              {openTerm.relatedTrail && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300">
                  Trilha: {openTerm.relatedTrail}
                </span>
              )}
            </div>
            <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
              {openTerm.term}
            </h2>

            <div className="space-y-4">
              <Field label="O que significa" value={openTerm.meaning} />
              <Field label="Para que serve" value={openTerm.purpose} />
              <Field label="Exemplo real" value={openTerm.example} />
              {openTerm.whereSeen && <Field label="Onde isso aparece no digital" value={openTerm.whereSeen} />}
              {openTerm.commonMistake && <Field label="Erro comum de iniciante" value={openTerm.commonMistake} accent="amber" />}
              <Field label="Preciso disso agora ou depois?" value={openTerm.whenNeeded} />
              <Field label="Próximo passo recomendado" value={openTerm.nextStep} accent="purple" />
            </div>

            <div className="flex flex-wrap gap-2 pt-6">
              <button
                onClick={() => { onExplainInMyCase?.(openTerm); setOpenTerm(null); }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 text-white text-xs font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-3.5 h-3.5" /> Aplicar no meu caso
              </button>
              {openTerm.relatedTrail && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-muted-foreground">
                  <MapIcon className="w-3.5 h-3.5" /> Trilha: {openTerm.relatedTrail}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, accent }: { label: string; value: string; accent?: "purple" | "amber" }) {
  const color = accent === "amber" ? "text-amber-300" : accent === "purple" ? "text-purple-300" : "text-foreground";
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-sm leading-relaxed ${color} ${accent ? "font-medium" : ""}`}>{value}</p>
    </div>
  );
}
