import { ShieldCheck, Sparkles, LogOut, Settings as SettingsIcon, Bell, Lock, Monitor } from "lucide-react";
import type { ClickStartUser } from "@/hooks/use-user";

interface MinhaContaViewProps {
  user: ClickStartUser;
}

export function MinhaContaView({ user }: MinhaContaViewProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple mb-2">Sua área</p>
          <h1 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2">
            Minha conta
          </h1>
          <p className="text-base text-muted-foreground">
            Gerencie seu plano, preferências e segurança da conta.
          </p>
        </div>

        {/* Plano */}
        <div className="relative overflow-hidden rounded-3xl glass-strong p-6 sm:p-8 mb-5">
          <div className="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink opacity-20 blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-4 mb-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Plano atual</p>
                <p style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-2xl font-extrabold text-foreground">
                  ClickStart <span className="gradient-text">Plus</span>
                </p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-brand-teal/15 text-brand-teal">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" /> Status: Ativo
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-foreground/80 border border-border">
                    <ShieldCheck className="w-3 h-3 text-brand-teal" /> Garantia de 7 dias
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-muted-foreground">Conta</p>
                <p className="text-sm font-semibold text-foreground">{user.displayName}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-pink text-white text-sm font-semibold shadow-lg shadow-brand-purple/30 hover:scale-[1.02] transition-transform">
                <Sparkles className="w-4 h-4" /> Gerenciar assinatura
              </button>
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border text-sm font-semibold text-foreground hover:bg-white/10 transition-colors">
                Atualizar forma de pagamento
              </button>
            </div>
          </div>
        </div>

        {/* Preferências */}
        <Section icon={SettingsIcon} title="Preferências">
          <Row icon={Bell} label="Notificações" value="Receber novidades e dicas semanais" actionLabel="Configurar" />
          <Row icon={Monitor} label="Aparência" value="Tema escuro ativado por padrão" actionLabel="Alterar" />
        </Section>

        {/* Segurança */}
        <Section icon={Lock} title="Segurança da conta">
          <Row icon={Lock} label="Senha" value="Atualize sua senha periodicamente" actionLabel="Alterar senha" />
          <Row icon={Monitor} label="Sessões ativas" value="Apenas este dispositivo neste momento" actionLabel="Ver sessões" />
          <div className="pt-2 flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border text-sm font-semibold text-foreground hover:bg-white/10 transition-colors">
              <LogOut className="w-4 h-4" /> Encerrar outras sessões
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm font-semibold text-destructive hover:bg-destructive/20 transition-colors">
              <LogOut className="w-4 h-4" /> Sair da conta
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            Por segurança, só uma sessão fica ativa por vez. Ao entrar em outro aparelho, a anterior é encerrada automaticamente.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass-strong p-5 sm:p-6 mb-5">
      <div className="flex items-center gap-2.5 mb-4">
        <Icon className="w-4 h-4 text-brand-purple" />
        <h2 style={{ fontFamily: "Sora, Inter, sans-serif" }} className="text-sm font-bold text-foreground">{title}</h2>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, value, actionLabel }: { icon: React.ElementType; label: string; value: string; actionLabel: string }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2 border-b border-border last:border-b-0">
      <div className="flex items-start gap-3 min-w-0">
        <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-[12px] text-muted-foreground">{value}</p>
        </div>
      </div>
      <button className="text-[12px] font-semibold text-brand-purple hover:text-brand-pink transition-colors shrink-0">
        {actionLabel}
      </button>
    </div>
  );
}
