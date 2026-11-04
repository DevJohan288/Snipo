---
title: Repasa los fundamentos de JavaScript
date: 2026-11-04
track: frontend
topic: JavaScript
navTitle: Fundamentos JS
tags: JavaScript, DOM
excerpt: Una referencia rápida de tipos, operadores, condiciones, ciclos, funciones y DOM.
---

Una guía breve para reconocer las piezas básicas de JavaScript. Los ejemplos se pueden combinar según lo que necesite resolver tu programa.

## Variables y tipos de datos

Usa `const` si no reasignas la variable y `let` si su valor cambiará. Los tipos primitivos incluyen `string`, `number`, `boolean`, `undefined`, `null`, `bigint` y `symbol`. Los arreglos y objetos son valores de tipo referencia; `const` no impide modificar sus propiedades o elementos.

```js
const message = "Hola";
let count = 3;
const isReady = true;
let result;
const emptyValue = null;
const colors = ["azul", "verde"];
const user = { name: "Ana" };
```

`typeof null` devuelve `"object"` por una particularidad histórica de JavaScript. Para comprobar `null`, compara directamente con `value === null`.

## Operadores

Los operadores aritméticos comunes son `+`, `-`, `*`, `/` y `%` (resto). Para comparar, prefiere `===` y `!==`, que no convierten los tipos. Los operadores lógicos `&&`, `||` y `!` representan “y”, “o” y “no”; además, `&&` y `||` pueden devolver uno de sus operandos, no necesariamente un booleano.

```js
const remainder = 10 % 3; // 1
const sameValue = 10 === "10"; // false
const canEnter = isReady && count > 0;
const hasNoResult = !result;
```

## Condiciones

Usa `if`/`else if`/`else` para ramificar la ejecución. El operador ternario es útil para una elección sencilla entre dos valores; si la lógica se vuelve compleja, prefiere una condición explícita.

```js
let label;
if (count > 0) {
  label = "Hay elementos";
} else {
  label = "Está vacío";
}

const status = isReady ? "Listo" : "Pendiente";
```

Si solo necesitas convertir un valor a booleano, no hace falta usar un ternario: `Boolean(value)` o `!!value` devuelve `true` o `false` según su valor de verdad. Esto no comprueba que una cadena o un número tenga un contenido específico; por ejemplo, `Boolean("false")` es `true` porque la cadena no está vacía.

```js
const hasValue = Boolean(value);
```

## Ciclos

`for` es útil cuando necesitas controlar el índice o el número de iteraciones. `while` repite mientras una condición sea verdadera; `do...while` ejecuta el bloque al menos una vez. Asegúrate de actualizar la condición para evitar ciclos infinitos.

Para recorrer valores de un iterable, como un arreglo, usa `for...of`. `for...in` recorre claves enumerables de un objeto; si necesitas solo las propiedades propias, `Object.keys()` evita incluir claves heredadas.

```js
for (let index = 0; index < 3; index += 1) {
  console.log(index);
}

let count = 0;
while (count < 3) {
  console.log(count);
  count += 1;
}

let attempt = 0;
do {
  console.log(attempt);
  attempt += 1;
} while (attempt < 1);

const values = [10, 20, 30];
for (const value of values) {
  console.log(value);
}

const settings = { theme: "dark", language: "es" };
for (const key of Object.keys(settings)) {
  console.log(key, settings[key]);
}
```

## Funciones

Una declaración de función, una expresión asignada a una variable y una función flecha permiten definir funciones. Las flechas no tienen su propio `this`; elige la forma según el comportamiento que necesites, no solo por brevedad.

```js
function greet(name) {
  return `Hola, ${name}`;
}

const add = (a, b) => a + b;
```

## Desestructura arreglos e intercambia valores

La desestructuración asigna elementos de un arreglo a variables según su posición. Puedes omitir posiciones con una coma y usar el resto (`...`) para reunir los elementos restantes.

```js
const numbers = [10, 20, 30];
const [first, second] = numbers;
const [head, ...remaining] = numbers;
```

También permite intercambiar dos variables sin una variable temporal. Ambas deben estar declaradas con `let` si se van a reasignar.

```js
let left = "A";
let right = "B";
[left, right] = [right, left];
```

## Selecciona y actualiza el DOM

