/**
 * ALLT kundspecifikt ligger här: företagsuppgifter, texter, tjänster och SEO.
 * Ny kund = kopiera repot, ändra den här filen (och vid behov färgerna överst i src/styles/global.css).
 *
 * Skriv *ord* med stjärnor runt för att markera det (understruket i signalfärg) i rubriker.
 * Tomma fält (adress, orgnr) döljs automatiskt på sajten.
 */
import type { IconName } from "./components/icons";

export const site = {
  /** Kort id som skickas med varje formulär, så en central mottagare vet vilken sajt det kom från. */
  id: "martinssons-billackering",

  company: {
    name: "Martinssons Billackering AB",
    shortName: "Martinssons",
    tagline: "Billackering AB",
    city: "",
    area: "",
    founded: 0,
    orgnr: "",
    street: "",
    zip: "",
    postalCity: "",
    phone: "0512-105 74",
    phoneLink: "+4651210574",
    email: "info@martinssonsbillackering.se",
    hours: [
      { days: "Måndag – torsdag", time: "07:00 – 17:00" },
      { days: "Fredag", time: "07:00 – 13:00" },
      { days: "Lördag", time: "Stängt" },
      { days: "Söndag", time: "Stängt" },
    ] as { days: string; time: string }[],
    hoursNote: "Stängt för frukost kl 09.00–09.30 och lunch kl 13.00–14.00.",
    taxNote: "",
    people: [] as { name: string; role: string }[],
  },

  /** Avisering högst upp på kontaktsidan. Tom sträng = ingen avisering. */
  notice:
    "Färgbutiken har upphört sedan den 1 februari 2025. Företagskunder beställer via e-post: ange beställning och ett telefonnummer, så hör vi av oss när det är klart för leverans.",

  nav: [
    { href: "/", label: "Hem" },
    { href: "/tjanster", label: "Tjänster" },
    { href: "/om-oss", label: "Om oss" },
    { href: "/samarbetspartners", label: "Samarbetspartners" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  navCta: { href: "/kontakt", label: "Begär offert" },

  seo: {
    home: {
      title: "Billackering – Martinssons Billackering AB",
      description:
        "Billackering, rostskydd, lackvård och plastreparationer för privatpersoner, försäkringsbolag och företag. Över 60 års erfarenhet. Begär offert.",
    },
    services: {
      title: "Tjänster: lackering, rostskydd, lackvård och plastreparationer – Martinssons Billackering AB",
      description:
        "Lackering, rostskydd med vaxbaserade medel, lackvård och plastreparationer. Se vad vi gör och begär offert.",
    },
    about: {
      title: "Om oss – Martinssons Billackering AB",
      description:
        "Med över 60 års erfarenhet och kompetens i lackeringsbranschen är Martinssons Billackering välkända som förstahandsval inom billackering.",
    },
    partners: {
      title: "Samarbetspartners – Martinssons Billackering AB",
      description: "Våra samarbetspartners och leverantörer inom lack, rostskydd och branschen.",
    },
    contact: {
      title: "Kontakt och öppettider – Martinssons Billackering AB",
      description:
        "Ring 0512-105 74 eller skicka en förfrågan. Öppettider och kontaktuppgifter till Martinssons Billackering AB.",
    },
    privacy: {
      title: "Integritetspolicy – Martinssons Billackering AB",
      description: "Så behandlar Martinssons Billackering AB dina personuppgifter när du kontaktar oss.",
    },
    notFound: { title: "Sidan finns inte – Martinssons Billackering AB", description: "Sidan finns inte." },
    businessDescription:
      "Billackering, underredsbehandling, plastreparationer, lackkonservering och rostskydd för privatpersoner, försäkringsbolag och företag.",
  },

  services: [
    {
      id: "lackering",
      title: "Lackering",
      short: "Billackering för privatpersoner, försäkringsbolag och företag.",
      points: [
        "Lackering för privatpersoner, försäkringsbolag och företag",
        "Underredsbehandling och lackkonservering",
        "Leverans i rätt tid och med hög kvalitet",
      ],
      icon: "spray" as IconName,
    },
    {
      id: "rostskydd",
      title: "Rostskydd",
      short:
        "En kompletterande behandling med vaxbaserade medel är en förutsättning för att hålla rosten borta.",
      points: [
        "Behandling med vaxbaserade medel",
        "Kompletterar bilens ordinarie rostskydd",
        "Hjälper till att hålla rosten borta",
      ],
      icon: "shield" as IconName,
    },
    {
      id: "lackvard",
      title: "Lackvård",
      short:
        "Ge din bil regelbunden lackservice och du får en mer lättvättad bil, bättre glans och en lack som står sig länge.",
      points: [
        "Regelbunden lackservice",
        "Mer lättvättad bil och bättre glans",
        "En lack som står sig länge",
      ],
      icon: "sparkles" as IconName,
    },
    {
      id: "plastreparationer",
      title: "Plastreparationer",
      short: "Reparation av plastdetaljer på bilen, med efterföljande lackering.",
      points: [
        "Reparation av skadade plastdetaljer",
        "Efterföljande lackering i rätt kulör",
        "Kontakta oss så bedömer vi skadan",
      ],
      icon: "wrench" as IconName,
    },
  ],

  home: {
    eyebrow: "Billackering",
    headline: "Lackering som *håller* – med över 60 års erfarenhet",
    text: "Billackering, rostskydd, lackvård och plastreparationer för privatpersoner, försäkringsbolag och företag.",
    cta: "Begär offert",
    ctaSecondary: "Våra tjänster",
    badge: "Över 60 års erfarenhet",

    quickServices: "Våra tjänster",
    quickHours: "Öppettider",
    quickContact: "Kontakta oss",

    servicesEyebrow: "Tjänster",
    servicesHeading: "Fyra tjänster för en *välskött* lack",

    customersEyebrow: "Våra kunder",
    customersHeading: "För privatpersoner, försäkringsbolag och *företag*",
    customers: [
      {
        icon: "users" as IconName,
        title: "Privatpersoner",
        text: "Lackering, lackvård och rostskydd till din egen bil.",
      },
      {
        icon: "shield" as IconName,
        title: "Försäkringsbolag",
        text: "Lackering och reparationer i samband med skadeärenden.",
      },
      {
        icon: "building" as IconName,
        title: "Företag",
        text: "Lackering för företag. Företagskunder kan beställa via e-post.",
      },
    ],

    aboutEyebrow: "Om oss",
    aboutHeading: "Välkända i lackeringsbranschen",
    aboutQuote:
      "Med över 60 års erfarenheter och kompetens i lackeringsbranschen är vi väl kända i bygden. Vår ambition är att hålla en hög servicenivå och tillgodose våra kunders önskemål.",
    aboutLink: "Läs mer om oss",

    ctaEyebrow: "Offert",
    ctaHeading: "Berätta vad som ska *lackeras*",
  },

  servicesPage: {
    eyebrow: "Tjänster",
    title: "Allt för en *välskött* lack",
    intro:
      "Lackering, rostskydd, lackvård och plastreparationer. Våra tjänster kännetecknas av att vara levererade i rätt tid med hög kvalitet.",
    quoteLabel: (service: string) => `Begär offert på ${service.toLowerCase()}`,
  },

  aboutPage: {
    eyebrow: "Om oss",
    title: "Över *60 år* i lackeringsbranschen",
    intro:
      "Martinssons Billackering är väl kända som förstahandsval av tjänster inom billackering, underredsbehandling, plastreparationer, lackkonservering och billacksbutik.",
    quote:
      "Med över 60 års erfarenheter och kompetens i lackeringsbranschen är vi väl kända i bygden. Vår ambition är att hålla en hög servicenivå och tillgodose våra kunders önskemål.",
    body: "Våra tjänster skall kännetecknas av att vara levererade i rätt tid med hög kvalitet och att kunden alltid ges ett gott bemötande.",
    values: [
      {
        icon: "badge" as IconName,
        title: "Erfarenhet",
        text: "Över 60 års erfarenhet och kompetens i lackeringsbranschen.",
      },
      {
        icon: "wrench" as IconName,
        title: "Kvalitet",
        text: "Hög kvalitet i varje uppdrag, från underredsbehandling till färdig lack.",
      },
      {
        icon: "handshake" as IconName,
        title: "Bemötande",
        text: "Kunden ska alltid ges ett gott bemötande och levereras i rätt tid.",
      },
    ],
  },

  partnersPage: {
    eyebrow: "Samarbetspartners",
    title: "Våra *samarbetspartners*",
    intro: "Leverantörer och branschorganisationer vi samarbetar med.",
    partners: [
      { name: "Glasurit", url: "https://www.glasurit.se" },
      { name: "Sikkens Vehicle Refinishes", url: "https://www.sikkensvr.com" },
      { name: "Dinitrol Center", url: "https://www.dinitrolcenter.se" },
      { name: "Smart Abrasives", url: "https://www.smartab.se" },
      { name: "MRF", url: "https://mrf.se" },
    ],
  },

  contactPage: {
    eyebrow: "Kontakt",
    title: "Begär *offert* eller ring oss",
    intro:
      "Beskriv vad som ska lackeras eller repareras så återkommer vi. Du kan också ringa oss under våra öppettider.",
    formTitle: "Skicka en förfrågan",
    serviceLabel: "Vad gäller det?",
    servicePlaceholder: "Välj tjänst",
    otherService: "Annat / flera tjänster",
    customerLabel: "Jag är",
    customerTypes: ["Privatperson", "Försäkringsbolag", "Företag"],
    messageLabel: "Beskriv ärendet",
    messagePlaceholder: "Bilmodell, vad som ska lackeras eller repareras, önskad tid …",
    thanksTitle: "Tack – vi återkommer",
    thanksText: "Din förfrågan är mottagen. Vi återkommer så snart vi kan.",
  },
};

export type Site = typeof site;
