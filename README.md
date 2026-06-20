# Campfly Landing Page

Homepage foundation for Campfly holiday packages, rebuilt from the Figma layout direction (`campfly-landing-page (Copy)`) as a static, responsive site.

## Project files
- `index.html`: page structure and content sections
- `styles.css`: design tokens, layout, components, and responsive behavior
- `script.js`: tab switcher, newsletter feedback, dynamic footer year

## Run locally
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Publish flow
```bash
git add .
git commit -m "Build Campfly homepage foundation from Figma"
git push origin main
npx vercel deploy --prod --yes
```
