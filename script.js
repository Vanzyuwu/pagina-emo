/* =========================================================
   ✦ VANZY.EXE ✦ — script
   JS puro, sin frameworks.
   Para cambiar el contenido, edita datos.js (no este archivo).
   Excepción: los BLINKIES están aquí abajo, en una lista fácil.

   Partes:
    1. Blinkies (edítalos aquí)
    2. Ayudantes
    3. Contenido (desde datos.js)
    4. Ventanas: abrir, cerrar, minimizar, maximizar, arrastrar, teclado
    5. Barra de tareas, menú Inicio y reloj
    6. Winamp
    7. Escuchando ahora: Spotify + Last.fm
    8. Sonidos
    9. Zumbido
   10. Stickers: arrastrar + 3 clics = riff
   11. Secretos: papelera, Konami, palabra secreta, sticker escondido
   12. Caos 2006: estela del cursor y glitches
   13. Cielo estrellado
   14. Intro
   15. Arranque
   ========================================================= */

/* ---------- 1. BLINKIES (edítalos aquí) ----------
   texto: lo que dice · color: "fucsia", "cyan" o "morado" */
const BLINKIES = [
  { texto: "♥ nitanhardcorito ♥", color: "fucsia" },
  { texto: "✦ callao ✦", color: "cyan" },
  // { texto: "otro blinkie", color: "morado" },
];

/* ---------- 2. AYUDANTES ---------- */

const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
const modoCelular = window.matchMedia("(max-width: 899px)");
const punteroFino = window.matchMedia("(hover: hover) and (pointer: fine)");

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

// Ícono del sprite SVG: <svg><use href="#i-..."></svg>
function icono(id) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("aria-hidden", "true");
  const uso = document.createElementNS("http://www.w3.org/2000/svg", "use");
  uso.setAttribute("href", `#${id}`);
  svg.append(uso);
  return svg;
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

// Quita una clase y la vuelve a poner (para repetir una animación)
function reiniciarClase(elemento, clase, duracion) {
  elemento.classList.remove(clase);
  void elemento.offsetWidth;
  elemento.classList.add(clase);
  if (duracion) setTimeout(() => elemento.classList.remove(clase), duracion);
}

// localStorage puede fallar (modo privado, bloqueado): nunca rompe la página
const memoria = {
  leer(clave) {
    try {
      return JSON.parse(localStorage.getItem(clave));
    } catch {
      return null;
    }
  },
  guardar(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      /* sin memoria, no pasa nada */
    }
  },
};

/* ---------- 3. CONTENIDO (desde datos.js) ---------- */

function pintarPerfil(d) {
  const avatar = document.getElementById("perfil-avatar");
  if (avatar && d.avatar) avatar.src = d.avatar;

  poner("perfil-saludo", d.saludo);
  poner("perfil-bio", (d.bio || []).map((parrafo) => crear("p", {}, parrafo)));
  ["estado-mood", "bandeja-mood", "celu-mood"].forEach((id) => poner(id, d.mood));
  ["msn-escuchando", "celu-escuchando"].forEach((id) => poner(id, d.escuchando));
  poner("msn-estado", d.estadoMsn);

  // Quote: si está vacío, queda el espacio marcado para escribirlo
  const quote = document.getElementById("quote");
  if (d.quote) {
    poner("quote-texto", `“${d.quote}”`);
  } else {
    poner("quote-texto", "“[ aquí va tu línea de Hum Hallelujah ]”");
    quote.classList.add("pendiente");
  }
  poner("quote-autor", `— ${d.quoteAutor || "Fall Out Boy"}`);

  const fecha = poner("menu-fecha", formatearFecha(d.actualizado));
  if (fecha) fecha.setAttribute("datetime", d.actualizado);

  poner("lista-cositas", (d.cositas || []).map((cosita) => crear("li", {}, cosita)));
}

function pintarBlinkies() {
  poner(
    "blinkies",
    BLINKIES.map((b) => crear("li", { class: `blinkie blinkie-${b.color || "fucsia"}` }, b.texto))
  );
}

function pintarBandas(d) {
  poner("bandas-nota", d.topBandasNota);
  poner(
    "lista-bandas",
    (d.topBandas || []).map((banda) =>
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
              crear("span", { class: "nombre-tarjeta" }, banda.nombre)
            ),
            crear(
              "span",
              { class: "banda-cara banda-dorso" },
              crear("img", { src: banda.disco, alt: "", loading: "lazy", width: 300, height: 300 }),
              crear("span", { class: "nombre-tarjeta" }, "▶ escuchar")
            )
          )
        )
      )
    )
  );

  // Sin hover (celular): el primer toque gira la tarjeta, el segundo abre Spotify
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

function pintarPortadas(id, lista, campoImagen) {
  poner(
    id,
    (lista || []).map((item) =>
      crear(
        "li",
        { class: "portada" },
        crear("img", { src: item[campoImagen], alt: "", loading: "lazy", width: 300, height: 450 }),
        crear("span", { class: "nombre-tarjeta" }, item.nombre)
      )
    )
  );
}

// Pestañas de favoritos (películas / libros), con flechas del teclado
function activarPestanas() {
  const pestanas = [...document.querySelectorAll(".pestana")];
  const elegir = (elegida) => {
    pestanas.forEach((pestana) => {
      const activa = pestana === elegida;
      pestana.setAttribute("aria-selected", String(activa));
      pestana.tabIndex = activa ? 0 : -1;
      document.getElementById(pestana.getAttribute("aria-controls")).hidden = !activa;
    });
  };
  pestanas.forEach((pestana, i) => {
    pestana.addEventListener("click", () => elegir(pestana));
    pestana.addEventListener("keydown", (evento) => {
      if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;
      const paso = evento.key === "ArrowRight" ? 1 : -1;
      const siguiente = pestanas[(i + paso + pestanas.length) % pestanas.length];
      elegir(siguiente);
      siguiente.focus();
    });
  });
}

