---
title: Usa max-width para un ancho adaptable
date: 2026-11-04
track: frontend
topic: CSS y diseño
navTitle: width y max-width
tags: CSS, Diseño
excerpt: Combina un ancho flexible con un límite para evitar desbordes en pantallas pequeñas.
---

`width: 200px` intenta mantener siempre ese ancho. Si el espacio disponible es menor, el elemento puede desbordarse. En cambio, `width: 100%` junto con `max-width` ocupa el espacio disponible sin superar un límite.

```css
.button {
  width: 100%;
  max-width: 200px;
}
```

Este patrón sirve para botones, imágenes y bloques de contenido que deben adaptarse a su contenedor. En este proyecto, `box-sizing: border-box` hace que el límite incluya también el padding y el borde.
