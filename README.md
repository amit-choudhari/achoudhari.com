# achoudhari.com

Personal research website for Amit Choudhari.

The site is a small static site deployed from `main` to Cloudflare Workers.

## Structure

- `public/index.html` — homepage content
- `public/style.css` — site styling
- `public/papers/` — self-hosted publication PDFs
- `public/slides/` — self-hosted presentation slides
- `wrangler.jsonc` — Cloudflare Workers static-assets configuration

## Local preview

```bash
npx wrangler dev
```

## Deployment

GitHub is connected to Cloudflare Workers. Pushing to `main` triggers a production deployment of the `public/` directory to `achoudhari.com`.

A manual deployment can also be run with:

```bash
npx wrangler deploy
```

## Publication assets

Publication PDFs and slides are committed directly to this repository so links on the website remain under `achoudhari.com` rather than depending on publisher or institutional URLs.
