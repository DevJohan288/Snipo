---
title: Datos que pueden faltar: usa ?. y ??
date: 2026-09-15
track: frontend
tags: JavaScript
excerpt: Evita errores con null y define valores por defecto.
---

```js
const city = user?.address?.city ?? "Sin ciudad";
```

`?.` corta la cadena si algo es `null` o `undefined`. `??` usa el valor por defecto solo en esos casos, no con `0` ni con una cadena vacía.
