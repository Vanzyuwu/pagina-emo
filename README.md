# ✦ pagina-emo ✦

> mi rincón personal en internet, como si fuera 2006 ♥ :3

Página personal con estética **retro Y2K / Scene / Emo / MySpace 2000s**: fondo estrellado, neón con glow, stickers flotantes, ventanas retro y mucho drama.

Hecha con **HTML + CSS + JS puro** (sin frameworks). Mobile-first: en celular todo pasa a una sola columna.

## 🖤 Estructura

```
pagina-emo/
├── index.html    # estructura de la página
├── estilos.css   # estilos, glow neón, animaciones
├── script.js     # listas editables (bandas, películas, libros) + interacciones
└── img/          # stickers, pósters, portadas
```

## 🎨 Estética

| Elemento        | Valor                         |
|-----------------|-------------------------------|
| Fondo           | `#0b0716` + estrellas animadas |
| Neón cyan       | `#00ffff`                     |
| Neón fucsia     | `#ff007f`                     |
| Neón morado     | `#b026ff`                     |
| Títulos         | Metal Mania                   |
| Menús           | VT323                         |
| Texto           | Space Mono                    |

Las animaciones se desactivan automáticamente si el sistema tiene activado `prefers-reduced-motion`.

## ✏️ Editar contenido

Las bandas, películas y libros están como listas al inicio de `script.js`. Solo agrega o quita elementos y la página se actualiza sola.

## 🚀 Verla en local

Abre `index.html` en el navegador. Para que los embeds de Spotify funcionen bien, mejor usar un servidor local:

```bash
npx serve .
# o
python -m http.server
```

---

hecho con ♥ y demasiado eyeliner por **Vanzyuwu** · uwu
