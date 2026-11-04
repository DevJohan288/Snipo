---
title: Flexbox para una dimensión, Grid para dos
date: 2026-10-06
track: frontend
topic: CSS y diseño
navTitle: Grid y columnas
tags: CSS, Layout
excerpt: Una regla de una línea para decidir cuál usar.
---

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}
```

`repeat(auto-fit, minmax(16rem, 1fr))` crea tantas columnas como quepan en el espacio disponible. Cada columna puede crecer desde `16rem` hasta repartir el espacio sobrante; cuando ya no cabe otra, el navegador pasa los elementos a una nueva fila. Así la cuadrícula se adapta sin escribir media queries.

> **Regla rápida:** si ordenas elementos en una fila o columna, usa Flexbox. Si necesitas filas y columnas a la vez, usa Grid.

## Pruébalo tú

Cambia las propiedades y mira cómo se acomodan los elementos.

::component flex-playground
