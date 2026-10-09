import { posts } from "./posts-data.js";
import { highlightAll } from "./highlight.js";
import { PROFILE } from "./site.js";
import { projects } from "./projects.js";
import { hydrate } from "./components.js";
import { parseRoute, type Route } from "./router.js";
import { debounce } from "./utils.js";
import {
  aboutView, tipsView, filterPosts, landingView, notFoundView, postView,
  projectListView, projectsView, sidebarView, tagView, tocView,
} from "./views.js";

const TITLE = "Snipo";
const $ = <T extends HTMLElement>(sel: string): T => document.querySelector<T>(sel)!;
const main = $("#main"), sidebar = $("#sidebar"), toc = $("#toc");
const bar = $("#progress");
const q = $<HTMLInputElement>("#q"), themeBtn = $<HTMLButtonElement>("#theme"), menuBtn = $<HTMLButtonElement>("#menu");

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
let query = "";
let tech: string | null = null;
let route: Route = { name: "home" };

/* Tema claro/oscuro */
type Theme = "light" | "dark";
function applyTheme(t: Theme): void {
  document.documentElement.dataset.theme = t;
  themeBtn.setAttribute("aria-pressed", String(t === "dark"));
  themeBtn.textContent = t === "dark" ? "Tema claro" : "Tema oscuro";
}
function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* almacenamiento no disponible */ }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
applyTheme(initialTheme());
themeBtn.addEventListener("click", () => {
  const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch { /* ignorar */ }
});

/* Menú lateral en móvil */
const setMenu = (open: boolean): void => {
  sidebar.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
};
menuBtn.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));

const renderSidebar = (): void => { sidebar.innerHTML = sidebarView(sorted, query, route); };

q.addEventListener("input", debounce(() => {
  query = q.value;
  renderSidebar();
  const home = main.querySelector<HTMLElement>("#home-list");
  if (home) {
    home.innerHTML = tipsView(filterPosts(sorted, query), route.name === "tips" ? route.track : undefined);
    highlightAll(home);
    addCopyButtons(home);
  }
}, 120));
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")) { e.preventDefault(); q.focus(); }
});

/* Copiar el enlace de un tip */
main.addEventListener("click", async (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-copy-link]");
  if (!btn) return;
  const url = `${location.href.split("#")[0]}#/tip/${btn.dataset.copyLink}`;
  try {
    await navigator.clipboard.writeText(url);
    btn.textContent = "Enlace copiado";
  } catch {
    btn.textContent = "No se pudo copiar";
  }
  window.setTimeout(() => (btn.textContent = "Copiar enlace"), 1800);
});

/* Un tip al azar */
main.addEventListener("click", (e) => {
  if (!(e.target as HTMLElement).closest("[data-random]")) return;
  const pick = sorted[Math.floor(Math.random() * sorted.length)];
  if (pick) location.hash = `#/tip/${pick.slug}`;
});

/* Filtro de proyectos por tecnología */
main.addEventListener("click", (e) => {
  const chip = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-tech]");
  if (!chip) return;
  tech = chip.dataset.tech || null;
  main.querySelectorAll<HTMLButtonElement>("button[data-tech]").forEach((b) =>
    b.setAttribute("aria-pressed", String((b.dataset.tech || null) === tech)));
  $("#projects-list").innerHTML = projectListView(projects, tech);
});

/* Barra de progreso de lectura */
function updateProgress(): void {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = route.name === "post" && max > 0 ? Math.min(1, scrollY / max) : 0;
  bar.style.transform = `scaleX(${ratio})`;
}
addEventListener("scroll", updateProgress, { passive: true });

/* Saltos dentro de la página (el hash lo ocupa el router) */
toc.addEventListener("click", (e) => {
  const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[data-anchor]");
  if (!a) return;
  e.preventDefault();
  const target = document.getElementById(a.dataset.anchor!);
  target?.scrollIntoView({ block: "start" });
  target?.setAttribute("tabindex", "-1");
  target?.focus({ preventScroll: true });
});

/* Formulario de contacto: abre el correo del visitante con el mensaje listo */
main.addEventListener("submit", (e) => {
  const form = (e.target as HTMLElement).closest<HTMLFormElement>("#contact-form");
  if (!form) return;
  e.preventDefault();
  const d = new FormData(form);
  const name = String(d.get("name")), email = String(d.get("email")), message = String(d.get("message"));
  const url = `mailto:${PROFILE.email}?subject=${encodeURIComponent(`Mensaje de ${name}`)}&body=${encodeURIComponent(`${message}\n\n${name} (${email})`)}`;
  $("#c-status").textContent = "Abriendo tu programa de correo…";
  location.href = url;
});

function addCopyButtons(root: HTMLElement): void {
  root.querySelectorAll("pre").forEach((pre) => {
    const btn = document.createElement("button");
    btn.className = "copy";
    btn.type = "button";
    btn.textContent = "Copiar";
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? "");
        btn.textContent = "Copiado";
      } catch {
        btn.textContent = "No se pudo copiar";
      }
      window.setTimeout(() => (btn.textContent = "Copiar"), 1800);
    });
    pre.append(btn);
  });
}

function show(title: string, html: string, tocHtml = ""): void {
  document.title = title === TITLE ? `${TITLE}: tips rápidos de desarrollo web` : `${title} · ${TITLE}`;
  main.innerHTML = html;
  toc.innerHTML = tocHtml;
  highlightAll(main);
}

function render(r: Route): void {
  switch (r.name) {
    case "home":
      show(TITLE, landingView(sorted, projects));
      return addCopyButtons(main);
    case "tips":
      show(r.track ? `Tips de ${r.track}` : "Tips", `<div id="home-list">${tipsView(filterPosts(sorted, query), r.track)}</div>`);
      return addCopyButtons(main);
    case "tag":
      show(`Etiqueta: ${r.tag}`, tagView(sorted, r.tag));
      return addCopyButtons(main);
    case "projects": return show("Proyectos", projectsView(projects, tech));
    case "about": return show("Sobre mí", aboutView());
    case "post": {
      const i = sorted.findIndex((p) => p.slug === r.slug);
      const post = sorted[i];
      if (!post) return show("No encontrado", notFoundView());
      const related = sorted.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)));
      const more = related.length ? related : sorted.filter((p) => p.slug !== post.slug && p.track === post.track);
      show(post.title, postView(post, sorted[i + 1], sorted[i - 1], more.slice(0, 2)), tocView(post));
      hydrate(main);
      return addCopyButtons(main);
    }
    default: return show("No encontrado", notFoundView());
  }
}

let first = true;
function onRoute(): void {
  route = parseRoute(location.hash);
  render(route);
  renderSidebar();
  setMenu(false);
  window.scrollTo(0, 0);
  updateProgress();
  if (!first) main.focus({ preventScroll: true });
  first = false;
}
window.addEventListener("hashchange", onRoute);
onRoute();
