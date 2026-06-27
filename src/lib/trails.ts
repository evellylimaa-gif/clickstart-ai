export interface Trail {
  id: string;
  title: string;
  description: string;
  color: "purple" | "teal" | "pink" | "amber";
  icon: string; // lucide icon name
  difficulty: "Iniciante" | "Intermediário" | "Avançado";
  timeToStart: string;
  profile: string;
  agentId?: string; // optional related agent for "Abrir trilha"
}

export const trails: Trail[] = [
  {
    id: "comecar-do-zero",
    title: "Começar do Zero",
    description: "Para quem quer entrar no digital, mas ainda não sabe qual caminho escolher.",
    color: "purple",
    icon: "compass",
    difficulty: "Iniciante",
    timeToStart: "Hoje mesmo",
    profile: "Quem nunca vendeu nada online",
    agentId: "diagnostico-digital",
  },
  {
    id: "tiktok-shop",
    title: "TikTok Shop",
    description: "Para quem quer vender usando vídeos, produtos, afiliados e social commerce.",
    color: "teal",
    icon: "video",
    difficulty: "Iniciante",
    timeToStart: "1 a 7 dias",
    profile: "Gosta de gravar vídeos curtos",
    agentId: "tiktok-shop",
  },
  {
    id: "produtos-digitais",
    title: "Produtos Digitais",
    description: "Para quem quer criar ebooks, planners, templates, prompts ou materiais digitais.",
    color: "pink",
    icon: "file-text",
    difficulty: "Iniciante",
    timeToStart: "3 a 14 dias",
    profile: "Quem gosta de organizar e escrever",
    agentId: "produtos-digitais",
  },
  {
    id: "servicos-com-ia",
    title: "Serviços com IA",
    description: "Para quem quer vender serviços para empresas usando inteligência artificial.",
    color: "amber",
    icon: "briefcase",
    difficulty: "Intermediário",
    timeToStart: "7 a 30 dias",
    profile: "Tem experiência em vendas ou atendimento",
    agentId: "servicos-ia",
  },
  {
    id: "micro-saas",
    title: "Micro-SaaS",
    description: "Para quem quer criar uma ferramenta online simples e cobrar assinatura.",
    color: "purple",
    icon: "boxes",
    difficulty: "Avançado",
    timeToStart: "30 a 90 dias",
    profile: "Tem paciência para validar e iterar",
    agentId: "micro-saas",
  },
  {
    id: "youtube-sem-aparecer",
    title: "YouTube Sem Aparecer",
    description: "Para quem quer criar canais usando roteiro, voz, imagem e edição com IA.",
    color: "teal",
    icon: "youtube",
    difficulty: "Intermediário",
    timeToStart: "14 a 60 dias",
    profile: "Não quer mostrar o rosto",
    agentId: "youtube-faceless",
  },
  {
    id: "afiliados",
    title: "Afiliados",
    description: "Para quem quer vender produtos de outras pessoas com conteúdo e estratégia.",
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
    description: "Para quem quer vender materiais prontos, prompts, checklists e modelos.",
    color: "pink",
    icon: "layout-template",
    difficulty: "Iniciante",
    timeToStart: "2 a 10 dias",
    profile: "Sabe usar bem ferramentas de IA",
    agentId: "produtos-digitais",
  },
];
