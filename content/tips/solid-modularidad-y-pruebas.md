---
title: Diseña código mantenible con POO, SOLID y patrones
date: 2026-11-04
track: frontend
topic: Arquitectura
navTitle: POO y diseño
tags: Arquitectura, POO, SOLID, Pruebas
excerpt: Aplica POO, SOLID y patrones de diseño para organizar código claro, modular y fácil de probar.
---

La programación orientada a objetos (POO) organiza el código alrededor de objetos que combinan estado y comportamiento. Sus principios, junto con SOLID y los patrones de diseño, ayudan a estructurar sistemas; son herramientas para resolver problemas, no reglas que obliguen a crear clases, interfaces o capas para cada función.

## Los cuatro pilares de POO

- **Encapsulación:** protege el estado interno y permite cambiarlo mediante operaciones con reglas claras. No expongas datos mutables si quien usa el objeto puede dejarlo en un estado inválido.
- **Abstracción:** presenta lo necesario para usar una capacidad y oculta detalles que no hacen falta conocer. Una abstracción debe simplificar el uso, no esconder complejidad accidental.
- **Herencia:** permite especializar un tipo a partir de otro y compartir comportamiento cuando existe una relación genuina de sustitución. No la uses solo para evitar unas pocas líneas repetidas; considera composición cuando quieras combinar capacidades.
- **Polimorfismo:** permite que distintas implementaciones respondan al mismo contrato de formas apropiadas. Así, quien las usa puede trabajar con la capacidad común sin depender de cada clase concreta.

Estos conceptos no exigen que todo el código use clases. Funciones, módulos y composición también son formas válidas de organizar programas.

## Los cinco principios SOLID

- **S — Responsabilidad única (Single Responsibility):** procura que un módulo tenga un motivo claro para cambiar. Por ejemplo, separa el cálculo de una factura de su presentación o envío.
- **O — Abierto/cerrado (Open/Closed):** facilita agregar comportamientos sin modificar repetidamente código estable. Usa composición o estrategias cuando existan variaciones reales; no anticipes extensiones hipotéticas.
- **L — Sustitución de Liskov (Liskov Substitution):** una implementación derivada debe poder usarse donde se espera el tipo base sin romper sus condiciones o resultados prometidos. Si una subclase necesita excepciones que sorprenden a quien la usa, revisa la jerarquía.
- **I — Segregación de interfaces (Interface Segregation):** prefiere contratos pequeños y enfocados a interfaces amplias que obligan a implementar operaciones que un cliente no necesita.
- **D — Inversión de dependencias (Dependency Inversion):** la lógica de alto nivel debe depender de contratos estables, no quedar acoplada a detalles concretos como una base de datos o un servicio externo. La inyección de dependencias es una técnica posible para proporcionar esas implementaciones.

## Divide el proyecto en módulos cohesivos

Agrupa el código por capacidades o responsabilidades relacionadas y define límites claros. Un módulo cohesivo mantiene juntas las piezas que suelen cambiar por el mismo motivo; un acoplamiento bajo evita que cualquier cambio interno obligue a modificar muchas partes no relacionadas.

```text
src/
  orders/
    calculate-total.ts
    order-service.ts
  notifications/
    email-sender.ts
```

La estructura adecuada depende del tamaño del proyecto. No separes cada línea en un archivo ni crees módulos genéricos antes de saber qué partes necesitan evolucionar de forma independiente.

## Reutiliza cuando haya una abstracción clara

Extrae una función o componente cuando una operación se repite o tiene una responsabilidad reconocible. Evita duplicar reglas importantes, pero no fuerces una abstracción común solo porque dos fragmentos se parecen: si sus requisitos cambian de manera distinta, mantenerlos separados puede ser más claro.

La regla **DRY** (“no te repitas”) busca evitar duplicar conocimiento o reglas que deban mantenerse sincronizadas; no significa que cada línea parecida deba convertirse en una abstracción. **KISS** (“mantenlo simple”) invita a preferir la solución más sencilla que cumple los requisitos, sin sacrificar claridad ni comportamiento correcto.

Usa nombres que describan la intención y métodos con un propósito claro. Mantén juntas las responsabilidades relacionadas y divide una función cuando mezcle tareas con razones de cambio distintas. No fragmentes el código solo para cumplir un número arbitrario de líneas.

## Usa interfaces en los límites que lo necesitan

Una interfaz resulta útil cuando desacopla una política de una implementación reemplazable, por ejemplo, para probar un servicio sin conectarse a un proveedor externo. No hace falta crear una interfaz para cada clase: una llamada directa es más sencilla cuando no hay una variación o frontera que justifique el contrato.

```ts
interface UserRepository {
  findName(id: string): Promise<string | null>;
}

async function greetingFor(
  id: string,
  users: UserRepository,
): Promise<string> {
  const name = await users.findName(id);
  return name ? `Hola, ${name}` : "Usuario no encontrado";
}
```

La función depende del contrato del repositorio y puede probarse con una implementación pequeña en memoria, sin una base de datos real.

## Prueba comportamientos pequeños

Una prueba unitaria verifica una unidad de comportamiento con entradas y resultados esperados. Mantén las pruebas independientes de servicios externos; prueba las integraciones con esos servicios por separado.

```ts
import { strict as assert } from "node:assert";
import { test } from "node:test";

test("saluda cuando el repositorio encuentra el nombre", async () => {
  const users = {
    findName: async (id: string) => (id === "u1" ? "Ana" : null),
  };

  assert.equal(await greetingFor("u1", users), "Hola, Ana");
});
```

Escribe pruebas para resultados importantes, límites y errores esperados. Las pruebas ayudan a detectar regresiones, pero no garantizan por sí solas que el sistema esté libre de defectos; combina pruebas unitarias con pruebas de integración y revisiones adecuadas al proyecto.

## Refactoriza y usa patrones con propósito

Refactorizar es reorganizar el código sin cambiar su comportamiento observable. Haz cambios pequeños, ejecuta las pruebas y usa la nueva estructura para mejorar legibilidad, corregir duplicación real o aislar una parte difícil de probar. Practica primero en proyectos pequeños y estudia código existente para ver cómo se aplican los principios en contexto.

Los patrones de diseño nombran soluciones habituales a problemas que se repiten; no son plantillas que deban incorporarse siempre:

- **Factory:** centraliza la creación cuando elegir o configurar distintos tipos de objeto requiere lógica.
- **Strategy:** permite intercambiar una regla o algoritmo detrás de una misma interfaz.
- **Observer:** notifica a suscriptores cuando cambia un estado o sucede un evento.
- **Singleton:** restringe una clase a una instancia compartida; úsalo con cautela porque el estado global puede dificultar pruebas y crear acoplamiento.

Antes de introducir un patrón, confirma que resuelve un problema presente y que mejora la comprensión del código. Una condición sencilla suele ser mejor que una jerarquía o fábrica innecesaria.