/* ---------- 4. VENTANAS ---------- */

const escritorio = document.getElementById("escritorio");
const ventanas = [...document.querySelectorAll(".ventana")];
let pisoMasAlto = 10; // z-index de la ventana de más arriba

// Botones _ □ × de cada ventana (se agregan aquí para no repetir HTML)
function agregarControles(ventana) {
  const nombre = ventana.dataset.nombre;
  const contenedor = ventana.querySelector(".ventana-controles");
  [
    ["minimizar", "i-min", `Minimizar ${nombre}`],
    ["maximizar", "i-max", `Maximizar ${nombre}`],
    ["cerrar", "i-cerrar", `Cerrar ${nombre}`],
  ].forEach(([accion, idIcono, etiqueta]) => {
    const boton = crear("button", { class: "control", type: "button", "data-accion": accion, "aria-label": etiqueta });
    boton.append(icono(idIcono));
    boton.addEventListener("click", (evento) => {
      evento.stopPropagation();
      if (accion === "minimizar") minimizar(ventana);
      if (accion === "maximizar") alternarMaximizar(ventana, boton);
      if (accion === "cerrar") cerrar(ventana);
    });
    contenedor.append(boton);
  });
}

// Lleva la ventana al frente y la marca como activa (orilla neón)
function enfocar(ventana) {
  ventanas.forEach((v) => v.classList.toggle("activa", v === ventana));
  pisoMasAlto += 1;
  ventana.style.zIndex = pisoMasAlto;
  actualizarTareas();
}

// Abre una ventana; con "conFoco" el teclado salta adentro (accesible)
function abrir(ventana, conFoco = true) {
  if (!ventana) return;
  ventana.hidden = false;
  ventana.dataset.estado = "abierta";
  enfocar(ventana);
  ventana.dispatchEvent(new CustomEvent("abierta"));
  if (conFoco) ventana.focus({ preventScroll: true });
}

function cerrar(ventana) {
  ventana.dataset.estado = "cerrada";
  ventana.classList.remove("activa", "maximizada");
  enfocarLaDeArriba();
}

function minimizar(ventana) {
  ventana.dataset.estado = "minimizada";
  ventana.classList.remove("activa");
  enfocarLaDeArriba();
}

function alternarMaximizar(ventana, boton) {
  const maximizada = ventana.classList.toggle("maximizada");
  boton.setAttribute("aria-label", `${maximizada ? "Restaurar" : "Maximizar"} ${ventana.dataset.nombre}`);
  enfocar(ventana);
}

function abiertasDeArribaAAbajo() {
  return ventanas
    .filter((v) => !v.hidden && v.dataset.estado === "abierta")
    .sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0));
}

// Al cerrar o minimizar, la ventana abierta de más arriba pasa a ser la activa
function enfocarLaDeArriba() {
  const [arriba] = abiertasDeArribaAAbajo();
  if (arriba) enfocar(arriba);
  else actualizarTareas();
}

// Mueve la ventana a (x, y) sin que se salga del escritorio
function moverA(ventana, x, y) {
  const mesa = escritorio.getBoundingClientRect();
  const ancho = ventana.offsetWidth;
  const limiteX = Math.min(Math.max(x, -ancho + 80), mesa.width - 80);
  const limiteY = Math.min(Math.max(y, 0), mesa.height - 40);
  ventana.style.left = `${Math.round(limiteX)}px`;
  ventana.style.top = `${Math.round(limiteY)}px`;
}

// Arrastrar por la barra de título (solo en escritorio), con captura del puntero.
// Con teclado: Tab hasta la barra y flechas para moverla.
function hacerArrastrable(ventana) {
  const barra = ventana.querySelector(".ventana-barra");
  ventana.tabIndex = -1;
  barra.tabIndex = 0;
  barra.setAttribute("aria-label", `${ventana.dataset.nombre}: usa las flechas para mover la ventana`);

  ventana.addEventListener("pointerdown", () => {
    if (!ventana.classList.contains("activa")) enfocar(ventana);
  });

  barra.addEventListener("pointerdown", (evento) => {
    if (modoCelular.matches || evento.button !== 0 || evento.target.closest(".control")) return;
    if (ventana.classList.contains("maximizada")) return;
    evento.preventDefault(); // que no se seleccione texto al arrastrar

    const caja = ventana.getBoundingClientRect();
    const mesa = escritorio.getBoundingClientRect();
    const desfaseX = evento.clientX - caja.left;
    const desfaseY = evento.clientY - caja.top;

    try {
      barra.setPointerCapture(evento.pointerId);
    } catch {
      /* algunos navegadores viejos no lo soportan: igual se puede arrastrar */
    }
    ventana.classList.add("arrastrando");

    const mover = (ev) => moverA(ventana, ev.clientX - mesa.left - desfaseX, ev.clientY - mesa.top - desfaseY);

    const soltar = () => {
      ventana.classList.remove("arrastrando");
      barra.removeEventListener("pointermove", mover);
      barra.removeEventListener("pointerup", soltar);
      barra.removeEventListener("pointercancel", soltar);
      barra.removeEventListener("lostpointercapture", soltar);
      guardarPosiciones();
    };

    barra.addEventListener("pointermove", mover);
    barra.addEventListener("pointerup", soltar);
    barra.addEventListener("pointercancel", soltar);
    barra.addEventListener("lostpointercapture", soltar);
  });

  // Flechas sobre la barra: mover de a 16px (con Shift, de a 64px)
  barra.addEventListener("keydown", (evento) => {
    const pasos = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const paso = pasos[evento.key];
    if (!paso || modoCelular.matches || ventana.classList.contains("maximizada")) return;
    evento.preventDefault();
    const tamano = evento.shiftKey ? 64 : 16;
    moverA(ventana, ventana.offsetLeft + paso[0] * tamano, ventana.offsetTop + paso[1] * tamano);
    guardarPosiciones();
  });

  // Doble clic en la barra: maximizar / restaurar
  barra.addEventListener("dblclick", (evento) => {
    if (modoCelular.matches || evento.target.closest(".control")) return;
    alternarMaximizar(ventana, ventana.querySelector('[data-accion="maximizar"]'));
  });

  // Escape dentro de una ventana: la cierra
  ventana.addEventListener("keydown", (evento) => {
    if (evento.key !== "Escape") return;
    evento.stopPropagation();
    cerrar(ventana);
    document.querySelector(`[data-abre="${ventana.id}"]`)?.focus();
  });
}

