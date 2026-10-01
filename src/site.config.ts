/**
 * ALLT kundspecifikt ligger här: företagsuppgifter, texter, tjänster och SEO.
 * Ny kund = kopiera repot, ändra den här filen (och vid behov färgerna överst i src/styles/global.css).
 *
 * Tomma fält (adress, orgnr) döljs automatiskt på sajten.
 */
export type Img = { src: string; width: number; height: number; alt: string };

export const site = {
  /** Kort id som skickas med varje formulär, så en central mottagare vet vilken sajt det kom från. */
  id: "martinssons-billackering",

  /**
   * Riktiga bilder. Lägg filerna i /public och fyll i t.ex.
   * { src: "/bilder/verkstad.jpg", width: 1600, height: 900, alt: "Verkstaden sedd från gatan" }.
   * Lämnas ett fält som null visas ingen bild där, och sidan ser komplett ut ändå.
   */
  images: {
    logo: null as null | Img,
    hero: null as null | Img,
    about: null as null | Img,
    person: {
      src: "/bilder/carl-martinsson.webp",
      width: 1400,
      height: 868,
      alt: "Carl Martinsson i verkstaden",
    } as null | Img,
    facade: {
      src: "/bilder/fasad.webp",
      width: 2000,
      height: 510,
      alt: "Martinssons Billackering ABs verkstad med blå portar och skylt",
    } as null | Img,
    services: {
      lackering: null as null | Img,
      plastreparationer: null as null | Img,
      rostskydd: null as null | Img,
      lackvard: null as null | Img,
    },
  },

  /** Personen på om oss-sidan. */
  person: { name: "Carl Martinsson" },

  /**
   * Google-omdömen som visas i rullen längst ner på startsidan. Text och betyg är återgivna ordagrant.
   * Lägg till eller ta bort rader här – rullen anpassar sig själv.
   */
  reviews: [
    { name: "Henrik Fredricson", stars: 5, text: "Så fantastisk bra! Kan rekommendera till 100% …" },
    {
      name: "Per Olof Larsson",
      stars: 4,
      text: "Ett bra mottagande av trevlig Personal. Fast jag var lite försenad På en Fredag eftm 👍",
    },
    { name: "Björn Lundin", stars: 5, text: "Mycket trevligt bemötande och proffsigt utfört arbete" },
    { name: "Lise Olofson", stars: 4, text: "Kunnig personal. Ger bra tips och råd" },
    { name: "Lars Örtlund", stars: 4, text: "Bra bemötande och kunnig personal" },
    { name: "Kaj Hellström", stars: 5, text: "Bra lack jobb." },
    { name: "Roni Lindberg", stars: 4, text: "Bra bil lackering" },
    { name: "Urban Himmerman", stars: 5, text: "Personlig service" },
    { name: "Arto Huusko", stars: 5, text: "Förstklassiga" },
  ] as { name: string; stars: number; text: string }[],

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
    "Färgbutiken upphörde den 1 februari 2025 efter 40 år. Tack till alla som har besökt oss. Företagskunder beställer via info@martinssonsbillackering.se: ange beställning och ett telefonnummer, så hör vi av oss när det är klart för leverans.",

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
      title: "Billackering, rostskydd och plastreparationer – Martinssons Billackering AB",
      description:
        "Billackering, rostskydd, lackvård och plastreparationer för privatpersoner, försäkringsbolag och företag. Över 60 års erfarenhet. Begär offert.",
    },
    services: {
      title: "Tjänster – Martinssons Billackering AB",
      description: "Lackering, plastreparationer, rostskydd och lackvård. Se vad vi gör och begär offert.",
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
      intro:
        "Vi använder alltid material som säkerställer en bra kvalitet på våra uppdrag och också bidrar till förbättring av miljön.",
      paragraphs: ["Våra kunder är privatpersoner, försäkringsbolag och företag."],
      listTitle: "Exempel på uppdrag är",
      list: [
        "personbilar, pick-up",
        "småskador på lastbilar",
        "småbättringar – så kallad spot repair",
        "husbilar",
        "samlarfordon",
        "tävlingsbilar",
        "motorcyklar, mopeder",
        "sprutuppdrag på färdigslipade fordon",
        "prototyper till industrin",
      ],
    },
    {
      id: "plastreparationer",
      title: "Plastreparationer",
      short: "Vi reparerar plastdetaljer i stället för att byta dem.",
      intro:
        "Vi reparerar stötfångare, strålkastare, innerskärmar, spoilers, skärmar till mc, mopeder, traktordelar med mera.",
      paragraphs: [
        "I stället för att byta ut dyra plastdetaljer kan vi i stället reparera och återställa detaljen till nyskick. Bra för din ekonomi och miljön.",
        "Vi är sedan starten 1993 medlemmar i den rikstäckande reparationskedjan Bilplastteknik, vilket innebär att vi ständigt är uppdaterade med den senaste tekniken vad gäller material och utbildning.",
      ],
    },
    {
      id: "rostskydd",
      title: "Rostskydd",
      short: "En kompletterande behandling med vaxbaserade medel hjälper till att hålla rosten borta.",
      intro: "Tre bra skäl till att rostskyddsbehandla din bil.",
      paragraphs: [],
      reasons: [
        {
          title: "Det nordiska klimatet",
          text: "Fabriksrostskyddet fungerar i allmänhet bra på kontinenten men inte i vårt klimat. En kompletterande behandling med vaxbaserade medel är därför en förutsättning för att hålla rosten borta.",
        },
        {
          title: "Krocksäkerhet",
          text: "Rostskydd är inte bara en fråga om ekonomi utan också om säkerhet, eftersom rosten angriper skarvar och gör bilen mindre krocksäker. Låter du rostskyddsbehandla din bil ökar du således inte bara värdet och livslängden på bilen, du får också en säkrare bil.",
        },
        {
          title: "Rostskyddsgarantier",
          text: "För flera år sedan införde biltillverkare och bilförsäljare långvariga rostskyddsgarantier. Detta är en positiv utveckling. Man bör dock tänka på att fabriksgarantin bara gäller vid genomrostning av karossen. Rostangreppet måste dessutom ha börjat inifrån karossen för att garantin ska träda i kraft. Rostskyddsgarantierna är således ingen garanti för att bilen inte rostar.",
        },
      ],
    },
    {
      id: "lackvard",
      title: "Lackvård",
      short:
        "Regelbunden lackservice ger en mer lättvättad bil, bättre glans och en lack som står sig länge.",
      intro:
        "Som allt annat utsätts också bilen för sol, nedfall, salt, avfettning med mera och behöver därför vårdas för att hålla bättre.",
      paragraphs: [
        "Ger du din bil en regelbunden lackservice får du en mer lättvättad bil, bättre glans och en lack som står sig bättre över tid.",
        "Du kan ha olika servicegrad – polering, vaxning/lackkonservering och/eller penselbättring.",
        "Lackskydda kan man göra både på ny och begagnad bil med likvärdigt resultat.",
      ],
    },
  ] as {
    id: string;
    title: string;
    short: string;
    intro: string;
    paragraphs: string[];
    listTitle?: string;
    list?: string[];
    reasons?: { title: string; text: string }[];
  }[],

  home: {
    headline: "Billackering, rostskydd och plastreparationer",
    text: "Med över 60 års erfarenhet och kompetens i lackeringsbranschen. Våra kunder är privatpersoner, försäkringsbolag och företag.",
    cta: "Begär offert",
    servicesHeading: "Våra tjänster",
    customersHeading: "Våra kunder",
    customersText:
      "Vi lackerar och reparerar åt privatpersoner, försäkringsbolag och företag. Företagskunder kan beställa via e-post.",
    aboutHeading: "Om oss",
    aboutQuote:
      "Med över 60 års erfarenheter och kompetens i lackeringsbranschen är vi väl kända i bygden. Vår ambition är att hålla en hög servicenivå och tillgodose våra kunders önskemål.",
    aboutLink: "Läs mer om oss",
    ctaHeading: "Berätta vad som ska lackeras",
  },

  servicesPage: {
    title: "Våra tjänster",
    intro:
      "Lackering, rostskydd, lackvård och plastreparationer. Våra tjänster kännetecknas av att vara levererade i rätt tid med hög kvalitet.",
  },

  aboutPage: {
    title: "Om oss",
    intro:
      "Martinssons Billackering är väl kända som förstahandsval av tjänster inom billackering, underredsbehandling, plastreparationer och lackkonservering.",
    quote:
      "Med över 60 års erfarenheter och kompetens i lackeringsbranschen är vi väl kända i bygden. Vår ambition är att hålla en hög servicenivå och tillgodose våra kunders önskemål.",
    body: "Våra tjänster skall kännetecknas av att vara levererade i rätt tid med hög kvalitet och att kunden alltid ges ett gott bemötande.",
    facts: [
      { title: "Erfarenhet", text: "Över 60 års erfarenhet och kompetens i lackeringsbranschen." },
      { title: "Kvalitet", text: "Hög kvalitet i varje uppdrag, från underredsbehandling till färdig lack." },
      { title: "Bemötande", text: "Kunden ska alltid ges ett gott bemötande och få leverans i rätt tid." },
    ],
  },

  partnersPage: {
    title: "Samarbetspartners",
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
    title: "Kontakt och offert",
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
