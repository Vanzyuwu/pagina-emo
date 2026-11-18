---
name: VANZY.EXE
description: Mi rincón de internet como un escritorio Y2K emo — ventanas 98 con bisel neón sobre una noche de estrellas pixel.
colors:
  noche: "#0b0716"
  panel: "#12081f"
  panel-claro: "#1d0f30"
  neon-fucsia: "#ff007f"
  neon-morado: "#b026ff"
  morado-hondo: "#5b1690"
  neon-cyan: "#00ffff"
  zumbido: "#ffd23f"
  texto: "#f1e9ff"
  texto-suave: "#b9a8d9"
  papel: "#ffd6ea"
  tinta: "#1a0d1f"
  bisel-luz: "#c98bff"
  bisel-sombra: "#05020a"
typography:
  marca:
    fontFamily: "Metal Mania, Impact, fantasy"
    fontSize: "clamp(3.2rem, 5.6vw, 4.6rem)"
    lineHeight: 0.9
  sistema:
    fontFamily: "VT323, Courier New, monospace"
    fontSize: "1.25rem"
    lineHeight: 1.15
  texto:
    fontFamily: "Space Mono, Courier New, monospace"
    fontSize: "0.86rem"
    lineHeight: 1.65
rounded:
  ninguno: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "20px"
---

# VANZY.EXE — sistema visual

**Idea:** "Mi compu a las 3 AM". Un Windows 98/XP versión emo/scene dentro del navegador: oldschool por fuera, CSS/JS actual por dentro. Es para amigos y gente que quiere conocer a Vanzy. El glow y el caos 2006 son intencionales.

## Tokens

| Token | Uso |
|---|---|
| `noche` | fondo del escritorio (estrellas pixel en canvas) |
| `panel` / `panel-claro` | cuerpo de ventanas, menú, barra de tareas |
| `fucsia` | lo activo: barra de la ventana activa (texto `tinta`, 5:1), botón Inicio, foco |
| `morado` | estructura: degradado de barras, orilla neón |
| `morado-hondo` | barras inactivas y "seleccionado" (texto claro, 9:1) |
| `cyan` | lo que se toca: íconos, links, LCD, reloj |
| `zumbido` | SOLO el botón ZUMBIDO y sus mensajes (amarillo MSN) |
| `papel` + `tinta` | post-its (cositas, secretos) y globito de la bandeja |
| `bisel-luz` / `bisel-sombra` | bisel 98: luz arriba-izquierda, sombra abajo-derecha (hundido = al revés) |

**Fuentes:** Metal Mania solo para VANZY · VT323 para todo lo que es "la compu" · Space Mono para lo que Vanzy dice.

## Componentes

- **Ventana:** bisel 98 + sombra dura. Barra de título en degradado (inactiva `morado-hondo → panel-claro`; activa `fucsia → morado`). Botones `_ □ ×` con bisel. Barra de estado tipo Explorer abajo. La activa lleva la **orilla neón que gira** (solo una a la vez).
- **Íconos:** SVG de trazo 2px en cyan, etiqueta VT323. Abierto = etiqueta pintada `morado-hondo` (como selección de Windows). Papelera abajo a la izquierda.
- **about_me.exe:** protagonista, se abre sola. Foto chueca, VANZY, saludo, bio, quote (espacio marcado), blinkies.
- **escuchando ahora (MSN):** contacto + estado, Spotify (se carga solo al apretar "escuchar"), chat, **botón ZUMBIDO** amarillo. Preparado para Last.fm.
- **Zumbido:** pantalla tiembla 0.5 s + "bzzz" + "Vanzy te ha enviado un zumbido!!" (VT323) en el chat y en el globito. Espera de 3 s. Movimiento reducido → la ventana parpadea en amarillo, sin moverse.
- **Barra de tareas:** Inicio VANZY, pestañas con bisel (activa hundida), bandeja hundida con MSN, zumbido, volumen (silenciar), mood y reloj.
- **Stickers:** con cinta rayada, chuecos, flotan lento, se arrastran; 3 clics = riff (`audio/`). Viven debajo de las ventanas. Uno escondido (corazón en el borde derecho).
- **Papelera:** archivos protegidos (candado) que se abren con Konami, palabra secreta o el sticker escondido. Destello neón al descubrir uno.
- **Avisos "próximamente":** música, sobre mí, galería, gifs randoms, cada uno con su chiste y barra de progreso.

## Movimiento (caos 2006, bien hecho)

- Momento de autor: intro (VANZY se dibuja y se enciende) → wallpaper se dibuja → íconos y ventanas aparecen escalonados.
- Ambiente: estrellas pixel que suben con parallax, auroras lentas, letrero que parpadea, orilla que gira, stickers que flotan, blinkies.
- Ráfagas: un glitch cada 6–13 s sobre **una** cosa (nunca todo a la vez).
- Cursor: estela de brillitos neón (solo mouse).
- Curvas: `cubic-bezier(0.23, 1, 0.32, 1)` para entrar; cerrar es más rápido que abrir.
- `prefers-reduced-motion`: se apaga todo lo anterior; el texto nunca se mueve.

## Celular (< 900px)

Pantalla de inicio de un celular de los 2000: barra de señal/batería, reloj grande VT323 con fecha y mood, widget "escuchando ahora", grilla de 3 íconos grandes, fila de stickers, teclas **Menú · ZUMBIDO · Atrás**. Cada ventana abre a pantalla completa; Atrás la cierra.

## Reglas

- Contraste ≥ 4.5:1 en todo texto de lectura.
- Íconos SVG dibujados, no emojis.
- Ningún sonido sin un clic o tecla de la persona; botón de silencio en la bandeja.
- Ningún embed de terceros sin que lo pidan.
- Ventanas usables con teclado: Tab a la barra + flechas para mover, Escape para cerrar.
- Colores solo de los tokens.
