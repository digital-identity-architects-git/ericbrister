# Eric Brister — Portfolio & Résumé Website

A clean, fast, single-page personal site for **Eric Brister**, SEO & Content
Strategist (*Digital Identity Architects*). Branded in **blue / silver / white**,
built as static HTML/CSS/JS with no build step, and deployed to any FTP web host
via GitHub Actions.

```
public/                 ← the website (this is what gets deployed)
  index.html
  favicon.svg
  assets/
    css/styles.css
    js/main.js
.github/workflows/
  deploy.yml            ← FTP deploy pipeline
```

## Deploying: what to save the FTP variables as

The deploy workflow (`.github/workflows/deploy.yml`) reads your FTP credentials
from **GitHub Actions secrets**. In your repo, go to:

**Settings → Secrets and variables → Actions → *Secrets* tab → New repository secret**

Create these **three secrets** (names must match exactly):

| Secret name    | What to put in it                          | Example              |
| -------------- | ------------------------------------------ | -------------------- |
| `FTP_SERVER`   | Your FTP host / server address             | `ftp.yourdomain.com` |
| `FTP_USERNAME` | Your FTP account username / login          | `eric@yourdomain.com`|
| `FTP_PASSWORD` | Your FTP account password                  | `••••••••`           |

> Get these exact values from your web host (cPanel → *FTP Accounts*, or your
> hosting welcome email). Secrets are encrypted and never shown in logs.

### Optional settings (use *Variables*, not Secrets)

On the same page, under the ***Variables*** tab, you can optionally add:

| Variable name    | Purpose                                              | Example          |
| ---------------- | ---------------------------------------------------- | ---------------- |
| `FTP_SERVER_DIR` | Folder on the host to publish into                   | `/public_html/`  |
| `FTP_PROTOCOL`   | Set to `ftps` for explicit TLS (if your host allows) | `ftps`           |

If you don't set `FTP_SERVER_DIR`, files land in the FTP root. On most cPanel
hosts you'll want `/public_html/`.

## How a deploy runs

- Push to the repository's **default branch** → the site auto-publishes.
  (The workflow gates on the repo's actual default branch, so it works no
  matter what that branch is named — this repo has no `main` branch.)
- Or trigger it manually: **Actions → Deploy website via FTP → Run workflow**.

> **Not showing up yet?** Two things must also be true before the live site
> appears: (1) the three `FTP_*` secrets above are set, and (2) your domain's
> DNS points at the web host you're uploading to. The workflow can succeed at
> uploading files and the site still won't resolve until DNS is pointed.

Only the contents of `public/` are uploaded, so the workflow file and README
stay out of your live site.

## Local preview

No tooling required — open `public/index.html` in a browser, or serve it:

```bash
cd public && python3 -m http.server 8000
# then visit http://localhost:8000
```

## Editing content

All copy lives in `public/index.html`. Colors and styling live in
`public/assets/css/styles.css` under the `:root` palette (blues, silvers,
white) at the top of the file.
