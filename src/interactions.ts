import type { Post } from "./posts.js";
import type { Project } from "./projects.js";
import type { Route } from "./router.js";
import { debounce } from "./utils.js";
import { renderProjectResults, renderTipsResults } from "./render.js";

interface AppState {
  query: string;
  tech: string | null;
  route: Route;
}

interface InteractionElements {
  main: HTMLElement;
  sidebar: HTMLElement;
  toc: HTMLElement;
  progress: HTMLElement;
  search: HTMLInputElement;
  themeButton: HTMLButtonElement;
  menuButton: HTMLButtonElement;
}

interface InteractionOptions {
  elements: InteractionElements;
  state: AppState;
  posts: readonly Post[];
  projects: readonly Project[];
  profileEmail: string;
  onSearch: () => void;
}

export interface InteractionController {
  closeMenu: () => void;
  updateProgress: () => void;
}

type Theme = "light" | "dark";

function applyTheme(button: HTMLButtonElement, theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  button.setAttribute("aria-pressed", String(theme === "dark"));
  button.textContent = theme === "dark" ? "Tema claro" : "Tema oscuro";
}

function initialTheme(): Theme {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch { /* almacenamiento no disponible */ }
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function bindInteractions({ elements, state, posts, projects, profileEmail, onSearch }: InteractionOptions): InteractionController {
  const { main, sidebar, toc, progress, search, themeButton, menuButton } = elements;
  applyTheme(themeButton, initialTheme());
  themeButton.addEventListener("click", () => {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(themeButton, next);
    try { localStorage.setItem("theme", next); } catch { /* almacenamiento no disponible */ }
  });

  const setMenu = (open: boolean): void => {
    sidebar.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
  };
  menuButton.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));

  search.addEventListener("input", debounce(() => {
    state.query = search.value;
    onSearch();
    const results = main.querySelector<HTMLElement>("#home-list");
    if (results) renderTipsResults(results, posts, state.query, state.route.name === "tips" ? state.route.track : undefined);
  }, 120));
  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")) {
      event.preventDefault();
      search.focus();
    }
  });

  main.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    const linkButton = target.closest<HTMLButtonElement>("button[data-copy-link]");
    if (linkButton) {
      const url = `${location.href.split("#")[0]}#/tip/${linkButton.dataset.copyLink}`;
      try {
        await navigator.clipboard.writeText(url);
        linkButton.textContent = "Enlace copiado";
      } catch {
        linkButton.textContent = "No se pudo copiar";
      }
      window.setTimeout(() => (linkButton.textContent = "Copiar enlace"), 1800);
      return;
    }

    const codeButton = target.closest<HTMLButtonElement>("button.copy");
    if (codeButton) {
      try {
        await navigator.clipboard.writeText(codeButton.parentElement?.querySelector("code")?.textContent ?? "");
        codeButton.textContent = "Copiado";
      } catch {
        codeButton.textContent = "No se pudo copiar";
      }
      window.setTimeout(() => (codeButton.textContent = "Copiar"), 1800);
      return;
    }

    if (target.closest("[data-random]")) {
      const pick = posts[Math.floor(Math.random() * posts.length)];
      if (pick) location.hash = `#/tip/${pick.slug}`;
      return;
    }

    const chip = target.closest<HTMLButtonElement>("button[data-tech]");
    if (!chip) return;
    state.tech = chip.dataset.tech || null;
    main.querySelectorAll<HTMLButtonElement>("button[data-tech]").forEach((button) =>
      button.setAttribute("aria-pressed", String((button.dataset.tech || null) === state.tech)));
    const projectList = main.querySelector<HTMLElement>("#projects-list");
    if (projectList) renderProjectResults(projectList, projects, state.tech);
  });

  const updateProgress = (): void => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = state.route.name === "post" && max > 0 ? Math.min(1, scrollY / max) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };
  addEventListener("scroll", updateProgress, { passive: true });

  toc.addEventListener("click", (event) => {
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[data-anchor]");
    if (!anchor) return;
    event.preventDefault();
    const target = document.getElementById(anchor.dataset.anchor!);
    target?.scrollIntoView({ block: "start" });
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  });

  main.addEventListener("submit", (event) => {
    const form = (event.target as HTMLElement).closest<HTMLFormElement>("#contact-form");
    if (!form) return;
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name")), email = String(data.get("email")), message = String(data.get("message"));
    const url = `mailto:${profileEmail}?subject=${encodeURIComponent(`Mensaje de ${name}`)}&body=${encodeURIComponent(`${message}\n\n${name} (${email})`)}`;
    const status = main.querySelector<HTMLElement>("#c-status");
    if (status) status.textContent = "Abriendo tu programa de correo…";
    location.href = url;
  });

  return { closeMenu: () => setMenu(false), updateProgress };
}
