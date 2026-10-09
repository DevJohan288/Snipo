---
title: fetch no falla con un 404: revisa response.ok
date: 2026-09-25
track: frontend
tags: JavaScript, APIs
excerpt: Solo los fallos de red rechazan la promesa.
---

```js
const res = await fetch("/api/users/1");
if (!res.ok) throw new Error("HTTP " + res.status);
const user = await res.json();
```

Un 404 o un 500 se resuelven como respuestas normales. Muestra siempre un estado de carga y un mensaje de error útil.
