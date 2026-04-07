import { Check } from "lucide-react";

interface ProgressTrackerProps {
  messageCount: number;
}

const steps = [
  "Contexto definido",
  "Caminho escolhido",
  "Plano recebido",
  "Ações iniciadas",
  "Primeira receita",
];

export function ProgressTracker({ messageCount }: ProgressTrackerProps) {
  // Map message count to step progress
  const currentStep = Math.min(Math.ceil(messageCount / 2), steps.length);

  if (messageCount === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl">
      {steps.map((step, idx) => {
        const done = idx < currentStep;
        const active = idx === currentStep;
        return (
          <div key={step} className="flex items-center gap-1.5">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                done
                  ? "bg-gold text-white"
                  : active
                  ? "bg-primary/20 text-primary border border-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {done ? <Check className="w-3 h-3" /> : idx + 1}
            </div>
            <span className={`text-[10px] font-medium hidden sm:inline ${done ? "text-gold" : active ? "text-foreground" : "text-muted-foreground"}`}>
              {step}
            </span>
            {idx < steps.length - 1 && (
              <div className={`w-4 h-0.5 rounded-full ${done ? "bg-gold" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
