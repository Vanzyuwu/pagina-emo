---
name: VANZY
description: Mi rincón de internet para amigos — perfil MySpace 2006, Scene / Emo / Y2K, neón sobre noche estrellada.
colors:
  noche: "#0b0716"
  panel: "#140828"
  neon-cyan: "#00ffff"
  neon-fucsia: "#ff007f"
  neon-morado: "#b026ff"
  texto: "#f1e9ff"
  texto-suave: "#b9a8d9"
  blanco: "#ffffff"
typography:
  display:
    fontFamily: "Metal Mania, Impact, fantasy"
    fontSize: "clamp(3rem, 12vw, 6rem)"
    fontWeight: 400
    lineHeight: 1.05
  headline:
    fontFamily: "Metal Mania, Impact, fantasy"
    fontSize: "clamp(1.75rem, 5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "VT323, Courier New, monospace"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Space Mono, Courier New, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "VT323, Courier New, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  sm: "6px"
  md: "10px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
components:
  menu-pildora:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.pill}"
    padding: "0.35rem 1.25rem"
  menu-link:
    textColor: "{colors.neon-cyan}"
    typography: "{typography.label}"
    height: "44px"
    padding: "0 0.5rem"
  menu-link-activo:
    textColor: "{colors.blanco}"
  ventana:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.md}"
    padding: "1rem"
  ventana-barra:
    backgroundColor: "{colors.neon-morado}"
    textColor: "{colors.blanco}"
    typography: "{typography.title}"
    padding: "0.25rem 0.75rem"
  boton:
    backgroundColor: "{colors.neon-fucsia}"
    textColor: "{colors.noche}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 1.25rem"
  chip-mood:
    backgroundColor: "{colors.noche}"
    textColor: "{colors.neon-cyan}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.15rem 0.75rem"
---

# Design System: VANZY

## Overview

**Creative North Star: "El perfil de MySpace a las 3 AM: una casa, cinco cuartos"**

VANZY es un perfil personal de 2006 que alguien sigue editando de madrugada: noche violeta casi negra, estrellas de colores que suben, y neón cyan/fucsia/morado que zumba como un letrero. No es una "estética retro" de plantilla: es un perfil con dueño, con bandas, películas, juegos, fotos y un libro de visitas. El brillo, el parpadeo y el glitch son la voz del sitio y son **intencionales**; ninguna revisión debe "arreglarlos".

Es para amigos y gente que quiere conocer a Vanzy, no para reclutadores: el tono es cercano, cute y con chistes (uwu, :3, ♡ bienvenidos en todas partes). Es la versión 2.0 del sitio Astro anterior: trae todo su contenido y sus mundos, mejor hechos.

La página es una sola, con anclas (`#inicio #musica #juegos #fotos #foro`). Cada sección es un **cuarto** de la misma casa: comparten la noche estrellada, el menú píldora y los tokens neón, pero cada cuarto tiene su propia onda (ver Layout → Cuartos). El primer pantallazo ya es el perfil: título compacto y debajo las dos columnas MySpace con bio, status y "cositas sobre mí".

La página está viva: el mood, lo que suena, la canción del Winamp y las fotos se cambian seguido desde un solo archivo (`datos.js`), y siempre se ve la fecha de la última actualización.

**Key Characteristics:**
- Noche estrellada fija detrás de todo; el contenido flota encima en ventanas translúcidas.
- Tres neones con roles fijos: cyan = interactivo, fucsia = acento/acción, morado = estructura/profundidad.
- Tres fuentes con roles fijos: Metal Mania grita, VT323 etiqueta, Space Mono cuenta.
- Movimiento constante pero barato (transform/opacity), y apagado completo con `prefers-reduced-motion`.
- Una sola página con anclas; el menú píldora siempre dice dónde estás.
- Cinco cuartos con personalidad propia sobre una base común.
- Todo el contenido vive en `datos.js`; el HTML no se toca para actualizar.

