---
title: Usa el código HTTP correcto
date: 2026-09-10
track: backend
tags: REST, HTTP
excerpt: Seis códigos cubren casi todas las respuestas de una API.
---

```text
201 Created       POST que crea un recurso
204 No Content    DELETE correcto
400 Bad Request   datos inválidos
401 Unauthorized  sin iniciar sesión
403 Forbidden     sin permiso
404 Not Found     el recurso no existe
```

Responde siempre con JSON y un mensaje de error consistente.

## Pruébalo tú

Esta API de práctica vive en tu navegador. Crea, lee, cambia y borra, y observa los códigos de estado.

::component api-tester
