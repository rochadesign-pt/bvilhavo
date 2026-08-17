import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title, foundedYear, tagline, address, phone, email, iban,
    "logo": logo.asset->url,
    socials[]{ platform, url }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    hero,
    body,
    "faqs": faqs[]->{ _id, question, answer, group, order } | order(order asc),
    seo
  }
`;

export const servicosQuery = groq`
  *[_type == "servico"] | order(order asc){
    _id, title, "slug": slug.current, summary, icon
  }
`;

export const apoiosQuery = groq`
  *[_type == "apoio"] | order(order asc){
    _id, title, description, icon, cta
  }
`;

export const veiculosQuery = groq`
  *[_type == "veiculo"] | order(order asc){
    _id, name, code, category, description,
    "image": image.asset->url
  }
`;

export const relatoriosQuery = groq`
  *[_type == "relatorio"] | order(date desc){
    _id, title, type, date,
    "fileUrl": file.asset->url
  }
`;

export const membrosQuery = groq`
  *[_type == "membroEquipa"] | order(order asc){
    _id, name, role, group,
    "photo": photo.asset->url
  }
`;

export const noticiasQuery = groq`
  *[_type == "noticia"] | order(date desc){
    _id, title, "slug": slug.current, date, excerpt,
    "cover": cover.asset->url
  }
`;

export const noticiaBySlugQuery = groq`
  *[_type == "noticia" && slug.current == $slug][0]{
    title, date, excerpt, body,
    "cover": cover.asset->url,
    seo
  }
`;

export const faqsByGroupQuery = groq`
  *[_type == "faq" && group == $group] | order(order asc){
    _id, question, answer
  }
`;
