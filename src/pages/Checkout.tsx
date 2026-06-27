import { Link, useSearchParams } from "react-router-dom";
import { Sparkles, ShieldCheck, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

type PlanId = "essencial" | "plus" | "pro";

const PLANS: Record<PlanId, { name: string; price: string; tagline: string; features: string[]; recommended?: boolean }> = {
  essencial: {
    name: "ClickStart Essencial",
    price: "R$39,90",
    tagline: "Para começar com direção.",
    features: [
      "Diagnóstico digital",
      "Trilhas guiadas",
      "Glossário inteligente",
      "Kits digitais",
      "Planos salvos",
      "Uso justo básico de IA",
    ],
  },
  plus: {
    name: "ClickStart Plus",
    price: "R$79,90",
    tagline: "Para quem quer executar com mais apoio.",
    recommended: true,
    features: [
      "Tudo do Essencial",
      "Mais conversas com agentes",
      "Plano de 7 dias e roadmap de 30 dias",
      "Revisão de rota",
      "Respostas mais completas",
      "Mais planos salvos",
    ],
  },
  pro: {
    name: "ClickStart Pro",
    price: "R$149,90",
    tagline: "Para uso intenso e análise mais profunda.",
    features: [
      "Tudo do Plus",
      "Mais análises estratégicas",
      "Revisão de ofertas",
      "Análise de nicho",
      "Planos avançados",
      "Uso ampliado de IA",
    ],
  },
};

export default function Checkout() {
  const [params, setParams] = useSearchParams();
  const raw = (params.get("plan") || "plus") as PlanId;
  const selected: PlanId = raw in PLANS ? raw : "plus";
  const plan = PLANS[selected];

  const reserve = () => {
    toast({
      title: "Plano selecionado",
      description: `Assim que o checkout oficial abrir, você entra no ${plan.name} (${plan.price}/mês).`,
    });
  };

  return (
    <div className="min-h-screen bg-[#020617] text-foreground flex flex-col">
      <header className="px-5 h-16 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 grid place-items-center shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight">ClickStart AI</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </header>

      <main className="flex-1 grid place-items-center px-5 py-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/15 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-teal-600/10 blur-3xl" />
        </div>

        <div className="w-full max-w-lg">
          {/* Plan switcher */}
          <div className="mb-5 flex items-center gap-2 justify-center flex-wrap">
            {(Object.keys(PLANS) as PlanId[]).map((id) => {
              const active = id === selected;
              return (
                <button
                  key={id}
                  onClick={() => setParams({ plan: id })}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors ${
                    active
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-500/40"
                      : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10"
                  }`}
                >
                  {PLANS[id].name.replace("ClickStart ", "")}
                </button>
              );
            })}
          </div>

          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 shadow-2xl shadow-indigo-600/20">
            <div className="rounded-3xl bg-gradient-to-b from-[#0F172A] to-[#020617] p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-indigo-300 font-semibold">Assinar {plan.name}</p>
                  <h1 className="text-2xl font-bold mt-1">{plan.tagline}</h1>
                </div>
                {plan.recommended && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    RECOMENDADO
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mês</span>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 text-xs text-teal-300">
                <ShieldCheck className="w-4 h-4" />
                Garantia de 7 dias · cancela quando quiser
              </div>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-teal-500/15 text-teal-300 grid place-items-center">
                      <Check className="w-3 h-3" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-7 p-4 rounded-xl border border-white/10 bg-[#020617]/60 text-xs text-muted-foreground leading-relaxed">
                Todos os planos seguem nossa <span className="text-foreground font-semibold">política de uso justo</span>:
                uso mensal inteligente para manter a qualidade da plataforma para todos os assinantes.
              </div>

              <Button
                onClick={reserve}
                className="mt-6 w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30"
              >
                Começar agora
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                Já é assinante?{" "}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                  Entrar no painel
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
