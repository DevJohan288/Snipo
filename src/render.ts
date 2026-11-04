import { hydrateDemos } from "./demos.js";
import { highlightAll } from "./highlight.js";
import type { Post } from "./posts.js";
import type { Project } from "./projects.js";
import type { Route } from "./router.js";
import {
  aboutView, categoryView, filterPosts, landingView, notFoundView, postView, presentationView,
  projectListView, projectsView, tagView, tipsView, tocView,
} from "./views.js";

interface RenderData {
  posts: readonly Post[];
  projects: readonly Project[];
  query: string;
  tech: string | null;
}

function addCopyButtons(root: HTMLElement): void {
  root.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button");
    button.className = "copy";
    button.type = "button";
    button.textContent = "Copiar";
    pre.append(button);
  });
}

function show(title: string, html: string, route: Route, main: HTMLElement, toc: HTMLElement, tocHtml = ""): void {
  document.title = title === "Snipo" ? "Snipo: tips rápidos de desarrollo web" : `${title} · Snipo`;
  document.body.classList.toggle("welcome-page", route.name === "home");
  main.innerHTML = html;
  toc.innerHTML = tocHtml;
  highlightAll(main);
}

export function renderTipsResults(root: HTMLElement, posts: readonly Post[], query: string, track?: "frontend" | "backend"): void {
  root.innerHTML = tipsView(filterPosts(posts, query), track);
  highlightAll(root);
  addCopyButtons(root);
}

export function renderRoute(route: Route, main: HTMLElement, toc: HTMLElement, data: RenderData): void {
  switch (route.name) {
    case "home":
      return show("Snipo", presentationView(), route, main, toc);
    case "main":
      show("Snipo", landingView(data.posts, data.projects), route, main, toc);
      return addCopyButtons(main);
    case "tips":
      show(route.track ? `Temas de ${route.track}` : "Explorar temas",
        `<div id="home-list"></div>`, route, main, toc);
      renderTipsResults(main.querySelector<HTMLElement>("#home-list")!, data.posts, data.query, route.track);
      return;
    case "category":
      return show(route.topic, categoryView(data.posts, route.topic), route, main, toc);
    case "tag":
      show(`Etiqueta: ${route.tag}`, tagView(data.posts, route.tag), route, main, toc);
      return addCopyButtons(main);
    case "projects":
      return show("Proyectos", projectsView(data.projects, data.tech), route, main, toc);
    case "about":
      return show("Sobre mí", aboutView(), route, main, toc);
    case "post": {
      const index = data.posts.findIndex((post) => post.slug === route.slug);
      const post = data.posts[index];
      if (!post) return show("No encontrado", notFoundView(), route, main, toc);
      const related = data.posts.filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)));
      const more = related.length ? related : data.posts.filter((item) => item.slug !== post.slug && item.track === post.track);
      show(post.title, postView(post, data.posts[index + 1], data.posts[index - 1], more.slice(0, 2)),
        route, main, toc, tocView(post));
      hydrateDemos(main);
      return addCopyButtons(main);
    }
    default:
      return show("No encontrado", notFoundView(), route, main, toc);
  }
}

export function renderProjectResults(root: HTMLElement, projects: readonly Project[], tech: string | null): void {
  root.innerHTML = projectListView(projects, tech);
}
