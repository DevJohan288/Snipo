---
title: Usa el código HTTP correcto
date: 2026-09-10
track: backend
topic: APIs
navTitle: Códigos HTTP
tags: REST, HTTP
excerpt: Reconoce estados HTTP habituales para respuestas exitosas, redirecciones y errores.
---

```text
200 OK            solicitud correcta
201 Created       POST que crea un recurso
204 No Content    DELETE correcto
301 Moved         redirección permanente
302 Found         redirección temporal
400 Bad Request   datos inválidos
401 Unauthorized  sin iniciar sesión
403 Forbidden     sin permiso
404 Not Found     el recurso no existe
500 Server Error  error inesperado del servidor
502 Bad Gateway   respuesta inválida de un servidor intermedio
503 Unavailable   servicio temporalmente no disponible
```

`401` indica que falta autenticación válida; `403`, que el servidor entiende la solicitud, pero no autoriza el acceso. Usa `503` para indisponibilidad temporal y, cuando sea útil, indica cuándo reintentar mediante `Retry-After`.

En una API JSON, devuelve un formato de error consistente y un estado adecuado. No todas las respuestas HTTP tienen que ser JSON: por ejemplo, `204 No Content` no lleva cuerpo.

## Pruébalo tú

Esta API de práctica vive en tu navegador. Crea, lee, cambia y borra, y observa los códigos de estado.

::component api-tester