## Colors

Una noche violeta con tres neones saturados; el color es luz, no relleno.

### Primary
- **Cyan Letrero** (neon-cyan): todo lo que se clickea — links del menú, links en texto, subtítulos interactivos. Si es cyan, se puede tocar.

### Secondary
- **Fucsia Corazón** (neon-fucsia): acento y acción — borde y glow de la píldora, corazón que late, botones ("firmar el libro"), hover/foco de links, estado activo del menú.

### Tertiary
- **Morado Moretón** (neon-morado): estructura y profundidad — barras de título de ventanas, glow lejano del wordmark, halo de la calavera. No se usa para texto pequeño (contraste 4.3:1 sobre noche).

### Neutral
- **Noche** (noche): fondo de página.
- **Panel** (panel): fondo de ventanas y de la píldora, siempre translúcido (85%) para dejar ver las estrellas.
- **Texto Lavanda** (texto): texto de lectura.
- **Lavanda Gastada** (texto-suave): metadatos, fechas, años, autores, "escuchando ahora".
- **Blanco Tubo** (blanco): núcleo del neón — wordmark, texto en hover/activo, texto sobre barras moradas.

### Named Rules
**The Cyan Se Toca Rule.** Cyan significa interactivo. Texto estático nunca va en cyan salvo el subtítulo del wordmark.

**The Luz No Relleno Rule.** Los neones se usan como borde, glow o texto; nunca como fondo de una superficie grande. La excepción son la barra de título de una ventana y el botón.

## Typography

**Display Font:** Metal Mania (con Impact)
**Label/Menu Font:** VT323 (con Courier New)
**Body Font:** Space Mono (con Courier New)

**Character:** Metal Mania es el póster de la banda, VT323 es la pantalla de la consola y Space Mono es la libreta. Juntas suenan a 2006 sin volverse ilegibles.

### Hierarchy
- **Display** (400, clamp(3rem, 12vw, 6rem), 1.05): solo el wordmark VANZY. Uno por página.
- **Headline** (400, clamp(1.75rem, 5vw, 2.5rem), 1.1): título de cada sección ancla (MÚSICA, JUEGOS, FOTOS, FORO), con glow fucsia.
- **Title** (400, 1.5rem, 1.2): barras de título de ventanas, nombres de bandas y juegos.
- **Body** (400, 0.95rem, 1.6): bio, listas, descripciones. Máximo ~65ch por línea.
- **Label** (400, 1.25rem, 1.2, 0.04em): menú, chips de mood, botones, metadatos cortos.

### Named Rules
**The Un Solo Grito Rule.** Metal Mania solo en el wordmark y en títulos de sección. Nunca en párrafos, botones ni barras de ventana.

**The Fuente Del Cuarto Rule.** Cada cuarto puede sumar UNA fuente de acento, solo para sus títulos internos y etiquetas: Música → Special Elite (máquina de escribir), Juegos → Press Start 2P (arcade), Fotos → Permanent Marker (plumón en polaroids). Inicio y Foro no suman ninguna. Nunca en párrafos.

**The Glifo Seguro Rule.** VT323 no tiene buenos `~`; los adornos usan ✦ ♡ ★ ☆ ⋆ y no `~*~`. Los textos decorativos de varias palabras llevan `text-wrap: balance` y `line-height: 1.2`.

## Layout

