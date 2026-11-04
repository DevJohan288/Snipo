---
title: Elige el método de arreglo adecuado en JavaScript
date: 2026-11-04
track: frontend
topic: JavaScript
navTitle: Métodos de arreglos
tags: JavaScript, Arreglos
excerpt: Referencia práctica de métodos para modificar, buscar, transformar y recorrer arreglos.
---

Los métodos de arreglos se entienden mejor por el resultado que necesitas. Algunos modifican el arreglo original y otros devuelven un arreglo o valor nuevo.

## Agrega y elimina elementos

Estos métodos modifican el arreglo original:

- `push(...items)` agrega al final y devuelve la nueva longitud.
- `pop()` elimina y devuelve el último elemento.
- `unshift(...items)` agrega al inicio y devuelve la nueva longitud.
- `shift()` elimina y devuelve el primer elemento.
- `splice(start, deleteCount, ...items)` elimina, reemplaza o inserta elementos.

```js
const tasks = ["leer", "estudiar"];
tasks.push("practicar");
const firstTask = tasks.shift();
tasks.splice(0, 1, "repasar");
```

## Busca y comprueba elementos

- `includes(value)` indica si el arreglo contiene ese valor.
- `indexOf(value)` y `lastIndexOf(value)` devuelven la primera o última posición, o `-1`.
- `find(callback)` devuelve el primer elemento que cumple la condición; `findIndex(callback)` devuelve su posición. Si no hay coincidencia, devuelven `undefined` y `-1`, respectivamente.
- `findLast(callback)` y `findLastIndex(callback)` buscan desde el final.
- `some(callback)` indica si al menos un elemento cumple la condición; `every(callback)` comprueba si todos la cumplen.

```js
const numbers = [3, 8, 11, 14];
const firstEven = numbers.find((number) => number % 2 === 0);
const lastEvenIndex = numbers.findLastIndex((number) => number % 2 === 0);
const allPositive = numbers.every((number) => number > 0);
```

## Crea arreglos y transforma valores

Estos métodos devuelven un arreglo nuevo, sin modificar la estructura del original:

- `map(callback)` transforma cada elemento.
- `filter(callback)` conserva los elementos que cumplen una condición.
- `slice(start, end)` copia una parte; el índice final no se incluye.
- `concat(...arrays)` combina arreglos y valores.
- La sintaxis de propagación (`...`) también combina elementos de arreglos en un arreglo nuevo.
- `flat(depth)` aplana subarreglos hasta la profundidad indicada; `flatMap(callback)` transforma y aplana un nivel.
- `Array.from(iterable, callback)` crea un arreglo desde un iterable o un objeto similar a un arreglo.
- `Array.of(...items)` crea un arreglo con los argumentos recibidos.

`concat()` y la propagación son alternativas para combinar arreglos. La propagación requiere un iterable y crea una copia superficial: si contiene objetos o arreglos anidados, esas referencias siguen compartidas.

```js
const prices = [10, 20, 30];
const withTax = prices.map((price) => price * 1.15);
const highPrices = prices.filter((price) => price >= 20);
const firstTwo = prices.slice(0, 2);
const combined = prices.concat([40]);
const allPrices = [...prices, 40];
const digits = Array.from("123", Number);
const values = Array.of(3, 1, 2);
```

## Ordena, invierte y reemplaza

`sort()` y `reverse()` modifican el arreglo original. Sin comparador, `sort()` ordena como texto, por lo que conviene dar una función para números. `fill(value, start, end)` reemplaza un rango con el mismo valor y `copyWithin(target, start, end)` copia una parte dentro del propio arreglo; ambos mutan el original.

Las versiones nuevas `toSorted()`, `toReversed()` y `toSpliced()` devuelven un arreglo nuevo. `with(index, value)` devuelve una copia con un elemento reemplazado.

```js
const scores = [30, 5, 12];
const sortedScores = scores.toSorted((a, b) => a - b);
const reversedScores = scores.toReversed();
const updatedScores = scores.with(1, 10);

scores.sort((a, b) => a - b); // modifica scores
```

Usa `toSorted()` si necesitas conservar el orden del arreglo original. Si necesitas compatibilidad con entornos antiguos, puedes copiar primero con `[...scores].sort(...)`.

## Recorre y reduce

- `forEach(callback)` ejecuta una función por elemento; su retorno no crea un arreglo.
- `entries()`, `keys()` y `values()` permiten recorrer pares índice/valor, índices o valores mediante `for...of`.
- `reduce(callback, initialValue)` acumula de izquierda a derecha; `reduceRight()` lo hace de derecha a izquierda. Proporciona un valor inicial para que el resultado esté definido también con un arreglo vacío.

```js
const items = ["pan", "leche", "fruta"];
for (const [index, item] of items.entries()) {
  console.log(index, item);
}

const total = [5, 10, 15].reduce((sum, value) => sum + value, 0);
```

El arreglo también se puede recorrer con `for...of` directamente. El método adecuado depende de si quieres ejecutar una acción, transformar valores o producir un único resultado.

## Longitud, índices y texto

- `length` indica la cantidad de elementos; asignarle un valor menor puede truncar el arreglo.
- `at(index)` obtiene un elemento por posición y acepta índices negativos, como `at(-1)` para el último.
- `join(separator)` une los elementos en una cadena; `toString()` usa comas como separador.
- `toLocaleString()` convierte los elementos a texto según sus propias reglas de formato local.

```js
const names = ["Ana", "Luis", "Marta"];
const lastName = names.at(-1);
const label = names.join(" · ");
```

Los métodos de agrupación no son métodos de instancia del arreglo: `Object.groupBy()` y `Map.groupBy()` crean grupos a partir de un iterable en entornos que los admiten.
