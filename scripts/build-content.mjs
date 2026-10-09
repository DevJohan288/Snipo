// Convierte content/tips/*.md en src/posts-data.ts. Sin dependencias: node scripts/build-content.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "content", "tips");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Texto en línea: `código`, **negrita**, *cursiva* y [enlaces](https://...) */
function inline(text) {
  return text
    .split(/(`[^`]+`)/)
    .map((part) => {
      if (/^`[^`]+`$/.test(part)) return `<code>${esc(part.slice(1, -1))}</code>`;
      return esc(part)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/(^|[\s(])\*([^*]+)\*(?=[\s).,;:]|$)/g, "$1<em>$2</em>")
        .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    })
    .join("");
}

/** Bloques: párrafos, ## títulos, listas, > avisos, ```código y ::component nombre */
function markdown(src) {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let para = [];
  let list = [];
  const flush = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    if (list.length) out.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join("")}</ul>`);
    para = [];
    list = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    if ((m = line.match(/^```(\w*)\s*$/))) {
      flush();
      const code = [];
      while (++i < lines.length && !/^```\s*$/.test(lines[i])) code.push(lines[i]);
      out.push(`<pre><code${m[1] ? ` class="language-${m[1]}"` : ""}>${esc(code.join("\n"))}</code></pre>`);
    } else if ((m = line.match(/^##\s+(.+)$/))) {
      flush();
      out.push(`<h2>${inline(m[1])}</h2>`);
    } else if ((m = line.match(/^::component\s+([\w-]+)\s*$/))) {
      flush();
      out.push(`<div data-component="${m[1]}"></div>`);
    } else if (/^>\s?/.test(line)) {
      flush();
      const quote = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) quote.push(lines[i++].replace(/^>\s?/, ""));
      i--;
      out.push(`<aside class="callout">${inline(quote.join(" "))}</aside>`);
    } else if ((m = line.match(/^[-*]\s+(.+)$/))) {
      if (para.length) flush();
      list.push(m[1]);
    } else if (line.trim() === "") {
      flush();
    } else {
      if (list.length) flush();
      para.push(line.trim());
    }
  }
  flush();
  return out.join("\n");
}

function parse(file) {
  const raw = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const name = basename(file);
  if (!m) throw new Error(`${name}: falta el bloque inicial entre líneas ---`);
  const meta = {};
  for (const l of m[1].split("\n")) {
    const k = l.match(/^(\w+):\s*(.*)$/);
    if (k) meta[k[1]] = k[2].trim();
  }
  for (const key of ["title", "date", "track", "tags", "excerpt"])
    if (!meta[key]) throw new Error(`${name}: falta "${key}" en la cabecera`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date)) throw new Error(`${name}: la fecha debe ser AAAA-MM-DD`);
  if (!["frontend", "backend"].includes(meta.track)) throw new Error(`${name}: track debe ser frontend o backend`);
  return {
    slug: basename(file, ".md"),
    title: meta.title,
    date: meta.date,
    track: meta.track,
    tags: meta.tags.split(",").map((t) => t.trim()).filter(Boolean),
    excerpt: meta.excerpt,
    body: markdown(m[2].trim()),
  };
}

const files = readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));
const posts = files.map((f) => parse(join(dir, f))).sort((a, b) => b.date.localeCompare(a.date));
const seen = new Set();
for (const p of posts) {
  if (seen.has(p.slug)) throw new Error(`Slug repetido: ${p.slug}`);
  seen.add(p.slug);
}

writeFileSync(
  join(root, "src", "posts-data.ts"),
  `// Archivo generado por scripts/build-content.mjs. No lo edites: edita content/tips/*.md\nimport type { Post } from "./posts.js";\n\nexport const posts: Post[] = ${JSON.stringify(posts, null, 2)};\n`,
);
console.log(`${posts.length} tips generados en src/posts-data.ts`);
