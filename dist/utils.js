export const esc = (s) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const parse = (iso) => new Date(`${iso}T00:00:00`);
export const longDate = (iso) => parse(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
export const shortDate = (iso) => {
    const d = parse(iso);
    return {
        day: String(d.getDate()),
        month: d.toLocaleDateString("es", { month: "short" }).replace(".", ""),
        year: String(d.getFullYear()),
    };
};
/** Minutos de lectura estimados (200 palabras por minuto). */
export const readingTime = (html) => {
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
};
export const debounce = (fn, ms) => {
    let id;
    return (...args) => {
        window.clearTimeout(id);
        id = window.setTimeout(() => fn(...args), ms);
    };
};