// Recuerda dónde dejaste cada ventana (solo en este navegador)
function guardarPosiciones() {
  const posiciones = {};
  ventanas.forEach((v) => {
    if (v.style.left) posiciones[v.id] = { left: v.style.left, top: v.style.top };
  });
  memoria.guardar("vanzy-ventanas-v2", posiciones);
}

function recuperarPosiciones() {
  const posiciones = memoria.leer("vanzy-ventanas-v2") || {};
  Object.entries(posiciones).forEach(([id, pos]) => {
    const ventana = document.getElementById(id);
    // Si la pantalla ahora es más chica y la ventana quedaría afuera, vuelve a su lugar
    const afuera = parseFloat(pos?.left) > window.innerWidth - 80 || parseFloat(pos?.top) > window.innerHeight - 120;
    if (ventana && pos && pos.left && !afuera) {
      ventana.style.left = pos.left;
      ventana.style.top = pos.top;
    }
  });
}

// "Próximamente" con onda, para las secciones que vienen después
const AVISOS = {
  música: ["música.exe está afinando el bajo… se cortó la cuerda E otra vez", "✦ próximamente: bandas, tocatas y mis CDs ✦"],
  sobre_mí: ["sobre_mí.txt se está escribiendo… (es difícil hablar de uno mismo ok)", "✦ próximamente ✦ vuelve prontito :3"],
  galería: ["galería: revelando las fotos en el cuarto oscuro… no abras la puerta", "✦ próximamente: fotos mías y de tocatas ✦"],
  gifs_randoms: ["gifs_randoms: bajando gifs con el módem de 56k… bip bip krrrrshhh", "✦ próximamente ✦ paciencia, es dial-up"],
};

function abrirAviso(seccion, idIcono) {
  const aviso = document.getElementById("ventana-aviso");
  const [texto, nota] = AVISOS[seccion] || [`${seccion} se está instalando… le falta poquito ♡`, "✦ próximamente ✦"];
  aviso.dataset.nombre = `${seccion}.exe`;
  aviso.dataset.icono = idIcono || "i-corazon";
  poner("titulo-aviso", `${seccion}.exe — instalando…`);
  poner("aviso-texto", texto);
  poner("aviso-nota", nota);
  // Reinicia la barra de progreso cada vez que se abre
  aviso.hidden = true;
  void aviso.offsetWidth;
  abrir(aviso);
}

/* ---------- 5. BARRA DE TAREAS, MENÚ INICIO Y RELOJ ---------- */

const listaTareas = document.getElementById("tareas-lista");

function actualizarTareas() {
  const visibles = ventanas.filter((v) => !v.hidden && v.dataset.estado !== "cerrada");
  listaTareas.replaceChildren(
    ...visibles.map((ventana) => {
      const minimizada = ventana.dataset.estado === "minimizada";
      const activa = ventana.classList.contains("activa");
      const boton = crear(
        "button",
        { class: `tarea${minimizada ? " minimizada" : ""}`, type: "button", "aria-pressed": String(activa) },
        icono(ventana.dataset.icono),
        crear("span", {}, ventana.dataset.nombre)
      );
      // Clic: si está activa se minimiza; si no, se trae al frente
      boton.addEventListener("click", () => {
        if (activa) minimizar(ventana);
        else abrir(ventana);
      });
      return crear("li", {}, boton);
    })
  );

  // Íconos del escritorio: marcan las ventanas abiertas
  document.querySelectorAll(".icono[data-abre]").forEach((boton) => {
    const ventana = document.getElementById(boton.dataset.abre);
    boton.setAttribute("aria-pressed", String(ventana?.dataset.estado === "abierta"));
  });
}

