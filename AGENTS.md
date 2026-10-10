# Manual SIU Diaguita — Contexto del proyecto

## Descripción
Sitio web estático que funciona como manual de usuario del sistema
SIU Diaguita de la Universidad Nacional de Salta (UNSa).
El manual explica cómo usar el sistema junto con una extensión
de navegador complementaria.

## Stack técnico
- Framework: Astro
- Lenguajes: HTML, CSS, JavaScript (sin frameworks reactivos)
- Deploy: Netlify

## Páginas del manual
- index → inicio
- altas → alta de bienes patrimoniales
- bajas → baja de bienes
- transferencias → transferencia entre sectores
- reasignaciones → reasignación de responsables

## Estructura de carpetas relevante
- src/pages/ → una página .astro por sección
- src/layouts/ → Layout.astro base compartido
- public/CSS/ → estilos
- public/Imagenes/ → capturas del sistema
- public/JavaScript/ → scripts cliente

## Comandos de desarrollo
- `npm run dev` → inicia servidor local (localhost:4321)
- `npm run build` → genera build en /dist/
- `npm run preview` → previsualiza build
- `astro dev --background` → servidor en segundo plano

## Restricciones
- No tocar /dist/ manualmente
- No agregar frameworks JS sin indicación explícita
- CSS separado del HTML, en /public/CSS/

## Documentación
- https://docs.astro.build