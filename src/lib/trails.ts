export interface Trail {
  id: string;
  title: string;
  description: string;
  color: "purple" | "teal" | "pink" | "amber" | "indigo" | "cyan";
  icon: string; // lucide icon name
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  timeToStart: string;
  profile: string;
  agentId?: string; // optional related agent for "Abrir trilha"
}

// Order matters — used across the whole app.
export const trails: Trail[] = [
  {
    id: "produtos-digitais",
    title: "Produtos Digitais",
    description: "Crie ebooks, planners, templates, prompts e materiais digitais para vender no automático.",
    color: "indigo",
    icon: "file-text",
    difficulty: "Iniciante",
    timeToStart: "3 a 14 dias",
    profile: "Quem gosta de organizar e escrever",
    agentId: "produtos-digitais",
  },
  {
    id: "servicos-com-ia",
    title: "Serviços com IA",
    description: "Empacote e venda serviços para empresas usando inteligência artificial como diferencial.",
    color: "teal",
    icon: "briefcase",
    difficulty: "Intermediário",
    timeToStart: "7 a 30 dias",
    profile: "Tem experiência em vendas ou atendimento",
    agentId: "servicos-ia",
  },
  {
    id: "micro-saas",
    title: "Micro-SaaS",
    description: "Crie uma ferramenta online simples e cobre assinatura recorrente todo mês.",
    color: "purple",
    icon: "boxes",
    difficulty: "Avançado",
    timeToStart: "30 a 90 dias",
    profile: "Tem paciência para validar e iterar",
    agentId: "micro-saas",
  },
  {
    id: "tiktok-shop",
    title: "TikTok Shop",
    description: "Venda usando vídeos curtos, produtos físicos, afiliados e social commerce.",
    color: "cyan",
    icon: "video",
    difficulty: "Iniciante",
    timeToStart: "1 a 7 dias",
    profile: "Gosta de gravar vídeos curtos",
    agentId: "tiktok-shop",
  },
  {
    id: "youtube-sem-aparecer",
    title: "YouTube sem aparecer",
    description: "Crie canais usando roteiro, voz, imagem e edição com IA — sem mostrar o rosto.",
    color: "indigo",
    icon: "youtube",
    difficulty: "Intermediário",
    timeToStart: "14 a 60 dias",
    profile: "Não quer mostrar o rosto",
    agentId: "youtube-faceless",
  },
  {
    id: "afiliados",
    title: "Afiliados",
    description: "Venda produtos de outras pessoas com conteúdo, recomendação e estratégia.",
    color: "amber",
    icon: "link",
    difficulty: "Iniciante",
    timeToStart: "1 a 14 dias",
    profile: "Gosta de criar conteúdo e indicar",
    agentId: "produtos-digitais",
  },
  {
    id: "templates-prompts",
    title: "Templates e Prompts",
    description: "Venda materiais prontos, prompts, checklists e modelos para criadores e empresas.",
    color: "teal",
    icon: "layout-template",
    difficulty: "Iniciante",
    timeToStart: "2 a 10 dias",
    profile: "Sabe usar bem ferramentas de IA",
    agentId: "produtos-digitais",
  },
  {
    id: "comecar-do-zero",
    title: "Começar do Zero",
    description: "Para quem ainda não sabe qual caminho escolher. Faça o diagnóstico antes de decidir.",
    color: "purple",
    icon: "compass",
    difficulty: "Iniciante",
    timeToStart: "Hoje mesmo",
    profile: "Quem nunca vendeu nada online",
    agentId: "diagnostico-digital",
  },
];
