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

Usa un solo `<h1>` para el tema principal y organiza los subtítulos con `<h2>` a `<h6>` según su jerarquía, no por el tamaño visual. Toda imagen debe tener el atributo `alt`: si aporta información, describe brevemente lo relevante; si es decorativa o repite información que ya aparece en el texto cercano, usa `alt=""` para que tecnologías de asistencia puedan omitirla. No uses el nombre del archivo como descripción.

```html
<img src="grafica.png" alt="Las visitas aumentaron de enero a marzo" />
<img src="adorno.svg" alt="" />
```

## Elementos semánticos

Elige etiquetas por el significado del contenido, no por su apariencia. `<header>` introduce una página o sección; `<nav>` agrupa enlaces de navegación; `<main>` contiene el contenido principal; `<section>` agrupa contenido relacionado; `<article>` representa una pieza independiente; `<aside>` contiene información complementaria y `<footer>` cierra la página o sección.

Usa `<figure>` para contenido autónomo, como una imagen o diagrama, y `<figcaption>` para su leyenda cuando la necesite. No es obligatorio envolver cada imagen en un `<figure>`; elige la estructura según su relación con el texto.

```html
<figure>
  <img src="grafica.png" alt="Las visitas aumentaron de enero a marzo" />
  <figcaption>Visitas registradas durante el primer trimestre.</figcaption>
</figure>
```

Respeta el contenido permitido por cada elemento: por ejemplo, no coloques un encabezado dentro de un `<span>`, que solo admite contenido en línea. En HTML moderno, un enlace `<a>` puede envolver contenido de bloque, como un encabezado, si todo ese contenido forma parte del mismo enlace; no anides enlaces ni controles interactivos dentro de otro enlace.

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

El atributo `reversed` invierte la numeración de una lista ordenada; no cambia el orden de los elementos en el documento.

```html
<ol reversed>
  <li>Primero en el código, último número</li>
  <li>Segundo en el código</li>
  <li>Tercero en el código, primer número</li>
</ol>
```

## Formato de texto

Usa `<strong>` para indicar importancia y `<em>` para dar énfasis; no los elijas solo por su apariencia. `<b>` y `<i>` pueden señalar texto al que se dirige la atención o una voz distinta, pero no comunican por sí mismos que algo es importante o está enfatizado. Si solo quieres cambiar la apariencia, usa una clase CSS en vez de elegir etiquetas por el estilo predeterminado. `<mark>` resalta texto relevante en el contexto, y `<small>` sirve para notas o texto secundario. `<u>` marca texto con una anotación no textual; evita usarlo para decorar, porque puede confundirse con un enlace.

```html
<p>Lee las <strong>instrucciones importantes</strong> antes de continuar.</p>
<p>Este término merece <em>énfasis</em> en la frase.</p>
<p>Resultado de búsqueda: <mark>HTML semántico</mark></p>
<p><small>Los términos pueden cambiar.</small></p>
```

Para reutilizar estilos, asigna una clase al elemento y define su presentación en CSS, en vez de repetir atributos `style` en el HTML. Los estilos en línea pueden ser apropiados para valores dinámicos únicos, pero no son la opción habitual para reglas de diseño reutilizables.

```html
<h2 class="warning-title">Revisa los datos</h2>
```

```css
.warning-title {
  color: #b42318;
}
```

Para fragmentos de código, usa `<code>`; para representar una salida de ejemplo de un programa, usa `<samp>`. Ambos son elementos semánticos en línea y suelen aparecer con una fuente monoespaciada, aunque puedes cambiar su estilo con CSS.

```html
<p>Ejecuta <code>npm run build</code> en la terminal.</p>
<p>La respuesta del programa fue: <samp>Compilación completada</samp></p>
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
