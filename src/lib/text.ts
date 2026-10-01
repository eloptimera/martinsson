/** Gör *ord* till markerat ord (gul understrykning). Allt annat HTML-escapas. */
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function mark(text: string): string {
  return esc(text).replace(
    /\*([^*]+)\*/g,
    '<span class="underline decoration-signal decoration-[0.09em] underline-offset-[0.12em] [text-decoration-skip-ink:none]">$1</span>',
  );
}

/** Ta bort *-markeringarna (för <title> och metadata). */
export const plain = (text: string) => text.replace(/\*/g, "");

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map((d) => d[0])
    .join("");
