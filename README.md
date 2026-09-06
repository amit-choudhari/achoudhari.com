# achoudhari.com

Minimal static personal site for Amit Choudhari.

## Local preview

From the repository root:

```bash
npx wrangler dev
```

Wrangler will print a local URL.

## One-time local deploy

```bash
npx wrangler deploy
```

On first use, Wrangler will ask you to authenticate with Cloudflare.

## Recommended deployment: GitHub -> Cloudflare Workers

1. Create a GitHub repository, for example `achoudhari.com`.
2. Push this repository to GitHub.
3. In Cloudflare, open **Workers & Pages**.
4. Select **Create application**.
5. Under **Import a repository**, choose **Get started**.
6. Connect GitHub and select this repository.
7. Use:
   - Production branch: `main`
   - Build command: leave blank
   - Deploy command: `npx wrangler deploy` (the default)
   - Root directory: repository root
8. Deploy. Cloudflare will first give the site a `*.workers.dev` URL.
9. Open the deployed Worker:
   **Settings -> Domains & Routes -> Add -> Custom Domain**
10. Add `achoudhari.com`.

Cloudflare will create the required DNS record and certificate for the custom
domain.

After Git integration is connected, pushing to `main` deploys the site
automatically.

## Edit the site

- `public/index.html` — content
- `public/style.css` — appearance
- `wrangler.jsonc` — Cloudflare deployment configuration
