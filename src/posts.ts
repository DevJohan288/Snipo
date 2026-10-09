export type Track = "frontend" | "backend";

/** Un tip: título en imperativo, una idea y un fragmento de código listo para copiar. */
export interface Post {
  slug: string;
  title: string;
  date: string; // AAAA-MM-DD
  track: Track;
  tags: string[];
  excerpt: string;
  body: string; // HTML generado desde Markdown; el primer <pre> se usa como vista previa
}
