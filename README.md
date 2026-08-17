# Bombeiros Voluntários de Ílhavo — website

Site institucional dos Bombeiros Voluntários de Ílhavo, construído em **Next.js 16**
(App Router, TypeScript, Tailwind v4) com **Sanity** como CMS.

Enquanto o Sanity não está ligado, o site renderiza com **conteúdo fallback**
(em `src/content/`), por isso funciona e faz deploy tal como está.

## Stack

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS v4** — tokens de marca em `src/app/globals.css`
- **Framer Motion + GSAP + Lenis** — animações e smooth scroll
- **Sanity** (headless CMS) — cliente em `src/sanity/`, Studio no repo `bvilhavo-studio`

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção
```

## Variáveis de ambiente

Copiar `.env.example` para `.env.local`. Enquanto vazias, o site usa o conteúdo
fallback.

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   # id do projeto Sanity (quando existir)
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

## Deploy (Vercel)

1. Push deste repositório para o GitHub.
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importar o repo.
3. Framework detetado automaticamente (Next.js). Sem configuração extra.
4. (Opcional) Adicionar as variáveis `NEXT_PUBLIC_SANITY_*` quando o Sanity existir.
5. Deploy. Cada `git push` faz redeploy automático.

## Estrutura

- `src/app/` — páginas (App Router): `/`, `/about`, `/servicos`, `/voluntario`,
  `/apoiar`, `/equipa`, `/orgaos-sociais`, `/quartel`, `/veiculos`,
  `/transparencia`, `/noticias` (+ `/noticias/[slug]`), `/api/contact`.
- `src/components/` — componentes de UI e secções.
- `src/content/` — conteúdo fallback (copy real, a migrar para o Sanity).
- `src/sanity/` — cliente, queries e helpers do Sanity.
- `public/` — imagens (stock temporário, a substituir por fotos reais via CMS).

## Por fazer

- Ligar o Sanity (criar projeto, preencher `projectId`, semear conteúdo).
- Substituir imagens stock pelas fotos reais do cliente.
- Ligar o formulário de contacto (`/api/contact`) a um serviço de email real.
- Dados em falta do cliente: nomes dos órgãos sociais, IBAN, PDFs de transparência.
