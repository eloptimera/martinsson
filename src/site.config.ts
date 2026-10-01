/**
 * ALLT kundspecifikt ligger här: företagsuppgifter, texter, tjänster och SEO.
 * Ny kund = kopiera repot, ändra den här filen (och vid behov färgerna överst i src/styles/global.css).
 *
 * Skriv *ord* med stjärnor runt för att markera det (kursivt och grönt) i rubriker.
 * Tomma fält (telefon, e-post, öppettider) döljs automatiskt på sajten.
 */
import type { IconName } from "./components/icons";

export const site = {
  /** Kort id som skickas med varje formulär, så en central mottagare vet vilken sajt det kom från. */
  id: "vastgota-tradgard",

  company: {
    name: "Västgöta Trädgårdsservice AB",
    shortName: "Västgöta",
    tagline: "Trädgårdsservice",
    city: "Göteborg",
    area: "Göteborg med omnejd",
    founded: 2021,
    orgnr: "559347-2243",
    street: "Hammarkroken 172",
    zip: "424 36",
    postalCity: "Angered",
    phone: "",
    phoneLink: "",
    email: "",
    hours: [] as { days: string; time: string }[],
    taxNote: "Godkänd för F-skatt, registrerad för moms och som arbetsgivare",
    people: [{ name: "Hernan Tomas Castellon Portal", role: "VD" }],
  },

  nav: [
    { href: "/", label: "Hem" },
    { href: "/tjanster", label: "Tjänster" },
    { href: "/om-oss", label: "Om oss" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  navCta: { href: "/kontakt", label: "Få fri offert" },

  /**
   * Hero-bild. Lämna som null för den genererade gräsön. Vill du använda ett riktigt foto eller en
   * 3D-render (PNG/WebP med transparent bakgrund fungerar bäst): lägg filen i /public och fyll i
   * t.ex. { src: "/hero.webp", width: 1600, height: 1200 }.
   */
  heroImage: {
    src: "/hero-island.webp",
    width: 1248,
    height: 1150,
    srcset: "/hero-island-800.webp 800w, /hero-island.webp 1248w",
  } as null | { src: string; width: number; height: number; srcset?: string },

  /** Titel och beskrivning per sida (visas i Google och när sidan delas). */
  seo: {
    home: {
      title: "Trädgårdsservice i Göteborg – Västgöta Trädgårdsservice AB",
      description:
        "Trädgårdsskötsel i Göteborg med omnejd: trädbeskärning, häckklippning, gräsklippning och rensning av rabatter. RUT-avdrag direkt på fakturan. Få fri offert.",
    },
    services: {
      title: "Trädgårdstjänster i Göteborg – Västgöta Trädgårdsservice AB",
      description:
        "Trädbeskärning, häckklippning, gräsklippning och rensning av rabatter i Göteborg, bland annat i Angered. Privatpersoner, bostadsrättsföreningar och företag. Fri offert.",
    },
    about: {
      title: "Om oss – Västgöta Trädgårdsservice AB, Angered",
      description:
        "Västgöta Trädgårdsservice AB är ett litet, personligt trädgårdsbolag med bas i Angered. Läs om hur vi arbetar med trädgårdar och grönytor i Göteborg och Västra Götaland.",
    },
    contact: {
      title: "Boka trädgårdshjälp eller begär fri offert – Västgöta Trädgårdsservice AB",
      description:
        "Berätta om din trädgård så återkommer vi med en fri offert. Västgöta Trädgårdsservice AB, Hammarkroken 172, Angered.",
    },
    privacy: {
      title: "Integritetspolicy – Västgöta Trädgårdsservice AB",
      description: "Så behandlar Västgöta Trädgårdsservice AB dina personuppgifter när du kontaktar oss.",
    },
    notFound: { title: "Sidan finns inte – Västgöta Trädgårdsservice AB", description: "Sidan finns inte." },
    businessDescription:
      "Trädgårdsbolag i Angered, Göteborg. Trädbeskärning, häckklippning, gräsklippning och rensning av rabatter för privatpersoner, bostadsrättsföreningar och företag.",
  },

  services: [
    {
      id: "tradbeskarning",
      title: "Trädbeskärning",
      short:
        "Säker och fackmannamässig beskärning av fruktträd och prydnadsträd som främjar tillväxt och trygghet i trädgården.",
      points: [
        "Beskärning av fruktträd och prydnadsträd",
        "Främjar tillväxt, blomning och skörd",
        "Skapar ett säkrare och mer välskött träd",
      ],
      icon: "tree" as IconName,
    },
    {
      id: "hackklippning",
      title: "Häckklippning",
      short: "Vi formklipper och trimmar alla typer av häckar så att de håller sig täta, raka och friska.",
      points: [
        "Formklippning och trimning av alla typer av häckar",
        "Engångsuppdrag eller återkommande",
        "Prydliga, raka linjer och friska häckar",
      ],
      icon: "scissors" as IconName,
    },
    {
      id: "gresklippning",
      title: "Gräsklippning",
      short:
        "Regelbunden eller enstaka klippning av gräsmattan, med kantstrimning för en välansad och grön gräsmatta.",
      points: [
        "Regelbunden klippning eller enstaka tillfällen",
        "Kantstrimning längs rabatter och stenläggning",
        "Anpassat efter din tomts storlek",
      ],
      icon: "sprout" as IconName,
    },
    {
      id: "rabatter",
      title: "Rensning av rabatter",
      short:
        "Vi rensar bort ogräs, kantar till rabatterna och ser till att dina planteringar får bästa möjliga förutsättningar.",
      points: [
        "Rensning av ogräs i rabatter och planteringar",
        "Kantning så att rabatterna syns och hålls i form",
        "Ger växterna bättre förutsättningar att trivas",
      ],
      icon: "flower" as IconName,
    },
  ],

  home: {
    headline: "Professionell *trädgårdsskötsel* i Göteborg med omnejd",
    text: "Vi hjälper dig att hålla din trädgård och dina grönytor levande, välskötta och vackra året om.",
    cta: "Få fri offert",
    ctaSecondary: "Våra tjänster",
    steps: [
      {
        icon: "clipboard" as IconName,
        title: "Begär offert",
        text: "Berätta om din trädgård via formuläret.",
      },
      {
        icon: "calendar" as IconName,
        title: "Boka tid",
        text: "Vi återkommer och bokar en tid som passar dig.",
      },
      {
        icon: "leaf" as IconName,
        title: "Vi sköter jobbet",
        text: "Vi utför arbetet noggrant och fackmannamässigt.",
      },
      {
        icon: "sun" as IconName,
        title: "Njut av trädgården",
        text: "Du får en välskött och vacker trädgård.",
      },
    ],

    servicesEyebrow: "Våra tjänster",
    servicesHeading: "Allt som behövs för en *välskött* trädgård",
    servicesIntro:
      "Vi tar hand om träd, häckar, gräsmatta och rabatter, för privatpersoner, bostadsrättsföreningar och företag.",

    rutEyebrow: "RUT-avdrag",
    rutHeading: "Halva arbetskostnaden – direkt på *fakturan*",
    rutText:
      "Vi har F-skatt, vilket gör att du som privatperson kan använda RUT-avdraget för våra tjänster. Du får 50 % avdrag på arbetskostnaden direkt på fakturan.",
    rutPoints: [
      "50 % avdrag på arbetskostnaden",
      "Avdraget dras direkt på fakturan",
      "Gäller dig som privatperson",
    ],
    rutNote:
      "Avdraget är högst 75 000 kr per person och år. Reglerna kan ändras, så kontrollera alltid aktuella villkor hos Skatteverket.",

    aboutEyebrow: "Om oss",
    aboutHeading: "Det lilla, personliga trädgårdsbolaget i *Angered*",
    aboutText:
      "Västgöta Trädgårdsservice AB är ett litet, personligt trädgårdsbolag med bas i Angered. Med fokus på noggrannhet, kvalitet och personlig service hjälper vi privatpersoner, bostadsrättsföreningar och företag i hela Göteborgsområdet.",
    aboutLink: "Läs mer om oss",
    audiences: ["Privatpersoner", "Bostadsrättsföreningar", "Företag"],

    ctaEyebrow: "Kontakt",
    ctaHeading: "Redo för en *grönare* trädgård?",
  },

  servicesPage: {
    eyebrow: "Våra tjänster",
    title: "Trädgårdsskötsel för *träd, häckar* och gräsmattor",
    intro:
      "Från trädbeskärning och häckklippning till gräsklippning och rensning av rabatter, i Göteborg med omnejd.",
    quoteLabel: (service: string) => `Begär offert på ${service.toLowerCase()}`,
  },

  aboutPage: {
    eyebrow: "Om oss",
    title: "Ett litet team med *stolthet* i hantverket",
    intro:
      "Västgöta Trädgårdsservice AB startades 2021 med visionen att erbjuda pålitlig och effektiv grönyteskötsel i Västra Götaland.",
    body: "Vi sätter stolthet i det hantverk trädgårdsskötsel faktiskt är. Ingen trädgård är för liten eller för stor för oss. Vi anpassar alltid uppdragen efter dina unika behov och önskemål.",
    values: [
      {
        icon: "sprout" as IconName,
        title: "Noggrannhet",
        text: "Rena kanter, jämna häckar och väl omhändertagna rabatter. Det är detaljerna som gör skillnaden.",
        style: "bg-brand text-white",
      },
      {
        icon: "shield" as IconName,
        title: "Kvalitet",
        text: "Vi gör jobbet ordentligt och fackmannamässigt, oavsett om det gäller ett träd eller en hel gräsmatta.",
        style: "bg-brand-deep text-white",
      },
      {
        icon: "users" as IconName,
        title: "Personlig service",
        text: "Du pratar med de som gör jobbet. Vi lyssnar på dina önskemål och anpassar efter dem.",
        style: "bg-tint text-ink",
      },
    ],
    teamEyebrow: "Företaget",
    teamHeading: "Ansvarig",
    factsEyebrow: "Fakta om företaget",
    facts: [
      { label: "Bransch", value: "Skötsel och underhåll av grönytor" },
      { label: "Skatt", value: "Godkänd för F-skatt, registrerad för moms och som arbetsgivare" },
      { label: "Kunder", value: "Privatpersoner, bostadsrättsföreningar och företag" },
      { label: "Verksamhetsområde", value: "Göteborg med omnejd" },
    ],
  },

  contactPage: {
    eyebrow: "Kontakt & offert",
    title: "Boka trädgårdshjälp eller begär *fri offert*",
    intro: "Berätta om din trädgård och vad du behöver hjälp med så återkommer vi med ett förslag.",
    formTitle: "Berätta om din trädgård",
    serviceLabel: "Vilken tjänst önskas?",
    servicePlaceholder: "Välj tjänst",
    otherService: "Annat / flera tjänster",
    messageLabel: "Beskriv din trädgård",
    messagePlaceholder: "Storlek på tomten, vilka träd eller häckar det gäller, önskat tillfälle …",
    thanksTitle: "Tack – vi återkommer",
    thanksText: "Din förfrågan är mottagen. Vi återkommer så snart vi kan med ett förslag.",
  },
};

export type Site = typeof site;
