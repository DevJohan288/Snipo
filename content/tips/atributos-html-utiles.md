---
title: Conoce más atributos útiles de HTML
date: 2026-11-04
track: frontend
topic: HTML
navTitle: Otros atributos HTML
tags: HTML, Rendimiento, Accesibilidad
excerpt: Configura metadatos, recursos, contenido editable y carga de scripts con atributos HTML.
---

HTML ofrece atributos y metadatos para personalizar cómo se identifica una página, cómo se cargan sus recursos y cómo se comportan algunos elementos.

## Iconos y color del navegador

`rel="icon"` enlaza el favicon que aparece en pestañas y marcadores. `rel="apple-touch-icon"` permite indicar un icono para accesos directos en dispositivos Apple. `theme-color` sugiere un color para la interfaz del navegador cuando este lo admite.

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/icon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<meta name="theme-color" content="#0b63ce" />
```

## Carga de imágenes y video

En imágenes e `iframe`, `loading="lazy"` aplaza la carga hasta que el recurso está cerca de entrar en pantalla. `loading="eager"` solicita carga inmediata y es el comportamiento predeterminado. No apliques carga diferida a imágenes importantes que aparecen al inicio de la página.

En `<video>`, `poster` indica la imagen de vista previa que se muestra antes de reproducir el video.

```html
<img src="/galeria/paisaje.jpg" alt="Montañas al amanecer" loading="lazy" />

<video controls poster="/videos/portada.jpg">
  <source src="/videos/recorrido.mp4" type="video/mp4" />
  Tu navegador no admite video.
</video>
```

## Edición, ortografía y traducción

`contenteditable="true"` permite editar el contenido directamente en el navegador, pero no lo guarda automáticamente. `spellcheck` sugiere si el navegador puede revisar la ortografía; el resultado depende del navegador y las preferencias del usuario.

`translate="no"` indica que un fragmento no debería traducirse automáticamente, por ejemplo, el nombre de una marca. Es una sugerencia para las herramientas de traducción, no una garantía.

```html
<p contenteditable="true" spellcheck="true" lang="es">
  Puedes editar este texto; guarda los cambios con una aplicación.
</p>

<footer>© 2026 <span translate="no">Snipo</span></footer>
```

## Arrastrar y acceder con teclado

`draggable="true"` permite que un elemento participe en el arrastre nativo del navegador. Por sí solo no implementa una operación completa de arrastrar y soltar: se necesitan eventos para gestionar los datos y el destino. Ofrece también una alternativa que funcione con teclado y otros métodos de entrada.

`accesskey` asigna una tecla de acceso rápido, pero la combinación para activarla depende del navegador y del sistema operativo. Puede interferir con atajos existentes, así que úsala solo si la combinación se comunica claramente y se ha probado.

```html
<a href="#contacto" accesskey="c">Ir a contacto</a>
<p draggable="true">Elemento que puede arrastrarse</p>
```

## Carga de scripts

En scripts clásicos externos, `async` permite descargar el archivo sin detener el análisis del HTML y lo ejecuta en cuanto termina la descarga; el orden de ejecución no está garantizado. `defer` también permite descargarlo en paralelo, pero lo ejecuta después de analizar el documento y conserva el orden entre scripts diferidos.

```html
<script src="/js/analitica.js" async></script>
<script src="/js/app.js" defer></script>
<script src="/js/modulo.js" type="module"></script>
```

Los scripts `type="module"` se difieren de forma predeterminada. Elige la estrategia según las dependencias entre scripts; no uses `async` si el código depende de que otro script se ejecute primero.

## Maneja errores sin eventos inline

El atributo `onerror` puede ejecutar código cuando falla la carga de un recurso, pero escribir manejadores JavaScript directamente en HTML mezcla estructura y comportamiento. Prefiere registrar un `error` listener desde JavaScript y muestra una alternativa útil, como una imagen de reemplazo. No uses `alert()` como único tratamiento del error.
