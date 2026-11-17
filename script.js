/* =========================================================
   ✦ pagina-emo ✦ — script
   JS puro, sin frameworks.
   Para cambiar el contenido, edita datos.js (no este archivo).
   ========================================================= */

/* El contenido vive en datos.js. Aquí solo se dibuja en la página. */

/* ---------- AYUDANTES ---------- */
// Crea un elemento con atributos e hijos (el texto se inserta seguro, sin HTML)
function crear(etiqueta, atributos = {}, ...hijos) {
  const elemento = document.createElement(etiqueta);
  Object.entries(atributos).forEach(([clave, valor]) => {
    if (valor === undefined || valor === null || valor === false) return;
    elemento.setAttribute(clave, valor);
  });
  hijos.flat().forEach((hijo) => {
    if (hijo === undefined || hijo === null) return;
    elemento.append(hijo instanceof Node ? hijo : String(hijo));
  });
  return elemento;
}

function poner(id, contenido) {
  const elemento = document.getElementById(id);
  if (!elemento) return null;
  elemento.replaceChildren(...[contenido].flat().filter((x) => x !== undefined && x !== null));
  return elemento;
}

// "2026-11-17" -> "17 nov 2026"
function formatearFecha(texto) {
  const [anio, mes, dia] = String(texto).split("-").map(Number);
  if (!anio || !mes || !dia) return texto;
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${dia} ${meses[mes - 1]} ${anio}`;
}

/* ---------- INICIO: PERFIL ---------- */
function pintarPerfil(d) {
  const avatar = document.getElementById("perfil-avatar");
  if (avatar && d.avatar) avatar.src = d.avatar;

  poner("perfil-saludo", d.saludo);
  poner("perfil-bio", (d.bio || []).map((parrafo) => crear("p", {}, parrafo)));
  poner("estado-mood", d.mood);
  poner("estado-escuchando", d.escuchando);

  ["estado-fecha", "pie-fecha"].forEach((id) => {
    const fecha = poner(id, formatearFecha(d.actualizado));
    if (fecha) fecha.setAttribute("datetime", d.actualizado);
  });

  const spotify = document.getElementById("spotify-playlist");
  if (spotify && d.playlistSpotify) {
    spotify.src = `https://open.spotify.com/embed/playlist/${d.playlistSpotify}?utm_source=generator&theme=0`;
  }

  poner("lista-cositas", (d.cositas || []).map((cosita) => crear("li", {}, cosita)));
}

/* ---------- INICIO: TOP BANDAS (tarjetas que giran) ---------- */
function pintarBandas(d) {
  poner("bandas-nota", d.topBandasNota);
  const tarjetas = (d.topBandas || []).map((banda) =>
    crear(
      "li",
      {},
      crear(
        "a",
        {
          class: "banda",
          href: banda.link,
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": `${banda.nombre}: escuchar el disco en Spotify`,
        },
        crear(
          "span",
          { class: "banda-giro" },
          crear(
            "span",
            { class: "banda-cara banda-frente" },
            crear("img", { src: banda.foto, alt: "", loading: "lazy", width: 300, height: 300 }),
            crear("span", { class: "portada-nombre" }, banda.nombre)
          ),
          crear(
            "span",
            { class: "banda-cara banda-dorso" },
            crear("img", { src: banda.disco, alt: "", loading: "lazy", width: 300, height: 300 }),
            crear("span", { class: "portada-nombre" }, "▶ escuchar")
          )
        )
      )
    )
  );
  poner("lista-bandas", tarjetas);

  // En celular (sin hover): el primer toque gira la tarjeta, el segundo abre Spotify
  const sinHover = window.matchMedia("(hover: none)");
  document.querySelectorAll(".banda").forEach((tarjeta) => {
    tarjeta.addEventListener("click", (evento) => {
      if (!sinHover.matches || tarjeta.classList.contains("volteada")) return;
      evento.preventDefault();
      document.querySelectorAll(".banda.volteada").forEach((otra) => otra.classList.remove("volteada"));
      tarjeta.classList.add("volteada");
    });
  });
}

/* ---------- INICIO: PELÍCULAS Y LIBROS ---------- */
function pintarPortadas(id, lista, campoImagen) {
  poner(
    id,
    (lista || []).map((item) =>
      crear(
        "li",
        { class: "portada" },
        crear("img", { src: item[campoImagen], alt: "", loading: "lazy", width: 300, height: 450 }),
        crear("span", { class: "portada-nombre" }, item.nombre)
      )
    )
  );
}

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

/* ---------- MENÚ: marca la sección visible ---------- */
function marcarSeccionActiva() {
  const links = [...document.querySelectorAll(".menu-link")];
  const secciones = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!secciones.length || !("IntersectionObserver" in window)) return;

  const activar = (id) => {
    links.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  // Una sección cuenta como "visible" cuando cruza la franja central de la pantalla
  const observador = new IntersectionObserver(
    (entradas) => {
      // Arriba del todo siempre manda "inicio"
      if (window.scrollY < 10) return activar(secciones[0].id);
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) activar(entrada.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  secciones.forEach((seccion) => observador.observe(seccion));
  activar(secciones[0].id);

  // La última sección puede ser corta y no llegar al centro: al tocar fondo, se marca igual
  window.addEventListener(
    "scroll",
    () => {
      const alFondo = window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (alFondo) activar(secciones[secciones.length - 1].id);
    },
    { passive: true }
  );
}

/* ---------- INICIO ---------- */
document.addEventListener("DOMContentLoaded", () => {
  crearEstrellas();
  if (typeof datos !== "undefined") {
    pintarPerfil(datos);
    pintarBandas(datos);
    pintarPortadas("lista-peliculas", datos.peliculas, "poster");
    pintarPortadas("lista-libros", datos.libros, "portada");
  }
  marcarSeccionActiva();
});