function prepararMenuInicio() {
  const boton = document.getElementById("boton-inicio");
  const menu = document.getElementById("menu-inicio");
  const lista = document.getElementById("menu-lista");

  const alternar = (abrirMenu) => {
    menu.hidden = !abrirMenu;
    boton.setAttribute("aria-expanded", String(abrirMenu));
    if (abrirMenu) lista.querySelector("button")?.focus();
  };

  const item = (texto, idIcono, alElegir) => {
    const opcion = crear("button", { type: "button" }, icono(idIcono), crear("span", {}, texto));
    opcion.addEventListener("click", () => {
      alternar(false);
      alElegir();
    });
    return crear("li", {}, opcion);
  };
  const separador = () => crear("li", { class: "menu-separador", "aria-hidden": "true" });

  // Programas del escritorio + los "programas" que viven solo en el menú
  const iconos = [...document.querySelectorAll(".iconos .icono")];
  const programa = (icono) => item(icono.textContent.trim(), icono.querySelector("use").getAttribute("href").slice(1), () => icono.click());
  const extra = (id) => {
    const ventana = document.getElementById(id);
    return item(ventana.dataset.nombre, ventana.dataset.icono, () => abrir(ventana));
  };

  lista.append(
    ...iconos.slice(0, 2).map(programa),
    separador(),
    ...["ventana-winamp", "ventana-bandas", "ventana-favs", "ventana-cositas"].map(extra),
    separador(),
    ...iconos.slice(2).map(programa)
  );

  boton.addEventListener("click", () => alternar(menu.hidden));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !menu.hidden) {
      alternar(false);
      boton.focus();
    }
  });
  document.addEventListener("pointerdown", (evento) => {
    if (!menu.hidden && !menu.contains(evento.target) && !boton.contains(evento.target)) alternar(false);
  });
}

function iniciarReloj() {
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  const tic = () => {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", hour12: false });
    ["reloj", "celu-reloj"].forEach((id) => {
      const reloj = poner(id, hora);
      reloj?.setAttribute("datetime", ahora.toISOString());
    });
    poner("celu-fecha", `${dias[ahora.getDay()]} ${ahora.getDate()} ${meses[ahora.getMonth()]}`);
  };
  tic();
  setInterval(tic, 15000);
}

/* ---------- 6. WINAMP ---------- */

function prepararWinamp(d) {
  const winamp = document.querySelector(".winamp");
  const tiempo = document.getElementById("lcd-tiempo");
  const texto = document.getElementById("lcd-texto");
  const pistas = [d.escuchando, ...(d.winamp || [])].filter(Boolean);
  let pista = 0;
  let segundos = 0;
  let intervalo = null;

  const mostrar = () => {
    texto.textContent = `${pista + 1}. ${pistas[pista] || "silencio…"} ✦`;
    const mm = String(Math.floor(segundos / 60)).padStart(2, "0");
    const ss = String(segundos % 60).padStart(2, "0");
    tiempo.textContent = `${mm}:${ss}`;
  };

  const sonar = (encender) => {
    winamp.classList.toggle("sonando", encender);
    clearInterval(intervalo);
    if (encender) {
      intervalo = setInterval(() => {
        segundos += 1;
        mostrar();
      }, 1000);
    }
  };

  const cambiarPista = (paso) => {
    pista = (pista + paso + pistas.length) % pistas.length;
    segundos = 0;
    mostrar();
  };

  const acciones = {
    play: () => sonar(true),
    pausa: () => sonar(false),
    stop: () => {
      sonar(false);
      segundos = 0;
      mostrar();
    },
    anterior: () => cambiarPista(-1),
    siguiente: () => cambiarPista(1),
  };

  document.querySelectorAll("[data-winamp]").forEach((boton) => {
    boton.addEventListener("click", () => acciones[boton.dataset.winamp]());
  });

  mostrar();
  // Arranca "sonando" cuando abres la ventana (sin sonido real)
  document.getElementById("ventana-winamp").addEventListener("abierta", () => {
    if (!movimientoReducido.matches && !winamp.classList.contains("sonando")) sonar(true);
  });
}

/* ---------- 7. ESCUCHANDO AHORA: SPOTIFY + LAST.FM ---------- */

// Acepta el link completo de Spotify o solo el código
function embedSpotify(valor) {
  if (!valor) return null;
  const encontrado = String(valor).match(/(playlist|album|track|artist)[/:]([A-Za-z0-9]+)/);
  const [tipo, codigo] = encontrado ? [encontrado[1], encontrado[2]] : ["playlist", String(valor).trim()];
  if (!/^[A-Za-z0-9]+$/.test(codigo)) return null;
  return `https://open.spotify.com/embed/${tipo}/${codigo}?utm_source=generator&theme=0`;
}

function prepararMsn(d) {
  const caja = document.getElementById("spotify");
  const src = embedSpotify(d.playlistSpotify);

  // Sin link en datos.js: queda el espacio marcado para pegarlo
  if (!src) {
    caja.replaceChildren(crear("p", {}, "▸ aquí va tu playlist de Spotify", crear("br"), "(pega el link en datos.js)"));
    return escucharLastfm(d.lastfm);
  }

  // El reproductor se carga recién cuando lo piden (no antes: ahorra datos)
  document.getElementById("spotify-cargar").addEventListener("click", () => {
    caja.replaceChildren(
      crear("iframe", {
        src,
        title: "Mi playlist en Spotify",
        height: 152,
        loading: "lazy",
        allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
      })
    );
    caja.classList.add("cargado");
    caja.querySelector("iframe").focus();
  });

  escucharLastfm(d.lastfm);
}

