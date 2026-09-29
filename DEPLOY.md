# Deploying codexzubair.com

Static portfolio hosted on **GitHub Pages**, domain registered at **Namecheap**.

## 1. Push the code

```bash
cd ~/codex-zubair_portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin git@github.com:codex-zubair/codex-zubair_portfolio.git
git push -u origin main
```

## 2. Enable GitHub Pages

- Repo → **Settings → Pages**
- **Source:** Deploy from a branch
- **Branch:** `main` / `/ (root)` → Save
- Wait for the first build to finish (Actions tab / Pages panel).

The `CNAME` file in the repo already tells Pages the site is `codexzubair.com`.

## 3. Configure DNS at Namecheap

Go to **Namecheap → Domain List → codexzubair.com → Manage → Advanced DNS**.

Delete any default/parking records first, then add:

### Apex domain (`codexzubair.com`) — 4 A records

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | `@` | `185.199.108.153` | Automatic |
| A Record | `@` | `185.199.109.153` | Automatic |
| A Record | `@` | `185.199.110.153` | Automatic |
| A Record | `@` | `185.199.111.153` | Automatic |

### `www` subdomain — CNAME

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | `www` | `codex-zubair.github.io.` | Automatic |

> Optional (recommended) IPv6 AAAA records:
> `2606:50c0:8000::153`, `2606:50c0:8001::153`,
> `2606:50c0:8002::153`, `2606:50c0:8003::153`

## 4. Point the custom domain in GitHub

- Settings → Pages → **Custom domain** → set `codexzubair.com` → Save.
- Wait for the DNS check to pass, then enable **Enforce HTTPS**
  (the certificate can take up to ~24h to be issued).

## 5. Verify

```bash
dig codexzubair.com +short
dig www.codexzubair.com +short
curl -I https://codexzubair.com
```

Expected A records: the four `185.199.1xx.153` addresses.
`www` should resolve through the CNAME to `codex-zubair.github.io`.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| "Domain is improperly configured" | DNS not propagated yet — wait 30 min–24h, re-check with `dig`. |
| HTTPS not available | Remove and re-add the custom domain after DNS is correct; wait for cert issuance. |
| Old parking page | Delete leftover Namecheap "URL Redirect"/parking records. |
| `www` not working | Ensure CNAME host is `www` pointing to `codex-zubair.github.io.` (trailing dot is fine). |

## Notes

- Namecheap **BasicDNS** is what these records assume (default). If you changed to
  custom nameservers, the records must be set at those instead.
- Turn on **WhoisGuard / Domain Privacy** in Namecheap to hide personal details.
- Enable auto-renew on the domain so the site never goes down.
