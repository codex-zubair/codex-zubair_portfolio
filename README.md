# codex-zubair_portfolio

Personal portfolio website for **Zubair Alam — AI Software Engineer**, live at [codexzubair.com](https://codexzubair.com).

## Structure

Static site (no build step), deployed via GitHub Pages.

```
index.html          # Homepage — hero, about, expertise, toolbox, capabilities, certifications, work, writing, journey, Fiverr, contact
styles.css          # Main styles
pages.css           # Shared styles for blog & project subpages
main.js             # Nav, counters, reveal animations
blog/
  index.html        # Blog listing
  *.html            # Blog posts
projects/
  *.html            # Project case studies
sitemap.xml         # SEO sitemap
robots.txt          # Crawler rules
CNAME               # codexzubair.com
```

## Adding a blog post

1. Copy an existing post in `blog/`, update the `<title>`, meta description, `og:` tags, canonical URL, and JSON-LD.
2. Add a card to `blog/index.html` and a matching card to the homepage `#writing` section.
3. Add the URL to `sitemap.xml`.

## Deploy

Push to `main` — GitHub Pages serves the repo root. See [DEPLOY.md](DEPLOY.md) for DNS/custom-domain setup.
