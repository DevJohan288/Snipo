---
title: Ajusta imágenes con object-fit
date: 2026-11-04
track: frontend
topic: CSS
navTitle: object-fit
tags: CSS, Imágenes
excerpt: Encaja una imagen en un marco fijo sin perder control del recorte o la proporción.
---

Define el tamaño del marco y usa `object-fit` para decidir cómo se adapta la imagen:

```css
.photo {
  width: 200px;
  height: 300px;
  object-fit: cover;
}
```

- `cover` llena el marco y recorta lo que sobra, sin deformar la imagen.
- `contain` muestra la imagen completa; puede dejar espacio vacío dentro del marco.
- `fill` ocupa todo el marco, pero puede deformar la imagen.

Para cambiar qué parte queda visible con `cover`, combina la propiedad con `object-position`, por ejemplo `object-position: top`.
