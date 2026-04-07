import { useState } from "react";
import { CheckSquare, Square, Wrench, DollarSign, BookmarkPlus, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResponseCardsProps {
  content: string;
  badge: string;
  onDeeper: (text: string) => void;
  onPlanSaved?: () => void;
}

function extractSection(content: string, heading: string): string | null {
  const regex = new RegExp(`(?:^|\\n)#+\\s*.*${heading}.*\\n([\\s\\S]*?)(?=\\n#+\\s|$)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractListItems(text: string): string[] {
  const items: string[] = [];
  const lines = text.split("\n");
  for (const line of lines) {
    const match = line.match(/^[\s]*[-*\d.]+[\s]+(.+)/);
    if (match) items.push(match[1].trim());
  }
  return items;
}

function extractTools(content: string): string[] {
  const section = extractSection(content, "ferrament") || extractSection(content, "stack") || extractSection(content, "tool");
  if (!section) return [];
  return extractListItems(section).slice(0, 8);
}

function extractPotential(content: string): string | null {
  const match = content.match(/R\$[\s]?[\d.,]+(?:[\s]?(?:a|até|-)[\s]?R\$[\s]?[\d.,]+)?(?:\/mês|\/m[eê]s|mensais|por mês)?/i);
  return match ? match[0] : null;
}

export function ResponseCards({ content, badge, onDeeper, onPlanSaved }: ResponseCardsProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState(false);

  const tools = extractTools(content);
  const potential = extractPotential(content);
  const actionItems = extractListItems(content).slice(0, 7);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main response card */}
      <div className="rounded-2xl border border-primary/15 bg-card p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {badge} — Seu caminho recomendado
          </span>
        </div>
        <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {/* Action plan checklist */}
      {actionItems.length > 0 && (
        <div className="rounded-2xl border border-gold/20 bg-card p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-gold" />
            Plano de ação — próximos 7 dias
          </h4>
          <div className="space-y-2">
            {actionItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="w-full flex items-start gap-3 text-left px-3 py-2 rounded-xl hover:bg-accent/50 transition-colors"
              >
                {checkedItems.has(idx) ? (
                  <CheckSquare className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                )}
                <span className={`text-sm ${checkedItems.has(idx) ? "line-through text-muted-foreground" : "text-foreground"}`}>
                  {item}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            {checkedItems.size}/{actionItems.length} completados
          </div>
        </div>
      )}

      {/* Tools pills */}
      {tools.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Ferramentas necessárias
          </h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Earning potential */}
      {potential && (
        <div className="rounded-2xl border border-gold/20 bg-gradient-to-r from-gold/5 to-transparent p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold" />
            Potencial de ganho estimado
          </h4>
          <p className="text-2xl font-extrabold text-gold">{potential}</p>
        </div>
      )}

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            setSaved(true);
            onPlanSaved?.();
            setTimeout(() => setSaved(false), 2000);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-primary/20 bg-card text-foreground hover:bg-accent transition-all"
        >
          <BookmarkPlus className="w-4 h-4 text-primary" />
          {saved ? "✓ Plano salvo!" : "Salvar este plano"}
        </button>
        <button
          onClick={() => onDeeper("Quero ir mais fundo neste caminho. Me dê mais detalhes, exemplos práticos e o próximo passo exato.")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gold text-white hover:opacity-90 transition-all shadow-md"
        >
          Quero ir mais fundo neste caminho
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
