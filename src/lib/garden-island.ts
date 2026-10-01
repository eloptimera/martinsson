/**
 * Genererar illustrationen av den svävande gräsön som en SVG-sträng (körs vid bygget).
 * Realismen kommer från procedurella texturer: brusfilter för gräsfibrer och jord, hundratals
 * löv med ljus uppifrån vänster, mjuka skuggor och ett stort antal enskilda strån.
 * Allt är deterministiskt (samma slumpfrö ger samma bild varje bygge).
 *
 * Vill du ha ett riktigt foto/en 3D-render: sätt `heroImage` i src/site.config.ts.
 */

type RGB = [number, number, number];

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];
const rgb = (c: RGB) => `rgb(${c[0]},${c[1]},${c[2]})`;
const f = (n: number) => Math.round(n * 10) / 10;

// ── Lövverk: många små cirklar, ljusa uppe till vänster och mörka nere till höger ──────────
function foliage(opts: {
  seed: number;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  n: number;
  rMin: number;
  rMax: number;
  dark: RGB;
  mid: RGB;
  light: RGB;
}) {
  const r = rng(opts.seed);
  const items: { x: number; y: number; r: number; fill: string }[] = [];
  for (let i = 0; i < opts.n; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r());
    const x = opts.cx + Math.cos(a) * opts.rx * d;
    const y = opts.cy + Math.sin(a) * opts.ry * d;
    const nx = (x - opts.cx) / opts.rx;
    const ny = (y - opts.cy) / opts.ry;
    const lit = Math.min(1, Math.max(0, 0.58 - 0.42 * nx - 0.5 * ny + (r() - 0.5) * 0.42));
    const col = lit < 0.5 ? mix(opts.dark, opts.mid, lit * 2) : mix(opts.mid, opts.light, (lit - 0.5) * 2);
    items.push({ x, y, r: opts.rMin + (opts.rMax - opts.rMin) * r(), fill: rgb(col) });
  }
  items.sort((p, q) => p.y - q.y);
  return items.map((c) => `<circle cx="${f(c.x)}" cy="${f(c.y)}" r="${f(c.r)}" fill="${c.fill}"/>`).join("");
}

// ── Strån: korta böjda streck, grupperade per färg så att SVG:n blir kompakt ──────────────
function blades(opts: {
  seed: number;
  n: number;
  x0: number;
  x1: number;
  yAt: (x: number) => number;
  spread: number;
  hMin: number;
  hMax: number;
  colors: string[];
  width: number;
  lean?: number;
}) {
  const r = rng(opts.seed);
  const groups = opts.colors.map(() => [] as string[]);
  for (let i = 0; i < opts.n; i++) {
    const x = opts.x0 + (opts.x1 - opts.x0) * r();
    const y = opts.yAt(x) + (r() - 0.5) * opts.spread;
    const h = opts.hMin + (opts.hMax - opts.hMin) * r();
    const lean = ((r() - 0.5) * 2 + (opts.lean ?? 0)) * h * 0.5;
    groups[Math.floor(r() * opts.colors.length)].push(
      `M${f(x)} ${f(y)}q${f(lean * 0.3)} ${f(-h * 0.55)} ${f(lean)} ${f(-h)}`,
    );
  }
  return opts.colors
    .map(
      (c, i) =>
        `<path d="${groups[i].join("")}" stroke="${c}" stroke-width="${opts.width}" stroke-linecap="round" fill="none"/>`,
    )
    .join("");
}

function stone(cx: number, cy: number, w: number, h: number, skew: number) {
  const pts = (dy: number) =>
    `${f(cx - w / 2 + skew)},${f(cy - h / 2 + dy)} ${f(cx + w / 2 + skew)},${f(cy - h / 2 + dy)} ${f(cx + w / 2 - skew)},${f(cy + h / 2 + dy)} ${f(cx - w / 2 - skew)},${f(cy + h / 2 + dy)}`;
  return `<g stroke-linejoin="round">
    <polygon points="${pts(7)}" fill="#8e8a7d" stroke="#8e8a7d" stroke-width="9"/>
    <polygon points="${pts(0)}" fill="url(#st)" stroke="url(#st)" stroke-width="9"/>
    <polygon points="${pts(0)}" fill="#fff" opacity=".12" filter="url(#stoneNoise)" stroke="none"/>
  </g>`;
}

