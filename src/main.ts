import { posts } from "./posts-data.js";
import { PROFILE } from "./site.js";
import { projects } from "./projects.js";
import { bindInteractions } from "./interactions.js";
import { parseRoute, type Route } from "./router.js";
import { renderRoute } from "./render.js";
import { sidebarView } from "./views.js";

const $ = <T extends HTMLElement>(selector: string): T => {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`No se encontró el elemento requerido: ${selector}`);
  return element;
};

const main = $("#main");
const sidebar = $("#sidebar");
const toc = $("#toc");
const progress = $("#progress");
const search = $<HTMLInputElement>("#q");
const themeButton = $<HTMLButtonElement>("#theme");
const menuButton = $<HTMLButtonElement>("#menu");
const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
const state: { query: string; tech: string | null; route: Route } = {
  query: "",
  tech: null,
  route: { name: "home" },
};

function renderSidebar(): void {
  sidebar.innerHTML = sidebarView(sortedPosts, state.query, state.route);
}

const interactions = bindInteractions({
  elements: { main, sidebar, toc, progress, search, themeButton, menuButton },
  state,
  posts: sortedPosts,
  projects,
  profileEmail: PROFILE.email,
  onSearch: renderSidebar,
});

let firstRoute = true;
function onRoute(): void {
  state.route = parseRoute(location.hash);
  renderRoute(state.route, main, toc, {
    posts: sortedPosts,
    projects,
    query: state.query,
    tech: state.tech,
  });
  renderSidebar();
  interactions.closeMenu();
  window.scrollTo(0, 0);
  interactions.updateProgress();
  if (!firstRoute) main.focus({ preventScroll: true });
  firstRoute = false;
}

window.addEventListener("hashchange", onRoute);
onRoute();
