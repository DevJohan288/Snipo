---
title: Audita una página con Lighthouse en Chrome
date: 2026-11-04
track: frontend
topic: Herramientas
navTitle: Auditoría Lighthouse
tags: Chrome, Rendimiento, Accesibilidad
excerpt: Genera un informe de rendimiento, accesibilidad, buenas prácticas y SEO desde DevTools.
---

Lighthouse analiza una página y genera recomendaciones en categorías como rendimiento, accesibilidad, buenas prácticas y SEO. Sus resultados son diagnósticos para orientar mejoras, no una garantía de que el sitio sea rápido, accesible o esté bien posicionado.

## Abre la página y DevTools

- Abre en Chrome la URL que quieras probar. Puedes usar una ventana de incógnito para reducir la influencia de extensiones, pero no garantiza una medición limpia: la red, el dispositivo, el servidor y otras condiciones también afectan los resultados.
- Abre las herramientas para desarrolladores con `Ctrl+Shift+I` en Windows o Linux, o `Cmd+Option+I` en macOS. También puedes hacer clic derecho en la página y elegir **Inspeccionar**.
- Busca la pestaña **Lighthouse**. Si no aparece, abre las pestañas adicionales desde el botón `>>`.

## Configura y ejecuta la auditoría

- Elige el dispositivo que quieras simular, por ejemplo, móvil o escritorio.
- Selecciona las categorías que te interesan: **Rendimiento**, **Accesibilidad**, **Buenas prácticas** y **SEO**. Las opciones disponibles dependen de la versión de Chrome y Lighthouse.
- El modo **Navigation** analiza una carga nueva de la página y suele ser el adecuado para empezar.
- Pulsa **Analyze page load** o el botón equivalente para generar el informe.

Mientras Lighthouse ejecuta la prueba, evita interactuar con la página. Al terminar, revisa las puntuaciones, los diagnósticos y las recomendaciones de cada categoría; abre las secciones del informe para ver los detalles.

## Interpreta y compara los resultados

Las puntuaciones pueden variar entre ejecuciones por las condiciones de red, carga del equipo, caché y cambios en la página o en Lighthouse. Para comparar cambios, usa el mismo dispositivo y modo, mantén condiciones similares y repite la medición. Investiga cada recomendación y valida que resolverla mejore la experiencia real: una puntuación no reemplaza las pruebas con personas, la revisión manual de accesibilidad ni la supervisión en producción.

Consulta la [guía de Lighthouse en Chrome DevTools](https://developer.chrome.com/docs/devtools/lighthouse/) para conocer las opciones actualizadas.
