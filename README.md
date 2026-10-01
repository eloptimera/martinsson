# Västgöta Trädgårdsservice (Astro)

Webbplats för Västgöta Trädgårdsservice AB: snabb, statisk och utan backend. Byggd med Astro och Tailwind, **utan React**.
Designen: grön yta med vitt fönsterkort, serif-rubriker med kursivt grönt ord och en egenritad gräsö
(`src/components/GardenIsland.astro`, byt mot foto vid behov).

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

| Variabel               | Vad                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| `SITE_URL`             | Sajtens riktiga adress, t.ex. `https://example.se`. Används för kanoniska länkar och sitemap. |
| `PUBLIC_FORM_ENDPOINT` | Adress som tar emot formulär (se nedan).                                                      |

## Formulär

Formuläret (`/kontakt`) skickar `POST` med JSON till `PUBLIC_FORM_ENDPOINT`:

```json
{
  "site": "vastgota-tradgard",
  "form": "kontakt",
  "namn": "…",
  "epost": "…",
  "tjanst": "Häckklippning",
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
src/pages/             sidorna (index, tjanster, om-oss, kontakt, integritetspolicy, 404)
src/components/        header, footer, gräsö, sidhuvud, ikoner
src/scripts/site.ts    mobilmeny, scroll-animation, formulär (vanlig JavaScript)
src/styles/global.css  färger, typsnitt och komponentklasser
```
