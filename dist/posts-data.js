export const posts = [
    {
        "slug": "sql-parametrizado",
        "title": "Nunca concatenes SQL: usa consultas parametrizadas",
        "date": "2026-10-07",
        "track": "backend",
        "tags": [
            "SQL",
            "Seguridad"
        ],
        "excerpt": "Es la forma más simple de evitar la inyección SQL.",
        "body": "<pre><code class=\"language-js\">// Mal: vulnerable a inyección SQL\ndb.query(&quot;SELECT * FROM users WHERE email = '&quot; + email + &quot;'&quot;);\n\n// Bien: el valor viaja aparte\ndb.query(&quot;SELECT * FROM users WHERE email = $1&quot;, [email]);</code></pre>\n<p>Con parámetros, el motor trata el valor siempre como <strong>dato</strong> y nunca como parte de la consulta.</p>"
    },
    {
        "slug": "flexbox-o-grid",
        "title": "Flexbox para una dimensión, Grid para dos",
        "date": "2026-10-06",
        "track": "frontend",
        "tags": [
            "CSS",
            "Layout"
        ],
        "excerpt": "Una regla de una línea para decidir cuál usar.",
        "body": "<pre><code class=\"language-css\">.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}</code></pre>\n<aside class=\"callout\"><strong>Regla rápida:</strong> si ordenas elementos en una fila o columna, usa Flexbox. Si necesitas filas y columnas a la vez, usa Grid.</aside>\n<h2>Pruébalo tú</h2>\n<p>Cambia las propiedades y mira cómo se acomodan los elementos.</p>\n<div data-component=\"flex-playground\"></div>"
    },
    {
        "slug": "indices-sql",
        "title": "Indexa las columnas de WHERE y JOIN",
        "date": "2026-10-04",
        "track": "backend",
        "tags": [
            "SQL",
            "Rendimiento"
        ],
        "excerpt": "Sin índice, la base de datos recorre la tabla completa.",
        "body": "<pre><code class=\"language-sql\">CREATE INDEX idx_posts_user_id ON posts (user_id);\n\nEXPLAIN SELECT * FROM posts WHERE user_id = 7;</code></pre>\n<p>Ejecuta <code>EXPLAIN</code> antes y después para comprobar que la consulta usa el índice.</p>"
    },
    {
        "slug": "clamp-tipografia",
        "title": "Tipografía fluida con clamp() y sin media queries",
        "date": "2026-10-03",
        "track": "frontend",
        "tags": [
            "CSS",
            "Diseño"
        ],
        "excerpt": "Un tamaño que crece con la pantalla, con mínimo y máximo.",
        "body": "<pre><code class=\"language-css\">h1 {\n  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);\n}</code></pre>\n<p>Los tres valores son el mínimo, el preferido y el máximo. El título nunca será más pequeño ni más grande que esos límites. Más detalles en <a href=\"https://developer.mozilla.org/es/docs/Web/CSS/clamp\" target=\"_blank\" rel=\"noopener noreferrer\">MDN</a>.</p>"
    },
    {
        "slug": "focus-visible",
        "title": "Foco visible solo para teclado con :focus-visible",
        "date": "2026-09-29",
        "track": "frontend",
        "tags": [
            "CSS",
            "Accesibilidad"
        ],
        "excerpt": "Mantén el contorno de foco sin molestar a quien usa el ratón.",
        "body": "<pre><code class=\"language-css\">:focus-visible {\n  outline: 3px solid #0b63ce;\n  outline-offset: 2px;\n}</code></pre>\n<p>Nunca quites el <code>outline</code> sin ofrecer una alternativa: quien navega con teclado deja de saber dónde está.</p>"
    },
    {
        "slug": "jwt-cookie",
        "title": "Guarda el JWT en una cookie HttpOnly",
        "date": "2026-09-27",
        "track": "backend",
        "tags": [
            "Seguridad",
            "Node.js"
        ],
        "excerpt": "En localStorage, cualquier script inyectado puede leerlo.",
        "body": "<pre><code class=\"language-js\">res.cookie(&quot;token&quot;, jwt, {\n  httpOnly: true,\n  secure: true,\n  sameSite: &quot;strict&quot;,\n  maxAge: 15 * 60 * 1000,\n});</code></pre>\n<p>Dale una caducidad corta. Un JWT está <em>firmado</em>, no cifrado: no pongas datos sensibles dentro.</p>"
    },
    {
        "slug": "fetch-ok",
        "title": "fetch no falla con un 404: revisa response.ok",
        "date": "2026-09-25",
        "track": "frontend",
        "tags": [
            "JavaScript",
            "APIs"
        ],
        "excerpt": "Solo los fallos de red rechazan la promesa.",
        "body": "<pre><code class=\"language-js\">const res = await fetch(&quot;/api/users/1&quot;);\nif (!res.ok) throw new Error(&quot;HTTP &quot; + res.status);\nconst user = await res.json();</code></pre>\n<p>Un 404 o un 500 se resuelven como respuestas normales. Muestra siempre un estado de carga y un mensaje de error útil.</p>"
    },
    {
        "slug": "hash-contrasenas",
        "title": "Contraseñas con bcrypt o argon2, nunca en texto plano",
        "date": "2026-09-22",
        "track": "backend",
        "tags": [
            "Seguridad",
            "Node.js"
        ],
        "excerpt": "Un hash lento protege las cuentas aunque se filtre la base de datos.",
        "body": "<pre><code class=\"language-js\">import bcrypt from &quot;bcrypt&quot;;\n\nconst hash = await bcrypt.hash(password, 12);\nconst ok = await bcrypt.compare(password, hash);</code></pre>\n<p>No uses SHA-256 solo: es demasiado rápido. Bcrypt y argon2 son lentos a propósito.</p>"
    },
    {
        "slug": "unknown-en-vez-de-any",
        "title": "Usa unknown en lugar de any",
        "date": "2026-09-20",
        "track": "frontend",
        "tags": [
            "TypeScript"
        ],
        "excerpt": "Te obliga a comprobar el tipo antes de usar el valor.",
        "body": "<pre><code class=\"language-ts\">const data: unknown = JSON.parse(text);\n\nif (typeof data === &quot;object&quot; &amp;&amp; data !== null &amp;&amp; &quot;name&quot; in data) {\n  console.log(data.name);\n}</code></pre>\n<p><code>any</code> apaga las comprobaciones del compilador. <code>unknown</code> las mantiene encendidas.</p>"
    },
    {
        "slug": "env-gitignore",
        "title": "No subas el archivo .env a Git",
        "date": "2026-09-17",
        "track": "backend",
        "tags": [
            "Node.js",
            "Seguridad"
        ],
        "excerpt": "Las claves en un repositorio público se roban en minutos.",
        "body": "<pre><code class=\"language-bash\"># .gitignore\n.env\n\n# Sube esto en su lugar, sin valores reales\n# .env.example\nDATABASE_URL=\nJWT_SECRET=</code></pre>\n<p>Si ya subiste una clave, borrarla del historial no basta: <strong>cámbiala</strong> por una nueva.</p>"
    },
    {
        "slug": "optional-chaining",
        "title": "Datos que pueden faltar: usa ?. y ??",
        "date": "2026-09-15",
        "track": "frontend",
        "tags": [
            "JavaScript"
        ],
        "excerpt": "Evita errores con null y define valores por defecto.",
        "body": "<pre><code class=\"language-js\">const city = user?.address?.city ?? &quot;Sin ciudad&quot;;</code></pre>\n<p><code>?.</code> corta la cadena si algo es <code>null</code> o <code>undefined</code>. <code>??</code> usa el valor por defecto solo en esos casos, no con <code>0</code> ni con una cadena vacía.</p>"
    },
    {
        "slug": "codigos-http",
        "title": "Usa el código HTTP correcto",
        "date": "2026-09-10",
        "track": "backend",
        "tags": [
            "REST",
            "HTTP"
        ],
        "excerpt": "Seis códigos cubren casi todas las respuestas de una API.",
        "body": "<pre><code class=\"language-text\">201 Created       POST que crea un recurso\n204 No Content    DELETE correcto\n400 Bad Request   datos inválidos\n401 Unauthorized  sin iniciar sesión\n403 Forbidden     sin permiso\n404 Not Found     el recurso no existe</code></pre>\n<p>Responde siempre con JSON y un mensaje de error consistente.</p>\n<h2>Pruébalo tú</h2>\n<p>Esta API de práctica vive en tu navegador. Crea, lee, cambia y borra, y observa los códigos de estado.</p>\n<div data-component=\"api-tester\"></div>"
    }
];
