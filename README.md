# Gjakova Coders – kids’ programming course website

Mobile-first, single-page marketing site (Albanian, `lang="sq"`) built with **Angular 22** (standalone components, signals, built-in control flow, `@defer`, typed reactive forms). No UI libraries; plain SCSS with CSS custom properties (light + dark theme). Poppins is self-hosted via `@fontsource/poppins`.

## Run

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # production build -> dist/gjakova-coders/browser
npm test           # unit tests (Vitest via ng test)
npm run lint       # ESLint
```

## Edit content and prices

All business data lives in `src/app/core/config/site.config.ts`:

| Key | Meaning |
| --- | --- |
| `phone` | Digits only with country code, e.g. `'38349123456'` |
| `instagram` | Handle (`'gjakovacoders'`) or full URL |
| `facebook` | Page name or full URL |
| `address` | Street address (opens a Google Maps search) |
| `regularPrice`, `openingPrice`, `openingMonths` | Prices (the total, e.g. 90 €, is computed) |
| `lessonsPerWeek`, `lessonDuration` | Schedule text |

Prices in the Pricing section, hero chip, CTA band, FAQ and registration form all come from this file.

Other texts: `src/app/core/data/` (`courses.ts`, `roadmap.ts`, `benefits.ts`, `steps.ts`, `faq.ts`). Section markup is in `src/app/sections/*`.

## Phone, Instagram, Facebook, address

Fill the empty strings in `site.config.ts`. Behaviour:

- **Contact section**: one card per non-empty value; if all are empty the whole section is hidden.
- **WhatsApp**: floating button and the registration form use `phone`. Button is hidden when the phone is empty; the form then opens `https://wa.me/?text=...` so the user picks a contact.

## Deploy (static hosting)

Run `npm run build` and publish `dist/gjakova-coders/browser`.

- **Netlify**: build command `npm run build`, publish directory `dist/gjakova-coders/browser`.
- **GitHub Pages**: build with `npx ng build --base-href /<repo-name>/` (omit if using a custom domain), then publish the output folder (e.g. with `npx angular-cli-ghpages --dir=dist/gjakova-coders/browser` or a GitHub Actions workflow). The site has no routes, so no SPA fallback is required.

## Notes

- Technology logos (`shared/tech-logo`) are simplified artwork; replace with official assets if needed.
- No `og:image` is set; add a 1200×630 PNG/JPG and `og:image` / `twitter:image` meta tags in `src/index.html`.