// Last.fm: si en datos.js pones usuario + apiKey, muestra la canción EN VIVO.
// Pregunta cada 60 s (solo mientras la pestaña se ve). Si falla, deja el texto de datos.js.
function escucharLastfm(config) {
  if (!config || !config.usuario || !config.apiKey) return;
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&limit=1&format=json" +
    `&user=${encodeURIComponent(config.usuario)}&api_key=${encodeURIComponent(config.apiKey)}`;

  const preguntar = async () => {
    if (document.hidden) return;
    try {
      const respuesta = await fetch(url);
      if (!respuesta.ok) return;
      const json = await respuesta.json();
      const tema = json?.recenttracks?.track?.[0];
      if (!tema) return;
      const enVivo = tema["@attr"]?.nowplaying === "true";
      const texto = `${tema.name} — ${tema.artist?.["#text"] || ""}`;
      ["msn-escuchando", "celu-escuchando"].forEach((id) => poner(id, texto));
      poner("msn-fuente", enVivo ? "● en vivo desde last.fm" : "último tema en last.fm");
    } catch {
      /* sin internet o key mala: se queda el texto de datos.js */
    }
  };

  preguntar();
  setInterval(preguntar, 60000);
}

/* ---------- 8. SONIDOS ----------
   Busca audio/NOMBRE.mp3 y, si no existe, audio/NOMBRE.wav.
   Nunca suena nada sin que la persona haga clic o apriete una tecla. */

let silenciado = Boolean(memoria.leer("vanzy-silencio"));
const cacheSonidos = {};

function reproducir(nombre) {
  if (silenciado) return;
  // Si ya sonó antes, se reutiliza (vuelve al inicio)
  const guardado = cacheSonidos[nombre];
  if (guardado) {
    guardado.currentTime = 0;
    guardado.play().catch(() => {});
    return;
  }
  const probar = (extensiones) => {
    if (!extensiones.length) return;
    const audio = new Audio(`audio/${nombre}.${extensiones[0]}`);
    audio.volume = 0.6;
    audio.play().then(
      () => (cacheSonidos[nombre] = audio),
      () => probar(extensiones.slice(1))
    );
  };
  probar(["mp3", "wav"]);
}

function prepararSilencio() {
  const boton = document.getElementById("boton-sonido");
  const pintar = () => {
    boton.setAttribute("aria-pressed", String(silenciado));
    boton.setAttribute("aria-label", silenciado ? "Activar sonidos" : "Silenciar sonidos");
    boton.querySelector("use").setAttribute("href", silenciado ? "#i-mudo" : "#i-vol");
  };
  boton.addEventListener("click", () => {
    silenciado = !silenciado;
    memoria.guardar("vanzy-silencio", silenciado);
    pintar();
  });
  pintar();
}

// Globito de la bandeja, estilo notificación de MSN
let relojGlobo = null;
function mostrarGlobo(texto) {
  const globo = document.getElementById("globo");
  poner("globo-texto", texto);
  globo.hidden = false;
  reiniciarClase(globo, "entrando");
  clearTimeout(relojGlobo);
  relojGlobo = setTimeout(() => (globo.hidden = true), 4000);
}

/* ---------- 9. ZUMBIDO ----------
   Tiembla toda la pantalla medio segundo + "bzzz" + mensajito.
   Espera de 3 s entre zumbidos. Con movimiento reducido: parpadeo suave. */

const ESPERA_ZUMBIDO = 3000;
let ultimoZumbido = 0;

function zumbido() {
  const ahora = Date.now();
  if (ahora - ultimoZumbido < ESPERA_ZUMBIDO) return;
  ultimoZumbido = ahora;

  reproducir("zumbido");

  if (movimientoReducido.matches) {
    const activa = document.querySelector(".ventana.activa") || escritorio;
    reiniciarClase(activa, "parpadeo-suave", 900);
  } else {
    reiniciarClase(document.body, "temblando", 520);
  }

  // Mensajito en el chat de la ventana MSN (se guardan los últimos 3)
  const chat = document.getElementById("chat");
  chat.append(crear("p", { class: "chat-zumbido" }, "Vanzy te ha enviado un zumbido!!"));
  while (chat.querySelectorAll(".chat-zumbido").length > 3) chat.querySelector(".chat-zumbido").remove();
  mostrarGlobo("Vanzy te ha enviado un zumbido!!");

  // Botones en pausa mientras corre la espera (no se puede spamear)
  document.querySelectorAll("[data-zumbido]").forEach((boton) => {
    boton.disabled = true;
    boton.classList.add("esperando");
  });
  setTimeout(() => {
    document.querySelectorAll("[data-zumbido]").forEach((boton) => {
      boton.disabled = false;
      boton.classList.remove("esperando");
    });
  }, ESPERA_ZUMBIDO);
}

/* ---------- 10. STICKERS: ARRASTRAR + 3 CLICS = RIFF ---------- */

