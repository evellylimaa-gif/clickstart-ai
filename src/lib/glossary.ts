export type GlossaryCategory = "Vendas" | "SaaS" | "Marketing" | "IA" | "Produto digital";

export interface GlossaryTerm {
  term: string;
  category: GlossaryCategory;
  meaning: string;
  purpose: string;
  example: string;
  whenNeeded: string;
  nextStep: string;
  /** Onde isso aparece no digital, no dia a dia do iniciante. */
  whereSeen?: string;
  /** Erro mais comum de quem está começando com esse conceito. */
  commonMistake?: string;
  /** Trilha relacionada do ClickStart AI (label visível). */
  relatedTrail?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    term: "IA",
    category: "IA",
    meaning: "Tecnologia que ajuda a criar, analisar, organizar e automatizar tarefas usando linguagem, dados, imagem, áudio e código.",
    purpose: "Pensar melhor, produzir mais rápido e executar com mais clareza, em vez de fazer tudo no braço.",
    example: "Usar IA para gerar a estrutura de um ebook, escrever a página de venda, criar a thumbnail e organizar o plano de 7 dias.",
    whenNeeded: "Agora. Quem está começando ganha tempo desde o primeiro dia usando IA como assistente.",
    nextStep: "Escolha uma tarefa repetitiva da sua semana e teste resolver com IA hoje.",
    whereSeen: "Em chatbots, geradores de imagem, automações, agentes especializados, editores de vídeo, ferramentas de pesquisa e dentro do ClickStart AI.",
    commonMistake: "Achar que IA é um botão mágico. IA bem usada exige clareza do que você quer e contexto do seu caso.",
    relatedTrail: "Serviços com IA",
  },
  {
    term: "SaaS",
    category: "SaaS",
    meaning: "Software como serviço. É um programa que você acessa pela internet pagando uma assinatura, em vez de comprar e instalar.",
    purpose: "Resolver um problema específico de forma contínua, recebendo todo mês pelo acesso.",
    example: "Netflix, Spotify e Canva são SaaS. Você paga por mês e usa pelo navegador.",
    whenNeeded: "Depois. Só vale criar quando você já entende a dor que quer resolver.",
    nextStep: "Antes de criar um SaaS, valide a ideia conversando com pessoas que sentem o problema.",
  },
  {
    term: "Micro-SaaS",
    category: "SaaS",
    meaning: "Uma versão pequena e focada de SaaS, geralmente feita por uma pessoa só, resolvendo uma dor bem específica.",
    purpose: "Gerar renda recorrente sem precisar de equipe grande nem investimento alto.",
    example: "Um app simples que gera legendas de Instagram para nutricionistas, cobrando R$29/mês.",
    whenNeeded: "Quando você já testou a ideia e quer transformar em produto.",
    nextStep: "Comece pela trilha Micro-SaaS para mapear uma dor específica.",
  },
  {
    term: "MVP",
    category: "Produto digital",
    meaning: "Produto Mínimo Viável. A versão mais simples do seu produto que já entrega valor.",
    purpose: "Lançar rápido, testar com pessoas reais e aprender antes de gastar tempo demais.",
    example: "Em vez de um app completo, você lança uma planilha que faz o essencial.",
    whenNeeded: "Agora. MVP é como você sai do plano e começa a vender.",
    nextStep: "Defina a menor versão possível do seu produto que alguém pagaria por ela.",
  },
  {
    term: "API",
    category: "SaaS",
    meaning: "É a forma de dois programas conversarem entre si, trocando dados de forma automática.",
    purpose: "Conectar serviços, automatizar tarefas e integrar ferramentas.",
    example: "Quando o iFood mostra o mapa do Google, ele usa a API do Google Maps.",
    whenNeeded: "Depois. Só vai precisar quando estiver montando algo técnico.",
    nextStep: "Por enquanto, foque em validar a ideia. API entra na etapa de construção.",
  },
  {
    term: "Webhook",
    category: "SaaS",
    meaning: "Um aviso automático que um sistema envia para outro quando algo acontece.",
    purpose: "Disparar ações em tempo real sem precisar ficar checando manualmente.",
    example: "Quando alguém compra na sua loja, um webhook avisa o WhatsApp para enviar a mensagem.",
    whenNeeded: "Depois, quando você estiver montando automações de verdade.",
    nextStep: "Anote o conceito e volte aqui quando começar a usar ferramentas como Make ou Zapier.",
  },
  {
    term: "Lead",
    category: "Vendas",
    meaning: "Uma pessoa que demonstrou interesse no seu produto, deixando um contato ou seguindo você.",
    purpose: "Transformar curiosos em clientes ao longo do tempo.",
    example: "Quem baixa seu ebook gratuito vira um lead que você pode contatar depois.",
    whenNeeded: "Agora. Começar a juntar leads desde o dia 1 acelera tudo.",
    nextStep: "Crie uma forma simples de capturar contatos, como um formulário ou link na bio.",
  },
  {
    term: "Funil",
    category: "Vendas",
    meaning: "O caminho que uma pessoa percorre, desde te conhecer até comprar de você.",
    purpose: "Organizar a jornada do cliente e melhorar a conversão em cada etapa.",
    example: "Vídeo no TikTok leva para o link na bio, que leva para uma página de venda.",
    whenNeeded: "Agora. Mesmo o funil mais simples já ajuda a vender mais.",
    nextStep: "Desenhe seu funil em 3 etapas: descoberta, interesse e compra.",
  },
  {
    term: "Copy",
    category: "Marketing",
    meaning: "Texto escrito para convencer alguém a fazer uma ação, como clicar ou comprar.",
    purpose: "Vender com palavras, sem precisar empurrar o produto.",
    example: "O texto da página de venda de um curso é uma copy.",
    whenNeeded: "Agora. Toda página, oferta e anúncio precisa de copy clara.",
    nextStep: "Comece testando títulos diferentes e veja qual gera mais cliques.",
  },
  {
    term: "CTA",
    category: "Marketing",
    meaning: "Chamada para ação. É a frase que diz para a pessoa o próximo passo.",
    purpose: "Guiar o visitante para fazer algo específico, como comprar ou se cadastrar.",
    example: "Botões como 'Começar agora' ou 'Quero garantir minha vaga' são CTAs.",
    whenNeeded: "Agora. Toda página precisa de um CTA visível.",
    nextStep: "Reveja seus posts e links: cada um tem uma CTA clara?",
  },
  {
    term: "Conversão",
    category: "Vendas",
    meaning: "Quando uma pessoa faz a ação que você queria, como comprar ou se cadastrar.",
    purpose: "Medir se seu funil está realmente funcionando.",
    example: "Se 100 pessoas visitam sua página e 3 compram, sua conversão é 3%.",
    whenNeeded: "Agora. Conversão é o sinal de que sua estratégia gera resultado.",
    nextStep: "Calcule sua conversão atual e teste uma mudança por vez para melhorar.",
  },
  {
    term: "Checkout",
    category: "Vendas",
    meaning: "A página onde o cliente finaliza a compra e faz o pagamento.",
    purpose: "Transformar interesse em venda concluída.",
    example: "A tela com formas de pagamento na Hotmart, Eduzz ou Stripe é o checkout.",
    whenNeeded: "Agora, assim que tiver um produto para vender.",
    nextStep: "Escolha uma plataforma simples para hospedar seu checkout e teste o fluxo.",
  },
  {
    term: "Nicho",
    category: "Marketing",
    meaning: "Um público específico, com uma dor ou interesse bem claro.",
    purpose: "Falar com quem realmente precisa, em vez de tentar agradar todo mundo.",
    example: "Em vez de 'finanças', um nicho é 'finanças para mães autônomas'.",
    whenNeeded: "Agora. Escolher um nicho é o que destrava tudo.",
    nextStep: "Anote 3 nichos que você conhece bem e escolha o mais promissor.",
  },
  {
    term: "Tráfego pago",
    category: "Marketing",
    meaning: "Visitas que chegam até você porque você pagou por anúncios.",
    purpose: "Acelerar o alcance sem depender só do algoritmo.",
    example: "Anúncios no Instagram, TikTok, Google ou YouTube.",
    whenNeeded: "Depois. Comece com tráfego orgânico até validar sua oferta.",
    nextStep: "Antes de pagar por anúncio, tenha uma oferta que já vendeu pelo menos uma vez.",
  },
  {
    term: "Tráfego orgânico",
    category: "Marketing",
    meaning: "Visitas que chegam sem você pagar, por conteúdo, indicação ou busca.",
    purpose: "Construir audiência e autoridade de forma sustentável.",
    example: "Um vídeo que viraliza no TikTok ou um texto que aparece no Google.",
    whenNeeded: "Agora. É a forma mais segura de começar.",
    nextStep: "Defina uma plataforma principal e publique de forma consistente.",
  },
  {
    term: "Afiliado",
    category: "Vendas",
    meaning: "Quem vende o produto de outra pessoa e recebe uma comissão por cada venda.",
    purpose: "Ganhar dinheiro sem precisar criar produto próprio.",
    example: "Recomendar um curso da Hotmart com seu link e receber por cada compra.",
    whenNeeded: "Agora. É uma das formas mais rápidas de começar.",
    nextStep: "Escolha 1 produto que você já usaria e crie conteúdo honesto sobre ele.",
  },
  {
    term: "Produto digital",
    category: "Produto digital",
    meaning: "Qualquer produto que pode ser entregue pela internet, sem estoque físico.",
    purpose: "Vender quantas vezes quiser sem custo de produção a cada venda.",
    example: "Ebooks, planners, templates, cursos, pacotes de prompts.",
    whenNeeded: "Agora. É o atalho clássico para gerar renda online.",
    nextStep: "Liste 3 ideias de produtos digitais baseados no que você já sabe fazer.",
  },
  {
    term: "Template",
    category: "Produto digital",
    meaning: "Um modelo pronto que outra pessoa pode usar como base.",
    purpose: "Economizar tempo de quem compra e gerar renda para quem cria.",
    example: "Templates de Notion, Canva, planilhas de controle financeiro.",
    whenNeeded: "Agora. Templates são produtos de venda rápida.",
    nextStep: "Escolha uma ferramenta que você domina e crie 1 template útil.",
  },
  {
    term: "Prompt",
    category: "IA",
    meaning: "A instrução que você dá para uma IA fazer alguma coisa.",
    purpose: "Tirar respostas melhores e mais úteis das ferramentas de IA.",
    example: "Em vez de 'escreva um post', um bom prompt diz tema, tom, formato e objetivo.",
    whenNeeded: "Agora. Saber escrever prompt vale por uma habilidade nova.",
    nextStep: "Pratique reescrevendo um prompt vago em um prompt detalhado.",
  },
  {
    term: "Landing page",
    category: "Marketing",
    meaning: "Uma página única feita para um objetivo específico, como vender ou capturar contato.",
    purpose: "Concentrar toda a atenção em uma decisão de cada vez.",
    example: "A página de inscrição de um curso ou de um webinar.",
    whenNeeded: "Agora, assim que tiver uma oferta para apresentar.",
    nextStep: "Monte uma landing page simples com promessa, prova e CTA.",
  },
  {
    term: "Onboarding",
    category: "Produto digital",
    meaning: "O processo que recebe o novo cliente ou usuário pela primeira vez.",
    purpose: "Reduzir confusão e fazer a pessoa enxergar valor logo no começo.",
    example: "Mensagens de boas-vindas, tutorial inicial, checklist de primeiros passos.",
    whenNeeded: "Agora, mesmo no produto mais simples.",
    nextStep: "Defina o primeiro 'momento de valor' que seu cliente deve viver.",
  },
  {
    term: "Churn",
    category: "SaaS",
    meaning: "A taxa de pessoas que cancelam ou param de pagar pelo seu produto.",
    purpose: "Mostrar se você está perdendo clientes mais rápido do que ganha.",
    example: "Se 100 pessoas assinam e 10 cancelam no mês, seu churn é 10%.",
    whenNeeded: "Depois, quando já tiver assinantes ativos.",
    nextStep: "Por enquanto, foque em conquistar os primeiros assinantes.",
  },
  {
    term: "MRR",
    category: "SaaS",
    meaning: "Receita Recorrente Mensal. Quanto você fatura todo mês com assinaturas.",
    purpose: "Acompanhar a saúde do negócio de forma previsível.",
    example: "10 clientes pagando R$39,90/mês geram R$399 de MRR.",
    whenNeeded: "Depois, quando começar a vender assinatura.",
    nextStep: "Foque primeiro em conseguir o primeiro cliente pagante.",
  },
  {
    term: "ARR",
    category: "SaaS",
    meaning: "Receita Recorrente Anual. É o MRR multiplicado por 12.",
    purpose: "Mostrar o tamanho do negócio em escala de ano.",
    example: "Um MRR de R$5.000 vira um ARR de R$60.000.",
    whenNeeded: "Depois. É métrica de negócio em crescimento.",
    nextStep: "Comece pequeno, valide a oferta e o ARR vem como consequência.",
  },
];

