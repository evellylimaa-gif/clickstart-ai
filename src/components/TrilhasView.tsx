import {
  Compass, Video, Boxes, FileText, Briefcase, Youtube, BookOpen, ClipboardList,
  ArrowRight, Clock, Target, Gauge, Bot, Link as LinkIcon, LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import { trails, type Trail } from "@/lib/trails";

const iconMap: Record<string, LucideIcon> = {
  compass: Compass,
  video: Video,
  boxes: Boxes,
  "file-text": FileText,
  briefcase: Briefcase,
  youtube: Youtube,
  "book-open": BookOpen,
  "clipboard-list": ClipboardList,
  link: LinkIcon,
  "layout-template": LayoutTemplate,
};

const colorMap: Record<Trail["color"], { grad: string; ring: string; chip: string; text: string }> = {
  purple: {
    grad: "from-brand-purple to-brand-pink",
    ring: "hover:border-brand-purple/50",
    chip: "bg-brand-purple/15 text-brand-purple",
    text: "text-brand-purple",
  },
  teal: {
    grad: "from-brand-teal to-brand-purple",
    ring: "hover:border-brand-teal/50",
    chip: "bg-brand-teal/15 text-brand-teal",
    text: "text-brand-teal",
  },
  pink: {
    grad: "from-brand-pink to-brand-amber",
    ring: "hover:border-brand-pink/50",
    chip: "bg-brand-pink/15 text-brand-pink",
    text: "text-brand-pink",
  },
  amber: {
    grad: "from-brand-amber to-brand-pink",
    ring: "hover:border-brand-amber/50",
    chip: "bg-brand-amber/15 text-brand-amber",
    text: "text-brand-amber",
  },
};

interface TrilhasViewProps {
  onOpenTrail: (trail: Trail) => void;
}

export function TrilhasView({ onOpenTrail }: TrilhasViewProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-2">
            Trilhas de monetização
          </p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Escolha o caminho que combina com você
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl">
            Cada trilha é um passo a passo claro do zero ao primeiro resultado. Sem pular etapas, sem promessa mágica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trails.map((trail) => {
            const Icon = iconMap[trail.icon] || Bot;
            const c = colorMap[trail.color];
            return (
              <div
                key={trail.id}
                className={`group relative p-6 rounded-3xl glass-strong border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden ${c.ring}`}
              >
                <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${c.grad} opacity-15 blur-3xl group-hover:opacity-30 transition-opacity`} />

                <div className="relative">
                  <div className={`inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br ${c.grad} items-center justify-center shadow-lg mb-4`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                  </div>

                  <h3 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-lg font-bold text-foreground mb-2">
                    {trail.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {trail.description}
                  </p>

                  <div className="space-y-2 mb-5 pt-3 border-t border-border/70">
                    <div className="flex items-center gap-2 text-xs">
                      <Gauge className={`w-3.5 h-3.5 ${c.text}`} />
                      <span className="text-muted-foreground">Nível:</span>
                      <span className={`font-semibold px-2 py-0.5 rounded-md ${c.chip}`}>{trail.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className={`w-3.5 h-3.5 ${c.text}`} />
                      <span className="text-muted-foreground">Tempo para começar:</span>
                      <span className="font-medium text-foreground">{trail.timeToStart}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <Target className={`w-3.5 h-3.5 ${c.text} mt-0.5 shrink-0`} />
                      <span className="text-muted-foreground">Perfil:</span>
                      <span className="font-medium text-foreground">{trail.profile}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenTrail(trail)}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r ${c.grad} text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all group-hover:gap-3`}
                  >
                    Abrir trilha <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
