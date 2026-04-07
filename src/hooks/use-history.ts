import { useState, useCallback } from "react";

export interface ConversationRecord {
  id: string;
  date: string;
  agentId: string;
  agentName: string;
  agentBadge: string;
  firstQuestion: string;
  messages: { role: "user" | "assistant"; content: string }[];
}

const STORAGE_KEY = "evelly_conversation_history";

function loadHistory(): ConversationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistHistory(records: ConversationRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function useHistory() {
  const [history, setHistory] = useState<ConversationRecord[]>(loadHistory);

  const saveConversation = useCallback(
    (record: Omit<ConversationRecord, "id" | "date">) => {
      const entry: ConversationRecord = {
        ...record,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };
      setHistory((prev) => {
        const next = [entry, ...prev];
        persistHistory(next);
        return next;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  }, []);

  return { history, saveConversation, clearHistory };
}
