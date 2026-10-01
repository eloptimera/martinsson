/** Tar bort *-markeringar ur text (används i titlar och metadata). */
export const plain = (text: string) => text.replace(/\*/g, "");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Escapar text för set:html. *-markeringar tas bort (ingen särskild stil i den här designen). */
export const mark = (text: string) => esc(plain(text));
