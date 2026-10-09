---
title: No subas el archivo .env a Git
date: 2026-09-17
track: backend
tags: Node.js, Seguridad
excerpt: Las claves en un repositorio público se roban en minutos.
---

```bash
# .gitignore
.env

# Sube esto en su lugar, sin valores reales
# .env.example
DATABASE_URL=
JWT_SECRET=
```

Si ya subiste una clave, borrarla del historial no basta: **cámbiala** por una nueva.
