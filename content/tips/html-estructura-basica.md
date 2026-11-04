---
title: Estructura una página con HTML semántico
date: 2026-11-04
track: frontend
topic: HTML
navTitle: Estructura HTML
tags: HTML, Accesibilidad
excerpt: Referencia breve de estructura semántica, texto, listas, tablas y multimedia en HTML.
---

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mi página</title>
  </head>
  <body>
    <main>
      <h1>Título de la página</h1>
      <p>Un párrafo de contenido.</p>
      <a href="/acerca">Conoce más</a>
      <img src="foto.jpg" alt="Descripción de la foto" />
    </main>
  </body>
</html>
```

Usa un solo `<h1>` para el tema principal y organiza los subtítulos con `<h2>` a `<h6>` según su jerarquía, no por el tamaño visual. Si una imagen es decorativa, usa `alt=""`; si aporta información, describe brevemente lo importante.

## Elementos semánticos

Elige etiquetas por el significado del contenido, no por su apariencia. `<header>` introduce una página o sección; `<nav>` agrupa enlaces de navegación; `<main>` contiene el contenido principal; `<section>` agrupa contenido relacionado; `<article>` representa una pieza independiente; `<aside>` contiene información complementaria y `<footer>` cierra la página o sección.

## Texto y entidades

Usa `<p>` para párrafos, `<ul>` para listas sin orden y `<ol>` cuando el orden importe. Cada elemento de una lista va dentro de `<li>`.

```html
<ul>
  <li>Primer elemento</li>
  <li>Segundo elemento</li>
</ul>

<ol>
  <li>Primer paso</li>
  <li>Siguiente paso</li>
</ol>
```

## Formato de texto

Usa `<strong>` para indicar importancia y `<em>` para dar énfasis; no los elijas solo por su apariencia. `<b>` y `<i>` llaman la atención sobre un fragmento sin añadir ese mismo significado semántico. `<mark>` resalta texto relevante en el contexto, y `<small>` sirve para notas o texto secundario. `<u>` marca texto con una anotación no textual; evita usarlo para decorar, porque puede confundirse con un enlace.

```html
<p>Lee las <strong>instrucciones importantes</strong> antes de continuar.</p>
<p>Este término merece <em>énfasis</em> en la frase.</p>
<p>Resultado de búsqueda: <mark>HTML semántico</mark></p>
<p><small>Los términos pueden cambiar.</small></p>
```

El navegador interpreta caracteres como `<` y `&` como parte de HTML. Para mostrarlos literalmente, usa entidades: `&lt;` representa `<`, `&gt;` representa `>`, `&amp;` representa `&`, `&quot;` representa `"` y `&nbsp;` añade un espacio no separable. `&copy;` muestra el símbolo ©.

El atributo `title` puede aportar una sugerencia breve al pasar el cursor, pero no lo uses como único medio para comunicar información: no siempre está disponible para teclado, pantallas táctiles o lectores de pantalla.

## Tablas

Usa tablas para datos relacionados en filas y columnas, no para maquetar una página. Asocia encabezados con sus filas o columnas usando `<th scope="col">` y `<th scope="row">`.

```html
<table>
  <caption>Horas de estudio</caption>
  <tr>
    <th scope="col">Día</th>
    <th scope="col">Horas</th>
  </tr>
  <tr>
    <th scope="row">Lunes</th>
    <td>2</td>
  </tr>
</table>
```

## Audio y video

Añade `controls` para que las personas puedan reproducir, pausar y ajustar el volumen. Incluye texto alternativo si el formato no es compatible y subtítulos para los videos cuando haya diálogo o información sonora relevante.

```html
<audio controls>
  <source src="audio.mp3" type="audio/mpeg" />
  Tu navegador no admite audio.
</audio>

<video controls width="320" height="240">
  <source src="video.mp4" type="video/mp4" />
  <track src="subtitulos.vtt" kind="captions" srclang="es" label="Español" />
  Tu navegador no admite video.
</video>
```

Para dejar una nota en el código que no se muestra en la página, usa un comentario: `<!-- nota interna -->`.
