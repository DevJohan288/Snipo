---
title: Mejora formularios con atributos HTML
date: 2026-11-04
track: frontend
topic: HTML
navTitle: Atributos de formularios
tags: HTML, Formularios, Accesibilidad
excerpt: Usa atributos nativos para agilizar la entrada y selección de datos en formularios.
---

HTML incluye atributos que mejoran la experiencia de los formularios sin JavaScript. Estos ejemplos cubren foco, sugerencias de entrada, validación y selección de archivos.

## Foco y sugerencias de entrada

`autofocus` coloca el foco inicial en un campo al cargar la página. Úsalo con moderación: puede desplazar la página o abrir el teclado en dispositivos móviles. No marques varios campos con este atributo.

`autocomplete` permite que el navegador sugiera datos guardados. Usa un valor adecuado al campo, como `name`, `email` o `username`, en lugar de activarlo sin especificar el tipo de dato.

`inputmode` sugiere al dispositivo qué teclado mostrar; no cambia el tipo ni valida el valor. Por ejemplo, `inputmode="numeric"` es útil para un código compuesto por dígitos, mientras que `type="tel"` puede mostrar un teclado telefónico.

```html
<label for="username">Nombre de usuario</label>
<input id="username" name="username" autocomplete="username" autofocus />

<label for="code">Código</label>
<input id="code" name="code" inputmode="numeric" />
```

## Validación de valores

`pattern` valida que el valor de ciertos campos de texto coincida con una expresión regular cuando se envía el formulario. El patrón debe coincidir con el valor completo. Acompáñalo con una etiqueta y una instrucción visible: `title` puede aportar una sugerencia, pero no debe ser la única explicación del formato requerido.

`step` define los incrementos válidos de campos numéricos o de fecha. En este ejemplo, con `min="0"` y `step="5"`, se aceptan cantidades como 0, 5 y 10; `max` establece el límite superior.

```html
<label for="handle">Usuario (5 a 10 letras)</label>
<input
  id="handle"
  name="handle"
  pattern="[A-Za-z]{5,10}"
  title="Escribe entre 5 y 10 letras"
  required
/>

<label for="quantity">Cantidad</label>
<input id="quantity" name="quantity" type="number" min="0" max="100" step="5" />
```

La validación del navegador mejora la experiencia, pero el servidor también debe validar los datos: los atributos HTML no sustituyen la validación del lado del servidor.

## Selección de archivos

`accept` sugiere qué tipos de archivo mostrar en el selector, pero no valida ni protege los archivos recibidos. Comprueba el tipo y el contenido también en el servidor.

`multiple` permite seleccionar más de un archivo. `capture` puede solicitar al dispositivo una fuente de captura, como la cámara; su comportamiento depende del navegador y del dispositivo, y no garantiza que se abra directamente.

```html
<label for="photos">Fotos</label>
<input
  id="photos"
  name="photos"
  type="file"
  accept="image/*"
  capture="environment"
  multiple
/>
```

Usa una etiqueta asociada a cada control y proporciona instrucciones claras sobre formatos, límites y cantidad de archivos permitidos.
