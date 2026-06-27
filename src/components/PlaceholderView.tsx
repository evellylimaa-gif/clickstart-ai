import { Construction, ArrowLeft } from "lucide-react";

interface PlaceholderViewProps {
  title: string;
  description: string;
  icon: React.ElementType;
  accent?: "purple" | "teal" | "amber" | "pink";
  onBack: () => void;
}

const accentMap = {
  purple: { bg: "from-brand-purple to-brand-pink", text: "text-brand-purple", border: "border-brand-purple/30" },
  teal:   { bg: "from-brand-teal to-brand-purple", text: "text-brand-teal", border: "border-brand-teal/30" },
  amber:  { bg: "from-brand-amber to-brand-pink", text: "text-brand-amber", border: "border-brand-amber/30" },
  pink:   { bg: "from-brand-pink to-brand-purple", text: "text-brand-pink", border: "border-brand-pink/30" },
};

export function PlaceholderView({ title, description, icon: Icon, accent = "purple", onBack }: PlaceholderViewProps) {
  const a = accentMap[accent];
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Dashboard
        </button>

        <div className="relative overflow-hidden rounded-3xl glass-strong p-8 sm:p-12">
          <div className={`absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br ${a.bg} opacity-20 blur-3xl`} />

          <div className="relative">
            <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${a.bg} items-center justify-center shadow-lg mb-6`}>
              <Icon className="w-8 h-8 text-white" strokeWidth={2.2} />
            </div>

            <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
              {title}
            </h1>
            <p className="text-base text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {description}
            </p>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border ${a.border} ${a.text} text-sm font-semibold`}>
              <Construction className="w-4 h-4" />
              Em construção · disponível em breve
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
