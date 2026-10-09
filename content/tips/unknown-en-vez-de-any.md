---
title: Usa unknown en lugar de any
date: 2026-09-20
track: frontend
tags: TypeScript
excerpt: Te obliga a comprobar el tipo antes de usar el valor.
---

```ts
const data: unknown = JSON.parse(text);

if (typeof data === "object" && data !== null && "name" in data) {
  console.log(data.name);
}
```

`any` apaga las comprobaciones del compilador. `unknown` las mantiene encendidas.
