import { useEffect, useState } from "react";

export interface ClickStartUser {
  isAuthenticated: boolean;
  hasActiveSubscription: boolean;
  isAdmin: boolean;
  canAccessPremiumContent: boolean;
  subscriptionStatus: "ativa" | "inativa" | "trial";
  trialGuaranteeEndsAt: string | null;
  planName: "ClickStart Plus" | "Free";
  /** First name when logged in, neutral placeholder otherwise. */
  displayName: string;
  email: string;
  /** Stable initial(s) for avatar. */
  initial: string;
  plan: "ClickStart Plus" | "Free";
  /** Stored only locally for now; future auth will set this server-side. */
  sessionId: string;
}

const LS_KEY = "clickstart_user";
const LS_SESSION = "clickstart_session_id";

function ensureSessionId(): string {
  try {
    const existing = localStorage.getItem(LS_SESSION);
    if (existing) return existing;
    const next = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(LS_SESSION, next);
    return next;
  } catch {
    return "sess_local";
  }
}

function anonymous(sessionId: string): ClickStartUser {
  return {
    isAuthenticated: false,
    hasActiveSubscription: false,
    isAdmin: false,
    canAccessPremiumContent: false,
    subscriptionStatus: "inativa",
    trialGuaranteeEndsAt: null,
    planName: "Free",
    displayName: "Sua conta",
    email: "",
    initial: "•",
    plan: "Free",
    sessionId,
  };
}

function readUser(): ClickStartUser {
  const sessionId = ensureSessionId();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return anonymous(sessionId);
    const parsed = JSON.parse(raw) as Partial<ClickStartUser> & { email?: string };
    if (!parsed.isAuthenticated || !parsed.displayName) return anonymous(sessionId);
    const first = parsed.displayName.trim().split(" ")[0] || "Você";
    const isAdmin = !!parsed.isAdmin;
    const hasActiveSubscription = parsed.hasActiveSubscription ?? true;
    return {
      isAuthenticated: true,
      hasActiveSubscription,
      isAdmin,
      canAccessPremiumContent: hasActiveSubscription || isAdmin,
      subscriptionStatus: hasActiveSubscription ? "ativa" : "inativa",
      trialGuaranteeEndsAt: parsed.trialGuaranteeEndsAt ?? null,
      planName: hasActiveSubscription ? "ClickStart Plus" : "Free",
      displayName: first,
      email: parsed.email || "",
      initial: first.charAt(0).toUpperCase(),
      plan: hasActiveSubscription ? "ClickStart Plus" : "Free",
      sessionId,
    };
  } catch {
    return anonymous(sessionId);
  }
}

export function loginAs(input: { email: string; displayName?: string }) {
  const email = input.email.trim().toLowerCase();
  const isAdmin = email === "admin@clickstart.ai" || email.endsWith("@clickstart.admin");
  const displayName = (input.displayName || email.split("@")[0] || "Você").trim();
  const payload = {
    isAuthenticated: true,
    hasActiveSubscription: true,
    isAdmin,
    subscriptionStatus: "ativa",
    trialGuaranteeEndsAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    planName: "ClickStart Plus",
    displayName,
    email,
  };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export function logout() {
  try {
    localStorage.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Placeholder user hook. When real auth lands, replace `readUser` with
 * the authenticated session. The shape stays the same so the UI doesn't change.
 */
export function useUser() {
  const [user, setUser] = useState<ClickStartUser>(() => readUser());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY || e.key === LS_SESSION) setUser(readUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return user;
}
