import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAs, useUser } from "@/hooks/use-user";

export default function Login() {
  const user = useUser();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (user.isAuthenticated) {
    return <Navigate to={user.isAdmin ? "/admin" : "/app"} replace />;
  }

  const [error, setError] = useState<string | null>(null);

  // MVP-only temporary credential gate. Replace with Supabase auth once integrated.
  const TEMP_EMAIL = "admin@clickstart.ai";
  const TEMP_PASSWORD = "clickstart2026";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;

    // Temporary MVP gate: only the seeded owner account unlocks the app.
    if (normalizedEmail !== TEMP_EMAIL || password !== TEMP_PASSWORD) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      return;
    }

    loginAs({ email: normalizedEmail, displayName: name || "Admin" });
    navigate("/app", { replace: true });
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
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Voltar</Link>
      </header>

      <main className="flex-1 grid place-items-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              {mode === "signin" ? "Entrar no ClickStart AI" : "Criar sua conta de assinante"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Use esta área apenas se você já tem acesso ao ClickStart AI.
            </p>
          </div>

          <form
            onSubmit={submit}
            className="rounded-2xl border border-white/10 bg-[#0F172A] p-6 space-y-4 shadow-2xl shadow-indigo-900/20"
          >
            {mode === "signup" && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Seu nome</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="mt-1.5 bg-[#020617] border-white/10"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-muted-foreground">E-mail</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="pl-9 bg-[#020617] border-white/10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground">Senha</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-9 bg-[#020617] border-white/10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30"
            >
              {mode === "signin" ? "Entrar" : "Criar conta e entrar"}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {mode === "signin" ? "Ainda não assinou?" : "Já é assinante?"}{" "}
              {mode === "signin" ? (
                <Link to="/checkout" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                  Ver o plano ClickStart Plus
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  Entrar
                </button>
              )}
            </p>
          </form>

          <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground px-1">
            <ShieldCheck className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
            <span>
              Área do assinante. Depois de assinar, entre com seu e-mail para continuar sua trilha.
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
