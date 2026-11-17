---
name: VANZY.EXE
description: Mi rincón de internet como un escritorio Y2K — ventanas neón sobre una noche que se mueve.
colors:
  noche: "#0b0716"
  panel: "#12081f"
  panel-claro: "#1d0f30"
  neon-fucsia: "#ff007f"
  neon-morado: "#b026ff"
  morado-hondo: "#5b1690"
  neon-cyan: "#00ffff"
  texto: "#f1e9ff"
  texto-suave: "#b9a8d9"
  papel: "#ffd6ea"
  tinta: "#1a0d1f"
typography:
  marca:
    fontFamily: "Metal Mania, Impact, fantasy"
    fontSize: "clamp(3.5rem, 7vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.9
  sistema:
    fontFamily: "VT323, Courier New, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.15
  texto:
    fontFamily: "Space Mono, Courier New, monospace"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  ninguno: "0px"
  sm: "4px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
components:
  ventana:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.texto}"
    rounded: "{rounded.ninguno}"
  ventana-barra:
    backgroundColor: "{colors.morado-hondo}"
    textColor: "{colors.texto}"
    typography: "{typography.sistema}"
    height: "30px"
  ventana-barra-activa:
    backgroundColor: "{colors.neon-fucsia}"
    textColor: "{colors.tinta}"
  boton-sistema:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.texto}"
    typography: "{typography.sistema}"
    height: "36px"
  boton-inicio:
    backgroundColor: "{colors.neon-fucsia}"
    textColor: "{colors.tinta}"
    typography: "{typography.marca}"
    height: "38px"
  postit:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    typography: "{typography.sistema}"
---

# Design System: VANZY.EXE

## Overview

**Creative North Star: "Mi compu a las 3 AM"**

El inicio es un escritorio de 2002 que vive dentro del navegador. Es para amigos y gente que quiere conocer a Vanzy: entras a su compu, abres ventanas y curioseas. Se ve oldschool (barras de título, íconos, barra de tareas, winamp, post-it) pero está hecho con herramientas actuales: canvas, `@property`, gradientes cónicos animados, Pointer Events y `prefers-reduced-motion`.

**Key Characteristics:**
- La metáfora manda: todo el contenido vive en ventanas que se mueven, minimizan, maximizan y cierran.
- Una protagonista: **perfil.exe**, la ventana activa al llegar, la más grande y con la orilla neón animada.
- Fondo vivo pero lento: auroras, estrellas con parallax y el VANZY gigante del wallpaper que se dibuja como tubo de neón.
- El contenido sale de `datos.js`; el HTML no se toca para actualizar.

## Colors

Noche violeta con tres neones de rol fijo; el neón es luz, no relleno.

### Primary
- **Fucsia Corazón** (neon-fucsia): lo activo y la acción — barra de la ventana activa (con texto tinta, 5.2:1), botón Inicio, foco, lo que "está pasando ahora".

### Secondary
- **Morado Moretón** (neon-morado): la estructura en reposo — bordes y scrollbar. Nunca detrás de texto chico (texto claro encima queda en 3.9:1).
- **Morado Hondo** (morado-hondo): barras de ventanas inactivas y pestaña elegida; texto claro encima a 7:1.

### Tertiary
- **Cyan Pantalla** (neon-cyan): lo que se toca y lo que es "pantalla" — íconos, links, el LCD del winamp, chips.

### Neutral
- **Noche** (noche): fondo del escritorio.
- **Panel** / **Panel claro**: cuerpo de ventanas y del menú Inicio.
- **Texto Lavanda** / **Lavanda Gastada**: lectura y metadatos.
- **Papel Chicle** (papel) + **Tinta** (tinta): el post-it y los botones de sistema.

**The Una Orilla Viva Rule.** Solo la ventana activa lleva la orilla neón animada. Las demás quedan quietas en morado.

## Typography

**Marca:** Metal Mania · **Sistema:** VT323 · **Texto:** Space Mono

