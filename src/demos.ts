import { highlight } from "./highlight.js";

type Mount = (el: HTMLElement) => void;
let uid = 0;
const nextId = (): string => `c${++uid}`;

const field = (id: string, label: string, options: readonly string[]): string =>
  `<div class="field"><label for="${id}">${label}</label><select id="${id}">${options.map((o) => `<option>${o}</option>`).join("")}</select></div>`;

/** Simulador de Flexbox: cambia las propiedades y mira el resultado y el CSS. */
const mountFlex: Mount = (el) => {
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
  const stage = el.querySelector<HTMLElement>(".flex-stage")!;
  const code = el.querySelector<HTMLElement>("code")!;
  const val = (key: string): string => el.querySelector<HTMLSelectElement>(`#${id}-${key}`)!.value;

  const update = (): void => {
    const dir = val("dir"), jc = val("jc"), ai = val("ai");
    stage.style.flexDirection = dir;
    stage.style.justifyContent = jc;
    stage.style.alignItems = ai;
    stage.innerHTML = Array.from({ length: count }, (_, i) => {
      const height = dir === "row" && ai !== "stretch" ? ` style="height:${2.5 + (i % 3)}rem"` : "";
      return `<span${height}>${i + 1}</span>`;
    }).join("");
    code.innerHTML = highlight(`.contenedor {\n  display: flex;\n  flex-direction: ${dir};\n  justify-content: ${jc};\n  align-items: ${ai};\n}`, "css");
  };
  el.addEventListener("change", update);
  el.addEventListener("click", (event) => {
    const action = (event.target as HTMLElement).closest<HTMLButtonElement>("button[data-act]")?.dataset.act;
    if (!action) return;
    count = Math.max(1, Math.min(6, count + (action === "add" ? 1 : -1)));
    update();
  });
  update();
};

/** Probador de API: una API REST de práctica que vive en el navegador. */
interface Item { id: number; title: string }
type Reply = { status: number; body?: unknown };
const STATUS: Record<number, string> = {
  200: "OK", 201: "Created", 204: "No Content", 400: "Bad Request", 404: "Not Found", 405: "Method Not Allowed",
};
const SEED: Item[] = [{ id: 1, title: "Aprender TypeScript" }, { id: 2, title: "Diseñar una API" }];

const mountApi: Mount = (el) => {
  const id = nextId();
  let items: Item[] = SEED.map((item) => ({ ...item }));
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
  const input = <T extends HTMLElement>(key: string): T => el.querySelector<T>(`#${id}-${key}`)!;
  const statusEl = el.querySelector<HTMLElement>(".api-status")!;
  const output = el.querySelector<HTMLElement>("code")!;

  const titleFrom = (text: string): string | null => {
    try {
      const value = JSON.parse(text) as { title?: unknown };
      return typeof value.title === "string" && value.title.trim() ? value.title.trim() : null;
    } catch { return null; }
  };
  const bad = (status: number, error: string): Reply => ({ status, body: { error } });

  const handle = (method: string, path: string, text: string): Reply => {
    const match = path.trim().match(/^\/api\/posts(?:\/(\d+))?\/?$/);
    if (!match) return bad(404, "Ruta no encontrada");
    const resourceId = match[1] ? Number(match[1]) : undefined;
    const found = resourceId === undefined ? undefined : items.find((item) => item.id === resourceId);
    switch (method) {
      case "GET":
        if (resourceId === undefined) return { status: 200, body: items };
        return found ? { status: 200, body: found } : bad(404, "El recurso no existe");
      case "POST": {
        if (resourceId !== undefined) return bad(405, "Usa POST sobre /api/posts");
        const title = titleFrom(text);
        if (!title) return bad(400, 'El cuerpo debe ser JSON con un campo "title"');
        const item = { id: counter++, title };
        items.push(item);
        return { status: 201, body: item };
      }
      case "PUT": {
        if (resourceId === undefined) return bad(405, "Indica el id: /api/posts/1");
        if (!found) return bad(404, "El recurso no existe");
        const title = titleFrom(text);
        if (!title) return bad(400, 'El cuerpo debe ser JSON con un campo "title"');
        found.title = title;
        return { status: 200, body: found };
      }
      case "DELETE":
        if (resourceId === undefined) return bad(405, "Indica el id: /api/posts/1");
        if (!found) return bad(404, "El recurso no existe");
        items = items.filter((item) => item.id !== resourceId);
        return { status: 204 };
      default:
        return bad(405, "Método no permitido");
    }
  };

  const syncBody = (): void => {
    input("bw").hidden = !["POST", "PUT"].includes(input<HTMLSelectElement>("m").value);
  };
  const show = (reply: Reply): void => {
    statusEl.textContent = `${reply.status} ${STATUS[reply.status] ?? ""}`;
    statusEl.className = `api-status ${reply.status < 400 ? "ok" : "fail"}`;
    if (reply.body === undefined) output.textContent = "(sin contenido)";
    else output.innerHTML = highlight(JSON.stringify(reply.body, null, 2), "json");
  };

  el.addEventListener("change", syncBody);
  el.querySelector("form")!.addEventListener("submit", (event) => {
    event.preventDefault();
    show(handle(input<HTMLSelectElement>("m").value, input<HTMLInputElement>("p").value, input<HTMLTextAreaElement>("b").value));
  });
  el.addEventListener("click", (event) => {
    if (!(event.target as HTMLElement).closest('button[data-act="reset"]')) return;
    items = SEED.map((item) => ({ ...item }));
    counter = 3;
    statusEl.textContent = "Datos restablecidos";
    statusEl.className = "api-status";
    output.textContent = "";
  });
  syncBody();
};

const registry: Record<string, Mount> = { "flex-playground": mountFlex, "api-tester": mountApi };

/** Monta los demos interactivos declarados en el contenido de un artículo. */
export function hydrateDemos(root: HTMLElement): void {
  root.querySelectorAll<HTMLElement>("[data-component]").forEach((el) => registry[el.dataset.component ?? ""]?.(el));
}
