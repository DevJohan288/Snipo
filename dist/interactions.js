import { debounce } from "./utils.js";
import { renderProjectResults, renderTipsResults } from "./render.js";
function applyTheme(button, theme) {
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.textContent = theme === "dark" ? "Tema claro" : "Tema oscuro";
}
function initialTheme() {
    try {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark")
            return saved;
    }
    catch { /* almacenamiento no disponible */ }
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
export function bindInteractions({ elements, state, posts, projects, profileEmail, onSearch }) {
    const { main, sidebar, toc, progress, search, themeButton, menuButton } = elements;
    applyTheme(themeButton, initialTheme());
    themeButton.addEventListener("click", () => {
        const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(themeButton, next);
        try {
            localStorage.setItem("theme", next);
        }
        catch { /* almacenamiento no disponible */ }
    });
    const setMenu = (open) => {
        sidebar.classList.toggle("open", open);
        menuButton.setAttribute("aria-expanded", String(open));
    };
    menuButton.addEventListener("click", () => setMenu(!sidebar.classList.contains("open")));
    search.addEventListener("input", debounce(() => {
        state.query = search.value;
        onSearch();
        const results = main.querySelector("#home-list");
        if (results)
            renderTipsResults(results, posts, state.query, state.route.name === "tips" ? state.route.track : undefined);
    }, 120));
    document.addEventListener("keydown", (event) => {
        if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName ?? "")) {
            event.preventDefault();
            search.focus();
        }
    });
    main.addEventListener("click", async (event) => {
        const target = event.target;
        const linkButton = target.closest("button[data-copy-link]");
        if (linkButton) {
            const url = `${location.href.split("#")[0]}#/tip/${linkButton.dataset.copyLink}`;
            try {
                await navigator.clipboard.writeText(url);
                linkButton.textContent = "Enlace copiado";
            }
            catch {
                linkButton.textContent = "No se pudo copiar";
            }
            window.setTimeout(() => (linkButton.textContent = "Copiar enlace"), 1800);
            return;
        }
        const codeButton = target.closest("button.copy");
        if (codeButton) {
            try {
                await navigator.clipboard.writeText(codeButton.parentElement?.querySelector("code")?.textContent ?? "");
                codeButton.textContent = "Copiado";
            }
            catch {
                codeButton.textContent = "No se pudo copiar";
            }
            window.setTimeout(() => (codeButton.textContent = "Copiar"), 1800);
            return;
        }
        if (target.closest("[data-random]")) {
            const pick = posts[Math.floor(Math.random() * posts.length)];
            if (pick)
                location.hash = `#/tip/${pick.slug}`;
            return;
        }
        const chip = target.closest("button[data-tech]");
        if (!chip)
            return;
        state.tech = chip.dataset.tech || null;
        main.querySelectorAll("button[data-tech]").forEach((button) => button.setAttribute("aria-pressed", String((button.dataset.tech || null) === state.tech)));
        const projectList = main.querySelector("#projects-list");
        if (projectList)
            renderProjectResults(projectList, projects, state.tech);
    });
    const updateProgress = () => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const ratio = state.route.name === "post" && max > 0 ? Math.min(1, scrollY / max) : 0;
        progress.style.transform = `scaleX(${ratio})`;
    };
    addEventListener("scroll", updateProgress, { passive: true });
    toc.addEventListener("click", (event) => {
        const anchor = event.target.closest("a[data-anchor]");
        if (!anchor)
            return;
        event.preventDefault();
        const target = document.getElementById(anchor.dataset.anchor);
        target?.scrollIntoView({ block: "start" });
        target?.setAttribute("tabindex", "-1");
        target?.focus({ preventScroll: true });
    });
    main.addEventListener("submit", (event) => {
        const form = event.target.closest("#contact-form");
        if (!form)
            return;
        event.preventDefault();
        const data = new FormData(form);
        const name = String(data.get("name")), email = String(data.get("email")), message = String(data.get("message"));
        const url = `mailto:${profileEmail}?subject=${encodeURIComponent(`Mensaje de ${name}`)}&body=${encodeURIComponent(`${message}\n\n${name} (${email})`)}`;
        const status = main.querySelector("#c-status");
        if (status)
            status.textContent = "Abriendo tu programa de correo…";
        location.href = url;
    });
    return { closeMenu: () => setMenu(false), updateProgress };
}
