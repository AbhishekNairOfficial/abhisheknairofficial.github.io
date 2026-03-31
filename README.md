# abhisheknairofficial.github.io

Personal portfolio for **Abhishek Panthalingal** — lead engineer and architect. Built with [Next.js](https://nextjs.org) (App Router), React 19, TypeScript, Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|--------|---------------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Next.js ESLint |
| `npm run lint:check` | ESLint, zero warnings |
| `npm run test:e2e` | Playwright tests |

## Environment (optional)

Spotify “now playing” in the footer uses:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

If these are unset, the footer shows a neutral “nothing playing” state.

## Deploy

Configure your host for a Next.js app (e.g. Vercel, or static export with `output: 'export'` for GitHub Pages if you do not need the Spotify API at runtime).

## License

Private / personal site.
