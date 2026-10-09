const safeDecode = (s) => {
    try {
        return decodeURIComponent(s);
    }
    catch {
        return s;
    }
};
export function parseRoute(hash) {
    const [, a = "", b = ""] = (hash.replace(/^#/, "") || "/").split("/");
    switch (a) {
        case "": return { name: "home" };
        case "tips": return b === "frontend" || b === "backend" ? { name: "tips", track: b } : { name: "tips" };
        case "tags":
        case "archive": return { name: "tips" };
        case "tip": return b ? { name: "post", slug: b } : { name: "missing" };
        case "tag": return b ? { name: "tag", tag: safeDecode(b) } : { name: "tips" };
        case "projects": return { name: "projects" };
        case "about":
        case "contact": return { name: "about" };
        default: return { name: "missing" };
    }
}
/** Sección del menú que debe quedar marcada para cada ruta. */
export const sectionOf = (r) => {
    switch (r.name) {
        case "home": return "#/";
        case "tips":
        case "post":
        case "tag": return "#/tips";
        case "projects": return "#/projects";
        case "about": return "#/about";
        default: return "";
    }
};
