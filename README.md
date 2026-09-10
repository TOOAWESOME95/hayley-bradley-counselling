# Hayley Bradley Counselling - Website

A 5-page static site (plain HTML/CSS/JS, no build step) for Hayley Bradley, BA (Hons), MBACP - Person-Centred Counsellor. Built to deploy directly on GitHub Pages.

## Structure

```
index.html          Home
about.html           About Me
services.html        Services / Areas of Support
testimonials.html    Testimonials (placeholder content)
contact.html         Contact + GDPR form + Calendify booking widget
css/style.css        All styling (CSS custom properties for the brand palette)
js/main.js           Nav toggle, scroll reveal, form + Calendify fallbacks
assets/icons/        Logo motif + 6 hand-drawn line icons (SVG)
assets/img/          Reserved for real photography once supplied
robots.txt, sitemap.xml   Basic SEO (update the domain once confirmed)
.nojekyll             Stops GitHub Pages running the Jekyll build step
```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo.
2. In the repo, go to **Settings → Pages**, set the source to the `main` branch, root folder.
3. Once a custom domain is confirmed, add a `CNAME` file with the domain and set it in the same Pages settings screen.

No build step is required - GitHub Pages serves the HTML/CSS/JS as-is.

## Decision points / placeholders to swap before launch

These were locked in as reasonable defaults per the brief, flagged here so nothing ships by accident:

1. **Calendify booking widget** (`contact.html`, near `id="book"`)
   `data-calendify="YOUR_CALENDIFY_USERNAME/YOUR_EVENT_TYPE"` - replace with the real username/event slug once the Calendify account exists. Until then, `js/main.js` swaps in a friendly "booking coming soon" message instead of a broken embed.
   The widget is themed via CSS custom properties in `.booking-embed-shell` in `css/style.css` (`--cf-primary`, `--cf-radius`, etc.) to match the sage/cream brand - adjust there if Calendify's supported property names differ from what's assumed here.

2. **Contact form handler** (`contact.html`, `<form action="https://formspree.io/f/YOUR_FORM_ID">`)
   This is a static site with no backend, so the form posts to **Formspree** (a static-friendly form-processing service) as specified in the brief. **Decision flagged:** if you'd prefer a different provider (e.g. Netlify Forms, Basin, GetForm), swap the `action` URL and, if needed, the field names - the current markup uses plain `name`/`email`/`phone`/`topic`/`message`/`consent` fields, which most static form services accept as-is. Until a real form ID is set, `js/main.js` shows an inline notice instead of silently failing.

3. **Domain & email** - footer and contact page use the placeholder `hello@hayleybradleycounselling.co.uk`. Update every occurrence (search the HTML files) once the real domain is registered, and add a `CNAME` file for GitHub Pages as above. `robots.txt` and `sitemap.xml` also reference this placeholder domain.

4. **Photography** - the hero, about, and portrait areas currently use soft line-art SVG (matching the leaf-in-circle logo motif) instead of photos, since none were supplied. Drop real images into `assets/img/` and swap the relevant `.hero-art`, `.portrait-frame` markup in `index.html` / `about.html` when available.

5. **Testimonials** - `testimonials.html` ships with four placeholder cards and a privacy note about consent. Replace the placeholder text with real client testimonials (with their explicit consent, per the BACP Ethical Framework) when available.

## Brand system

- **Colours:** sage green (`#7d8a6a` and a darker `#566041`/`#3d452f` for text/buttons to keep contrast accessible) on warm cream (`#faf7f0`), dark charcoal-green body text.
- **Type:** "Fraunces" (serif, headings), "Allura" (script accent, taglines), "Jost" (sans, body) - all loaded free from Google Fonts.
- **Icon set:** hand-drawn line-art SVGs sharing the logo's leaf-in-a-circle motif (`assets/icons/`).
- **Motion:** gentle fade/translate reveals on scroll (`IntersectionObserver`) and gets fully disabled for users with `prefers-reduced-motion` set.

## Accessibility & SEO notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), skip-to-content link, visible focus states, and a keyboard-operable mobile menu (Escape closes it).
- Colour pairings were chosen to meet WCAG AA contrast for body text and buttons (darker sage shades used wherever text sits on a light or dark background).
- Each page has a unique `<title>` and meta description; all informative images/icons carry appropriate `alt` text (empty `alt=""` on purely decorative icons).
- `robots.txt` + `sitemap.xml` included; update the domain once it's live.
