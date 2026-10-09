export const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const parse = (iso: string): Date => new Date(`${iso}T00:00:00`);

export const longDate = (iso: string): string =>
  parse(iso).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });

export const shortDate = (iso: string): { day: string; month: string; year: string } => {
  const d = parse(iso);
  return {
    day: String(d.getDate()),
    month: d.toLocaleDateString("es", { month: "short" }).replace(".", ""),
    year: String(d.getFullYear()),
  };
};

/** Minutos de lectura estimados (200 palabras por minuto). */
export const readingTime = (html: string): number => {
  const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

export const debounce = <A extends unknown[]>(fn: (...args: A) => void, ms: number) => {
  let id: number | undefined;
  return (...args: A): void => {
    window.clearTimeout(id);
    id = window.setTimeout(() => fn(...args), ms);
  };
};
