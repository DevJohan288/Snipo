---
title: Guarda el JWT en una cookie HttpOnly
date: 2026-09-27
track: backend
tags: Seguridad, Node.js
excerpt: En localStorage, cualquier script inyectado puede leerlo.
---

```js
res.cookie("token", jwt, {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 15 * 60 * 1000,
});
```

Dale una caducidad corta. Un JWT está *firmado*, no cifrado: no pongas datos sensibles dentro.
