---
title: Contraseñas con bcrypt o argon2, nunca en texto plano
date: 2026-09-22
track: backend
tags: Seguridad, Node.js
excerpt: Un hash lento protege las cuentas aunque se filtre la base de datos.
---

```js
import bcrypt from "bcrypt";

const hash = await bcrypt.hash(password, 12);
const ok = await bcrypt.compare(password, hash);
```

No uses SHA-256 solo: es demasiado rápido. Bcrypt y argon2 son lentos a propósito.