`getElementById()` busca por identificador; `querySelector()` devuelve el primer elemento que coincide con un selector CSS; `querySelectorAll()` devuelve todos los elementos coincidentes en una lista estática. También existen `getElementsByClassName()` y `getElementsByTagName()`, que devuelven colecciones vivas: su contenido puede cambiar cuando cambia el DOM.

Comprueba que un elemento exista antes de usarlo. Para insertar texto, usa `textContent`; cambia clases con `classList` y registra interacciones con `addEventListener`. Para modificar la apariencia, prefiere alternar una clase CSS con `classList` en lugar de asignar estilos en línea repetidamente.

```js
const title = document.querySelector("#title");
const buttons = document.querySelectorAll(".action");

if (title) {
  title.textContent = "Contenido actualizado";
  title.classList.add("is-active");
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    console.log("Se hizo clic");
  });
}
```

No insertes datos no confiables con `innerHTML`: el navegador los interpreta como marcado. Para texto plano, `textContent` evita esa interpretación.

## Crea y elimina elementos

`createElement()` crea un nodo, `append()` lo agrega al final de un contenedor y `remove()` lo quita del DOM. Usa `textContent` para asignar el texto y evita construir marcado con datos externos.

```js
const list = document.querySelector("#items");

if (list) {
  const item = document.createElement("li");
  item.textContent = "Nuevo elemento";
  list.append(item);
}
```

Cuando ya no necesites el elemento, `item.remove()` lo quita del DOM. `appendChild()` y `removeChild()` también permiten agregar y quitar nodos mediante el nodo padre; para código nuevo, `append()` y `remove()` suelen ser más directos.

## Lee y modifica atributos

Para atributos conocidos como `href`, `src` o `disabled`, normalmente puedes usar la propiedad correspondiente del elemento. `getAttribute()`, `setAttribute()` y `removeAttribute()` sirven para leer, definir y quitar atributos HTML.

```js
const link = document.querySelector("a.help");

if (link instanceof HTMLAnchorElement) {
  link.setAttribute("aria-label", "Abrir ayuda");
  const destination = link.getAttribute("href");
  console.log(destination);
  link.removeAttribute("aria-label");
}
```

Valida los valores antes de asignar atributos que controlen destinos o recursos. Para cambiar el aspecto, usa clases CSS con `classList` en vez de escribir estilos en línea repetidamente.

## Consulta el navegador y navega a una URL

El objeto `navigator` expone información y capacidades del navegador. `navigator.platform` devuelve una cadena que puede dar una pista de la plataforma, pero no es una forma fiable de detectar el tipo de dispositivo o sistema operativo: los valores varían y pueden estar reducidos. Evita basar la lógica de tu sitio en expresiones regulares sobre `userAgent`; para adaptar el diseño, usa CSS responsive, y para usar una función, comprueba si está disponible.

```js
console.log(navigator.platform); // Solo una pista; no determina si es móvil.
console.log("share" in navigator); // Comprueba si existe la API Web Share.
```

Para leer la URL actual, usa `window.location.href` o el objeto `URL`, que permite consultar sus partes sin dividir el texto manualmente.

```js
const currentUrl = new URL(window.location.href);

console.log(currentUrl.href);
console.log(currentUrl.pathname);
```

Para navegar después de una acción, puedes asignar una URL a `window.location.href` o llamar a `window.location.assign()`. `assign()` conserva la página actual en el historial; `replace()` navega sin conservarla como entrada anterior. Para enlaces normales, prefiere un `<a href="/perfil">` en lugar de JavaScript. Si el destino viene de datos externos, valida que sea una URL permitida antes de navegar.

```js
window.location.assign("/perfil");
```

No uses enlaces `javascript:void(0)` como botones: las URLs `javascript:` mezclan navegación y código, y `void(0)` no es una forma adecuada de impedir una recarga. Usa `<button>` para ejecutar una acción y `<a href="...">` para navegar.

## Responde a eventos

Registra eventos con `addEventListener()`, indicando el tipo de evento y una función que se ejecuta cuando ocurre. Evita manejadores inline como `onclick` en el HTML: separar comportamiento y estructura facilita mantener el código.

```js
const button = document.querySelector("#save");

button?.addEventListener("click", () => {
  console.log("Se hizo clic en guardar");
});
```

No bloquees el menú contextual con `oncontextmenu="return false"` o cancelando el evento `contextmenu`. No protege el contenido y puede interferir con funciones habituales del navegador y con la experiencia de las personas. Si necesitas ofrecer una acción propia, agrega un control visible sin quitar las opciones nativas.
