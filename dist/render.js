import { hydrateDemos } from "./demos.js";
import { highlightAll } from "./highlight.js";
import { aboutView, filterPosts, landingView, notFoundView, postView, presentationView, projectListView, projectsView, tagView, tipsView, tocView, } from "./views.js";
function addCopyButtons(root) {
    root.querySelectorAll("pre").forEach((pre) => {
        const button = document.createElement("button");
        button.className = "copy";
        button.type = "button";
        button.textContent = "Copiar";
        pre.append(button);
    });
}
function show(title, html, route, main, toc, tocHtml = "") {
    document.title = title === "Snipo" ? "Snipo: tips rápidos de desarrollo web" : `${title} · Snipo`;
    document.body.classList.toggle("welcome-page", route.name === "home");
    main.innerHTML = html;
    toc.innerHTML = tocHtml;
    highlightAll(main);
}
export function renderTipsResults(root, posts, query, track) {
    root.innerHTML = tipsView(filterPosts(posts, query), track);
    highlightAll(root);
    addCopyButtons(root);
}
export function renderRoute(route, main, toc, data) {
    switch (route.name) {
        case "home":
            return show("Snipo", presentationView(), route, main, toc);
        case "main":
            show("Snipo", landingView(data.posts, data.projects), route, main, toc);
            return addCopyButtons(main);
        case "tips":
            show(route.track ? `Tips de ${route.track}` : "Tips", `<div id="home-list"></div>`, route, main, toc);
            renderTipsResults(main.querySelector("#home-list"), data.posts, data.query, route.track);
            return;
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
            if (!post)
                return show("No encontrado", notFoundView(), route, main, toc);
            const related = data.posts.filter((item) => item.slug !== post.slug && item.tags.some((tag) => post.tags.includes(tag)));
            const more = related.length ? related : data.posts.filter((item) => item.slug !== post.slug && item.track === post.track);
            show(post.title, postView(post, data.posts[index + 1], data.posts[index - 1], more.slice(0, 2)), route, main, toc, tocView(post));
            hydrateDemos(main);
            return addCopyButtons(main);
        }
        default:
            return show("No encontrado", notFoundView(), route, main, toc);
    }
}
export function renderProjectResults(root, projects, tech) {
    root.innerHTML = projectListView(projects, tech);
}