function prepararStickers() {
  const guardados = memoria.leer("vanzy-stickers-v2") || {};

  // Posición con left/top (deja de usar right/bottom del CSS)
  const fijarEn = (sticker, left, top) => {
    sticker.style.left = left;
    sticker.style.top = top;
    sticker.style.right = "auto";
    sticker.style.bottom = "auto";
  };

  document.querySelectorAll(".sticker").forEach((sticker, i) => {
    const clave = `sticker-${i}`;
    const pos = guardados[clave];
    const afuera = pos && (parseFloat(pos.left) > window.innerWidth - 60 || parseFloat(pos.top) > window.innerHeight - 60);
    if (pos && !afuera && !modoCelular.matches) fijarEn(sticker, pos.left, pos.top);

    // Cuenta clics seguidos (sin arrastrar): al tercero suena su riff
    let clics = 0;
    let relojClics = null;
    const contarClic = () => {
      clics += 1;
      clearTimeout(relojClics);
      relojClics = setTimeout(() => (clics = 0), 650);
      reiniciarClase(sticker, "toque", 200);
      if (clics >= 3) {
        clics = 0;
        reproducir(sticker.dataset.sonido);
        reiniciarClase(sticker, "rockeando", 700);
      }
    };

    sticker.addEventListener("pointerdown", (evento) => {
      if (evento.button !== 0) return;
      evento.preventDefault();
      const inicioX = evento.clientX;
      const inicioY = evento.clientY;
      let movido = false;

      // En celular no se arrastra: solo cuentan los toques
      if (modoCelular.matches) {
        contarClic();
        return;
      }

      const mesa = escritorio.getBoundingClientRect();
      const ancho = sticker.offsetWidth;
      const alto = sticker.offsetHeight;
      // Dónde lo agarraste, medido desde la esquina sin la rotación (así no "salta")
      const desfaseX = evento.clientX - mesa.left - sticker.offsetLeft;
      const desfaseY = evento.clientY - mesa.top - sticker.offsetTop;

      try {
        sticker.setPointerCapture(evento.pointerId);
      } catch {
        /* sin captura igual funciona */
      }

      const mover = (ev) => {
        if (!movido && Math.hypot(ev.clientX - inicioX, ev.clientY - inicioY) < 5) return;
        movido = true;
        sticker.classList.add("arrastrando");
        const x = Math.min(Math.max(ev.clientX - mesa.left - desfaseX, -ancho / 2), mesa.width - ancho / 2);
        const y = Math.min(Math.max(ev.clientY - mesa.top - desfaseY, -alto / 3), mesa.height - alto / 2);
        fijarEn(sticker, `${Math.round(x)}px`, `${Math.round(y)}px`);
      };

      const soltar = () => {
        sticker.classList.remove("arrastrando");
        sticker.removeEventListener("pointermove", mover);
        sticker.removeEventListener("pointerup", soltar);
        sticker.removeEventListener("pointercancel", soltar);
        sticker.removeEventListener("lostpointercapture", soltar);
        if (!movido) {
          contarClic();
          return;
        }
        guardados[clave] = { left: sticker.style.left, top: sticker.style.top };
        memoria.guardar("vanzy-stickers-v2", guardados);
      };

      sticker.addEventListener("pointermove", mover);
      sticker.addEventListener("pointerup", soltar);
      sticker.addEventListener("pointercancel", soltar);
      sticker.addEventListener("lostpointercapture", soltar);
    });
  });
}

/* ---------- 11. SECRETOS ----------
   La papelera guarda archivos protegidos (ver datos.secretos).
   Formas de abrirlos: código Konami, palabra secreta, sticker escondido. */

const CODIGO_KONAMI = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
const PISTAS = { konami: "↑↑↓↓←→←→BA", palabra: "escribe algo…", sticker: "busca bien ♡", "": "próximamente" };

function prepararSecretos(d) {
  const secretos = d.secretos || [];
  const descubiertos = new Set(memoria.leer("vanzy-secretos") || []);

  const pintarPapelera = () => {
    poner(
      "lista-secretos",
      secretos.map((secreto) => {
        const abierto = descubiertos.has(secreto.archivo);
        const boton = crear(
          "button",
          { type: "button", class: `archivo${abierto ? " abierto" : ""}`, "aria-label": abierto ? `Abrir ${secreto.archivo}` : `${secreto.archivo}: protegido` },
          icono(abierto ? "i-nota" : "i-candado"),
          crear("span", { class: "archivo-nombre" }, secreto.archivo),
          crear("span", { class: "archivo-pista" }, abierto ? "abrir" : PISTAS[secreto.desbloqueo] ?? "???")
        );
        boton.addEventListener("click", () => {
          if (abierto) verSecreto(secreto);
          else reiniciarClase(boton, "negado", 400);
        });
        return crear("li", {}, boton);
      })
    );
    const cuenta = secretos.filter((s) => descubiertos.has(s.archivo)).length;
    poner("papelera-cuenta", `${cuenta} de ${secretos.length} descubiertos`);
  };

  const verSecreto = (secreto) => {
    const visor = document.getElementById("ventana-secreto");
    visor.dataset.nombre = secreto.archivo;
    poner("titulo-secreto", `${secreto.archivo} — ${secreto.titulo}`);
    poner("secreto-lineas", (secreto.lineas || []).map((linea) => crear("li", {}, linea)));
    abrir(visor);
  };

  // Desbloquea el secreto que corresponde a un método
  const desbloquear = (metodo) => {
    const secreto = secretos.find((s) => s.desbloqueo === metodo);
    if (!secreto) return;
    const nuevo = !descubiertos.has(secreto.archivo);
    descubiertos.add(secreto.archivo);
    memoria.guardar("vanzy-secretos", [...descubiertos]);
    pintarPapelera();
    if (nuevo) {
      reproducir("secreto");
      if (!movimientoReducido.matches) reiniciarClase(document.body, "revelando", 700);
      mostrarGlobo(`desbloqueaste ${secreto.archivo}!! ✦`);
    }
    verSecreto(secreto);
  };

  // Teclado: Konami y palabra secreta (no cuenta si escribes en un campo)
  const palabra = String(d.palabraSecreta || "").toLowerCase();
  let teclas = [];
  let letras = "";
  document.addEventListener("keydown", (evento) => {
    if (evento.target.closest?.("input, textarea, [contenteditable]")) return;
    const tecla = evento.key.toLowerCase();

    teclas = [...teclas, tecla].slice(-CODIGO_KONAMI.length);
    if (teclas.join() === CODIGO_KONAMI.join()) {
      teclas = [];
      desbloquear("konami");
    }

    if (palabra && /^[a-zñáéíóú]$/.test(tecla)) {
      letras = (letras + tecla).slice(-palabra.length);
      if (letras === palabra) {
        letras = "";
        desbloquear("palabra");
      }
    }
  });

  // El sticker escondido
  document.getElementById("sticker-escondido").addEventListener("click", () => desbloquear("sticker"));

  pintarPapelera();
}

