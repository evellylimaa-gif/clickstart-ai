import { useMemo, useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { glossary, glossaryCategories, type GlossaryCategory } from "@/lib/glossary";

type Filter = "Todos" | GlossaryCategory;

export function GlossarioView() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("Todos");
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return glossary.filter((t) => {
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
            Cada termo do digital explicado em português simples, com exemplo do dia a dia e o próximo passo recomendado.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar termo"
            className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
          />
        </div>

        {/* Categories */}
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

        {/* Results */}
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
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-base font-bold text-foreground">
                          {t.term}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal/15 text-brand-teal">
                          {t.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{t.meaning}</p>
                    </div>
                  </button>
                  {open && (
                    <div className="border-t border-border px-5 py-5 space-y-4 bg-black/20 text-sm">
                      <Field label="O que significa" value={t.meaning} />
                      <Field label="Para que serve" value={t.purpose} />
                      <Field label="Exemplo simples" value={t.example} />
                      <Field label="Preciso disso agora ou depois?" value={t.whenNeeded} />
                      <Field label="Próximo passo recomendado" value={t.nextStep} accent />
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

function Field({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <p className={`text-sm leading-relaxed ${accent ? "text-brand-amber font-medium" : "text-foreground"}`}>{value}</p>
    </div>
  );
}
