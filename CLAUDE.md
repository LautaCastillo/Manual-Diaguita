# Manual SIU Diaguita — Contexto para Claude Code

## Qué es este proyecto
Sitio web estático construido con Astro que funciona como manual
de usuario del sistema SIU Diaguita de la UNSa (gestión de
patrimonio universitario). El manual documenta cómo usar el
sistema nativo junto con una extensión de navegador desarrollada
específicamente para mejorar su interfaz.

El sistema SIU Diaguita vive en: http://diaguitadev.unsa.edu.ar/diaguita/
El manual publicado está en: https://manualsiu-prueba.netlify.app/

## Stack
- Framework: Astro (generador de sitio estático)
- HTML + CSS + JS vanilla (sin frameworks reactivos)
- Deploy: Netlify (auto-deploy desde rama main)
- Sin backend, sin base de datos

## Estructura de páginas (src/pages/)
- index.astro → página principal / bienvenida
- altas.astro → sección: dar de alta bienes patrimoniales
- bajas.astro → sección: dar de baja bienes
- transferencias.astro → sección: transferir bienes entre sectores
- reasignaciones.astro → sección: reasignar responsables de bienes
- layouts/ → sublayouts específicos por sección (si existen)

## Layout compartido (src/layouts/)
- Layout.astro → envuelve todas las páginas, contiene nav y estructura base

## Assets estáticos (public/)
- public/CSS/ → estilos globales
- public/Imagenes/ → capturas de pantalla del sistema y la extensión
- public/JavaScript/ → scripts del lado cliente si los hay

## Convenciones del proyecto
- Un archivo .astro por sección del manual
- CSS en /public/CSS/, no estilos inline ni <style> en los componentes salvo excepciones
- Nombres de archivos en español (Imagenes, no Images)
- No agregar React, Vue ni ningún framework JS salvo decisión explícita mía

## Contexto de la extensión de navegador
La extensión NO está en este repositorio. Es un proyecto separado
que se instala como carpeta descomprimida en Chrome (extensión no
empaquetada). El manual hace referencia a ella pero no la contiene.
La extensión transforma la pantalla del SIU Diaguita en un
"Panel de trabajo" orientado a tareas.

## Comandos
- `npm run dev` → servidor local en localhost:4321
- `npm run build` → genera /dist/ para producción
- `npm run preview` → previsualiza el build local
- `astro dev --background` → modo background (no bloquea terminal)
- `astro dev stop` / `astro dev status` / `astro dev logs` → gestión del servidor

## Reglas para Claude
- No modificar /dist/ manualmente (se regenera con build)
- No mover archivos de src/pages/ sin avisar
- Mantener el CSS en /public/CSS/ separado del HTML
- Si agregás una página nueva, avisá para actualizar la navegación manualmente
- Las capturas de pantalla del manual van siempre en /public/Imagenes/
- Consultar la documentación de Astro antes de proponer cambios de routing o layouts

## Documentación de referencia
- Astro general: https://docs.astro.build
- Routing y páginas: https://docs.astro.build/en/guides/routing/
- Componentes Astro: https://docs.astro.build/en/basics/astro-components/
- Estilos: https://docs.astro.build/en/guides/styling/