/* ---------- 12. CAOS 2006: ESTELA DEL CURSOR Y GLITCHES ---------- */

// Estelita de brillitos neón que sigue al mouse (solo mouse, no táctil)
function iniciarEstela() {
  const lienzo = document.getElementById("estela");
  const ctx = lienzo.getContext("2d");
  const colores = ["#ff007f", "#b026ff", "#00ffff", "#ffffff"];
  let chispas = [];
  let cuadro = null;

  const ajustar = () => {
    const ppp = Math.min(window.devicePixelRatio || 1, 2);
    lienzo.width = window.innerWidth * ppp;
    lienzo.height = window.innerHeight * ppp;
    ctx.setTransform(ppp, 0, 0, ppp, 0, 0);
  };

  // Estrellita de 4 puntas (como los brillitos de los 2000)
  const estrella = (x, y, r) => {
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.lineTo(x + r * 0.25, y - r * 0.25);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x + r * 0.25, y + r * 0.25);
    ctx.lineTo(x, y + r);
    ctx.lineTo(x - r * 0.25, y + r * 0.25);
    ctx.lineTo(x - r, y);
    ctx.lineTo(x - r * 0.25, y - r * 0.25);
    ctx.closePath();
    ctx.fill();
  };

  const dibujar = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    chispas = chispas.filter((c) => c.vida > 0);
    chispas.forEach((c) => {
      c.vida -= 1;
      c.x += c.vx;
      c.y += c.vy;
      c.vy += 0.04; // caen un poquito
      ctx.globalAlpha = c.vida / c.vidaMax;
      ctx.fillStyle = c.color;
      estrella(c.x, c.y, c.r * (c.vida / c.vidaMax));
    });
    ctx.globalAlpha = 1;
    cuadro = chispas.length ? requestAnimationFrame(dibujar) : null;
  };

  let ultimo = 0;
  window.addEventListener(
    "pointermove",
    (evento) => {
      if (movimientoReducido.matches || !punteroFino.matches || evento.pointerType !== "mouse") return;
      const ahora = performance.now();
      if (ahora - ultimo < 28) return; // no más de ~35 chispas por segundo
      ultimo = ahora;
      chispas.push({
        x: evento.clientX + (Math.random() - 0.5) * 8,
        y: evento.clientY + (Math.random() - 0.5) * 8,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 0.6,
        r: 3 + Math.random() * 4,
        vida: 34,
        vidaMax: 34,
        color: colores[Math.floor(Math.random() * colores.length)],
      });
      if (chispas.length > 60) chispas.shift();
      if (!cuadro) cuadro = requestAnimationFrame(dibujar);
    },
    { passive: true }
  );

  ajustar();
  window.addEventListener("resize", ajustar);
}

// Glitch en ráfagas: cada tanto, UNA cosa falla un instante (nunca todo a la vez)
function iniciarGlitches() {
  const programar = () => setTimeout(glitchear, 6000 + Math.random() * 7000);
  const glitchear = () => {
    if (!movimientoReducido.matches && !document.hidden) {
      const candidatos = [
        ...document.querySelectorAll(".ventana:not([hidden]):not([data-estado='cerrada']):not([data-estado='minimizada']) .ventana-titulo"),
        ...document.querySelectorAll(".iconos .icono svg"),
        document.querySelector(".wallpaper"),
      ].filter(Boolean);
      const elegido = candidatos[Math.floor(Math.random() * candidatos.length)];
      if (elegido) reiniciarClase(elegido, "glitch", 360);
    }
    programar();
  };
  programar();
}

/* ---------- 13. CIELO ESTRELLADO (canvas) ---------- */

function iniciarCielo() {
  const lienzo = document.getElementById("cielo");
  const ctx = lienzo.getContext("2d");
  const colores = ["#ffffff", "#ffffff", "#00ffff", "#ff007f", "#b026ff"];
  let estrellas = [];
  let ancho = 0;
  let alto = 0;
  // Parallax: el cielo sigue un poquito al mouse, con inercia
  const mouse = { x: 0, y: 0 };
  const suave = { x: 0, y: 0 };
  let cuadro = null;

  const preparar = () => {
    const ppp = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth;
    alto = window.innerHeight;
    lienzo.width = ancho * ppp;
    lienzo.height = alto * ppp;
    ctx.setTransform(ppp, 0, 0, ppp, 0, 0);
    const cantidad = Math.round((ancho * alto) / 9000);
    estrellas = Array.from({ length: cantidad }, () => ({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      profundidad: 0.2 + Math.random() * 0.8,
      tamano: Math.random() < 0.15 ? 2 : 1, // pixeles: 1px o 2px
      color: colores[Math.floor(Math.random() * colores.length)],
      fase: Math.random() * Math.PI * 2,
    }));
  };

  const dibujar = (tiempo = 0) => {
    ctx.clearRect(0, 0, ancho, alto);
    suave.x += (mouse.x - suave.x) * 0.05;
    suave.y += (mouse.y - suave.y) * 0.05;
    estrellas.forEach((e) => {
      if (!movimientoReducido.matches) {
        e.y -= e.profundidad * 0.12; // suben lento
        if (e.y < -4) e.y = alto + 4;
      }
      const brillo = movimientoReducido.matches ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(tiempo / 1400 + e.fase));
      const x = Math.round(e.x + suave.x * e.profundidad * 18);
      const y = Math.round(e.y + suave.y * e.profundidad * 18);
      ctx.globalAlpha = brillo * e.profundidad;
      ctx.fillStyle = e.color;
      ctx.fillRect(x, y, e.tamano, e.tamano);
    });
    ctx.globalAlpha = 1;
  };

  const animar = (tiempo) => {
    dibujar(tiempo);
    cuadro = requestAnimationFrame(animar);
  };

  const encender = () => {
    cancelAnimationFrame(cuadro);
    if (movimientoReducido.matches || document.hidden) dibujar();
    else cuadro = requestAnimationFrame(animar);
  };

  preparar();
  encender();

  window.addEventListener("resize", () => {
    preparar();
    encender();
  });
  window.addEventListener(
    "pointermove",
    (evento) => {
      mouse.x = (evento.clientX / ancho - 0.5) * 2;
      mouse.y = (evento.clientY / alto - 0.5) * 2;
    },
    { passive: true }
  );
  // Pausa cuando la pestaña no se ve (ahorra batería)
  document.addEventListener("visibilitychange", encender);
  movimientoReducido.addEventListener("change", encender);
}

