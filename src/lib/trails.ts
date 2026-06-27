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
    agentId: "afiliados",
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
    agentId: "templates-prompts",
  },
  {
    id: "revisar-meu-caminho",
    title: "Revisar meu caminho",
    description: "Revise sua rota atual, compare alternativas e ajuste o próximo passo com clareza.",
    color: "purple",
    icon: "compass",
    difficulty: "Iniciante",
    timeToStart: "Hoje mesmo",
    profile: "Quem está em dúvida ou travado",
    agentId: "diagnostico-digital",
  },
  {
    id: "plano-de-acao",
    title: "Plano de Ação",
    description: "Transforme sua ideia em tarefas diárias, plano de 7 dias e roadmap de 30 dias.",
    color: "amber",
    icon: "clipboard-list",
    difficulty: "Iniciante",
    timeToStart: "Hoje mesmo",
    profile: "Quem precisa organizar execução",
    agentId: "plano-de-acao",
  },
  {
    id: "glossario-digital",
    title: "Glossário Digital",
    description: "Entenda termos difíceis do digital em português simples, com exemplos práticos.",
    color: "indigo",
    icon: "book-open",
    difficulty: "Iniciante",
    timeToStart: "Hoje mesmo",
    profile: "Quem quer aprender sem jargão",
    agentId: "glossario-digital",
  },
];
