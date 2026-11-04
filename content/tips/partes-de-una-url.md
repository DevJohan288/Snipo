---
title: Identifica las partes de una URL
date: 2026-11-04
track: backend
topic: APIs y HTTP
navTitle: Partes de una URL
tags: URL, HTTP, Web
excerpt: Distingue protocolo, host, puerto, ruta, parámetros y fragmento.
---

Una URL indica cómo localizar un recurso. Sus partes tienen funciones distintas y no todas se envían al servidor.

```text
https://www.example.com:8443/docs/page?lang=es&tema=web#introduccion
└─┬─┘   └──────┬──────┘└─┬─┘└──┬──────┘└──────────┬────────┘└────┬────┘
 esquema        host     puerto    ruta              query         fragmento
```

- **Esquema** (`https`): indica el protocolo. HTTPS protege la comunicación entre cliente y servidor mediante cifrado.
- **Host** (`www.example.com`): identifica el servidor. Puede incluir un subdominio (`www`), un dominio (`example`) y un dominio de nivel superior (`.com`).
- **Puerto** (`8443`): es opcional; si no se indica, se usan los puertos predeterminados del esquema.
- **Ruta** (`/docs/page`): identifica el recurso solicitado dentro del servidor.
- **Query** (`?lang=es&tema=web`): contiene parámetros como pares clave-valor; varios se separan con `&`. Sus valores deben codificarse correctamente.
- **Fragmento** (`#introduccion`): señala una sección o estado dentro del recurso. El navegador no lo envía en la solicitud HTTP al servidor.

```js
const url = new URL("https://www.example.com/docs?page=2&lang=es#results");

const page = url.searchParams.get("page");
const language = url.searchParams.get("lang");
const section = url.hash;
```

Usa `URL` y `URLSearchParams` para leer o construir URLs en JavaScript, en vez de separar sus partes manualmente. No pongas contraseñas ni secretos en la query: puede quedar registrada en historial, logs o encabezados de referencia.
