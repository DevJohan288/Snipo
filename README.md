<p align="center"><img src="assets/logo.svg" alt="Snipo" height="64" /></p>

# Snipo

Blog de tips de desarrollo web con TypeScript (solo `tsc`), HTML y CSS propio. Sin bundler ni librerías.

## Uso
    npm install
    npm run build     # genera los tips desde Markdown y compila TypeScript
    npm run start     # servidor local (los módulos ES no funcionan con file://)
    npm run content   # solo regenera src/posts-data.ts desde content/tips/*.md

## Añadir un tip
1. Copia `content/plantilla.md` a `content/tips/mi-tip.md` (el nombre del archivo es la URL).
2. Rellena la cabecera (title, date, track, tags, excerpt) y escribe el contenido.
3. Ejecuta `npm run build`.

Markdown admitido: párrafos, `## títulos`, listas con `-`, `> avisos`, bloques de código con lenguaje
(js, ts, css, sql, json, bash, text), `**negrita**`, `*cursiva*`, enlaces y `::component nombre`
para insertar un componente interactivo (`flex-playground`, `api-tester`).

## Estructura
- `content/tips/`: tus tips en Markdown
- `scripts/build-content.mjs`: convierte Markdown en `src/posts-data.ts` (archivo generado)
- `src/highlight.ts`: resaltado de sintaxis propio
- `src/components.ts`: componentes reutilizables e interactivos
- `src/views.ts`, `src/router.ts`, `src/main.ts`: vistas, rutas y estado
- `src/projects.ts`, `src/site.ts`: tus proyectos y datos personales
- `css/style.css`: estilos con variables CSS, tema claro y oscuro

## Subir a GitHub y publicar
1. Crea un repositorio vacío llamado `snipo` en https://github.com/new (sin README, .gitignore ni licencia).
2. En la carpeta del proyecto:

        git init
        git add .
        git commit -m "Primera versión de Snipo"
        git branch -M main
        git remote add origin https://github.com/TU-USUARIO/snipo.git
        git push -u origin main

3. En GitHub: Settings, Pages, Source: **GitHub Actions**.
4. El flujo `.github/workflows/deploy.yml` compila y publica en cada `git push`.
   Tu blog quedará en `https://TU-USUARIO.github.io/snipo/`.

Antes de publicar, cambia los datos de ejemplo en `src/site.ts` y `src/projects.ts`.

## Marca
`assets/icon.svg` (icono y favicon), `assets/logo.svg` (para fondos claros) y `assets/logo-dark.svg` (para fondos oscuros).
