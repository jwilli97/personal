# jwilli.dev

Personal site of [Joseph Williams](https://jwilli.dev) — software engineer and musician based in Austin.

Built with Next.js 16, Tailwind v4, shadcn/ui, and the `motion` library. Hosted on Vercel.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind v4, OKLch color space, dark-only
- **Type system:** strict TypeScript
- **Motion:** `motion` v12 (Framer's newer package — not `framer-motion`)
- **Icons:** `@tabler/icons-react`
- **Analytics:** Vercel Analytics
- **Package manager:** Bun

## Develop

```sh
bun install
bun run dev   # http://localhost:3000
bun run lint
bun run build
```

## Site map

- `/` — home (composition C: hero + tz-clock frame + contribution grid)
- `/projects` — index of all visible projects
- `/projects/[slug]` — case study per project
- `/fab` — Fusion 360 + Bambu prints (placeholder; populated phase 2)
- `/music` — tracks (placeholder; populated phase 3)
- `/api/contributions` — multi-account GitHub contribution feed

## Content

To update what the site says:

- **Project list:** edit [`lib/projects.ts`](./lib/projects.ts). Adding a project there automatically gives it a card on `/projects` and a case study at `/projects/[slug]`.
- **"$ now" block on the home page:** edit [`lib/now.ts`](./lib/now.ts).
- **Language colors:** edit [`lib/language-colors.ts`](./lib/language-colors.ts).

## Environment

The contribution grid aggregates four GitHub accounts via the GraphQL API. Each account needs a personal access token with at least `read:user` scope (`repo` scope for private contributions). Set these in Vercel and `.env.local`:

| Env var | Account | Notes |
|---|---|---|
| `JWILLI_GITHUB_TOKEN` | `jwilli97` | personal |
| `ASC_GITHUB_TOKEN` | `jwilli-asc` | austin stem center |
| `LEBOWSKI_GITHUB_TOKEN` | `Lebowski97` | client work |
| `CINCIN_GITHUB_TOKEN` | `jcincin` | cincin org |
| `GITHUB_TOKEN` | _shared fallback_ | used if none of the above resolve |

Token resolution lives in [`lib/github-contributions.mjs`](./lib/github-contributions.mjs).

## Deploy

Push to `main`. Vercel auto-deploys. Make sure all four tokens are set in **Project Settings → Environment Variables** for both _Preview_ and _Production_ — otherwise the contribution grid silently under-counts.

## License

Code: MIT. Content: © Joseph Williams.