/**
 * Enrichment layer with extra fields per term. Kept separate to evolve
 * without rewriting the main list.
 */
const enrichment: Record<string, Pick<GlossaryTerm, "whereSeen" | "commonMistake" | "relatedTrail">> = {
  "SaaS": {
    whereSeen: "Em qualquer ferramenta que você acessa pelo navegador pagando por mês: Canva, Notion, Spotify, ClickStart AI.",
    commonMistake: "Achar que precisa ser um app gigante. SaaS pode resolver uma coisa só e ainda funcionar.",
    relatedTrail: "Micro-SaaS",
  },
  "Micro-SaaS": {
    whereSeen: "Em ferramentas pequenas feitas por 1 pessoa que cobram R$19 a R$97/mês.",
    commonMistake: "Tentar resolver tudo. Micro-SaaS bom resolve uma única dor muito bem.",
    relatedTrail: "Micro-SaaS",
  },
  "MVP": {
    whereSeen: "Sempre que você vê alguém lançando 'a versão 1.0 ainda crua'. Aquilo é o MVP.",
    commonMistake: "Esperar estar 'pronto' pra lançar. MVP é o oposto disso.",
    relatedTrail: "Micro-SaaS",
  },
  "API": {
    whereSeen: "Quando um app mostra dados de outro, como o tempo, mapa ou pagamento integrado.",
    commonMistake: "Confundir API com algo que o usuário final vê. API é encanamento, não vitrine.",
    relatedTrail: "Micro-SaaS",
  },
  "Lead": {
    whereSeen: "Toda vez que alguém deixa email pra baixar um ebook ou clica em 'quero saber mais'.",
    commonMistake: "Tratar todo lead como cliente. Lead ainda precisa ser conquistado.",
    relatedTrail: "Produtos Digitais",
  },
  "Funil": {
    whereSeen: "TikTok manda pro link na bio, link leva pra página de venda, página fecha compra. Isso é funil.",
    commonMistake: "Pular etapas e tentar vender no primeiro contato.",
    relatedTrail: "TikTok Shop",
  },
  "Copy": {
    whereSeen: "Em toda legenda, título, página de venda e botão que tenta te convencer de algo.",
    commonMistake: "Escrever bonito em vez de escrever claro. Copy boa é clara antes de ser criativa.",
    relatedTrail: "Produtos Digitais",
  },
  "CTA": {
    whereSeen: "Em todo botão 'Quero garantir', 'Assinar agora', 'Baixar grátis'.",
    commonMistake: "Pedir várias coisas ao mesmo tempo. Bom CTA pede uma ação por vez.",
    relatedTrail: "Produtos Digitais",
  },
  "Conversão": {
    whereSeen: "Em dashboards de loja, anúncio, página de captura e checkout.",
    commonMistake: "Achar que conversão baixa é culpa do tráfego. Quase sempre é a oferta.",
    relatedTrail: "Afiliados",
  },
  "Checkout": {
    whereSeen: "Na tela final de compra da Hotmart, Eduzz, Kiwify, Stripe, Shopify.",
    commonMistake: "Pedir dado demais. Quanto menos campo, mais venda.",
    relatedTrail: "Produtos Digitais",
  },
  "Nicho": {
    whereSeen: "No perfil de quem fala com um público bem específico e tem comentário engajado.",
    commonMistake: "Querer falar com 'todo mundo' pra não 'perder cliente'. É o jeito mais rápido de não vender.",
    relatedTrail: "Começar do Zero",
  },
  "Tráfego pago": {
    whereSeen: "Em qualquer post 'patrocinado' ou anúncio que aparece no feed.",
    commonMistake: "Pagar anúncio antes de ter oferta validada. É queimar dinheiro.",
    relatedTrail: "Afiliados",
  },
  "Tráfego orgânico": {
    whereSeen: "Em vídeos que viralizam, posts indexados no Google e indicações boca a boca.",
    commonMistake: "Postar sem constância. Algoritmo só recompensa quem aparece.",
    relatedTrail: "YouTube Sem Aparecer",
  },
  "Afiliado": {
    whereSeen: "Em links de Hotmart, Eduzz, Amazon, Shopee com código no final da URL.",
    commonMistake: "Vender produto ruim só pela comissão. Quebra confiança e some o público.",
    relatedTrail: "Afiliados",
  },
  "Produto digital": {
    whereSeen: "Em ebooks, planners, templates, prompts, cursos e comunidades pagas.",
    commonMistake: "Querer fazer perfeito antes de vender. Versão simples já vende.",
    relatedTrail: "Produtos Digitais",
  },
  "Template": {
    whereSeen: "Em modelos de Notion, Canva, planilhas e prompts vendidos por R$9 a R$97.",
    commonMistake: "Vender template genérico. Específico vende mais.",
    relatedTrail: "Templates e Prompts",
  },
  "Prompt": {
    whereSeen: "Em toda conversa com ChatGPT, Claude, Gemini e dentro do ClickStart AI.",
    commonMistake: "Pedir vago. 'Me ajuda com marketing' não funciona. Detalhe contexto, papel e formato.",
    relatedTrail: "Templates e Prompts",
  },
  "Landing page": {
    whereSeen: "Em páginas únicas de venda, de inscrição em webinar e de captura de email.",
    commonMistake: "Encher de menu e link. Landing tem 1 objetivo e 1 botão.",
    relatedTrail: "Produtos Digitais",
  },
  "Onboarding": {
    whereSeen: "Nas primeiras telas de qualquer app pago e nas mensagens de boas-vindas.",
    commonMistake: "Achar que onboarding é só um tutorial. Onboarding é entregar valor logo.",
    relatedTrail: "Micro-SaaS",
  },
  "Churn": {
    whereSeen: "Em painéis da Hotmart, Stripe e qualquer SaaS com assinatura.",
    commonMistake: "Focar só em ganhar cliente novo. Reter custa menos que conquistar.",
    relatedTrail: "Micro-SaaS",
  },
  "MRR": {
    whereSeen: "Em dashboards de assinatura, como Stripe Atlas, Kiwify recorrente, Hotmart pro.",
    commonMistake: "Comparar com receita pontual de lançamento. MRR é outro jogo.",
    relatedTrail: "Micro-SaaS",
  },
  "ARR": {
    whereSeen: "Em decks de fundadores e relatórios de empresas de tecnologia.",
    commonMistake: "Comemorar ARR sem olhar churn. ARR alto com churn alto é furo no balde.",
    relatedTrail: "Micro-SaaS",
  },
  "Webhook": {
    whereSeen: "Em integrações de Make, Zapier, n8n, Hotmart, Stripe.",
    commonMistake: "Confundir webhook com API. Webhook avisa, API responde.",
    relatedTrail: "Serviços com IA",
  },
};

export const glossaryTerms: GlossaryTerm[] = glossary.map((t) => ({
  ...t,
  ...(enrichment[t.term] || {}),
}));

export const glossaryCategories: ("Todos" | GlossaryCategory)[] = [
  "Todos", "Vendas", "SaaS", "Marketing", "IA", "Produto digital",
];
