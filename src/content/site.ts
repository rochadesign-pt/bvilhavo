// Static institutional facts (mirrors Sanity `siteSettings`; used as fallback
// and for the always-true footer/contact data). Real copy from bvilhavo.pt +
// the Framer build.

export const site = {
  name: "Bombeiros Voluntários de Ílhavo",
  shortName: "BV Ílhavo",
  foundedYear: 1893,
  tagline:
    "Ao serviço da comunidade de Ílhavo desde 1893. Vida por Vida, 24 horas por dia, 365 dias por ano.",
  address: {
    street: "Rua Conselheiro António José da Rocha, N.º 18",
    postal: "3830-303 Ílhavo",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Bombeiros+Volunt%C3%A1rios+de+%C3%8Dlhavo",
  },
  phones: {
    emergency: "234 330 000",
    office: "234 330 005",
  },
  emails: {
    general: "geral@bvilhavo.pt",
    volunteer: "voluntariado@bvilhavo.pt",
  },
  hours: {
    operational: "Operacional: 24 horas, todos os dias",
    office: "Administrativo: Segunda a Sexta, 09h00–18h00",
  },
  socials: [
    {
      platform: "Facebook",
      url: "https://facebook.com/BombeirosVoluntariosDeIlhavo",
    },
  ],
} as const;

// Headline stats — matches the Framer homepage red section.
export const stats = [
  { value: "+130", label: "Anos de Serviço" },
  { value: "+200", label: "Voluntários" },
  { value: "+3000", label: "Intervenções" },
  { value: "+1000", label: "Ocorrências mensais" },
] as const;