- **Marca** (clamp(3.5rem, 7vw, 5.5rem), 0.9): solo VANZY — en perfil.exe, el wallpaper y el botón Inicio.
- **Sistema** (1.25rem, 1.15): todo lo que es "la compu" — barras de título, íconos, barra de tareas, menú, chips, LCD, post-it.
- **Texto** (0.9rem, 1.6): lo que se lee — bio y descripciones, máx. ~60ch.

**The La Compu Habla En VT323 Rule.** Si es interfaz del sistema, es VT323. Si es Vanzy hablando, es Space Mono.

## Layout

Escritorio (≥ 900px): el escritorio ocupa la pantalla menos la barra de tareas (48px); íconos en columna a la izquierda; ventanas con posición inicial definida en CSS y arrastrables (la posición se guarda en el navegador). Alto mínimo 760px.

Celular (< 900px): el escritorio se vuelve una columna: íconos en grilla de 4, ventanas apiladas a lo ancho, sin arrastre; "minimizar" pliega la ventana. La barra de tareas queda fija abajo.

Stickers: en escritorio viven en el wallpaper (esquinas libres), siempre debajo de las ventanas; en celular, una fila al final.

## Elevation & Depth

Profundidad por apilamiento de ventanas: la activa queda encima, con orilla neón y glow fucsia; las inactivas llevan sombra dura negra (`6px 6px 0 rgba(0,0,0,.55)`) como en los sistemas viejos.

## Shapes

Esquinas rectas (0px) en ventanas, botones y barra de tareas — es un sistema operativo, no una app. Solo los chips usan 4px. Bordes de 2px.

## Components

- **Ventana:** barra de título (ícono + nombre.exe + `_ □ ×`), cuerpo en panel con scroll propio. Abre desde 0.96 de escala + opacidad (220ms, ease-out fuerte); cierra más rápido (160ms).
- **Ícono de escritorio:** SVG de trazo 2px en cyan, etiqueta VT323. Un clic abre.
- **Barra de tareas:** botón Inicio VANZY, una pestaña por ventana abierta (la activa hundida), bandeja con mood y reloj.
- **Menú Inicio:** franja vertical "VANZY 2.0", lista de programas, fecha de última actualización.
- **Winamp:** LCD cyan con marquesina, tiempo, ecualizador y controles; la playlist de Spotify se carga recién cuando se pide.
- **Tarjeta de banda:** gira en 3D (foto → disco) en hover/foco; en celular, el primer toque gira.
- **Post-it (cositas.txt):** papel chicle, cinta, levemente chueco.
- **Aviso "instalando…":** para las secciones que vienen después (música, juegos, fotos, foro).
- **Intro:** pantalla negra; VANZY se dibuja con el trazo de colores (fucsia → morado → cyan), se enciende parpadeando como neón y se desvanece hacia el escritorio (~5.7 s). Una vez por visita (sessionStorage), se salta con cualquier clic o tecla y no aparece con movimiento reducido.
- **Monitos (stickers):** se arrastran en escritorio y recuerdan su lugar; al agarrarlos se levantan (escala 1.1 + sombra más larga). Viven debajo de las ventanas. En celular quedan fijos en una fila.

## Do's and Don'ts

### Do:
- **Do** animar solo `transform`, `opacity` y el ángulo del gradiente cónico; easing `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Do** dejar un solo momento de autor: la intro + el arranque (VANZY que se dibuja y se enciende, luego las ventanas aparecen escalonadas).
- **Do** apagar el movimiento con `prefers-reduced-motion` (fondo quieto, sin dibujo, ventanas sin escalar).
- **Do** usar íconos SVG dibujados con un solo grosor, no emojis.
- **Do** mantener contraste ≥ 4.5:1 en todo texto de lectura.

### Don't:
- **Don't** usar la página anterior como base visual; solo sus imágenes y contenido.
- **Don't** tapar contenido con stickers.
- **Don't** cargar embeds de terceros (Spotify) antes de que la persona los pida.
- **Don't** agregar colores fuera de los tokens ni una cuarta fuente.
