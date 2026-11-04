---
title: Distingue los patrones MVC, MVP y MVVM
date: 2026-11-04
track: frontend
topic: Arquitectura
navTitle: MVC, MVP y MVVM
tags: Arquitectura, Patrones, Frontend
excerpt: Compara cómo MVC, MVP y MVVM separan los datos, la interfaz y la lógica de presentación.
---

MVC, MVP y MVVM son patrones para organizar responsabilidades en una aplicación. Sus nombres se parecen, pero cambia cómo se relacionan la lógica de presentación, los datos y la interfaz. Las implementaciones concretas varían según el lenguaje, el framework y las decisiones del proyecto.

## MVC: Modelo, Vista y Controlador

- **Modelo:** representa los datos y las reglas del dominio.
- **Vista:** presenta información y la interfaz.
- **Controlador:** recibe acciones o solicitudes, coordina el trabajo con el modelo y decide qué respuesta o vista mostrar.

El flujo exacto depende de la implementación: en algunas variantes la vista observa cambios del modelo; en otras, el controlador participa más directamente en actualizarla. MVC no exige un único flujo universal.

## MVP: Modelo, Vista y Presentador

- **Modelo:** contiene los datos y las reglas de la aplicación.
- **Vista:** muestra el estado y comunica las interacciones; idealmente, tiene poca lógica de presentación.
- **Presentador:** responde a las acciones de la vista, consulta o modifica el modelo y le indica a la vista qué mostrar.

La vista y el presentador suelen comunicarse mediante una interfaz. Esto facilita probar la lógica del presentador sin depender de una interfaz visual concreta, aunque puede añadir código de coordinación.

## MVVM: Modelo, Vista y VistaModelo

- **Modelo:** contiene los datos y las reglas de dominio.
- **Vista:** representa la interfaz.
- **VistaModelo:** expone el estado y las acciones que necesita la vista, sin depender directamente de sus detalles visuales.

La vista puede reflejar cambios del VistaModelo mediante enlace de datos o mecanismos reactivos, cuando la plataforma los ofrece. El enlace automático no es requisito universal del patrón: también puede implementarse con suscripciones y actualizaciones explícitas.

## ¿Cuál conviene elegir?

No hay un patrón mejor para todos los casos. Considera el tamaño de la aplicación, la complejidad de la interfaz, las herramientas del equipo y la facilidad para probar y mantener el código. Evita añadir capas que solo reenvían llamadas sin separar responsabilidades de verdad.

No asignes un patrón únicamente por el nombre de un framework. Angular ofrece herramientas para organizar aplicaciones por componentes y puede usarse con ideas de MVVM; React organiza la interfaz alrededor de componentes y estado, pero no es por sí mismo una implementación estricta de MVC o MVVM. En ambos casos, la arquitectura final depende de cómo se estructure la aplicación y de las bibliotecas que se elijan.
