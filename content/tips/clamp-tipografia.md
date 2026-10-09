---
title: Tipografía fluida con clamp() y sin media queries
date: 2026-10-03
track: frontend
tags: CSS, Diseño
excerpt: Un tamaño que crece con la pantalla, con mínimo y máximo.
---

```css
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
}
```

Los tres valores son el mínimo, el preferido y el máximo. El título nunca será más pequeño ni más grande que esos límites. Más detalles en [MDN](https://developer.mozilla.org/es/docs/Web/CSS/clamp).
