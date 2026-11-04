---
title: Normaliza estilos y aprovecha abreviaturas CSS
date: 2026-11-04
track: frontend
topic: CSS
navTitle: Reset y abreviaturas
tags: CSS, Diseño
excerpt: Empieza con un modelo de caja predecible y escribe abreviaturas CSS con claridad.
---

Unas reglas base ayudan a mantener dimensiones coherentes entre elementos y navegadores. No existe un reset único obligatorio: aplica solo las reglas que tu diseño necesita.

## Usa un modelo de caja consistente

Con `box-sizing: border-box`, el ancho y alto declarados incluyen el padding y el borde. Aplicarlo a todos los elementos hace más predecibles los cálculos de tamaño.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Si quieres quitar márgenes o rellenos predeterminados, hazlo de forma intencional: no todos los elementos necesitan los mismos valores.

```css
body {
  margin: 0;
}

ul,
ol {
  padding-inline-start: 1.5rem;
}
```

No elimines las viñetas o numeración de todas las listas si comunican estructura o si no las reemplazas con otra señal clara.

## Ajusta medios al contenedor

Para evitar que una imagen o video desborde su contenedor, limita su ancho y conserva su proporción:

```css
img,
video {
  max-width: 100%;
  height: auto;
}
```

Usa `object-fit: cover` solo cuando quieras llenar una caja con dimensiones establecidas y aceptes recortar parte del contenido.

## Abrevia valores con cuidado

`padding` y `margin` aceptan uno a cuatro valores: uno se aplica a todos los lados; dos corresponden a vertical y horizontal; tres, a arriba, horizontal y abajo; cuatro, a arriba, derecha, abajo e izquierda.

```css
.card {
  padding: 1rem 1.5rem;
  margin: 1rem auto 2rem;
  border: 1px solid #cbd5e1;
}
```

Las abreviaturas `background` y `border` también pueden combinar varias propiedades. Si una regla se vuelve difícil de leer o necesitas conservar ciertos valores al sobrescribir estilos, usa propiedades largas explícitas.

## Elige el modo de layout según el contenido

Usa Flexbox para distribuir elementos en una fila o columna y Grid cuando necesites controlar filas y columnas a la vez. `position` sirve para ubicar elementos respecto a un contenedor o al viewport, no para sustituir un sistema de layout. `float` se reserva principalmente para permitir que el texto rodee una imagen u otro elemento; no es la herramienta general para maquetar columnas. Usa tablas HTML para datos tabulares, no como estructura visual de una página.
