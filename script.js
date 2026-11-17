/* =========================================================
   ✦ pagina-emo ✦ — script
   JS puro, sin frameworks.
   Edita las listas de abajo para cambiar bandas, películas y libros.
   ========================================================= */

/* ---------- DATOS EDITABLES ---------- */

// Top Bandas (Paso 3): cada una con su embed oficial de Spotify.
const bandas = [
  // { nombre: "My Chemical Romance", spotifyId: "7FBcuc1gsnv6Y1nwFtNRCb", tipo: "artist" },
];

// Películas favoritas (Paso 4)
const peliculas = [
  // { titulo: "Donnie Darko", anio: 2001, poster: "img/peliculas/donnie-darko.jpg" },
];

// Libros favoritos (Paso 4)
const libros = [
  // { titulo: "Las ventajas de ser invisible", autor: "Stephen Chbosky", portada: "img/libros/ventajas.jpg" },
];

/* ---------- FONDO DE ESTRELLAS ---------- */
function crearEstrellas() {
  const capa = document.querySelector(".estrellas");
  if (!capa) return;

  const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const colores = ["#ffffff", "#00ffff", "#ff007f", "#b026ff"];
  const cantidad = window.innerWidth < 600 ? 60 : 120;

  for (let i = 0; i < cantidad; i++) {
    const estrella = document.createElement("span");
    estrella.className = "estrella";
    const duracion = 15 + Math.random() * 25;

    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.setProperty("--tam", `${1 + Math.random() * 2.5}px`);
    estrella.style.setProperty("--color", colores[Math.floor(Math.random() * colores.length)]);
    estrella.style.setProperty("--opacidad", (0.4 + Math.random() * 0.6).toFixed(2));
    estrella.style.setProperty("--duracion", `${duracion}s`);
    // Retraso negativo: las estrellas ya están repartidas por la pantalla desde el inicio
    estrella.style.setProperty("--retraso", `${-Math.random() * duracion}s`);

    // Sin movimiento: se quedan quietas repartidas por toda la pantalla
    if (reducirMovimiento) {
      estrella.style.bottom = `${Math.random() * 100}%`;
    }

    capa.appendChild(estrella);
  }
}

/* ---------- INICIO ---------- */
document.addEventListener("DOMContentLoaded", () => {
  crearEstrellas();
});
