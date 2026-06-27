import { useState } from "react";
import { BookmarkPlus, ArrowRight, ListChecks, Wand2, BookOpen, Compass, Check } from "lucide-react";
import { CheckSquare, Square, Wrench, DollarSign } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ResponseCardsProps {
  content: string;
  badge: string;
  onDeeper: (text: string) => void;
  onPlanSaved?: (content: string) => void;
}

function extractSection(content: string, heading: string): string | null {
  const regex = new RegExp(`(?:^|\\n)#+\\s*.*${heading}.*\\n([\\s\\S]*?)(?=\\n#+\\s|$)`, "i");
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractListItems(text: string): string[] {
  const items: string[] = [];
  for (const line of text.split("\n")) {
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
      if (next.has(idx)) next.delete(idx); else next.add(idx);
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
            {badge} · Resposta guiada
          </span>
        </div>
        <div className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      {actionItems.length > 0 && (
        <div className="rounded-2xl border border-brand-amber/20 bg-card p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-brand-amber" />
            Checklist desta resposta
          </h4>
          <div className="space-y-2">
            {actionItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className="w-full flex items-start gap-3 text-left px-3 py-2 rounded-xl hover:bg-accent/50 transition-colors"
              >
                {checkedItems.has(idx) ? (
                  <CheckSquare className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
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
            {checkedItems.size}/{actionItems.length} concluídos
          </div>
        </div>
      )}

      {tools.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-primary" />
            Ferramentas necessárias
          </h4>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, idx) => (
              <span key={idx} className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/15">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {potential && (
        <div className="rounded-2xl border border-brand-amber/20 bg-gradient-to-r from-brand-amber/5 to-transparent p-5 shadow-sm">
          <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-brand-amber" />
            Potencial de ganho estimado
          </h4>
          <p className="text-2xl font-extrabold text-brand-amber">{potential}</p>
        </div>
      )}

      {/* Primary actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            setSaved(true);
            onPlanSaved?.(content);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-primary/20 bg-card text-foreground hover:bg-accent transition-all"
        >
          {saved ? <Check className="w-4 h-4 text-brand-teal" /> : <BookmarkPlus className="w-4 h-4 text-primary" />}
          {saved ? "Plano salvo" : "Salvar plano"}
        </button>
        <button
          onClick={() => onDeeper("Quero ir mais fundo nessa resposta. Me dê o plano completo de 7 dias, com exemplos práticos e métricas para acompanhar.")}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-brand-purple to-brand-teal text-white hover:opacity-90 transition-all shadow-md"
        >
          Quero ir mais fundo
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary expandable shortcuts */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Continuar a partir daqui
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <SecondaryAction icon={ListChecks} label="Transformar em checklist" onClick={() => onDeeper("Transforme essa resposta em um checklist enxuto, com no máximo 10 itens acionáveis e curtos.")} />
          <SecondaryAction icon={Wand2} label="Gerar roteiro" onClick={() => onDeeper("Transforme essa resposta em um roteiro pronto para gravar ou publicar, com gancho, desenvolvimento e CTA.")} />
          <SecondaryAction icon={BookOpen} label="Explicar termos difíceis" onClick={() => onDeeper("Liste todos os termos técnicos ou em inglês que apareceram nessa resposta e explique cada um em 1 frase, em português simples.")} />
          <SecondaryAction icon={Compass} label="Próximo passo" onClick={() => onDeeper("Me diga o próximo passo prático depois dessa resposta, considerando que tenho pouco tempo hoje.")} />
          <SecondaryAction icon={ArrowRight} label="Continuar de onde parei" onClick={() => onDeeper("Continue exatamente de onde parou. O que vem depois desse passo?")} />
          <SecondaryAction icon={BookmarkPlus} label="Salvar como plano" onClick={() => { setSaved(true); onPlanSaved?.(content); setTimeout(() => setSaved(false), 2000); }} />
        </div>
      </div>
    </div>
  );
}

function SecondaryAction({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-border text-xs font-medium text-foreground hover:bg-white/10 hover:border-brand-purple/30 transition-all text-left"
    >
      <Icon className="w-3.5 h-3.5 text-brand-purple shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}
