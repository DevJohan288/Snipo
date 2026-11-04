---
title: Elige entre box-shadow y drop-shadow en CSS
date: 2026-11-04
track: frontend
topic: CSS
navTitle: Sombras CSS
tags: CSS, Diseño
excerpt: Usa box-shadow para la caja y drop-shadow para seguir la silueta transparente.
---

`box-shadow` dibuja la sombra de la caja del elemento. Es ideal para tarjetas, botones y paneles; respeta `border-radius`, pero no la forma de una imagen con transparencia.

```css
.card {
  box-shadow: 10px 7px 20px orange;
}

.sticker {
  filter: drop-shadow(10px 7px 10px orange);
}
```

`drop-shadow()` sigue la silueta opaca de la imagen, por eso funciona mejor en PNG o SVG con fondo transparente. En cambio, `box-shadow` puede proyectar una sombra rectangular alrededor de toda la caja de la imagen.
