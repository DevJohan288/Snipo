---
title: Indexa las columnas de WHERE y JOIN
date: 2026-10-04
track: backend
tags: SQL, Rendimiento
excerpt: Sin índice, la base de datos recorre la tabla completa.
---

```sql
CREATE INDEX idx_posts_user_id ON posts (user_id);

EXPLAIN SELECT * FROM posts WHERE user_id = 7;
```

Ejecuta `EXPLAIN` antes y después para comprobar que la consulta usa el índice.