/* ---------- 14. INTRO ---------- */

// Pantalla negra -> VANZY se dibuja en colores -> se enciende -> aparece el escritorio
function correrIntro(alTerminar) {
  const raiz = document.documentElement;
  const intro = document.getElementById("intro");
  if (!raiz.classList.contains("con-intro") || !intro) {
    intro?.remove();
    alTerminar();
    return;
  }

  try {
    sessionStorage.setItem("vanzy-intro-vista", "1");
  } catch {
    /* sin memoria de sesión: se verá de nuevo, no pasa nada */
  }

  let terminada = false;
  let reloj = null;

  const salir = () => {
    if (terminada) return;
    terminada = true;
    clearTimeout(reloj);
    intro.classList.add("saliendo");
    setTimeout(() => {
      raiz.classList.remove("con-intro");
      intro.remove();
      alTerminar();
    }, 820);
  };

  // Cualquier clic o tecla se salta la intro
  intro.addEventListener("pointerdown", salir);
  document.addEventListener("keydown", salir, { once: true });

  // Espera la fuente Metal Mania (máx. 1.2 s) para que el logo se dibuje con su forma real
  const fuente = document.fonts && document.fonts.load ? document.fonts.load('300px "Metal Mania"') : Promise.resolve();
  Promise.race([fuente, new Promise((listo) => setTimeout(listo, 1200))]).then(() => {
    if (terminada) return;
    intro.classList.add("empezar");
    reloj = setTimeout(salir, 4900);
  });
}

/* ---------- 15. ARRANQUE ---------- */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof datos !== "undefined") {
    pintarPerfil(datos);
    pintarBandas(datos);
    pintarPortadas("panel-pelis", datos.peliculas, "poster");
    pintarPortadas("panel-libros", datos.libros, "portada");
    prepararWinamp(datos);
    prepararMsn(datos);
    prepararSecretos(datos);
  }
  pintarBlinkies();
  activarPestanas();

  ventanas.forEach((ventana) => {
    agregarControles(ventana);
    hacerArrastrable(ventana);
    if (!ventana.hidden) ventana.dataset.estado = "abierta";
  });
  recuperarPosiciones();

  // Todo lo que abre ventanas: íconos, bandeja, widget del celu
  document.querySelectorAll("[data-abre]").forEach((boton) => {
    boton.addEventListener("click", () => abrir(document.getElementById(boton.dataset.abre)));
  });
  document.querySelectorAll("[data-aviso]").forEach((boton) => {
    boton.addEventListener("click", () => abrirAviso(boton.dataset.aviso, boton.dataset.icono));
  });
  document.querySelectorAll("[data-zumbido]").forEach((boton) => boton.addEventListener("click", zumbido));

  // Tecla "Atrás" del celu: cierra la ventana de más arriba
  document.getElementById("tecla-atras").addEventListener("click", () => {
    const [arriba] = abiertasDeArribaAAbajo();
    if (arriba) cerrar(arriba);
  });

  prepararMenuInicio();
  prepararSilencio();
  iniciarReloj();
  iniciarCielo();
  iniciarEstela();
  iniciarGlitches();
  prepararStickers();

  // about_me.exe se abre sola en el escritorio.
  // En el celu se ve primero la "pantalla de inicio" del teléfono.
  const perfil = document.getElementById("ventana-perfil");
  if (modoCelular.matches) {
    perfil.dataset.estado = "cerrada";
    actualizarTareas();
  } else {
    // Como en el boceto: MSN al lado, about_me al frente y activa
    abrir(document.getElementById("ventana-msn"), false);
    enfocar(perfil);
  }

  // Si hay intro, la secuencia de arranque del escritorio espera a que termine
  const conIntro = document.documentElement.classList.contains("con-intro");
  if (conIntro) document.body.classList.remove("arrancando");

  correrIntro(() => {
    if (conIntro) {
      void document.body.offsetWidth; // reinicia las animaciones de arranque
      document.body.classList.add("arrancando");
    }
    setTimeout(() => document.body.classList.remove("arrancando"), movimientoReducido.matches ? 0 : 2000);
  });
});