Mobile-first. Contenedor centrado de máx. 1100px con `padding: 1rem`. Debajo de 800px todo va en una columna; desde 800px el perfil usa la grilla MySpace `1.6fr 1fr` (izquierda: bio, Top Bandas, películas, libros; derecha: status/mood, Spotify, cositas sobre mí). Las secciones ancla posteriores (#musica, #juegos, #fotos, #foro) pueden usar sus propias grillas (polaroids en `repeat(auto-fill, minmax(160px, 1fr))`).

El ritmo vertical usa la escala de spacing: `lg` (1.5rem) entre ventanas, `xl` (2rem) entre bloques mayores y ~4rem entre secciones ancla. El título va compacto (`margin: 1.5rem 0 1.5rem`) para que el perfil asome en el primer pantallazo a 1440×900 y a 390×844.

### Cuartos

- **Inicio — "El perfil":** ventanas neón translúcidas en grilla MySpace, Top Bandas con tarjetas que giran, stickers dentro de los márgenes.
- **Música — "La sala de ensayo":** grunge/brutalista. Reproductor Winamp (barra blanca, display fucsia con marquesina y ecualizador), separadores de alambre de púas, cajas negras con bordes blancos y sombra dura blanca (`6px 6px 0 #fff`), BANDA_ACTUAL, x_BANDAS_MUERTAS_x tachadas en fucsia con cinta de género, polaroids con cinta adhesiva para las tocatas. Aquí la sombra dura sí es del mundo.
- **Juegos — "El arcade":** synthwave. Grilla 3D en perspectiva con horizonte fucsia, scanlines, tarjeta de Valorant y juegos favoritos como cartuchos con glow cyan. Datos escritos a mano, sin APIs.
- **Fotos — "El rollo revelado":** álbum MySpace sobre estática y garabatos blancos (canvas), viñeta oscura, fotos en polaroid con leyenda en plumón, "currently listening to" arriba.
- **Foro — "El muro":** guestbook morado: firmas como mensajes de muro con nick, fecha y texto; reglas del foro al lado; botón "firmar" que abre Instagram/WhatsApp.

Cada cuarto empieza con un título de sección y su fondo propio se limita a su bloque (no reemplaza la noche estrellada global).

**The Nada Se Sale Rule.** Ningún elemento decorativo (stickers, glows) se posiciona fuera del contenedor con offsets negativos; `overflow-x: hidden` en body es una red, no una solución.

## Elevation & Depth

La profundidad es luz, no sombra: el sistema no usa sombras oscuras. Las capas se separan con glow neón y con la translucidez del panel sobre las estrellas.

### Shadow Vocabulary
- **Glow Cyan** (`0 0 4px #00ffff, 0 0 12px #00ffff, 0 0 24px #00ffff`): texto interactivo en hover.
- **Glow Fucsia** (`0 0 4px #ff007f, 0 0 12px #ff007f, 0 0 24px #ff007f`): píldora, hover/foco/activo de links, botón.
- **Glow Morado** (`0 0 4px #b026ff, 0 0 12px #b026ff, 0 0 24px #b026ff`): ventanas en reposo (versión suave, una sola capa de 12px) y halo de la calavera.
- **Brillo Interior** (`inset 0 0 12px rgba(255, 0, 127, 0.35)`): solo en la píldora.

### Named Rules
**The Tubo De Neón Rule.** Un glow fuerte (3 capas) por zona visual. Las ventanas en reposo llevan glow suave; el fuerte se reserva para hover, foco y el elemento activo.

## Shapes

Dos formas: la píldora (999px) para todo lo que es navegación o acción — menú, botones, chips — y la ventana de esquinas suaves (10px) para contenido. Los bordes son de 2px y del color neón del rol. Las fotos de polaroid y las portadas son rectángulos con radio pequeño (6px). Las tarjetas de bandas giran en 3D (flip) mostrando foto de banda → portada del álbum.

## Components

### Navigation (menú píldora)
- **Character:** un letrero de neón fucsia flotando arriba al centro.
- **Estructura:** `[inicio] [música] 💀 [juegos] [fotos] [foro]`, la calavera al centro como ornamento `aria-hidden`. En móvil la píldora puede partirse en dos filas, nunca hacer scroll horizontal.
- **Default:** links cyan VT323 con glow suave de 6px, altura táctil 44px.
- **Hover / Focus:** texto blanco con Glow Fucsia, `scale(1.1) rotate(-3deg)`. Foco además con `outline: 2px dashed` fucsia y `outline-offset: 4px`.
- **Activo:** el link de la sección visible (IntersectionObserver) lleva `aria-current="true"`, texto blanco, Glow Fucsia fijo y subrayado fucsia.
- **Calavera:** flota (3s); en hover gira una vez. La vuelta al flotado no debe dar salto.

### Ventana (signature)
- **Character:** una ventanita de programa de 2006 sobre la noche estrellada.
- **Corner Style:** 10px.
- **Background:** panel al 85%, borde 2px morado con glow morado suave.
- **Barra de título:** morado sólido, texto blanco VT323 1.5rem, con adorno a la izquierda (✦) y tres "botones" decorativos a la derecha (`aria-hidden`).
- **Internal Padding:** 1rem.

### Buttons
- **Shape:** píldora (999px), altura 44px.
- **Primary:** fucsia sólido con texto noche VT323 (blanco sobre fucsia no llega a 4.5:1); hover con Glow Fucsia y `translateY(-2px)`; foco con outline dashed blanco.
- **Ghost:** borde 2px cyan, texto cyan, fondo transparente; hover rellena con panel y Glow Cyan.

### Chips (mood / status)
- **Style:** fondo noche, borde 1px cyan, texto cyan VT323. Ej.: "mood: ☆ nostálgic@", "escuchando: Paramore".

### Tarjeta de banda (flip)
- Cara A: foto de la banda + nombre; cara B: portada del álbum + link a Spotify. Gira en hover y en foco del teclado; con reduced-motion cambia sin animación.

### Polaroid
- Marco blanco hueso con margen inferior más ancho para la leyenda en VT323, rotación aleatoria leve (±3deg) que se endereza en hover.

### Skip link
- Oculto hasta recibir foco; aparece arriba a la izquierda como botón primario (texto noche): "saltar al contenido".

## Do's and Don'ts

### Do:
- **Do** mantener las 5 animaciones (estrellas, parpadeo del título, glitch, calavera, corazón); animar solo `transform` y `opacity`.
- **Do** apagar toda animación y transición dentro de `@media (prefers-reduced-motion: reduce)`, dejando las estrellas quietas pero visibles.
- **Do** escribir el wordmark como **VANZY** en h1, `<title>` y metadatos; uwu/:3/♡ son bienvenidos en todo el copy.
- **Do** mostrar en el footer la fecha de "última actualización" (sale de `datos.js`) y un "hecho con ♡ por Vanzy".
- **Do** poner todo el contenido editable (mood, escuchando, Winamp, bandas, pelis, libros, juegos, fotos, firmas) en `datos.js`, con comentarios simples en español.
- **Do** dar a todo lo interactivo foco visible (outline dashed fucsia) y 44px de alto táctil.
- **Do** usar contenido real en las ventanas (bandas, pelis, libros, juegos, fotos del proyecto anterior).

### Don't:
- **Don't** quitar ni "suavizar" el glow neón, el parpadeo o el glitch: son la identidad.
- **Don't** usar `filter` animado en las estrellas ni en elementos repetidos; usa `opacity`.
- **Don't** posicionar stickers o decoraciones con offsets negativos que se salgan del contenedor.
- **Don't** agregar una cuarta fuente ni colores fuera de los tokens (nada de slate, #6b21a8 sueltos).
- **Don't** usar cajas idénticas en todos los cuartos; cada cuarto tiene su propio contenedor (ventana neón, caja grunge, cartucho arcade, polaroid, mensaje de muro).
- **Don't** conectar APIs con llaves en el cliente (Steam, Valorant) ni formularios que fallen en silencio; el foro es estático o "próximamente".
- **Don't** dejar textos rotos o de relleno ("peliculas favoitas", chats falsos sin sentido) ni `~*~` en VT323.
