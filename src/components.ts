import type { Track } from "./posts.js";
import type { Project } from "./projects.js";
import { esc } from "./utils.js";

export const TRACK_LABEL: Record<Track, string> = { frontend: "Frontend", backend: "Backend" };

/* ========== Componentes de presentación: devuelven HTML ========== */

export const pill = (label: string, href?: string, current = false): string =>
  href
    ? `<a class="pill" href="${href}"${current ? ' aria-current="page"' : ""}>${esc(label)}</a>`
    : `<span class="pill">${esc(label)}</span>`;

export const levelBadge = (track: Track): string =>
  `<span class="level ${track}">${TRACK_LABEL[track]}</span>`;

export const projectCard = (p: Project): string => {
  const link = (href: string | undefined, label: string): string =>
    href ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
  return `
  <article class="project ${p.track}">
    <p class="project-track">${TRACK_LABEL[p.track]}</p>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.summary)}</p>
    <p class="skills">${p.stack.map((s) => pill(s)).join("")}</p>
    <p class="links">${link(p.demo, "Ver demo")}${link(p.repo, "Ver código")}</p>
  </article>`;
};
