import { Link, Navigate } from "react-router-dom";
import { Users, CreditCard, TrendingUp, RefreshCcw, Cpu, DollarSign, CheckCircle2, AlertCircle, ArrowLeft, LogOut } from "lucide-react";
import { logout, useUser } from "@/hooks/use-user";

const metrics = [
  { icon: Users, label: "Total de usuários", value: "—", hint: "Aguardando integração com Supabase", tone: "indigo" },
  { icon: CreditCard, label: "Assinaturas ativas", value: "—", hint: "Aguardando integração de pagamento", tone: "purple" },
  { icon: TrendingUp, label: "Vendas do mês", value: "R$ —", hint: "Sem dados de checkout ainda", tone: "teal" },
  { icon: RefreshCcw, label: "Reembolsos", value: "—", hint: "Janela de garantia: 7 dias", tone: "amber" },
  { icon: Cpu, label: "Uso da IA (tokens)", value: "—", hint: "Estimativa via Anthropic", tone: "cyan" },
  { icon: DollarSign, label: "Custo estimado de API", value: "US$ —", hint: "Baseado no preço Claude Sonnet", tone: "pink" },
];

const toneMap: Record<string, string> = {
  indigo: "from-indigo-500/20 to-indigo-500/0 text-indigo-300 border-indigo-500/20",
  purple: "from-purple-500/20 to-purple-500/0 text-purple-300 border-purple-500/20",
  teal: "from-teal-500/20 to-teal-500/0 text-teal-300 border-teal-500/20",
  amber: "from-amber-500/20 to-amber-500/0 text-amber-300 border-amber-500/20",
  cyan: "from-cyan-500/20 to-cyan-500/0 text-cyan-300 border-cyan-500/20",
  pink: "from-pink-500/20 to-pink-500/0 text-pink-300 border-pink-500/20",
};

export default function Admin() {
  const user = useUser();

  if (!user.isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isAdmin) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-screen bg-[#020617] text-foreground">
      <header className="border-b border-white/5 px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
            <ArrowLeft className="w-4 h-4" /> App
          </Link>
          <span className="text-xs text-muted-foreground">/</span>
          <span className="text-sm font-semibold">Painel Administrativo</span>
          <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            INTERNO
          </span>
        </div>
        <button
          onClick={() => { logout(); window.location.href = "/"; }}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5"
        >
          <LogOut className="w-4 h-4" /> Sair
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300 mb-2">Owner</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Olá, {user.displayName}. Aqui é o cockpit do ClickStart AI.
          </h1>
          <p className="text-muted-foreground mt-2">
            Métricas, status de integrações e saúde da plataforma. Visível apenas para administradores.
          </p>
        </div>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {metrics.map(({ icon: Icon, label, value, hint, tone }) => (
            <div
              key={label}
              className={`rounded-2xl border bg-gradient-to-br ${toneMap[tone]} p-5 backdrop-blur`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 grid place-items-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
              <p className="text-[11px] text-muted-foreground mt-2">{hint}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0F172A] p-6">
          <h2 className="text-lg font-bold mb-4">Status das integrações</h2>
          <ul className="divide-y divide-white/5">
            <StatusRow ok label="Anthropic" detail="Claude Sonnet 4.5 configurado" />
            <StatusRow label="Supabase" detail="Aguardando integração para usuários e assinaturas" />
            <StatusRow label="Pagamento" detail="Aguardando integração com Stripe ou similar" />
          </ul>
        </section>

        <p className="text-[11px] text-muted-foreground mt-6">
          Esta área é interna. Nenhuma chave de API, segredo ou configuração técnica é exibida na interface do assinante.
        </p>
      </main>
    </div>
  );
}

function StatusRow({ ok, label, detail }: { ok?: boolean; label: string; detail: string }) {
  return (
    <li className="py-3 flex items-start gap-3">
      {ok ? (
        <CheckCircle2 className="w-5 h-5 text-teal-400 mt-0.5 shrink-0" />
      ) : (
        <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
      )}
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      <span
        className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
          ok ? "bg-teal-500/15 text-teal-300" : "bg-amber-500/15 text-amber-300"
        }`}
      >
        {ok ? "Configurada" : "Pendente"}
      </span>
    </li>
  );
}
