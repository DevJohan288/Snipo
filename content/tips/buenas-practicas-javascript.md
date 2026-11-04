---
title: Escribe JavaScript más claro y seguro
date: 2026-11-04
track: frontend
topic: JavaScript
navTitle: Buenas prácticas JS
tags: JavaScript, Buenas prácticas
excerpt: Elige declaraciones y métodos claros, espera promesas y trata el texto del usuario como texto.
---

Pequeñas decisiones hacen el código JavaScript más predecible. Estas prácticas son pautas, no reglas absolutas: elige la opción que mejor expresa la intención.

## Declara variables con `const` y `let`

Prefiere `const` cuando no reasignas la variable y `let` cuando su valor debe cambiar. Evita `var` en código nuevo: tiene reglas de alcance distintas que pueden causar confusión. `const` no vuelve inmutable un objeto o arreglo; solo impide reasignar esa variable.

```js
const name = "Ana";
let age = 30;
age += 1;

const settings = { theme: "light" };
settings.theme = "dark";
```

## Compara valores con `===`

`===` compara sin convertir tipos; `==` puede convertirlos antes de comparar. Usa la igualdad estricta por defecto para que la comparación sea explícita.

```js
30 === "30"; // false
30 == "30"; // true: convierte el texto a número
```

## Elige la función según el contexto

Las funciones flecha son concisas y heredan `this` del ámbito donde se crean. Las funciones declaradas son útiles, entre otros casos, cuando necesitas una función con nombre o el comportamiento propio de `this`. No es necesario reemplazar todas las funciones por flechas.

```js
const add = (a, b) => a + b;

function describe(value) {
  return `Valor: ${value}`;
}
```

## Usa el método de arreglo que exprese la intención

`forEach` ejecuta una acción por elemento, `map` crea un arreglo transformado y `filter` crea uno nuevo con los elementos que cumplen una condición. `find` devuelve el primer elemento que cumple una condición o `undefined`; `some` indica si al menos un elemento la cumple. `reduce` combina los elementos para producir un único resultado, como una suma.

```js
const numbers = [1, 2, 3];
numbers.forEach((number) => console.log(number));

const doubled = numbers.map((number) => number * 2);
const withoutTwo = numbers.filter((number) => number !== 2);
const firstEven = numbers.find((number) => number % 2 === 0);
const hasEven = numbers.some((number) => number % 2 === 0);
const total = numbers.reduce((sum, number) => sum + number, 0);
```

Pasa un valor inicial a `reduce` para definir claramente el acumulador y evitar errores con arreglos vacíos. Métodos como `splice` modifican el arreglo original; `filter` crea otro arreglo, pero no copia profundamente los objetos que contiene. Elige cada método según el resultado que necesitas y evita usar `map` si no vas a utilizar el arreglo transformado.

## Espera las promesas y trata los errores

Dentro de una función `async`, usa `await` para obtener el resultado de una promesa antes de usarlo. Maneja los errores en el nivel donde puedas informar a la persona o recuperarte. Con `fetch`, recuerda que una respuesta HTTP como 404 no rechaza la promesa; comprueba `response.ok`.

```js
async function loadData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch (error) {
    showError("No se pudieron cargar los datos.");
    throw error;
  }
}
```

`showError` representa la función de la aplicación que muestra el mensaje. Si encadenas varias operaciones asíncronas que dependen una de otra, `async`/`await` puede hacer más claro el flujo; para tareas independientes, las promesas también pueden ejecutarse en paralelo con `Promise.all`.

## Inserta texto no confiable como texto

No uses `innerHTML` para insertar texto recibido de una persona o de otra fuente no confiable: el navegador lo interpreta como HTML. Para mostrar texto plano, usa `textContent`. Reserva `innerHTML` para marcado de confianza o contenido sanitizado con una solución adecuada.

```js
const content = document.querySelector("#content");
if (content) {
  content.textContent = userInput;
}
```

El ejemplo trata el caso en que el elemento no existe. En una aplicación real, valida también el origen y el formato de los datos según lo que necesites hacer con ellos.
