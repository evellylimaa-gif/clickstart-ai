export interface KitSection {
  title: string;
  items: string[];
}

export interface Kit {
  id: string;
  title: string;
  description: string;
  recommendedProfile: string;
  color: "purple" | "teal" | "amber" | "pink";
  agentId?: string;
  overview: string;
  firstAction: string;
  sections: KitSection[];
  checklist: string[];
  prompts: { label: string; prompt: string }[];
}

export const kits: Kit[] = [
  {
    id: "comecar-do-zero",
    title: "Começar do Zero",
    description: "Para quem nunca vendeu nada online e quer dar o primeiro passo com clareza.",
    recommendedProfile: "Iniciante absoluto, sem audiência e sem produto.",
    color: "purple",
    agentId: "diagnostico-digital",
    overview: "Esse kit organiza sua primeira semana no digital, sem você precisar adivinhar nada. Foco em entender seu perfil, escolher um caminho e dar o primeiro passo real.",
    firstAction: "Reserve 20 minutos hoje e responda às 'Perguntas para descobrir seu perfil'. Sem isso, todo o resto vira tentativa.",
    sections: [
      { title: "O que está incluso", items: [
        "Checklist dos primeiros 7 dias",
        "Perguntas para descobrir seu perfil",
        "Lista de caminhos possíveis no digital",
        "Erros que iniciantes devem evitar",
      ]},
    ],
    checklist: [
      "Dia 1 — Responder as perguntas de perfil",
      "Dia 2 — Escolher 1 caminho (não 3)",
      "Dia 3 — Mapear referências que já fazem isso",
      "Dia 4 — Definir o que você vai oferecer primeiro",
      "Dia 5 — Criar presença mínima (bio, link, contato)",
      "Dia 6 — Publicar o primeiro conteúdo ou oferta",
      "Dia 7 — Revisar o que aprendeu e ajustar",
    ],
    prompts: [
      { label: "Descobrir meu perfil", prompt: "Quero descobrir meu perfil digital. Me faça perguntas curtas, uma de cada vez, para entender se eu sou mais criador, vendedor, freelancer ou automatizador." },
      { label: "Plano de 7 dias", prompt: "Monte um plano de 7 dias para alguém que está começando do zero no digital, com 1 tarefa simples por dia." },
    ],
  },
  {
    id: "tiktok-shop",
    title: "TikTok Shop",
    description: "Para quem quer vender usando vídeos curtos e social commerce.",
    recommendedProfile: "Quem se sente confortável com câmera ou quer aprender a vender por vídeo.",
    color: "teal",
    agentId: "tiktok-shop",
    overview: "Esse kit te entrega o caminho prático para começar no TikTok Shop sem ficar perdido em tendência. Foco em nicho, produto e roteiro que converte.",
    firstAction: "Hoje, escolha 1 nicho da sua lista e grave 3 ideias de vídeo no bloco de notas. Sem nicho definido, o algoritmo não te encontra.",
    sections: [
      { title: "O que está incluso", items: [
        "Checklist para escolher nicho",
        "Ideias de vídeos para começar",
        "Modelo de roteiro curto",
        "Lista de cuidados antes de vender produto",
      ]},
    ],
    checklist: [
      "Definir 1 nicho específico (não genérico)",
      "Listar 10 dores reais desse público",
      "Pesquisar 3 produtos que resolvem essas dores",
      "Criar 5 ganchos diferentes para o mesmo vídeo",
      "Gravar e publicar 3 vídeos no formato curto",
      "Analisar qual deu mais retenção",
      "Repetir o formato vencedor por 1 semana",
    ],
    prompts: [
      { label: "Roteiro curto", prompt: "Crie um roteiro de TikTok de 30 segundos com gancho forte, demonstração e CTA, para vender [produto] para [público]." },
      { label: "10 ganchos", prompt: "Liste 10 ganchos diferentes para um vídeo de TikTok sobre [tema], focados em parar o scroll nos primeiros 2 segundos." },
    ],
  },
  {
    id: "produtos-digitais",
    title: "Produtos Digitais",
    description: "Para quem quer criar ebooks, planners, templates ou pacotes digitais.",
    recommendedProfile: "Quem tem conhecimento ou habilidade que pode virar produto.",
    color: "pink",
    agentId: "produtos-digitais",
    overview: "Esse kit te mostra como transformar conhecimento em produto digital vendável, com estrutura clara e oferta que convence.",
    firstAction: "Escolha 1 problema que você sabe resolver e descreva em uma frase. Esse é o seu produto.",
    sections: [
      { title: "O que está incluso", items: [
        "Ideias de ebooks, planners e templates",
        "Estrutura simples de ebook",
        "Modelo de oferta",
        "Checklist de página de venda",
      ]},
    ],
    checklist: [
      "Definir 1 problema específico que você resolve",
      "Escolher formato (ebook, planner, template)",
      "Listar capítulos ou seções",
      "Criar capa e identidade visual simples",
      "Escrever a copy da oferta",
      "Montar a página de venda",
      "Definir preço de entrada honesto",
    ],
    prompts: [
      { label: "Estrutura de ebook", prompt: "Monte a estrutura de um ebook sobre [tema], com 5 capítulos curtos, foco prático e linguagem para iniciantes." },
      { label: "Página de venda", prompt: "Escreva a copy completa de uma página de venda para um ebook sobre [tema], com promessa, dores, benefícios, prova e CTA." },
    ],
  },
  {
    id: "servicos-ia",
    title: "Serviços com IA",
    description: "Para quem quer vender serviços com IA para empresas e profissionais.",
    recommendedProfile: "Quem gosta de resolver problemas e prefere atender cliente direto.",
    color: "amber",
    agentId: "servicos-ia",
    overview: "Esse kit te ensina a empacotar serviços com IA de forma profissional e cobrar bem, mesmo sem portfólio.",
    firstAction: "Escolha 1 tipo de empresa (ex: dentista, advogado) e liste 3 tarefas chatas que a IA poderia fazer. Esse é seu serviço.",
    sections: [
      { title: "O que está incluso", items: [
        "Ideias de serviços para vender",
        "Pacotes de entrega prontos",
        "Modelo de mensagem de prospecção",
        "Checklist para fechar o primeiro cliente",
      ]},
    ],
    checklist: [
      "Escolher 1 nicho de cliente",
      "Definir 1 serviço com IA específico",
      "Montar 3 pacotes (básico, intermediário, completo)",
      "Definir preço por pacote",
      "Criar mensagem de prospecção curta",
      "Enviar para 10 contatos por dia",
      "Fechar o primeiro cliente em até 14 dias",
    ],
    prompts: [
      { label: "Mensagem de prospecção", prompt: "Escreva uma mensagem curta de prospecção para [tipo de empresa], oferecendo um serviço com IA que resolve [problema], com tom humano e direto." },
      { label: "Pacotes de serviço", prompt: "Monte 3 pacotes de serviço com IA para [nicho], com escopo, prazo e faixa de preço sugerida em reais." },
    ],
  },
  {
    id: "micro-saas",
    title: "Micro-SaaS",
    description: "Para quem quer construir uma ferramenta simples e cobrar assinatura.",
    recommendedProfile: "Quem prefere construir produto recorrente em vez de atender clientes.",
    color: "purple",
    agentId: "micro-saas",
    overview: "Esse kit traduz o que é SaaS, micro-SaaS e MVP de forma simples, e te entrega o caminho para validar uma ideia antes de gastar tempo.",
    firstAction: "Liste 3 dores específicas de um público que você conhece. Sua melhor ideia de micro-SaaS está nessa lista.",
    sections: [
      { title: "O que está incluso", items: [
        "Explicação simples de SaaS e micro-SaaS",
        "Como escolher uma dor específica",
        "Checklist de MVP",
        "Modelo de prompt para Lovable",
      ]},
    ],
    checklist: [
      "Escolher 1 público específico",
      "Mapear a dor mais cara desse público",
      "Definir a menor versão possível da solução",
      "Validar com 5 conversas reais",
      "Definir preço de assinatura",
      "Construir MVP no Lovable",
      "Lançar para os 5 primeiros usuários",
    ],
    prompts: [
      { label: "Validar ideia", prompt: "Quero validar a ideia de um micro-SaaS para [público] que resolve [dor]. Me ajude a desenhar 5 perguntas curtas para fazer em uma conversa de validação." },
      { label: "Prompt para Lovable", prompt: "Monte um prompt detalhado para o Lovable construir o MVP de um micro-SaaS que [função principal], com tela de login, dashboard e cobrança recorrente." },
    ],
  },
  {
    id: "youtube-sem-aparecer",
    title: "YouTube Sem Aparecer",
    description: "Para quem quer criar canal usando roteiro, voz e IA, sem mostrar o rosto.",
    recommendedProfile: "Quem prefere bastidor, gosta de pesquisar e tem paciência para crescer médio prazo.",
    color: "teal",
    agentId: "youtube-faceless",
    overview: "Esse kit organiza a produção de canal faceless de ponta a ponta, evitando o erro mais comum: conteúdo genérico que não engaja.",
    firstAction: "Defina hoje o tema central do canal em 1 frase. Sem isso, nenhum roteiro funciona.",
    sections: [
      { title: "O que está incluso", items: [
        "Ideias de nicho para canal sem rosto",
        "Estrutura de roteiro que prende",
        "Checklist de produção com IA",
        "Cuidados para não criar conteúdo genérico",
      ]},
    ],
    checklist: [
      "Escolher 1 nicho específico e duradouro",
      "Listar 20 títulos potenciais",
      "Definir formato (lista, história, explicação)",
      "Montar estrutura padrão de roteiro",
      "Definir ferramenta de voz e visual",
      "Produzir 3 vídeos piloto",
      "Avaliar retenção e ajustar",
    ],
    prompts: [
      { label: "Roteiro retenção", prompt: "Escreva um roteiro de vídeo de 8 minutos para canal faceless sobre [tema], com gancho forte, 3 blocos e CTA final." },
      { label: "20 títulos", prompt: "Gere 20 títulos de YouTube sobre [tema], otimizados para clique e busca, sem ser sensacionalistas." },
    ],
  },
  {
    id: "afiliados",
    title: "Afiliados",
    description: "Para quem quer vender produtos de outras pessoas com conteúdo e estratégia.",
    recommendedProfile: "Quem quer começar rápido, sem criar produto próprio.",
    color: "amber",
    agentId: "afiliados",
    overview: "Esse kit te ajuda a virar afiliado de verdade, escolhendo produto certo e criando conteúdo que vende sem parecer venda.",
    firstAction: "Escolha hoje 1 produto que você já usaria, mesmo sem comissão. Esse é o produto para começar.",
    sections: [
      { title: "O que está incluso", items: [
        "Como escolher produto",
        "Como criar conteúdo de indicação",
        "Checklist de oferta",
        "Erros comuns de afiliado iniciante",
      ]},
    ],
    checklist: [
      "Escolher 1 produto que você confia",
      "Estudar a página de venda oficial",
      "Listar 5 dores que ele resolve",
      "Criar 5 formatos de conteúdo (vídeo, post, texto)",
      "Publicar com link de afiliado",
      "Acompanhar cliques e conversões",
      "Ajustar abordagem com base nos dados",
    ],
    prompts: [
      { label: "Conteúdo de indicação", prompt: "Crie 5 ideias de conteúdo honesto para divulgar [produto] como afiliado, sem parecer anúncio empurrado." },
      { label: "Comparativo", prompt: "Monte um conteúdo comparando [produto A] e [produto B], com tom imparcial e CTA discreto para o link de afiliado." },
    ],
  },
  {
    id: "templates-prompts",
    title: "Templates e Prompts",
    description: "Para quem quer vender materiais prontos, prompts, checklists e modelos.",
    recommendedProfile: "Quem gosta de organizar, criar processos e empacotar conhecimento.",
    color: "pink",
    agentId: "templates-prompts",
    overview: "Esse kit te entrega o caminho para montar pacotes de templates e prompts vendáveis, com posicionamento claro.",
    firstAction: "Liste 5 prompts que você já usa quase todo dia. O pacote começa aí.",
    sections: [
      { title: "O que está incluso", items: [
        "Ideias de templates vendáveis",
        "Estrutura de prompt pack",
        "Checklist para montar o pacote",
        "Sugestão de plataformas de venda",
      ]},
    ],
    checklist: [
      "Definir tema do pacote (nicho específico)",
      "Listar 20 prompts úteis e testados",
      "Organizar por categoria",
      "Criar um documento bonito (Notion, PDF, Canva)",
      "Escrever copy da oferta",
      "Definir preço entre R$19 e R$97",
      "Publicar em Gumroad, Hotmart ou Kiwify",
    ],
    prompts: [
      { label: "Estrutura de pack", prompt: "Monte a estrutura de um prompt pack sobre [tema], com 20 prompts organizados em 4 categorias e exemplos de uso." },
      { label: "Copy de venda", prompt: "Escreva a copy de venda para um pacote de prompts focado em [público], com promessa clara, dores, benefícios e CTA." },
    ],
  },
];
