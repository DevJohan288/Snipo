import { esc } from "./utils.js";
const JS = [
    ["comment", /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
    ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\])*`/y],
    ["number", /\b\d+(?:\.\d+)?\b/y],
    ["keyword", /\b(?:const|let|var|function|return|if|else|await|async|import|from|export|type|interface|new|throw|try|catch|typeof|in|of|for|while|true|false|null|undefined)\b/y],
    ["type", /\b(?:unknown|string|number|boolean|void|any|Promise|Error)\b/y],
    ["fn", /\b[A-Za-z_$][\w$]*(?=\()/y],
];
const CSS = [
    ["comment", /\/\*[\s\S]*?\*\//y],
    ["string", /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'/y],
    ["number", /#[0-9a-fA-F]{3,8}\b|(?<![\w-])-?\d*\.?\d+(?:rem|em|px|vw|vh|fr|ms|s|%)?/y],
    ["keyword", /@[a-z-]+|::?(?=[a-z])[a-z-]+(?:\([^)]*\))?/y],
    ["selector", /\.[A-Za-z_-][\w-]*|#[A-Za-z_-][\w-]*/y],
    ["prop", /[a-z-]+(?=\s*:\s)/y],
    ["fn", /[a-z-]+(?=\()/y],
];
const SQL = [
    ["comment", /--[^\n]*/y],
    ["string", /'(?:''|[^'])*'/y],
    ["number", /\$\d+|\b\d+(?:\.\d+)?\b/y],
    ["keyword", /\b(?:SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|CREATE|INDEX|UNIQUE|TABLE|EXPLAIN|INSERT|INTO|VALUES|UPDATE|SET|DELETE|AND|OR|NOT|NULL|AS|COUNT|LIMIT|OFFSET|DESC|ASC|IN|LIKE)\b/iy],
    ["fn", /\b[A-Za-z_]+(?=\()/y],
];
const JSON_RULES = [
    ["prop", /"(?:\\.|[^"\\\n])*"(?=\s*:)/y],
    ["string", /"(?:\\.|[^"\\\n])*"/y],
    ["number", /(?<![\w])-?\d+(?:\.\d+)?\b/y],
    ["keyword", /\b(?:true|false|null)\b/y],
];
const SHELL = [
    ["comment", /#[^\n]*/y],
    ["string", /"(?:\\.|[^"\\\n])*"|'[^'\n]*'/y],
    ["prop", /^[A-Z_][A-Z0-9_]*(?==)/my],
];
const TEXT = [["number", /(?<![\w])\d{3}(?![\w])/y]];
const LANGS = {
    js: JS, javascript: JS, ts: JS, typescript: JS,
    css: CSS, sql: SQL, json: JSON_RULES,
    bash: SHELL, sh: SHELL, env: SHELL, text: TEXT,
};
/** Devuelve el código escapado y con <span class="tok-..."> en cada elemento reconocido. */
export function highlight(code, lang) {
    const rules = LANGS[lang.toLowerCase()];
    if (!rules)
        return esc(code);
    let out = "";
    let plain = "";
    let i = 0;
    const flush = () => { out += esc(plain); plain = ""; };
    while (i < code.length) {
        let hit = false;
        for (const [cls, re] of rules) {
            re.lastIndex = i;
            const m = re.exec(code);
            if (m && m[0]) {
                flush();
                out += `<span class="tok-${cls}">${esc(m[0])}</span>`;
                i += m[0].length;
                hit = true;
                break;
            }
        }
        if (!hit)
            plain += code[i++];
    }
    flush();
    return out;
}
/** Colorea todos los <code class="language-xxx"> de un contenedor, una sola vez cada uno. */
export function highlightAll(root) {
    root.querySelectorAll('code[class*="language-"]:not([data-hl])').forEach((el) => {
        const lang = /language-(\w+)/.exec(el.className)?.[1] ?? "";
        el.innerHTML = highlight(el.textContent ?? "", lang);
        el.dataset.hl = "1";
    });
}
