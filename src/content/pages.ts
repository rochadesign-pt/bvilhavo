// Fallback page content — the real, validated copy from the Framer build and
// bvilhavo.pt. Rendered until the matching Sanity documents exist. Kept in one
// place so it doubles as the seeding reference.

// Homepage "Duas formas de apoiar" — the two feature cards.
export const duasFormas = [
  {
    _id: "f1",
    title: "Junta-te à nossa missão",
    description:
      "Ser voluntário é mais do que estar presente. É fazer parte de algo maior, com coragem e coração.",
    cta: { label: "Quero ser bombeiro", href: "/voluntario" },
    more: { label: "Saber mais", href: "/voluntario" },
  },
  {
    _id: "f2",
    title: "A tua ajuda transforma vidas",
    description:
      "Podes contribuir financeiramente ou com materiais úteis. Cada gesto fortalece quem nunca hesita em ajudar.",
    cta: { label: "Quero apoiar", href: "/apoiar" },
    more: { label: "Saber mais", href: "/apoiar" },
  },
];

export const servicos = [
  {
    _id: "s1",
    title: "Combate a Incêndios",
    summary:
      "Incêndios rurais, florestais, urbanos e industriais. Salvamento de pessoas e controlo de danos, 24h em todo o concelho.",
  },
  {
    _id: "s2",
    title: "Emergência Pré-Hospitalar",
    summary:
      "Assistência imediata a doença súbita, acidente, intoxicação e parto. Integrados no sistema SIEM.",
  },
  {
    _id: "s3",
    title: "Salvamento e Desencarceramento",
    summary:
      "Extração de vítimas em acidentes rodoviários e industriais, com equipamento pesado de desencarceramento.",
  },
  {
    _id: "s4",
    title: "Matérias Perigosas",
    summary:
      "Intervenção em fugas de gás, derrames químicos e acidentes com substâncias perigosas.",
  },
  {
    _id: "s5",
    title: "Socorro Aquático",
    summary:
      "Busca e resgate aquático, com meios náuticos para a zona costeira e a ria de Ílhavo.",
  },
  {
    _id: "s6",
    title: "Proteção Civil",
    summary:
      "Inundações, galgamentos costeiros, quedas de árvores e apoio em situações de catástrofe.",
  },
];

export const missaoVisaoValores = {
  missao:
    "Proteger vidas, bens e o meio ambiente com profissionalismo, prontidão e humanidade — em resposta a incêndios, acidentes, emergências médicas e situações de catástrofe.",
  visao:
    "Ser uma referência nacional no socorro voluntário, na ligação à comunidade e na transparência institucional.",
  valores: ["Coragem", "Altruísmo", "Transparência", "Compromisso", "Solidariedade"],
};

export const timeline = [
  {
    year: "1880",
    title: "Os Bombeiros da Vista-Alegre",
    body: "O espírito empreendedor de Pinto Basto leva à criação do Corpo Privativo dos Bombeiros da Fábrica da Vista-Alegre — uma das mais antigas corporações do país. Foi o embrião que inspirou a criação de uma associação ao serviço de toda a comunidade ilhavense.",
  },
  {
    year: "Abr 1893",
    title: "Fundação da Associação",
    body: "A 13 de abril, na Câmara Municipal de Ílhavo, um grupo de cidadãos liderado pelo Dr. Francisco António Marques de Moura instala oficialmente a Associação. Nasce uma instituição humanitária ao serviço de toda a comunidade ilhavense.",
  },
  {
    year: "Mai 1893",
    title: "Estatuto e dádiva régia",
    body: "A 4 de maio, a Comissão Instaladora aprova o Estatuto fundador, sancionado pela Câmara a 18 de maio. É anunciada uma dádiva régia de 200 mil réis para a aquisição de uma bomba de incêndios.",
  },
  {
    year: "Jun 1893",
    title: "Primeiras eleições e primeira bomba",
    body: "A 25 de maio, o vereador Procópio de Carvalho entrega a primeira bomba braçal e o material de combate a incêndios. A 8 de junho é eleito o primeiro Comandante, António Pereira da Encarnação Júnior, e os restantes cargos operacionais.",
  },
  {
    year: "Séc. XX",
    title: "Décadas de crescimento",
    body: "Ao longo do século XX, a corporação cresce em meios humanos e materiais, acompanhando as transformações de Ílhavo e respondendo a emergências cada vez mais complexas, sempre com o mesmo espírito voluntário.",
  },
  {
    year: "Hoje",
    title: "Mais de 130 anos ao serviço",
    body: "Hoje somos uma corporação moderna, com dezenas de viaturas, mais de 200 voluntários e milhares de intervenções por ano. Parceiros da Câmara Municipal e da ANEPC, continuamos a ser, acima de tudo, vizinhos dos 39 mil ilhavenses a quem servimos.",
  },
];

