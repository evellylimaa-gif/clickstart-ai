import { useEffect, useState } from "react";

const KEY = "clickstart_diagnosis_completed";

export function useDiagnosis() {
  const [completed, setCompleted] = useState<boolean>(() => {
    try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
  });

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setCompleted(e.newValue === "1");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const markCompleted = () => {
    try { localStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    setCompleted(true);
  };
  const reset = () => {
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    setCompleted(false);
  };

  return { completed, markCompleted, reset };
}
