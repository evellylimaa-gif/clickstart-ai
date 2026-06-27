import { useCallback, useEffect, useState } from "react";

export type PlanId = "essencial" | "plus" | "pro";

export const PLAN_LIMITS: Record<PlanId, number> = {
  essencial: 80,
  plus: 200,
  pro: 500,
};

const LS_USAGE = "clickstart_usage";
const LS_PLAN = "clickstart_plan";

interface UsageState {
  month: string; // YYYY-MM
  used: number;
}

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function readPlan(): PlanId {
  try {
    const p = (localStorage.getItem(LS_PLAN) || "plus").toLowerCase();
    if (p === "essencial" || p === "plus" || p === "pro") return p;
  } catch {
    /* ignore */
  }
  return "plus";
}

function readUsage(): UsageState {
  try {
    const raw = localStorage.getItem(LS_USAGE);
    if (raw) {
      const parsed = JSON.parse(raw) as UsageState;
      if (parsed.month === currentMonth()) return parsed;
    }
  } catch {
    /* ignore */
  }
  const fresh = { month: currentMonth(), used: 0 };
  try { localStorage.setItem(LS_USAGE, JSON.stringify(fresh)); } catch { /* ignore */ }
  return fresh;
}

export function useUsage() {
  const [state, setState] = useState<UsageState>(() => readUsage());
  const [plan, setPlan] = useState<PlanId>(() => readPlan());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_USAGE) setState(readUsage());
      if (e.key === LS_PLAN) setPlan(readPlan());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const limit = PLAN_LIMITS[plan];
  const used = Math.min(state.used, limit);
  const remaining = Math.max(0, limit - state.used);
  const percent = Math.min(100, Math.round((state.used / limit) * 100));
  const canSend = remaining > 0;

  const increment = useCallback(() => {
    setState((prev) => {
      const month = currentMonth();
      const base = prev.month === month ? prev : { month, used: 0 };
      const next = { month, used: base.used + 1 };
      try { localStorage.setItem(LS_USAGE, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const next = { month: currentMonth(), used: 0 };
    try { localStorage.setItem(LS_USAGE, JSON.stringify(next)); } catch { /* ignore */ }
    setState(next);
  }, []);

  return { used, limit, remaining, percent, canSend, plan, increment, reset };
}
