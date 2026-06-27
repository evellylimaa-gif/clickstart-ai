import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { loginAs, useUser } from "@/hooks/use-user";

// MVP-only temporary credential gate. Replace with Supabase auth once integrated.
const TEMP_EMAIL = "admin@clickstart.ai";
const TEMP_PASSWORD = "clickstart2026";

export default function Login() {
  const user = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; showPlans?: boolean } | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [googleOpen, setGoogleOpen] = useState(false);

  if (user.isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) return;

    setLoading(true);

    // Simulate request latency for realistic UX
    window.setTimeout(() => {
      if (normalizedEmail === TEMP_EMAIL && password === TEMP_PASSWORD) {
        loginAs({ email: normalizedEmail, displayName: "Admin" });
        navigate("/app", { replace: true });
        return;
      }

      // Heuristic: wrong password vs. unknown subscriber.
      // Since real auth is not connected yet, treat anything else as invalid credentials.
      setError({
        message: "E-mail ou senha incorretos. Confira os dados e tente novamente.",
      });
      setLoading(false);
    }, 600);
  };

  const goToPlans = () => {
    navigate("/#planos");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-foreground flex flex-col relative overflow-hidden">
      {/* Ambient gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[-10%] w-[420px] h-[420px] rounded-full bg-purple-600/15 blur-[120px]" />
      </div>

      <header className="relative z-10 px-5 h-16 flex items-center justify-between border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-teal-500 grid place-items-center shadow-lg shadow-indigo-600/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold tracking-tight">ClickStart AI</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
          Voltar
        </Link>
      </header>

      <main className="relative z-10 flex-1 grid place-items-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold tracking-tight">Entrar no ClickStart AI</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Área do assinante. Entre com o e-mail usado na assinatura para continuar sua trilha.
            </p>
          </div>

          {/* Glass card with gradient border */}
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-teal-500/40 shadow-2xl shadow-indigo-900/30">
            <form
              onSubmit={submit}
              className="rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl p-6 space-y-4"
            >
              <div>
                <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
                  E-mail
                </label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="voce@email.com"
                    className="pl-9 bg-[#020617] border-white/10 h-11"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-xs font-semibold text-muted-foreground">
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotOpen(true)}
                    className="text-xs text-indigo-300 hover:text-indigo-200 font-medium"
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-9 pr-10 bg-[#020617] border-white/10 h-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-200">
                  <p className="font-medium">{error.message}</p>
                  {error.showPlans && (
                    <button
                      type="button"
                      onClick={goToPlans}
                      className="mt-1.5 inline-flex items-center gap-1 text-red-100 font-semibold underline-offset-2 hover:underline"
                    >
                      Ver planos <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-indigo-600/30 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </Button>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[#0F172A] px-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                    ou
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => setGoogleOpen(true)}
                className="w-full h-11 bg-transparent border-white/15 hover:bg-white/5 hover:border-white/25 text-foreground"
              >
                <GoogleIcon className="w-4 h-4 mr-2" />
                Entrar com Google
              </Button>
            </form>
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-center">
            <p className="text-sm text-muted-foreground">Ainda não assinou? Conheça o ClickStart Plus.</p>
            <Button
              type="button"
              variant="ghost"
              onClick={goToPlans}
              className="mt-2 text-indigo-300 hover:text-indigo-200 hover:bg-indigo-500/10 font-semibold"
            >
              Ver planos
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="mt-5 flex items-start gap-2 text-xs text-muted-foreground px-1">
            <ShieldCheck className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
            <span>Não tem acesso ainda? Assine para liberar sua conta.</span>
          </div>
        </div>
      </main>

      {/* Forgot password modal */}
      <Dialog open={forgotOpen} onOpenChange={setForgotOpen}>
        <DialogContent className="bg-[#0F172A] border-white/10">
          <DialogHeader>
            <DialogTitle>Recuperação de senha</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Em breve, você poderá redefinir sua senha por e-mail. Enquanto isso, use o acesso enviado
              após a assinatura.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setForgotOpen(false)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Entendi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Google sign-in placeholder modal */}
      <Dialog open={googleOpen} onOpenChange={setGoogleOpen}>
        <DialogContent className="bg-[#0F172A] border-white/10">
          <DialogHeader>
            <DialogTitle>Entrar com Google</DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Login com Google será conectado na próxima etapa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setGoogleOpen(false)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600"
            >
              Ok
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.6l6.2 5.2C41.9 36 44 30.5 44 24c0-1.3-.1-2.3-.4-3.5z"
      />
    </svg>
  );
}
