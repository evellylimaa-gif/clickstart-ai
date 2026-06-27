import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Zap, Lock, ArrowRight, Check } from "lucide-react";
import { useUsage, PLAN_LIMITS, type PlanId } from "@/hooks/use-usage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PLAN_LABELS: Record<PlanId, { name: string; price: string; tagline: string; recommended?: boolean }> = {
  essencial: { name: "Essencial", price: "R$39,90", tagline: "Para começar com direção." },
  plus: { name: "Plus", price: "R$79,90", tagline: "Para executar com mais apoio.", recommended: true },
  pro: { name: "Pro", price: "R$149,90", tagline: "Para uso avançado e mais análise." },
};

interface UsageBarProps {
  className?: string;
  compact?: boolean;
}

export function UsageBar({ className = "", compact = false }: UsageBarProps) {
  const { used, limit, remaining, percent, plan } = useUsage();
  const [openUpgrade, setOpenUpgrade] = useState(false);

  const isWarning = remaining > 0 && remaining <= 10;
  const isBlocked = remaining === 0;

  return (
    <>
      <div
        className={`glass-card rounded-xl px-3 py-2 flex flex-col gap-1.5 ${className}`}
        style={{ maxHeight: 60 }}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Zap className={`w-3 h-3 shrink-0 ${isBlocked ? "text-red-300" : isWarning ? "text-amber-300" : "text-teal-300"}`} />
            <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground truncate">
              {PLAN_LABELS[plan].name} · uso do mês
            </span>
          </div>
          <span className={`text-[10px] font-semibold ${isBlocked ? "text-red-300" : isWarning ? "text-amber-300" : "text-foreground/80"}`}>
            {used}/{limit}
          </span>
        </div>

        {isBlocked ? (
          <button
            onClick={() => setOpenUpgrade(true)}
            className="flex items-center justify-center gap-1.5 w-full h-7 rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white text-[11px] font-semibold hover:opacity-95 transition"
          >
            <Lock className="w-3 h-3" /> Fazer upgrade
          </button>
        ) : (
          <>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400"
                style={{ width: `${percent}%` }}
              />
            </div>
            {!compact && (
              <p className={`text-[10px] leading-tight ${isWarning ? "text-amber-300" : "text-muted-foreground"}`}>
                {isWarning ? (
                  <span className="inline-flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Restam {remaining} mensagens este mês
                  </span>
                ) : (
                  <>{remaining} mensagens restantes</>
                )}
              </p>
            )}
          </>
        )}
      </div>

      <UpgradeDialog open={openUpgrade} onOpenChange={setOpenUpgrade} currentPlan={plan} />
    </>
  );
}

export function UpgradeDialog({
  open,
  onOpenChange,
  currentPlan,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentPlan: PlanId;
}) {
  const order: PlanId[] = ["essencial", "plus", "pro"];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0F172A] border-white/10 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Você atingiu o limite mensal</DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Seu plano atual é o <span className="text-foreground font-semibold">{PLAN_LABELS[currentPlan].name}</span>.
            Faça upgrade para continuar conversando com os agentes este mês.
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-3 gap-3 mt-2">
          {order.map((id) => {
            const p = PLAN_LABELS[id];
            const isCurrent = id === currentPlan;
            return (
              <div
                key={id}
                className={`relative rounded-2xl p-4 border ${
                  p.recommended
                    ? "border-indigo-500/40 bg-gradient-to-b from-indigo-500/10 to-transparent"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-400/20 text-amber-200 border border-amber-400/30">
                    RECOMENDADO
                  </span>
                )}
                <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{p.name}</p>
                <div className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{p.price}</span>
                  <span className="text-xs text-muted-foreground">/mês</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{p.tagline}</p>
                <p className="mt-2 text-[11px] text-teal-300 inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> {PLAN_LIMITS[id]} mensagens/mês
                </p>
                <Link
                  to={`/checkout?plan=${id}`}
                  className={`mt-3 inline-flex items-center justify-center gap-1.5 w-full h-9 rounded-lg text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-white/5 text-muted-foreground cursor-default pointer-events-none"
                      : "bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 text-white hover:opacity-95"
                  }`}
                >
                  {isCurrent ? "Plano atual" : <>Assinar <ArrowRight className="w-3 h-3" /></>}
                </Link>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
