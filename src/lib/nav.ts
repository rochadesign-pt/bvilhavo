export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

// Matches the Framer top nav: Instituição ▾ · Serviços ▾ · Notícias · Contactos.
// Dropdown children carry a short description (label + brief line).
export const mainNav: NavItem[] = [
  {
    label: "Instituição",
    href: "/about",
    children: [
      { label: "A Associação", href: "/about", description: "História, missão e valores" },
      { label: "Equipa", href: "/equipa", description: "Comando operacional e corpo" },
      { label: "Órgãos Sociais", href: "/orgaos-sociais", description: "Direção, Assembleia e Conselho Fiscal" },
      { label: "Quartel", href: "/quartel", description: "Onde estamos e como falar connosco" },
      { label: "Veículos", href: "/veiculos", description: "A nossa frota operacional" },
      { label: "Transparência", href: "/transparencia", description: "Contas, estatutos e relatórios" },
    ],
  },
  {
    label: "Serviços",
    href: "/servicos",
    children: [
      { label: "Todos os serviços", href: "/servicos", description: "Visão geral da nossa ação" },
      { label: "Emergência e Salvamento", href: "/servicos", description: "Incêndios, desencarceramento, socorro" },
      { label: "Saúde e Transporte", href: "/servicos", description: "Pré-hospitalar e transporte de doentes" },
      { label: "Prevenção e Formação", href: "/servicos", description: "Sensibilização e campanhas" },
      { label: "Proteção Civil", href: "/servicos", description: "Cheias, catástrofe e apoio" },
    ],
  },
  { label: "Notícias", href: "/noticias" },
  { label: "Contactos", href: "/quartel" },
];

// The two header CTAs (right side).
export const ctaPrimary: NavItem = { label: "Quero ser bombeiro", href: "/voluntario" };
export const ctaSecondary: NavItem = { label: "Quero apoiar", href: "/apoiar" };
