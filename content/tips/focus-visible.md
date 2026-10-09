---
title: Foco visible solo para teclado con :focus-visible
date: 2026-09-29
track: frontend
tags: CSS, Accesibilidad
excerpt: Mantén el contorno de foco sin molestar a quien usa el ratón.
---

```css
:focus-visible {
  outline: 3px solid #0b63ce;
  outline-offset: 2px;
}
```

Nunca quites el `outline` sin ofrecer una alternativa: quien navega con teclado deja de saber dónde está.
