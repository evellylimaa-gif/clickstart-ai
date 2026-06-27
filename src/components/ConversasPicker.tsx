import {
  Bot, Briefcase, TrendingUp, Wand2, Compass, Video, Boxes, FileText,
  Youtube, BookOpen, ClipboardList, ArrowRight, type LucideIcon,
} from "lucide-react";
import { agents, orderedAgents } from "@/lib/agents";

const iconMap: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  "wand-2": Wand2,
  compass: Compass,
  video: Video,
  boxes: Boxes,
  "file-text": FileText,
  youtube: Youtube,
  "book-open": BookOpen,
  "clipboard-list": ClipboardList,
  link: TrendingUp,
  "layout-template": Wand2,
};

const accentMap: Record<string, string> = {
  "agent-purple": "from-brand-purple to-brand-pink",
  "agent-teal": "from-brand-teal to-brand-purple",
  "agent-amber": "from-brand-amber to-brand-pink",
  "agent-pink": "from-brand-pink to-brand-amber",
};

interface ConversasPickerProps {
  onSelectAgent: (idx: number) => void;
}

export function ConversasPicker({ onSelectAgent }: ConversasPickerProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-2">
            Conversas com IA
          </p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Escolha um agente para começar
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Cada agente é especialista em um caminho. Suas conversas salvas aparecerão organizadas por tema, para você continuar de onde parou.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {orderedAgents.map((a) => {
            const i = agents.findIndex((x) => x.id === a.id);
            const Icon = iconMap[a.icon] || Bot;
            const gradient = accentMap[a.color] || "from-brand-purple to-brand-pink";
            return (
              <button
                key={a.id}
                onClick={() => onSelectAgent(i)}
                className="group relative flex h-full min-h-[305px] flex-col text-left p-6 rounded-3xl glass-strong hover:border-brand-purple/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
              >
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity`} />
                <div className="relative flex h-full flex-col">
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                  </div>
                  <span className="inline-block w-fit text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-white/5 text-foreground/70 mb-3">
                    {a.badge}
                  </span>
                  <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-base font-bold text-foreground leading-snug mb-2 line-clamp-2 min-h-[2.75rem]">
                    {a.name}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 line-clamp-3 min-h-[4.65rem]">
                    {a.description}
                  </p>
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-brand-purple group-hover:gap-3 transition-all">
                    Iniciar conversa <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
