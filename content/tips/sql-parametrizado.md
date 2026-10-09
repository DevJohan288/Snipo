---
title: Nunca concatenes SQL: usa consultas parametrizadas
date: 2026-10-07
track: backend
tags: SQL, Seguridad
excerpt: Es la forma más simple de evitar la inyección SQL.
---

```js
// Mal: vulnerable a inyección SQL
db.query("SELECT * FROM users WHERE email = '" + email + "'");

// Bien: el valor viaja aparte
db.query("SELECT * FROM users WHERE email = $1", [email]);
```

Con parámetros, el motor trata el valor siempre como **dato** y nunca como parte de la consulta.