function bollard(x: number, y: number, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="9" ry="3" fill="#06210f" opacity=".5" filter="url(#blurS)"/>
    <circle cx="0" cy="-42" r="30" fill="url(#glow)"/>
    <rect x="-5" y="-36" width="10" height="38" rx="2.5" fill="url(#metal)"/>
    <rect x="-7" y="-42" width="14" height="8" rx="2" fill="#1b1d1c"/>
    <rect x="-4" y="-40" width="8" height="4" rx="1.5" fill="#fff3c4"/>
  </g>`;
}

export function gardenIslandSvg(): string {
  // Översidan (rundad fyrhörning med perspektiv)
  const TOP =
    "M168 358 L748 338 Q800 336 812 374 L852 488 Q862 528 822 536 L112 550 Q62 554 56 514 L94 392 Q104 360 168 358 Z";
  // Jordkroppen under (fram- och sidoytor)
  const BODY = "M56 514 L56 604 Q58 656 124 664 L818 650 Q868 644 866 592 L862 524 L822 536 L112 550 Z";
  const frontY = (x: number) => 550 - ((x - 112) / 710) * 14; // främre kantens y vid x

  // Mjuka ränder: band som blir högre närmare betraktaren
  let stripes = "";
  {
    let y = 330;
    let h = 9;
    let i = 0;
    while (y < 566) {
      stripes += `<rect x="40" y="${f(y)}" width="840" height="${f(h + 1)}" fill="${i % 2 ? "#438f2b" : "#69b843"}"/>`;
      y += h;
      h *= 1.13;
      i++;
    }
  }

  // Jordens rötter och småsten
  const rr = rng(11);
  let roots = "";
  for (let i = 0; i < 46; i++) {
    const x = 70 + rr() * 780;
    const y = frontY(x) + 12 + rr() * 4;
    const len = 16 + rr() * 58;
    const sway = (rr() - 0.5) * 36;
    roots += `<path d="M${f(x)} ${f(y)}q${f(sway * 0.4)} ${f(len * 0.5)} ${f(sway)} ${f(len)}" stroke="${rr() > 0.5 ? "#2b1a0e" : "#9a7a52"}" stroke-width="${f(0.8 + rr() * 1.6)}" fill="none" opacity="${f(0.45 + rr() * 0.4)}" stroke-linecap="round"/>`;
  }
  let pebblesInSoil = "";
  for (let i = 0; i < 34; i++) {
    const x = 70 + rr() * 780;
    const y = frontY(x) + 28 + rr() * 80;
    const w = 3 + rr() * 8;
    pebblesInSoil += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(w)}" ry="${f(w * 0.6)}" fill="${rr() > 0.5 ? "#5b4630" : "#a99a82"}" opacity="${f(0.5 + rr() * 0.4)}"/>`;
  }

  // Gräskanten som hänger över jorden
  const rl = rng(5);
  let lipTop = "";
  let lipBottom = "";
  for (let x = 60; x <= 862; x += 5) {
    const y = frontY(Math.min(Math.max(x, 112), 822));
    lipTop += `${x === 60 ? "M" : "L"}${x} ${f(y + 2)}`;
  }
  for (let x = 862; x >= 60; x -= 5) {
    const y = frontY(Math.min(Math.max(x, 112), 822));
    lipBottom += `L${x} ${f(y + 15 + rl() * 12)}`;
  }
  const lip = `${lipTop}${lipBottom}Z`;

  // Träd
  const crown = foliage({
    seed: 21,
    cx: 618,
    cy: 188,
    rx: 168,
    ry: 128,
    n: 560,
    rMin: 7,
    rMax: 19,
    dark: [22, 74, 36],
    mid: [62, 140, 52],
    light: [160, 214, 104],
  });
  const crownTop = foliage({
    seed: 22,
    cx: 590,
    cy: 160,
    rx: 118,
    ry: 84,
    n: 230,
    rMin: 5,
    rMax: 11,
    dark: [58, 128, 50],
    mid: [112, 184, 76],
    light: [196, 236, 128],
  });
  const topiary = foliage({
    seed: 31,
    cx: 258,
    cy: 348,
    rx: 66,
    ry: 62,
    n: 360,
    rMin: 4,
    rMax: 9,
    dark: [20, 70, 34],
    mid: [58, 134, 50],
    light: [150, 208, 98],
  });
  const hedge = foliage({
    seed: 41,
    cx: 452,
    cy: 356,
    rx: 168,
    ry: 30,
    n: 320,
    rMin: 4,
    rMax: 9,
    dark: [18, 64, 32],
    mid: [48, 118, 44],
    light: [112, 176, 78],
  });
  const shrubR = foliage({
    seed: 51,
    cx: 806,
    cy: 404,
    rx: 36,
    ry: 66,
    n: 190,
    rMin: 4,
    rMax: 8,
    dark: [26, 82, 36],
    mid: [70, 148, 54],
    light: [150, 206, 96],
  });
  const shrubL = foliage({
    seed: 61,
    cx: 128,
    cy: 436,
    rx: 54,
    ry: 30,
    n: 170,
    rMin: 4,
    rMax: 8,
    dark: [28, 84, 38],
    mid: [74, 150, 56],
    light: [152, 208, 98],
  });

  // Strån
  const lawnBlades = blades({
    seed: 71,
    n: 1500,
    x0: 70,
    x1: 850,
    yAt: (x) => 346 + ((x - 100) / 760) * -6 + 90 + (x % 7),
    spread: 190,
    hMin: 3,
    hMax: 8,
    colors: ["#2f7a2a", "#4a9a35", "#7ccb52", "#a3df72"],
    width: 1.15,
    lean: 0,
  });
  const frontBlades = blades({
    seed: 72,
    n: 560,
    x0: 62,
    x1: 858,
    yAt: (x) => frontY(Math.min(Math.max(x, 112), 822)) + 4,
    spread: 12,
    hMin: 9,
    hMax: 20,
    colors: ["#2b7227", "#3f8f33", "#6cbc48", "#95d466"],
    width: 1.7,
    lean: 0,
  });
  const tufts = (x: number, y: number, n: number, h: number, seed: number) =>
    blades({
      seed,
      n,
      x0: x - 16,
      x1: x + 16,
      yAt: () => y,
      spread: 4,
      hMin: h * 0.6,
      hMax: h,
      colors: ["#2d7a2b", "#52a53a", "#86cf58"],
      width: 1.8,
      lean: 0,
    });

  const tree = `
    <ellipse cx="640" cy="404" rx="190" ry="30" fill="#0d3a1a" opacity=".38" filter="url(#blur)"/>
    <path d="M598 404 C604 360 606 318 600 262 C596 236 592 214 584 196 L612 196 C618 218 622 242 626 262 C634 318 632 362 640 404 Z" fill="url(#bark)"/>
    <path d="M603 290 C580 262 556 244 534 238 M621 272 C640 244 668 226 698 218 M611 248 C606 220 610 196 622 176" stroke="#4d3320" stroke-width="9" stroke-linecap="round" fill="none"/>
    <path d="M608 380 C610 340 611 300 606 262 M626 392 C628 350 626 310 622 270" stroke="#3a2616" stroke-width="2" stroke-linecap="round" fill="none" opacity=".5"/>
    <g filter="url(#leafy)">
      <ellipse cx="620" cy="196" rx="156" ry="118" fill="#1c4f2a"/>
      ${crown}
    </g>
    <g filter="url(#leafyS)">${crownTop}</g>`;

  const mower = `
    <g transform="translate(318 468)">
      <ellipse cx="22" cy="30" rx="108" ry="19" fill="#06210f" opacity=".5" filter="url(#blurS)"/>
      <!-- fångstkorg -->
      <polygon points="30,-36 90,-54 124,-38 64,-18" fill="#34383a"/>
      <polygon points="64,-18 124,-38 124,-2 64,18" fill="url(#catcher)"/>
      <polygon points="30,-36 64,-18 64,18 30,-2" fill="#232627"/>
      <path d="M74 -14L74 14M84 -18L84 10M94 -22L94 6M104 -26L104 2M114 -30L114 -2" stroke="#050606" stroke-width="2.4" opacity=".7"/>
      <!-- däck -->
      <polygon points="-78,-8 8,-32 62,-8 -24,18" fill="url(#deck)"/>
      <polygon points="-78,-8 -24,18 -24,30 -78,5" fill="#16572a"/>
      <polygon points="-24,18 62,-8 62,3 -24,30" fill="#0f4220"/>
      <polygon points="-70,-9 8,-30 14,-27 -64,-5" fill="#9be07e" opacity=".55"/>
      <!-- motorkåpa -->
      <path d="M-62 -14 C-58 -46 -30 -56 2 -52 C28 -48 36 -30 30 -16 L-12 -4 Z" fill="url(#hood)"/>
      <path d="M-50 -18 C-44 -40 -26 -46 -2 -43 C14 -40 22 -30 18 -22" stroke="#6bd05b" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="-14" cy="-30" rx="13" ry="6" fill="#0e1210" opacity=".8"/>
      <!-- hjul -->
      <ellipse cx="-58" cy="18" rx="13" ry="12" fill="#131615"/>
      <ellipse cx="-58" cy="18" rx="5.5" ry="5" fill="#9aa39d"/>
      <ellipse cx="46" cy="28" rx="19" ry="17" fill="#131615"/>
      <ellipse cx="46" cy="28" rx="8" ry="7" fill="#aeb7b0"/>
      <ellipse cx="46" cy="28" rx="3" ry="3" fill="#4a524d"/>
      <!-- handtag -->
      <path d="M94 -42 L170 -128" stroke="#202423" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M112 -34 L186 -118" stroke="#202423" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M170 -128 L186 -118" stroke="#0e1110" stroke-width="9" stroke-linecap="round"/>
      <path d="M172 -127 L184 -119" stroke="#4a4f4c" stroke-width="3" stroke-linecap="round"/>
    </g>`;

  const sign = `
    <g transform="translate(676 462)">
      <ellipse cx="62" cy="12" rx="92" ry="14" fill="#06210f" opacity=".45" filter="url(#blurS)"/>
      <polygon points="-6,6 132,-4 140,18 0,30" fill="url(#st)" stroke="#8e8a7d" stroke-width="2"/>
      <rect x="2" y="-92" width="122" height="88" rx="9" fill="#14281a" stroke="#3d7d3a" stroke-width="5" transform="skewY(-3)"/>
      <rect x="9" y="-85" width="108" height="74" rx="5" fill="none" stroke="#1d4527" stroke-width="2" transform="skewY(-3)"/>
      <g transform="skewY(-3)">
        <path d="M54 -76c0-12 8-19 20-20 0 12-7 19-20 20Z" fill="#7fd36b"/>
        <path d="M54 -76L66 -88" stroke="#14281a" stroke-width="1.6" stroke-linecap="round"/>
        <text x="63" y="-52" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="1.4" fill="#fff">VÄSTGÖTA</text>
        <text x="63" y="-36" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="7.6" font-weight="700" letter-spacing="1.6" fill="#9be07e">TRÄDGÅRDSSERVICE</text>
      </g>
    </g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 740" width="900" height="740">
<defs>
  <linearGradient id="lawnShade" x1="0" y1="0" x2="1" y2="0.2">
    <stop offset="0" stop-color="#d4f5a8" stop-opacity=".5"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#0b3f17" stop-opacity=".38"/>
  </linearGradient>
  <linearGradient id="lawnDepth" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#0b3f17" stop-opacity=".5"/><stop offset=".28" stop-color="#0b3f17" stop-opacity="0"/><stop offset="1" stop-color="#bfe98a" stop-opacity=".18"/>
  </linearGradient>
  <linearGradient id="soil" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#5a3d23"/><stop offset=".55" stop-color="#3b2916"/><stop offset="1" stop-color="#1f150b"/>
  </linearGradient>
  <linearGradient id="soilSide" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset=".12" stop-color="#000" stop-opacity="0"/><stop offset=".88" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/>
  </linearGradient>
  <linearGradient id="lipG" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#6fc04a"/><stop offset=".6" stop-color="#3c8d2f"/><stop offset="1" stop-color="#1f5f24"/>
  </linearGradient>
  <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#8d6a47"/><stop offset=".5" stop-color="#5f4229"/><stop offset="1" stop-color="#34210f"/>
  </linearGradient>
  <linearGradient id="st" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ebe8dd"/><stop offset="1" stop-color="#c9c5b6"/>
  </linearGradient>
  <linearGradient id="deck" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#58c04e"/><stop offset="1" stop-color="#1f7d34"/>
  </linearGradient>
  <linearGradient id="hood" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4b5250"/><stop offset="1" stop-color="#171a19"/>
  </linearGradient>
  <linearGradient id="catcher" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#2a2d2e"/><stop offset="1" stop-color="#0d0f0f"/>
  </linearGradient>
  <linearGradient id="metal" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#555b58"/><stop offset=".5" stop-color="#1c1f1e"/><stop offset="1" stop-color="#0c0e0d"/>
  </linearGradient>
  <radialGradient id="glow" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#ffe9a0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffd978" stop-opacity=".45"/><stop offset="1" stop-color="#ffd978" stop-opacity="0"/>
  </radialGradient>
  <filter id="blur" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="14"/></filter>
  <filter id="blurS" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="5"/></filter>
  <!-- ojämna lövkanter -->
  <filter id="leafy" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".1" numOctaves="3" seed="4" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="12" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <filter id="leafyS" x="-10%" y="-10%" width="120%" height="120%">
    <feTurbulence type="fractalNoise" baseFrequency=".16" numOctaves="2" seed="9" result="n"/>
    <feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <!-- gräsfibrer: utsträckt brus som mörka och ljusa streck -->
  <filter id="grassDark" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".05 .9" numOctaves="3" seed="3"/>
    <feColorMatrix type="matrix" values="0 0 0 0 .05  0 0 0 0 .22  0 0 0 0 .06  0 0 0 -5.5 2.55"/>
  </filter>
  <filter id="grassLight" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".04 1.1" numOctaves="3" seed="8"/>
    <feColorMatrix type="matrix" values="0 0 0 0 .78  0 0 0 0 .95  0 0 0 0 .45  0 0 0 5.5 -3.05"/>
  </filter>
  <filter id="soilNoise" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".012 .07" numOctaves="4" seed="2"/>
    <feColorMatrix type="matrix" values="0 0 0 0 .62  0 0 0 0 .46  0 0 0 0 .3  0 0 0 1.6 -.55"/>
  </filter>
  <filter id="soilGrain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="6"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.35"/>
  </filter>
  <filter id="stoneNoise" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="12"/>
    <feColorMatrix type="matrix" values="0 0 0 0 .3  0 0 0 0 .3  0 0 0 0 .28  0 0 0 2 -.4"/>
  </filter>
  <clipPath id="top"><path d="${TOP}"/></clipPath>
  <clipPath id="body"><path d="${BODY}"/></clipPath>
</defs>

<!-- skugga under ön -->
<ellipse cx="460" cy="676" rx="400" ry="22" fill="#0c3a1c" opacity=".34" filter="url(#blur)"/>
<ellipse cx="460" cy="668" rx="300" ry="12" fill="#0c3a1c" opacity=".3" filter="url(#blurS)"/>

<!-- jord -->
<g clip-path="url(#body)">
  <path d="${BODY}" fill="url(#soil)"/>
  <rect x="40" y="520" width="840" height="160" filter="url(#soilNoise)" opacity=".85"/>
  <rect x="40" y="520" width="840" height="160" filter="url(#soilGrain)" opacity=".55"/>
  ${pebblesInSoil}
  ${roots}
  <rect x="40" y="520" width="840" height="160" fill="url(#soilSide)"/>
  <rect x="40" y="590" width="840" height="80" fill="#000" opacity=".28" filter="url(#blur)"/>
</g>

<!-- gräsmatta -->
<g clip-path="url(#top)">
  <rect x="40" y="320" width="840" height="260" fill="#4f9d33"/>
  ${stripes}
  <rect x="40" y="320" width="840" height="260" fill="url(#lawnShade)"/>
  <rect x="40" y="320" width="840" height="260" fill="url(#lawnDepth)"/>
  <rect x="40" y="320" width="840" height="260" filter="url(#grassDark)" opacity=".7"/>
  <rect x="40" y="320" width="840" height="260" filter="url(#grassLight)" opacity=".6"/>
  ${lawnBlades}
  <rect x="40" y="330" width="840" height="34" fill="#0b3f17" opacity=".35" filter="url(#blurS)"/>
</g>

<!-- bakre häck, buskar och träd -->
<g filter="url(#leafyS)">${hedge}</g>
<g filter="url(#leafyS)">${shrubL}</g>
<ellipse cx="258" cy="404" rx="82" ry="14" fill="#0d3a1a" opacity=".4" filter="url(#blurS)"/>
<g filter="url(#leafyS)">${topiary}</g>
${tree}
<ellipse cx="806" cy="462" rx="46" ry="10" fill="#0d3a1a" opacity=".4" filter="url(#blurS)"/>
<g filter="url(#leafyS)">${shrubR}</g>

<!-- gångstenar -->
${stone(470, 506, 60, 17, 6)}
${stone(530, 494, 55, 16, 6)}
${stone(584, 484, 50, 15, 5)}
${stone(632, 476, 45, 14, 5)}
${stone(673, 470, 40, 12, 4)}

${sign}
${bollard(214, 452, 1)}
${bollard(660, 476, 1.1)}
${bollard(834, 470, 1.1)}
${mower}

<!-- främre gräskant och strån -->
<g clip-path="url(#body)"><path d="${lip}" fill="url(#lipG)"/></g>
${frontBlades}
${tufts(96, 540, 40, 26, 81)}${tufts(850, 520, 44, 28, 82)}${tufts(214, 548, 26, 18, 83)}

<!-- småsten längs kanten -->
<g>
  <ellipse cx="170" cy="446" rx="9" ry="5" fill="#8a8578"/><ellipse cx="168" cy="444" rx="5" ry="2.5" fill="#bfbaa9"/>
  <ellipse cx="288" cy="404" rx="7" ry="4" fill="#7e7a6d"/><ellipse cx="760" cy="468" rx="8" ry="4.6" fill="#8a8578"/>
  <ellipse cx="758" cy="466" rx="4.5" ry="2.2" fill="#c5c0af"/><ellipse cx="788" cy="478" rx="6" ry="3.4" fill="#7e7a6d"/>
  <ellipse cx="700" cy="526" rx="9" ry="5" fill="#8a8578"/><ellipse cx="698" cy="524" rx="5" ry="2.4" fill="#c5c0af"/>
</g>
<g fill="#fff" opacity=".9">
  <circle cx="118" cy="428" r="2.6"/><circle cx="136" cy="446" r="2.4" fill="#ffd966"/><circle cx="150" cy="420" r="2.4"/>
  <circle cx="790" cy="388" r="2.6" fill="#ffd966"/><circle cx="800" cy="372" r="2.4"/><circle cx="812" cy="400" r="2.4"/>
</g>
</svg>`;
}
