import { useEffect, useState } from "react";

export interface ClickStartUser {
  isAuthenticated: boolean;
  /** First name when logged in, neutral placeholder otherwise. */
  displayName: string;
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

function readUser(): ClickStartUser {
  const sessionId = ensureSessionId();
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ClickStartUser>;
      if (parsed.isAuthenticated && parsed.displayName) {
        const first = parsed.displayName.trim().split(" ")[0] || "Você";
        return {
          isAuthenticated: true,
          displayName: first,
          initial: first.charAt(0).toUpperCase(),
          plan: (parsed.plan as ClickStartUser["plan"]) || "ClickStart Plus",
          sessionId,
        };
      }
    }
  } catch {
    /* ignore */
  }
  return {
    isAuthenticated: false,
    displayName: "Sua conta",
    initial: "•",
    plan: "ClickStart Plus",
    sessionId,
  };
}

/**
 * Placeholder user hook. When real auth lands, replace `readUser` with
 * the authenticated session. The shape stays the same so the UI doesn't change.
 *
 * Future: a single active session policy will be enforced server-side —
 * logging in on a new device will invalidate `sessionId` here.
 */
export function useUser() {
  const [user, setUser] = useState<ClickStartUser>(() => readUser());

  // Cross-tab sync, e.g. when a future login writes the user object.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY || e.key === LS_SESSION) setUser(readUser());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return user;
}
