---
title: Datos que pueden faltar: usa ?. y ??
date: 2026-09-15
track: frontend
topic: JavaScript
navTitle: Optional chaining
tags: JavaScript
excerpt: Evita errores con null y define valores por defecto.
---

```js
const city = user?.address?.city ?? "Sin ciudad";
```

`?.` detiene el acceso y devuelve `undefined` si el valor anterior es `null` o `undefined`. `??` proporciona un valor por defecto solo en esos dos casos; a diferencia de `||`, conserva valores válidos como `0`, `false` y `""`.

```js
const quantity = settings?.quantity ?? 1;
const label = settings?.label ?? "Sin nombre";
```

Usa `?.` solo cuando el dato realmente pueda faltar. No sustituye la validación de datos requeridos: si el programa necesita una dirección válida, informa o maneja explícitamente el caso en que no exista.
