# Martinssons Billackering (Astro)

Webbplats för Martinssons Billackering AB: snabb, statisk och utan backend. Byggd med Astro och Tailwind, **utan React**.
Designen: redaktionell och saklig, med ljusgrå yta, hårfina linjer, serif (Bodoni Moda) och DM Sans, och en blå färg (logotypens).
Startsidans hero är en kaross i grundvitt som "lackeras" blå (`public/hero-car.webp`, se `src/pages/index.astro`).
**Obs:** hero-bilden är en platshållare. Byt mot ett eget foto eller en licensierad bild innan lansering. Sidorna fungerar lika bra med
eller utan bilder: lägg riktiga foton och logotyp under `images` i `src/site.config.ts`.

```sh
bun install
bun run dev       # lokalt på http://localhost:4321
bun run build     # bygger till dist/
bun run check     # typkontroll
```

## Ny kund – så gör du

1. Kopiera repot (nytt repo från den här mallen).
2. Ändra **`src/site.config.ts`**. Där ligger _allt_ kundspecifikt: företagsuppgifter, tjänster, rubriker,
   texter, SEO-titlar och beskrivningar. Skriv `*ord*` för att markera ett ord med gul understrykning.
   Tomma fält (e-post, öppettider) döljs automatiskt.
3. Vill du ha andra färger: ändra värdena överst i `src/styles/global.css` (`--brand`, `--ink`, `--sun` m.fl.).
4. Byt `public/favicon.svg`.
5. Skapa ett Vercel-projekt från repot (Framework Preset: **Astro**) och sätt miljövariablerna nedan.

## Miljövariabler (Vercel → Settings → Environment Variables)

| Variabel               | Vad                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`             | Sajtens riktiga adress, t.ex. `https://martinssonsbillackering.se`. Används för kanoniska länkar och sitemap. |
| `PUBLIC_FORM_ENDPOINT` | Adress som tar emot formulär (se nedan).                                                                      |

## Formulär

Formuläret (`/kontakt`) skickar `POST` med JSON till `PUBLIC_FORM_ENDPOINT`:

```json
{
  "site": "martinssons-billackering",
  "form": "kontakt",
  "namn": "…",
  "epost": "…",
  "tjanst": "Lackering",
  "…": "…"
}
```

- **Utan endpoint** visar formuläret ett tydligt fel i produktion, så att inga förfrågningar går förlorade
  utan att någon märker det. Lokalt (`bun run dev`) simuleras framgång.
- Mottagaren är _inte_ en del av mallen. Den ska validera indata, spara (t.ex. i Supabase) och skicka mejl
  (t.ex. via Resend). `site`-fältet talar om vilken kund förfrågan kom från.
- Ett dolt fält (`website`) fångar enkla bottar. Mottagaren bör också begränsa antal anrop.
- Bilduppladdning ingår inte i mallen (kräver lagring).

## Underhåll

- `.github/dependabot.yml` föreslår paketuppdateringar varje vecka. **Läs och slå ihop dem.** Vercel blockerar
  bygge som använder paketversioner med kända säkerhetsluckor.
- `bunfig.toml` ignorerar paket som publicerats senaste dygnet (skydd mot skadliga nya versioner).

## Struktur

```
src/site.config.ts     all kunddata och alla texter
src/pages/             sidorna (index, tjanster, [slug] = en sida per tjänst, om-oss, samarbetspartners, kontakt, integritetspolicy, 404)
src/components/        header, footer, sidhuvud, bild, tjänstemeny
src/scripts/site.ts    mobilmeny, öppet/stängt, formulär (vanlig JavaScript)
src/styles/global.css  färger, typsnitt och komponentklasser
```