export const comando = [
  { _id: "c1", name: "Pedro Barreirinha", role: "Comandante" },
  { _id: "c2", name: "José Pedro Moniz", role: "Adjunto de Comando" },
  { _id: "c3", name: "Paulo Sousa", role: "Adjunto de Comando" },
  { _id: "c4", name: "Sandra Silva", role: "Adjunta de Comando" },
];

export const quadro = [
  {
    rank: "Chefes",
    names: ["António Cruz", "João Gonçalves", "Júlio Catarino", "Fernando Martins"],
  },
  {
    rank: "Subchefes",
    names: [
      "António Grave",
      "Francisco Pereira",
      "Paulo Franco",
      "António Marinho",
      "Carlos Alves",
      "Luís Simões Pinto",
      "Rosa Dias Costa",
      "Paulo Alexandre Cruz",
    ],
  },
  {
    rank: "Bombeiros de 1.ª",
    names: ["Dina Santos", "João Pereira", "Júlio Catarino", "Ricardo Pereira", "Paulo Fernandes"],
  },
  {
    rank: "Bombeiros de 2.ª",
    names: [
      "Francisco Pinho",
      "Ilídio Santos",
      "Bruno Ferreira",
      "Paulo Agualusa",
      "Miguel Esteves",
      "Cidália Soares",
    ],
  },
  {
    rank: "Bombeiros de 3.ª",
    names: ["Paula Ferreira", "Micael Pereira", "Maria Ângela"],
  },
];

export const orgaosSociais = [
  {
    orgao: "Assembleia Geral",
    cargos: [
      { role: "Presidente", name: "A anunciar" },
      { role: "Vice-Presidente", name: "A anunciar" },
      { role: "Secretário", name: "A anunciar" },
    ],
  },
  {
    orgao: "Direção",
    cargos: [
      { role: "Presidente", name: "A anunciar" },
      { role: "Vice-Presidente", name: "A anunciar" },
      { role: "Secretário", name: "A anunciar" },
      { role: "Tesoureiro", name: "A anunciar" },
      { role: "Vogais", name: "A anunciar" },
    ],
  },
  {
    orgao: "Conselho Fiscal",
    cargos: [
      { role: "Presidente", name: "A anunciar" },
      { role: "Relator", name: "A anunciar" },
      { role: "Vogal", name: "A anunciar" },
    ],
  },
];

export const veiculos = [
  {
    category: "Combate a Incêndios",
    intro: "Veículos tanque, urbanos, rurais e florestais, escada e apoio especial.",
    items: [
      "Veículo Tanque Tático Urbano (VTTU)",
      "Veículo Urbano de Combate a Incêndios (VUCI) ×2",
      "Veículo Florestal de Combate a Incêndios (VFCI) ×2",
      "Veículo Rural de Combate a Incêndios (VRCI)",
      "Veículo Escada 30 m (VE30)",
      "Veículo Contra-Incêndio de Outros Tipos (VCOT) ×2",
      "Veículo Ligeiro de Combate a Incêndios (VLCI)",
      "Veículo de Apoio Logístico e Especial (VALE)",
      "Veículo Operacional Especial (VOPE)",
      "Reservatório de água rebocável",
    ],
  },
  {
    category: "Ambulâncias",
    intro: "Socorro, transporte de múltiplas vítimas e transporte de doentes.",
    items: [
      "Ambulância de Socorro (ABSC) ×5",
      "Ambulância de Transporte de Múltiplas Vítimas (ABTM) ×7",
      "Ambulância de Transporte de Doentes (ABTD) ×2",
      "Veículo de Doentes em Tratamento Domiciliário (VDTD)",
    ],
  },
  {
    category: "Meios Náuticos",
    intro: "Embarcações para busca e resgate na zona costeira e na ria de Ílhavo.",
    items: ["Embarcação de Socorro Aquático"],
  },
];

export const apoios = [
  {
    _id: "a1",
    title: "Tornar-se sócio",
    description:
      "Contribui mensalmente para a sustentabilidade da corporação e beneficia de vantagens exclusivas, como prioridade no transporte de doentes. Contacta-nos para conheceres as quotas atuais.",
  },
  {
    _id: "a2",
    title: "Donativo monetário",
    description:
      "Efetua uma transferência bancária para a conta da Associação. Cada euro é aplicado em equipamento, formação e operações de emergência.",
  },
  {
    _id: "a3",
    title: "Donativo em espécie",
    description:
      "Aceitamos materiais úteis às nossas operações — de equipamento de proteção individual a material de escritório ou alimentação para turnos longos. Contacta-nos primeiro para saber o que é mais necessário.",
  },
];

