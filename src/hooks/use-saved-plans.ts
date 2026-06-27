import { useEffect, useState } from "react";

export type SavedPlanCategory =
  | "Planos de 7 dias"
  | "Roadmaps de 30 dias"
  | "Ideias de produto"
  | "Roteiros"
  | "Ofertas"
  | "Checklists"
  | "Pesquisas de nicho";

export interface SavedPlan {
  id: string;
  title: string;
  category: SavedPlanCategory;
  agentBadge: string;
  content: string;
  createdAt: string;
}

const LS_KEY = "clickstart_saved_plans";

function read(): SavedPlan[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as SavedPlan[]) : [];
  } catch {
    return [];
  }
}

function write(plans: SavedPlan[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(plans));
  } catch {
    /* ignore */
  }
}

function inferCategory(content: string): SavedPlanCategory {
  const c = content.toLowerCase();
  if (/30\s*dias|roadmap/.test(c)) return "Roadmaps de 30 dias";
  if (/7\s*dias|primeira semana|próxim[oa]s? dias/.test(c)) return "Planos de 7 dias";
  if (/roteiro|gancho|cta|vídeo/.test(c)) return "Roteiros";
  if (/oferta|preço|bônus|garantia/.test(c)) return "Ofertas";
  if (/nicho|público|persona|dor/.test(c)) return "Pesquisas de nicho";
  if (/ideia|produto|ebook|template/.test(c)) return "Ideias de produto";
  return "Checklists";
}

function inferTitle(content: string, agentBadge: string): string {
  const firstLine = content.split("\n").map((l) => l.trim()).find(Boolean) || agentBadge;
  return firstLine.replace(/^[#*\-\s>]+/, "").slice(0, 80);
}

export function useSavedPlans() {
  const [plans, setPlans] = useState<SavedPlan[]>(() => read());

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY) setPlans(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const savePlan = (input: { content: string; agentBadge: string; title?: string; category?: SavedPlanCategory }) => {
    const plan: SavedPlan = {
      id: `plan_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      title: input.title || inferTitle(input.content, input.agentBadge),
      category: input.category || inferCategory(input.content),
      agentBadge: input.agentBadge,
      content: input.content,
      createdAt: new Date().toISOString(),
    };
    const next = [plan, ...plans].slice(0, 80);
    setPlans(next);
    write(next);
    return plan;
  };

  const removePlan = (id: string) => {
    const next = plans.filter((p) => p.id !== id);
    setPlans(next);
    write(next);
  };

  const clearPlans = () => {
    setPlans([]);
    write([]);
  };

  return { plans, savePlan, removePlan, clearPlans };
}
