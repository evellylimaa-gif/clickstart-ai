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

const SAMPLE_HISTORY: ConversationRecord[] = [
  {
    id: "sample-1",
    date: "2026-04-05T14:30:00.000Z",
    agentId: "consultor-negocios",
    agentName: "Consultor de negócios com IA para não-devs",
    agentBadge: "Agentes de IA para Empresas",
    firstQuestion: "Tenho 2h por dia — o que faço?",
    messages: [
      { role: "user", content: "Tenho 2h por dia — o que faço?" },
      { role: "assistant", content: "## 🚀 Seu Caminho Recomendado\n\nCom 2h por dia, você pode gerar renda real em até 7 dias.\n\n### Plano de ação\n- Criar 3 templates de automação no Make\n- Publicar no Gumroad por R$47 cada\n- Divulgar em 5 grupos de WhatsApp\n\n### Ferramentas necessárias\nMake, Gumroad, Canva, ChatGPT\n\n### Potencial de ganho estimado\nR$500 a R$2.000/mês\n\nPróximo passo exato para começar hoje: Abra o Make e crie sua primeira automação de resposta automática para Instagram." },
    ],
  },
  {
    id: "sample-2",
    date: "2026-04-03T10:15:00.000Z",
    agentId: "estrategista-renda",
    agentName: "Estrategista de renda online com IA",
    agentBadge: "Monetização Web com IA",
    firstQuestion: "Quero vender templates e prompts",
    messages: [
      { role: "user", content: "Quero vender templates e prompts" },
      { role: "assistant", content: "## 🎯 Seu Caminho Recomendado\n\nVender prompts é uma das formas mais rápidas de monetizar com IA em 2026.\n\n### Plano de ação\n- Escolha um nicho (marketing, vendas ou atendimento)\n- Crie um pack com 10 prompts profissionais\n- Publique no Gumroad e PromptBase\n- Precifique entre R$27 e R$97\n\n### Ferramentas necessárias\nClaude, Gumroad, PromptBase, Notion\n\n### Potencial de ganho estimado\nR$1.000 a R$5.000/mês\n\nAção para hoje: Crie 3 prompts de alta qualidade para um nicho específico e publique no Gumroad." },
    ],
  },
];

function loadHistory(): ConversationRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SAMPLE_HISTORY;
  } catch {
    return SAMPLE_HISTORY;
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
