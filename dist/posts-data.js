export const posts = [
    {
        "slug": "atributos-formularios-html",
        "title": "Mejora formularios con atributos HTML",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "HTML",
        "navTitle": "Atributos de formularios",
        "tags": [
            "HTML",
            "Formularios",
            "Accesibilidad"
        ],
        "excerpt": "Usa atributos nativos para agilizar la entrada y selección de datos en formularios.",
        "body": "<p>HTML incluye atributos que mejoran la experiencia de los formularios sin JavaScript. Estos ejemplos cubren foco, sugerencias de entrada, validación y selección de archivos.</p>\n<h2>Foco y sugerencias de entrada</h2>\n<p><code>autofocus</code> coloca el foco inicial en un campo al cargar la página. Úsalo con moderación: puede desplazar la página o abrir el teclado en dispositivos móviles. No marques varios campos con este atributo.</p>\n<p><code>autocomplete</code> permite que el navegador sugiera datos guardados. Usa un valor adecuado al campo, como <code>name</code>, <code>email</code> o <code>username</code>, en lugar de activarlo sin especificar el tipo de dato.</p>\n<p><code>inputmode</code> sugiere al dispositivo qué teclado mostrar; no cambia el tipo ni valida el valor. Por ejemplo, <code>inputmode=&quot;numeric&quot;</code> es útil para un código compuesto por dígitos, mientras que <code>type=&quot;tel&quot;</code> puede mostrar un teclado telefónico.</p>\n<pre><code class=\"language-html\">&lt;label for=&quot;username&quot;&gt;Nombre de usuario&lt;/label&gt;\n&lt;input id=&quot;username&quot; name=&quot;username&quot; autocomplete=&quot;username&quot; autofocus /&gt;\n\n&lt;label for=&quot;code&quot;&gt;Código&lt;/label&gt;\n&lt;input id=&quot;code&quot; name=&quot;code&quot; inputmode=&quot;numeric&quot; /&gt;</code></pre>\n<h2>Validación de valores</h2>\n<p><code>pattern</code> valida que el valor de ciertos campos de texto coincida con una expresión regular cuando se envía el formulario. El patrón debe coincidir con el valor completo. Acompáñalo con una etiqueta y una instrucción visible: <code>title</code> puede aportar una sugerencia, pero no debe ser la única explicación del formato requerido.</p>\n<p><code>step</code> define los incrementos válidos de campos numéricos o de fecha. En este ejemplo, con <code>min=&quot;0&quot;</code> y <code>step=&quot;5&quot;</code>, se aceptan cantidades como 0, 5 y 10; <code>max</code> establece el límite superior.</p>\n<pre><code class=\"language-html\">&lt;label for=&quot;handle&quot;&gt;Usuario (5 a 10 letras)&lt;/label&gt;\n&lt;input\n  id=&quot;handle&quot;\n  name=&quot;handle&quot;\n  pattern=&quot;[A-Za-z]{5,10}&quot;\n  title=&quot;Escribe entre 5 y 10 letras&quot;\n  required\n/&gt;\n\n&lt;label for=&quot;quantity&quot;&gt;Cantidad&lt;/label&gt;\n&lt;input id=&quot;quantity&quot; name=&quot;quantity&quot; type=&quot;number&quot; min=&quot;0&quot; max=&quot;100&quot; step=&quot;5&quot; /&gt;</code></pre>\n<p>La validación del navegador mejora la experiencia, pero el servidor también debe validar los datos: los atributos HTML no sustituyen la validación del lado del servidor.</p>\n<h2>Selección de archivos</h2>\n<p><code>accept</code> sugiere qué tipos de archivo mostrar en el selector, pero no valida ni protege los archivos recibidos. Comprueba el tipo y el contenido también en el servidor.</p>\n<p><code>multiple</code> permite seleccionar más de un archivo. <code>capture</code> puede solicitar al dispositivo una fuente de captura, como la cámara; su comportamiento depende del navegador y del dispositivo, y no garantiza que se abra directamente.</p>\n<pre><code class=\"language-html\">&lt;label for=&quot;photos&quot;&gt;Fotos&lt;/label&gt;\n&lt;input\n  id=&quot;photos&quot;\n  name=&quot;photos&quot;\n  type=&quot;file&quot;\n  accept=&quot;image/*&quot;\n  capture=&quot;environment&quot;\n  multiple\n/&gt;</code></pre>\n<p>Usa una etiqueta asociada a cada control y proporciona instrucciones claras sobre formatos, límites y cantidad de archivos permitidos.</p>"
    },
    {
        "slug": "box-vs-drop-shadow",
        "title": "Elige entre box-shadow y drop-shadow en CSS",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "CSS",
        "navTitle": "Sombras CSS",
        "tags": [
            "CSS",
            "Diseño"
        ],
        "excerpt": "Usa box-shadow para la caja y drop-shadow para seguir la silueta transparente.",
        "body": "<p><code>box-shadow</code> dibuja la sombra de la caja del elemento. Es ideal para tarjetas, botones y paneles; respeta <code>border-radius</code>, pero no la forma de una imagen con transparencia.</p>\n<pre><code class=\"language-css\">.card {\n  box-shadow: 10px 7px 20px orange;\n}\n\n.sticker {\n  filter: drop-shadow(10px 7px 10px orange);\n}</code></pre>\n<p><code>drop-shadow()</code> sigue la silueta opaca de la imagen, por eso funciona mejor en PNG o SVG con fondo transparente. En cambio, <code>box-shadow</code> puede proyectar una sombra rectangular alrededor de toda la caja de la imagen.</p>"
    },
    {
        "slug": "grid-alineacion",
        "title": "Alinea elementos y tracks con CSS Grid",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "Layout",
        "navTitle": "Alineación en Grid",
        "tags": [
            "CSS",
            "Layout"
        ],
        "excerpt": "Distingue cuándo alinear los elementos, cada celda o la cuadrícula completa.",
        "body": "<p>En Grid, <code>justify-*</code> controla el eje horizontal y <code>align-*</code> el vertical en los modos de escritura habituales. Las propiedades con <code>-items</code> se aplican a todos los elementos; las que terminan en <code>-self</code> ajustan un elemento individual.</p>\n<pre><code class=\"language-css\">.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 5rem);\n  grid-template-rows: repeat(2, 4rem);\n  gap: 0.5rem;\n  justify-items: center;\n  align-items: center;\n}\n\n.grid &gt; :first-child {\n  justify-self: start;\n  align-self: end;\n}</code></pre>\n<ul><li><code>justify-items</code> y <code>align-items</code> alinean los elementos dentro de sus celdas. Aceptan <code>start</code>, <code>center</code>, <code>end</code> y <code>stretch</code>.</li><li><code>justify-self</code> y <code>align-self</code> hacen lo mismo para un elemento específico.</li><li><code>justify-content</code> posiciona o distribuye la cuadrícula completa dentro del contenedor cuando sobra espacio. Además de <code>start</code>, <code>center</code> y <code>end</code>, admite valores como <code>space-between</code>, <code>space-around</code> y <code>space-evenly</code>.</li></ul>\n<p>Usa <code>items</code> para dar una alineación común y <code>self</code> cuando un elemento necesite una excepción.</p>"
    },
    {
        "slug": "html-estructura-basica",
        "title": "Estructura una página con HTML semántico",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "HTML",
        "navTitle": "Estructura HTML",
        "tags": [
            "HTML",
            "Accesibilidad"
        ],
        "excerpt": "Referencia breve de estructura semántica, texto, listas, tablas y multimedia en HTML.",
        "body": "<pre><code class=\"language-html\">&lt;!doctype html&gt;\n&lt;html lang=&quot;es&quot;&gt;\n  &lt;head&gt;\n    &lt;meta charset=&quot;utf-8&quot; /&gt;\n    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot; /&gt;\n    &lt;title&gt;Mi página&lt;/title&gt;\n  &lt;/head&gt;\n  &lt;body&gt;\n    &lt;main&gt;\n      &lt;h1&gt;Título de la página&lt;/h1&gt;\n      &lt;p&gt;Un párrafo de contenido.&lt;/p&gt;\n      &lt;a href=&quot;/acerca&quot;&gt;Conoce más&lt;/a&gt;\n      &lt;img src=&quot;foto.jpg&quot; alt=&quot;Descripción de la foto&quot; /&gt;\n    &lt;/main&gt;\n  &lt;/body&gt;\n&lt;/html&gt;</code></pre>\n<p>Usa un solo <code>&lt;h1&gt;</code> para el tema principal y organiza los subtítulos con <code>&lt;h2&gt;</code> a <code>&lt;h6&gt;</code> según su jerarquía, no por el tamaño visual. Si una imagen es decorativa, usa <code>alt=&quot;&quot;</code>; si aporta información, describe brevemente lo importante.</p>\n<h2>Elementos semánticos</h2>\n<p>Elige etiquetas por el significado del contenido, no por su apariencia. <code>&lt;header&gt;</code> introduce una página o sección; <code>&lt;nav&gt;</code> agrupa enlaces de navegación; <code>&lt;main&gt;</code> contiene el contenido principal; <code>&lt;section&gt;</code> agrupa contenido relacionado; <code>&lt;article&gt;</code> representa una pieza independiente; <code>&lt;aside&gt;</code> contiene información complementaria y <code>&lt;footer&gt;</code> cierra la página o sección.</p>\n<h2>Texto y entidades</h2>\n<p>Usa <code>&lt;p&gt;</code> para párrafos, <code>&lt;ul&gt;</code> para listas sin orden y <code>&lt;ol&gt;</code> cuando el orden importe. Cada elemento de una lista va dentro de <code>&lt;li&gt;</code>.</p>\n<pre><code class=\"language-html\">&lt;ul&gt;\n  &lt;li&gt;Primer elemento&lt;/li&gt;\n  &lt;li&gt;Segundo elemento&lt;/li&gt;\n&lt;/ul&gt;\n\n&lt;ol&gt;\n  &lt;li&gt;Primer paso&lt;/li&gt;\n  &lt;li&gt;Siguiente paso&lt;/li&gt;\n&lt;/ol&gt;</code></pre>\n<h2>Formato de texto</h2>\n<p>Usa <code>&lt;strong&gt;</code> para indicar importancia y <code>&lt;em&gt;</code> para dar énfasis; no los elijas solo por su apariencia. <code>&lt;b&gt;</code> y <code>&lt;i&gt;</code> llaman la atención sobre un fragmento sin añadir ese mismo significado semántico. <code>&lt;mark&gt;</code> resalta texto relevante en el contexto, y <code>&lt;small&gt;</code> sirve para notas o texto secundario. <code>&lt;u&gt;</code> marca texto con una anotación no textual; evita usarlo para decorar, porque puede confundirse con un enlace.</p>\n<pre><code class=\"language-html\">&lt;p&gt;Lee las &lt;strong&gt;instrucciones importantes&lt;/strong&gt; antes de continuar.&lt;/p&gt;\n&lt;p&gt;Este término merece &lt;em&gt;énfasis&lt;/em&gt; en la frase.&lt;/p&gt;\n&lt;p&gt;Resultado de búsqueda: &lt;mark&gt;HTML semántico&lt;/mark&gt;&lt;/p&gt;\n&lt;p&gt;&lt;small&gt;Los términos pueden cambiar.&lt;/small&gt;&lt;/p&gt;</code></pre>\n<p>El navegador interpreta caracteres como <code>&lt;</code> y <code>&amp;</code> como parte de HTML. Para mostrarlos literalmente, usa entidades: <code>&amp;lt;</code> representa <code>&lt;</code>, <code>&amp;gt;</code> representa <code>&gt;</code>, <code>&amp;amp;</code> representa <code>&amp;</code>, <code>&amp;quot;</code> representa <code>&quot;</code> y <code>&amp;nbsp;</code> añade un espacio no separable. <code>&amp;copy;</code> muestra el símbolo ©.</p>\n<p>El atributo <code>title</code> puede aportar una sugerencia breve al pasar el cursor, pero no lo uses como único medio para comunicar información: no siempre está disponible para teclado, pantallas táctiles o lectores de pantalla.</p>\n<h2>Tablas</h2>\n<p>Usa tablas para datos relacionados en filas y columnas, no para maquetar una página. Asocia encabezados con sus filas o columnas usando <code>&lt;th scope=&quot;col&quot;&gt;</code> y <code>&lt;th scope=&quot;row&quot;&gt;</code>.</p>\n<pre><code class=\"language-html\">&lt;table&gt;\n  &lt;caption&gt;Horas de estudio&lt;/caption&gt;\n  &lt;tr&gt;\n    &lt;th scope=&quot;col&quot;&gt;Día&lt;/th&gt;\n    &lt;th scope=&quot;col&quot;&gt;Horas&lt;/th&gt;\n  &lt;/tr&gt;\n  &lt;tr&gt;\n    &lt;th scope=&quot;row&quot;&gt;Lunes&lt;/th&gt;\n    &lt;td&gt;2&lt;/td&gt;\n  &lt;/tr&gt;\n&lt;/table&gt;</code></pre>\n<h2>Audio y video</h2>\n<p>Añade <code>controls</code> para que las personas puedan reproducir, pausar y ajustar el volumen. Incluye texto alternativo si el formato no es compatible y subtítulos para los videos cuando haya diálogo o información sonora relevante.</p>\n<pre><code class=\"language-html\">&lt;audio controls&gt;\n  &lt;source src=&quot;audio.mp3&quot; type=&quot;audio/mpeg&quot; /&gt;\n  Tu navegador no admite audio.\n&lt;/audio&gt;\n\n&lt;video controls width=&quot;320&quot; height=&quot;240&quot;&gt;\n  &lt;source src=&quot;video.mp4&quot; type=&quot;video/mp4&quot; /&gt;\n  &lt;track src=&quot;subtitulos.vtt&quot; kind=&quot;captions&quot; srclang=&quot;es&quot; label=&quot;Español&quot; /&gt;\n  Tu navegador no admite video.\n&lt;/video&gt;</code></pre>\n<p>Para dejar una nota en el código que no se muestra en la página, usa un comentario: <code>&lt;!-- nota interna --&gt;</code>.</p>"
    },
    {
        "slug": "object-fit-imagenes",
        "title": "Ajusta imágenes con object-fit",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "CSS",
        "navTitle": "object-fit",
        "tags": [
            "CSS",
            "Imágenes"
        ],
        "excerpt": "Encaja una imagen en un marco fijo sin perder control del recorte o la proporción.",
        "body": "<p>Define el tamaño del marco y usa <code>object-fit</code> para decidir cómo se adapta la imagen:</p>\n<pre><code class=\"language-css\">.photo {\n  width: 200px;\n  height: 300px;\n  object-fit: cover;\n}</code></pre>\n<ul><li><code>cover</code> llena el marco y recorta lo que sobra, sin deformar la imagen.</li><li><code>contain</code> muestra la imagen completa; puede dejar espacio vacío dentro del marco.</li><li><code>fill</code> ocupa todo el marco, pero puede deformar la imagen.</li></ul>\n<p>Para cambiar qué parte queda visible con <code>cover</code>, combina la propiedad con <code>object-position</code>, por ejemplo <code>object-position: top</code>.</p>"
    },
    {
        "slug": "width-vs-max-width",
        "title": "Usa max-width para un ancho adaptable",
        "date": "2026-11-04",
        "track": "frontend",
        "topic": "CSS",
        "navTitle": "width y max-width",
        "tags": [
            "CSS",
            "Diseño"
        ],
        "excerpt": "Combina un ancho flexible con un límite para evitar desbordes en pantallas pequeñas.",
        "body": "<p><code>width: 200px</code> intenta mantener siempre ese ancho. Si el espacio disponible es menor, el elemento puede desbordarse. En cambio, <code>width: 100%</code> junto con <code>max-width</code> ocupa el espacio disponible sin superar un límite.</p>\n<pre><code class=\"language-css\">.button {\n  width: 100%;\n  max-width: 200px;\n}</code></pre>\n<p>Este patrón sirve para botones, imágenes y bloques de contenido que deben adaptarse a su contenedor. En este proyecto, <code>box-sizing: border-box</code> hace que el límite incluya también el padding y el borde.</p>"
    },
    {
        "slug": "sql-parametrizado",
        "title": "Nunca concatenes SQL: usa consultas parametrizadas",
        "date": "2026-10-07",
        "track": "backend",
        "topic": "SQL",
        "navTitle": "SQL parametrizado",
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
        "topic": "Layout",
        "navTitle": "Grid y columnas",
        "tags": [
            "CSS",
            "Layout"
        ],
        "excerpt": "Una regla de una línea para decidir cuál usar.",
        "body": "<pre><code class=\"language-css\">.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));\n  gap: 1rem;\n}</code></pre>\n<p><code>repeat(auto-fit, minmax(16rem, 1fr))</code> crea tantas columnas como quepan en el espacio disponible. Cada columna puede crecer desde <code>16rem</code> hasta repartir el espacio sobrante; cuando ya no cabe otra, el navegador pasa los elementos a una nueva fila. Así la cuadrícula se adapta sin escribir media queries.</p>\n<aside class=\"callout\"><strong>Regla rápida:</strong> si ordenas elementos en una fila o columna, usa Flexbox. Si necesitas filas y columnas a la vez, usa Grid.</aside>\n<h2>Pruébalo tú</h2>\n<p>Cambia las propiedades y mira cómo se acomodan los elementos.</p>\n<div data-component=\"flex-playground\"></div>"
    },
    {
        "slug": "indices-sql",
        "title": "Indexa las columnas de WHERE y JOIN",
        "date": "2026-10-04",
        "track": "backend",
        "topic": "SQL",
        "navTitle": "Índices SQL",
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
        "topic": "CSS",
        "navTitle": "Tipografía fluida",
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
        "topic": "CSS",
        "navTitle": "Foco de teclado",
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
        "topic": "Seguridad",
        "navTitle": "JWT en cookie",
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
        "topic": "JavaScript",
        "navTitle": "Errores en fetch",
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
        "topic": "Seguridad",
        "navTitle": "Hash de contraseñas",
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
        "topic": "TypeScript",
        "navTitle": "unknown vs. any",
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
        "topic": "Seguridad",
        "navTitle": ".env y Git",
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
        "topic": "JavaScript",
        "navTitle": "Optional chaining",
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
        "topic": "APIs",
        "navTitle": "Códigos HTTP",
        "tags": [
            "REST",
            "HTTP"
        ],
        "excerpt": "Seis códigos cubren casi todas las respuestas de una API.",
        "body": "<pre><code class=\"language-text\">201 Created       POST que crea un recurso\n204 No Content    DELETE correcto\n400 Bad Request   datos inválidos\n401 Unauthorized  sin iniciar sesión\n403 Forbidden     sin permiso\n404 Not Found     el recurso no existe</code></pre>\n<p>Responde siempre con JSON y un mensaje de error consistente.</p>\n<h2>Pruébalo tú</h2>\n<p>Esta API de práctica vive en tu navegador. Crea, lee, cambia y borra, y observa los códigos de estado.</p>\n<div data-component=\"api-tester\"></div>"
    }
];
