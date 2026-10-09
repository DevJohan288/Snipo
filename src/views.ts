import type { Post, Track } from "./posts.js";
import type { Project } from "./projects.js";
import { PROFILE } from "./site.js";
import { sectionOf, type Route } from "./router.js";
import { TRACK_LABEL, levelBadge, pill, projectCard } from "./components.js";
import { esc, longDate, readingTime } from "./utils.js";

const TRACKS: Track[] = ["frontend", "backend"];
const SECTIONS: [string, string][] = [["#/", "Inicio"], ["#/tips", "Tips"], ["#/projects", "Proyectos"], ["#/about", "Sobre mí"]];

export const filterPosts = (posts: readonly Post[], query: string): Post[] => {
  const q = query.trim().toLowerCase();
  return q ? posts.filter((p) => `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase().includes(q)) : [...posts];
};

export const sidebarView = (posts: readonly Post[], query: string, route: Route): string => {
  const section = sectionOf(route);
  const nav = `<h2 class="side-title">Secciones</h2><ul>${SECTIONS.map(
    ([href, label]) => `<li><a href="${href}"${href === section && route.name !== "post" ? ' aria-current="page"' : ""}>${label}</a></li>`,
  ).join("")}</ul>`;
  const items = filterPosts(posts, query);
  const current = route.name === "post" ? route.slug : "";
  const group = (t: Track): string => {
    const list = items.filter((p) => p.track === t);
    if (!list.length) return "";
    return `<h2 class="side-title">${TRACK_LABEL[t]}</h2><ul>${list
      .map((p) => `<li><a href="#/tip/${p.slug}"${p.slug === current ? ' aria-current="page"' : ""}>${esc(p.title)}</a></li>`)
      .join("")}</ul>`;
  };
  const rest = items.length ? TRACKS.map(group).join("") : `<p class="side-empty">Sin resultados para "${esc(query)}".</p>`;
  return nav + rest;
};

const snippetOf = (p: Post): string => p.body.match(/<pre>[\s\S]*?<\/pre>/)?.[0] ?? "";

const linkBtn = (slug: string): string =>
  `<button class="link-btn" type="button" data-copy-link="${esc(slug)}">Copiar enlace</button>`;

const entries = (list: readonly Post[], withCode = false): string => `<ul class="entries">${list
  .map((p) => `<li><a href="#/tip/${p.slug}">${esc(p.title)}</a>${levelBadge(TRACK_LABEL[p.track])}${linkBtn(p.slug)}<p>${esc(p.excerpt)}</p>${withCode ? `<div class="prose">${snippetOf(p)}</div>` : ""}</li>`)
  .join("")}</ul>`;

export const tipsView = (posts: readonly Post[], track?: Track): string => {
  const tabs: [string, string, Track | undefined][] = [["#/tips", "Todos", undefined], ["#/tips/frontend", "Frontend", "frontend"], ["#/tips/backend", "Backend", "backend"]];
  const head = `
  <h1>${track ? `Tips de ${TRACK_LABEL[track]}` : "Tips"}</h1>
  <p class="lead">Consejos cortos con el código listo para copiar.</p>
  <p class="skills" aria-label="Filtrar por pista">${tabs.map(([href, label, t]) => pill(label, href, t === track)).join("")}</p>`;
  const shown = track ? posts.filter((p) => p.track === track) : [...posts];
  if (!shown.length) return head + `<p class="empty">Sin resultados. Prueba otra palabra.</p>`;
  if (track) return head + `<section class="topic">${entries(shown, true)}</section>`;
  return head + TRACKS.map((t) => {
    const list = shown.filter((p) => p.track === t);
    return list.length ? `<section class="topic"><h2>${TRACK_LABEL[t]}</h2>${entries(list, true)}</section>` : "";
  }).join("");
};

export const tagView = (posts: readonly Post[], tag: string): string => {
  const list = posts.filter((p) => p.tags.includes(tag));
  return `
  <nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a><a href="#/tips">Tips</a></nav>
  <h1>${esc(tag)}</h1>
  <p class="lead">${list.length} ${list.length === 1 ? "tip" : "tips"} con esta etiqueta.</p>
  ${list.length ? entries(list, true) : `<p class="empty">No hay tips con esta etiqueta. <a href="#/tips">Ver todos los tips</a></p>`}`;
};

/* Proyectos: el filtro por tecnología se actualiza sin recargar la vista */
export const projectListView = (list: readonly Project[], tech: string | null): string => {
  const shown = tech ? list.filter((p) => p.stack.includes(tech)) : list;
  return shown.length ? shown.map(projectCard).join("") : `<p class="empty">Ningún proyecto usa esa tecnología todavía.</p>`;
};

export const projectsView = (list: readonly Project[], tech: string | null): string => {
  const techs = [...new Set(list.flatMap((p) => p.stack))].sort((a, b) => a.localeCompare(b, "es"));
  const chip = (label: string, value: string | null): string =>
    `<button class="pill chip" type="button" data-tech="${value === null ? "" : esc(value)}" aria-pressed="${value === tech}">${esc(label)}</button>`;
  return `
  <h1>Proyectos</h1>
  <p class="lead">Lo que he construido aplicando estos tips.</p>
  <div class="chips" role="group" aria-label="Filtrar por tecnología">${chip("Todos", null)}${techs.map((t) => chip(t, t)).join("")}</div>
  <div id="projects-list" class="projects" aria-live="polite">${projectListView(list, tech)}</div>`;
};

export const aboutView = (): string => `
  <h1>Sobre mí</h1>
  <p class="lead">Hola, soy ${esc(PROFILE.name)}. ${esc(PROFILE.role)}.</p>
  <p>${esc(PROFILE.bio)}</p>
  <section class="topic"><h2>Tecnologías</h2>
    <h3>Frontend</h3><p class="skills">${PROFILE.skills.frontend.map((s) => pill(s)).join("")}</p>
    <h3>Backend</h3><p class="skills">${PROFILE.skills.backend.map((s) => pill(s)).join("")}</p>
  </section>
  <section class="topic"><h2>Contacto</h2>
    <p>¿Una duda sobre un tip o una propuesta de trabajo? Escríbeme o encuéntrame aquí:</p>
    <p class="skills">${PROFILE.links.map((l) => `<a class="pill" href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`).join("")}</p>
    <form id="contact-form" class="form">
      <label for="c-name">Nombre</label>
      <input id="c-name" name="name" type="text" required autocomplete="name" />
      <label for="c-email">Correo</label>
      <input id="c-email" name="email" type="email" required autocomplete="email" />
      <label for="c-msg">Mensaje</label>
      <textarea id="c-msg" name="message" rows="5" required></textarea>
      <button class="btn primary" type="submit">Enviar mensaje</button>
      <p id="c-status" role="status" class="status"></p>
    </form>
    <p class="muted">Al enviar se abre tu programa de correo con el mensaje listo. También puedes escribir a <a href="mailto:${esc(PROFILE.email)}">${esc(PROFILE.email)}</a>.</p>
  </section>`;

const TRACK_INTRO: Record<Track, string> = {
  frontend: "Tips de HTML, CSS, JavaScript y TypeScript para lo que ve el usuario.",
  backend: "Tips de APIs, bases de datos y seguridad para lo que ocurre en el servidor.",
};

/** Cambia cada día: el mismo tip para todos durante 24 horas. */
const tipOfTheDay = (posts: readonly Post[]): Post | undefined =>
  posts[Math.floor(Date.now() / 86_400_000) % Math.max(posts.length, 1)];

export const landingView = (posts: readonly Post[], list: readonly Project[]): string => {
  const daily = tipOfTheDay(posts);
  return `
  <div class="landing">
    <section class="hero">
      <h1>Tips rápidos de desarrollo web</h1>
      <p class="lead">Consejos cortos de frontend y backend con el código listo para copiar. Sin tutoriales largos.</p>
      <p class="cta">
        <a class="btn primary" href="#/tips">Ver los tips</a>
        <button class="btn" type="button" data-random>Un tip al azar</button>
      </p>
    </section>
    ${daily ? `<section class="daily" aria-labelledby="daily-title">
      <p class="project-track">Tip del día</p>
      <h2 id="daily-title"><a href="#/tip/${daily.slug}">${esc(daily.title)}</a></h2>
      <p>${esc(daily.excerpt)}</p>
      <div class="prose">${snippetOf(daily)}</div>
    </section>` : ""}
    <section aria-labelledby="tracks-title">
      <h2 id="tracks-title" class="section-title">Elige una pista</h2>
      <div class="tracks">
        ${TRACKS.map((t) => {
          const l = posts.filter((p) => p.track === t);
          return `<article class="track ${t}">
            <h3>${TRACK_LABEL[t]}</h3>
            <p>${TRACK_INTRO[t]}</p>
            <ul>${l.slice(0, 3).map((p) => `<li><a href="#/tip/${p.slug}">${esc(p.title)}</a></li>`).join("")}</ul>
            <a class="more" href="#/tips/${t}">Ver los ${l.length} tips de ${TRACK_LABEL[t]}</a>
          </article>`;
        }).join("")}
      </div>
    </section>
    <section aria-labelledby="proj-title">
      <h2 id="proj-title" class="section-title">Proyectos</h2>
      <div class="projects">${list.slice(0, 2).map(projectCard).join("")}</div>
      <p class="more-row"><a class="more" href="#/projects">Ver todos los proyectos</a></p>
    </section>
  </div>`;
};

const withIds = (html: string): string => {
  let i = 0;
  return html.replace(/<h2>/g, () => `<h2 id="s-${i++}">`);
};
const headings = (html: string): { id: string; text: string }[] =>
  [...html.matchAll(/<h2>(.*?)<\/h2>/g)].map((m, i) => ({ id: `s-${i}`, text: m[1] ?? "" }));

export const postView = (p: Post, prev: Post | undefined, next: Post | undefined, related: readonly Post[]): string => `
  <nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a><a href="#/tips/${p.track}">${TRACK_LABEL[p.track]}</a></nav>
  <h1>${esc(p.title)}</h1>
  <p class="meta">${levelBadge(TRACK_LABEL[p.track])}<span>Lectura de ${readingTime(p.body)} min</span>${linkBtn(p.slug)}<time datetime="${p.date}">Actualizado el ${longDate(p.date)}</time></p>
  <div class="prose">${withIds(p.body)}</div>
  <p class="post-tags">${p.tags.map((t) => pill(t, `#/tag/${encodeURIComponent(t)}`)).join("")}</p>
  ${related.length ? `<section class="topic"><h2>Más tips</h2>${entries(related)}</section>` : ""}
  <nav class="pager" aria-label="Más tips">
    ${prev ? `<a href="#/tip/${prev.slug}"><small>Anterior</small>${esc(prev.title)}</a>` : "<span></span>"}
    ${next ? `<a class="next" href="#/tip/${next.slug}"><small>Siguiente</small>${esc(next.title)}</a>` : "<span></span>"}
  </nav>`;

export const tocView = (p: Post): string => {
  const hs = headings(p.body);
  if (!hs.length) return "";
  return `<h2 class="side-title">En esta página</h2><ul>${hs
    .map((h) => `<li><a href="#/tip/${p.slug}" data-anchor="${h.id}">${h.text}</a></li>`)
    .join("")}</ul>`;
};

export const notFoundView = (): string =>
  `<h1>Página no encontrada</h1><p class="lead">Esa dirección no existe. <a href="#/">Volver al inicio</a></p>`;
