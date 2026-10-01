/**
 * Liten klientkod för hela sajten: mobilmeny, scroll-animationer och formulär.
 * Ingen ramverkskod – bara vanlig JavaScript.
 */

// ── Mobilmeny ─────────────────────────────────────────────────────────────
const menuButton = document.querySelector<HTMLButtonElement>("[data-menu-button]");
const menu = document.getElementById("mobilmeny");
function setMenu(open: boolean) {
  if (!menuButton || !menu) return;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Stäng meny" : "Öppna meny");
  menu.hidden = !open;
}
menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
menu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

// ── Scroll-animation ──────────────────────────────────────────────────────
const reveals = document.querySelectorAll<HTMLElement>(".reveal");
if ("IntersectionObserver" in window && reveals.length) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("reveal-in"));
}

// ── Formulär ──────────────────────────────────────────────────────────────
const endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT;
const SITE_ID = document.documentElement.dataset.site ?? "";

function formToPayload(form: HTMLFormElement) {
  const data: Record<string, string | string[] | boolean> = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (typeof value !== "string") continue; // inga filer i mallen
    const prev = data[key];
    data[key] = prev === undefined ? value : Array.isArray(prev) ? [...prev, value] : [String(prev), value];
  }
  return data;
}

async function send(kind: string, payload: Record<string, unknown>) {
  if (!endpoint) {
    if (import.meta.env.DEV) {
      await new Promise((r) => setTimeout(r, 400)); // lokalt: simulera framgång
      return;
    }
    throw new Error("Formuläret är inte kopplat till en mottagare än.");
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ site: SITE_ID, form: kind, ...payload }),
  });
  if (!res.ok) throw new Error(`Formuläret avvisades (${res.status})`);
}

document.querySelectorAll<HTMLFormElement>("form[data-form]").forEach((form) => {
  const kind = form.dataset.form ?? "";
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const button = form.querySelector<HTMLButtonElement>("[data-submit]");
  const success = document.querySelector<HTMLElement>(`[data-form-success="${kind}"]`);
  const label = button?.textContent ?? "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (status) status.hidden = true;
    const payload = formToPayload(form);
    const done = () => {
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    };
    if (payload.website) return done(); // honeypot: bottar fyller i det dolda fältet
    delete payload.website;

    if (button) {
      button.disabled = true;
      button.textContent = "Skickar …";
    }
    try {
      await send(kind, payload);
      done();
    } catch {
      if (status) {
        status.textContent = "Något gick fel när formuläret skulle skickas. Försök igen om en stund.";
        status.hidden = false;
      }
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = label;
      }
    }
  });
});
