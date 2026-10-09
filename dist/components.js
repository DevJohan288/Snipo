import { highlight } from "./highlight.js";
import { esc } from "./utils.js";
export const TRACK_LABEL = { frontend: "Frontend", backend: "Backend" };
/* ========== Componentes de presentación: devuelven HTML ========== */
export const pill = (label, href, current = false) => href
    ? `<a class="pill" href="${href}"${current ? ' aria-current="page"' : ""}>${esc(label)}</a>`
    : `<span class="pill">${esc(label)}</span>`;
export const levelBadge = (text) => `<span class="level">${esc(text)}</span>`;
export const projectCard = (p) => {
    const link = (href, label) => href ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
    return `
  <article class="project ${p.track}">
    <p class="project-track">${TRACK_LABEL[p.track]}</p>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.summary)}</p>
    <p class="skills">${p.stack.map((s) => pill(s)).join("")}</p>
    <p class="links">${link(p.demo, "Ver demo")}${link(p.repo, "Ver código")}</p>
  </article>`;
};
let uid = 0;
const nextId = () => `c${++uid}`;
const field = (id, label, options) => `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map((o) => `<option>${o}</option>`).join("")}</select></div>`;
/** Simulador de Flexbox: cambia las propiedades y mira el resultado y el CSS. */
const mountFlex = (el) => {
    const id = nextId();
    let count = 3;
    el.classList.add("demo");
    el.innerHTML = `
    <div class="demo-controls">
      ${field(`${id}-dir`, "flex-direction", ["row", "column"])}
      ${field(`${id}-jc`, "justify-content", ["flex-start", "center", "flex-end", "space-between", "space-around"])}
      ${field(`${id}-ai`, "align-items", ["flex-start", "center", "flex-end", "stretch"])}
    </div>
    <div class="flex-stage" role="img" aria-label="Vista previa de Flexbox"></div>
    <pre><code></code></pre>
    <div class="demo-actions">
      <button class="btn" type="button" data-act="add">Añadir elemento</button>
      <button class="btn" type="button" data-act="remove">Quitar elemento</button>
    </div>`;
    const stage = el.querySelector(".flex-stage");
    const code = el.querySelector("code");
    const val = (k) => el.querySelector(`#${id}-${k}`).value;
    const update = () => {
        const dir = val("dir"), jc = val("jc"), ai = val("ai");
        stage.style.flexDirection = dir;
        stage.style.justifyContent = jc;
        stage.style.alignItems = ai;
        stage.innerHTML = Array.from({ length: count }, (_, i) => {
            const h = dir === "row" && ai !== "stretch" ? ` style="height:${2.5 + (i % 3)}rem"` : "";
            return `<span${h}>${i + 1}</span>`;
        }).join("");
        code.innerHTML = highlight(`.contenedor {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${jc};\n  align-items: ${ai};\n}`, "css");
    };
    el.addEventListener("change", update);
    el.addEventListener("click", (e) => {
        const act = e.target.closest("button[data-act]")?.dataset.act;
        if (!act)
            return;
        count = Math.max(1, Math.min(6, count + (act === "add" ? 1 : -1)));
        update();
    });
    update();
};
const STATUS = {
    200: "OK", 201: "Created", 204: "No Content", 400: "Bad Request", 404: "Not Found", 405: "Method Not Allowed",
};
const SEED = [{ id: 1, title: "Aprender TypeScript" }, { id: 2, title: "Diseñar una API" }];
const mountApi = (el) => {
    const id = nextId();
    let items = SEED.map((i) => ({ ...i }));
    let counter = 3;
    el.classList.add("demo");
    el.innerHTML = `
    <form class="api-form">
      ${field(`${id}-m`, "Método", ["GET", "POST", "PUT", "DELETE"])}
      <div class="field grow"><label for="${id}-p">Ruta</label><input id="${id}-p" value="/api/posts" spellcheck="false" autocomplete="off" /></div>
      <div class="field full" id="${id}-bw" hidden><label for="${id}-b">Cuerpo (JSON)</label><textarea id="${id}-b" rows="2" spellcheck="false">{"title": "Mi tip"}</textarea></div>
      <div class="demo-actions full">
        <button class="btn primary" type="submit">Enviar petición</button>
        <button class="btn" type="button" data-act="reset">Restablecer datos</button>
      </div>
    </form>
    <p class="api-status" role="status"></p>
    <pre><code></code></pre>`;
    const $in = (k) => el.querySelector(`#${id}-${k}`);
    const statusEl = el.querySelector(".api-status");
    const out = el.querySelector("code");
    const titleFrom = (text) => {
        try {
            const v = JSON.parse(text);
            return typeof v.title === "string" && v.title.trim() ? v.title.trim() : null;
        }
        catch {
            return null;
        }
    };
    const bad = (status, error) => ({ status, body: { error } });
    const handle = (method, path, text) => {
        const m = path.trim().match(/^\/api\/posts(?:\/(\d+))?\/?$/);
        if (!m)
            return bad(404, "Ruta no encontrada");
        const rid = m[1] ? Number(m[1]) : undefined;
        const found = rid === undefined ? undefined : items.find((i) => i.id === rid);
        switch (method) {
            case "GET":
                if (rid === undefined)
                    return { status: 200, body: items };
                return found ? { status: 200, body: found } : bad(404, "El recurso no existe");
            case "POST": {
                if (rid !== undefined)
                    return bad(405, "Usa POST sobre /api/posts");
                const title = titleFrom(text);
                if (!title)
                    return bad(400, 'El cuerpo debe ser JSON con un campo "title"');
                const item = { id: counter++, title };
                items.push(item);
                return { status: 201, body: item };
            }
            case "PUT": {
                if (rid === undefined)
                    return bad(405, "Indica el id: /api/posts/1");
                if (!found)
                    return bad(404, "El recurso no existe");
                const title = titleFrom(text);
                if (!title)
                    return bad(400, 'El cuerpo debe ser JSON con un campo "title"');
                found.title = title;
                return { status: 200, body: found };
            }
            case "DELETE":
                if (rid === undefined)
                    return bad(405, "Indica el id: /api/posts/1");
                if (!found)
                    return bad(404, "El recurso no existe");
                items = items.filter((i) => i.id !== rid);
                return { status: 204 };
            default:
                return bad(405, "Método no permitido");
        }
    };
    const syncBody = () => { $in("bw").hidden = !["POST", "PUT"].includes($in("m").value); };
    const show = (r) => {
        statusEl.textContent = `${r.status} ${STATUS[r.status] ?? ""}`;
        statusEl.className = `api-status ${r.status < 400 ? "ok" : "fail"}`;
        if (r.body === undefined)
            out.textContent = "(sin contenido)";
        else
            out.innerHTML = highlight(JSON.stringify(r.body, null, 2), "json");
    };
    el.addEventListener("change", syncBody);
    el.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        show(handle($in("m").value, $in("p").value, $in("b").value));
    });
    el.addEventListener("click", (e) => {
        if (!e.target.closest('button[data-act="reset"]'))
            return;
        items = SEED.map((i) => ({ ...i }));
        counter = 3;
        statusEl.textContent = "Datos restablecidos";
        statusEl.className = "api-status";
        out.textContent = "";
    });
    syncBody();
};
const registry = { "flex-playground": mountFlex, "api-tester": mountApi };
/** Monta todos los componentes interactivos que haya dentro de `root`. */
export function hydrate(root) {
    root.querySelectorAll("[data-component]").forEach((el) => registry[el.dataset.component ?? ""]?.(el));
}
