---
title: Alinea elementos y tracks con CSS Grid
date: 2026-11-04
track: frontend
topic: Layout
navTitle: Alineación en Grid
tags: CSS, Layout
excerpt: Distingue cuándo alinear los elementos, cada celda o la cuadrícula completa.
---

En Grid, `justify-*` controla el eje horizontal y `align-*` el vertical en los modos de escritura habituales. Las propiedades con `-items` se aplican a todos los elementos; las que terminan en `-self` ajustan un elemento individual.

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(2, 4rem);
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
}

.grid > :first-child {
  justify-self: start;
  align-self: end;
}
```

- `justify-items` y `align-items` alinean los elementos dentro de sus celdas. Aceptan `start`, `center`, `end` y `stretch`.
- `justify-self` y `align-self` hacen lo mismo para un elemento específico.
- `justify-content` posiciona o distribuye la cuadrícula completa dentro del contenedor cuando sobra espacio. Además de `start`, `center` y `end`, admite valores como `space-between`, `space-around` y `space-evenly`.

Usa `items` para dar una alineación común y `self` cuando un elemento necesite una excepción.