export const contribui = [
  "Formar os nossos voluntários (programa certificado de 225 horas)",
  "Equipar os bombeiros com EPI — fatos, capacetes, luvas e botas",
  "Manter e atualizar a frota de viaturas e os equipamentos de salvamento",
];

export const passosVoluntario = [
  { step: "01", title: "Preenche o formulário", body: "2 minutos. Sem documentação necessária nesta fase." },
  { step: "02", title: "Entrevista informal", body: "Para te conhecermos e percebermos a tua motivação." },
  { step: "03", title: "Formação inicial", body: "Programa de formação completo, gratuito e certificado." },
  { step: "04", title: "Primeiro turno", body: "Entras em serviço acompanhado por uma equipa experiente." },
];

export const requisitosVoluntario = [
  "Escolaridade mínima obrigatória (9.º ano)",
  "Residir ou trabalhar no concelho de Ílhavo",
  "Boa condição física e psíquica (avaliada no processo)",
  "Disponibilidade para a formação inicial",
  "Vontade genuína de servir a comunidade",
];

export const faqVoluntario = [
  {
    question: "Qual é a idade mínima para me candidatar?",
    answer:
      "Podes começar aos 6 anos como Infante e aos 14 como Cadete. Para a carreira operacional de bombeiro, o ingresso faz-se a partir dos 17 anos, até aos 45.",
  },
  {
    question: "A formação é paga?",
    answer:
      "Não. A formação inicial é inteiramente gratuita e certificada. Decorre em horário pós-laboral e/ou fins de semana, com uma carga total de 225 horas.",
  },
  {
    question: "Tenho medo de não conseguir aguentar a pressão. É normal?",
    answer:
      "Completamente normal. Toda a gente sente isso no início — incluindo os bombeiros mais experientes na sua primeira ocorrência. É para isso que existe a formação e o acompanhamento. Nunca entras sozinho numa situação sem estar preparado.",
  },
  {
    question: "Tenho emprego a tempo inteiro. Consigo mesmo assim ser voluntário?",
    answer:
      "Sim. A maioria dos nossos voluntários tem emprego. O sistema de turnos é construído de forma a ser compatível com horários profissionais. Na entrevista percebemos em conjunto o que funciona para ti.",
  },
  {
    question: "O que acontece depois da formação?",
    answer:
      "Após concluíres o estágio (mínimo de 1 ano), ingressas na carreira na categoria de Bombeiro de 3.ª, em plena integração na equipa operacional.",
  },
];

export const faqApoiar = [
  {
    question: "Posso deduzir o donativo no IRS?",
    answer:
      "A AHBVI tem estatuto de utilidade pública, o que pode permitir a dedução de donativos. Recomendamos que confirmes as condições em vigor junto de um técnico de contas ou da Autoridade Tributária.",
  },
  {
    question: "Para onde vai o meu donativo?",
    answer:
      "Cada euro é contabilizado e aplicado em equipamento, formação e operações de emergência. Podes consultar os relatórios financeiros na página de Transparência.",
  },
  {
    question: "Posso fazer um donativo pontual em vez de recorrente?",
    answer:
      "Sim. Podes fazer um donativo único, sem qualquer compromisso de regularidade. Qualquer valor é bem-vindo e aplicado diretamente na missão.",
  },
];

export const documentos = [
  {
    title: "Estatutos",
    description:
      "O documento fundador que rege a Associação Humanitária dos Bombeiros Voluntários de Ílhavo.",
    anos: [] as string[],
  },
  {
    title: "Regulamento Geral Interno",
    description:
      "As regras de funcionamento interno e organização da corporação e do corpo de bombeiros.",
    anos: [],
  },
  {
    title: "Relatórios e Contas",
    description: "Prestação de contas anual da Associação.",
    anos: ["2020", "2019", "2018", "2017", "2016", "2015"],
  },
  {
    title: "Planos e Orçamentos",
    description: "O planeamento e o orçamento previsto para cada ano.",
    anos: ["2019", "2018", "2017", "2016", "2015"],
  },
  {
    title: "Resumos de Atividade Operacional",
    description: "O balanço das intervenções e da atividade operacional anual.",
    anos: ["2019", "2018", "2017", "2016", "2015"],
  },
];
