/* =========================================================
   ✦ VANZY.EXE ✦ — script
   JS puro, sin frameworks.
   Para cambiar el contenido, edita datos.js (no este archivo).

   Partes:
   1. Ayudantes
   2. Contenido (desde datos.js)
   3. Ventanas: abrir, cerrar, minimizar, maximizar, arrastrar
   4. Barra de tareas y menú Inicio
   5. Winamp
   6. Cielo estrellado (canvas)
   7. Arranque
   ========================================================= */

/* ---------- 1. AYUDANTES ---------- */

const movimientoReducido = window.matchMedia("(prefers-reduced-motion: reduce)");
const modoCelular = window.matchMedia("(max-width: 899px)");

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

/* ---------- 2. CONTENIDO (desde datos.js) ---------- */

function pintarPerfil(d) {
  const avatar = document.getElementById("perfil-avatar");
  if (avatar && d.avatar) avatar.src = d.avatar;

  poner("perfil-saludo", d.saludo);
  poner("perfil-bio", (d.bio || []).map((parrafo) => crear("p", {}, parrafo)));
  poner("estado-mood", d.mood);
  poner("estado-escuchando", d.escuchando);
  poner("bandeja-mood", d.mood);

  ["estado-fecha", "menu-fecha"].forEach((id) => {
    const fecha = poner(id, formatearFecha(d.actualizado));
    if (fecha) fecha.setAttribute("datetime", d.actualizado);
  });

  poner("lista-cositas", (d.cositas || []).map((cosita) => crear("li", {}, cosita)));
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

/* ---------- 3. VENTANAS ---------- */

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

function abrir(ventana) {
  ventana.hidden = false;
  ventana.dataset.estado = "abierta";
  enfocar(ventana);
  if (modoCelular.matches) ventana.scrollIntoView({ behavior: movimientoReducido.matches ? "auto" : "smooth", block: "start" });
}

function cerrar(ventana) {
  ventana.dataset.estado = "cerrada";
  ventana.classList.remove("activa", "maximizada");
  enfocarLaDeArriba();
}

function minimizar(ventana) {
  // En celular minimizar = plegar/desplegar
  if (modoCelular.matches && ventana.dataset.estado === "minimizada") {
    ventana.dataset.estado = "abierta";
    return;
  }
  ventana.dataset.estado = "minimizada";
  ventana.classList.remove("activa");
  enfocarLaDeArriba();
}

function alternarMaximizar(ventana, boton) {
  const maximizada = ventana.classList.toggle("maximizada");
  boton.setAttribute("aria-label", `${maximizada ? "Restaurar" : "Maximizar"} ${ventana.dataset.nombre}`);
  enfocar(ventana);
}

// Al cerrar o minimizar, la ventana abierta de más arriba pasa a ser la activa
function enfocarLaDeArriba() {
  const abiertas = ventanas
    .filter((v) => !v.hidden && v.dataset.estado === "abierta")
    .sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0));
  if (abiertas[0] && !modoCelular.matches) enfocar(abiertas[0]);
  else actualizarTareas();
}

// Arrastrar por la barra de título (solo en escritorio), con captura del puntero
function hacerArrastrable(ventana) {
  const barra = ventana.querySelector(".ventana-barra");

  ventana.addEventListener("pointerdown", () => enfocar(ventana));

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

    const mover = (ev) => {
      // Se queda dentro del escritorio (siempre se puede agarrar la barra)
      const x = Math.min(Math.max(ev.clientX - mesa.left - desfaseX, -caja.width + 80), mesa.width - 80);
      const y = Math.min(Math.max(ev.clientY - mesa.top - desfaseY, 0), mesa.height - 40);
      ventana.style.left = `${Math.round(x)}px`;
      ventana.style.top = `${Math.round(y)}px`;
    };

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

  // Doble clic en la barra: maximizar / restaurar
  barra.addEventListener("dblclick", (evento) => {
    if (modoCelular.matches || evento.target.closest(".control")) return;
    alternarMaximizar(ventana, ventana.querySelector('[data-accion="maximizar"]'));
  });
}

// Recuerda dónde dejaste cada ventana (solo en este navegador)
function guardarPosiciones() {
  const posiciones = {};
  ventanas.forEach((v) => {
    if (v.style.left) posiciones[v.id] = { left: v.style.left, top: v.style.top };
  });
  memoria.guardar("vanzy-ventanas", posiciones);
}

function recuperarPosiciones() {
  const posiciones = memoria.leer("vanzy-ventanas") || {};
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

// Ventana de aviso para las secciones que vienen después
function abrirAviso(seccion) {
  const aviso = document.getElementById("ventana-aviso");
  aviso.dataset.nombre = `${seccion}.exe`;
  poner("titulo-aviso", `${seccion}.exe — instalando…`);
  poner("aviso-texto", `${seccion}.exe todavía se está instalando en mi compu… le falta poquito ♡`);
  // Reinicia la barra de progreso cada vez que se abre
  aviso.hidden = true;
  void aviso.offsetWidth;
  abrir(aviso);
}

/* ---------- 4. BARRA DE TAREAS Y MENÚ INICIO ---------- */

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

  const programas = [...document.querySelectorAll(".iconos .icono")];
  programas.forEach((programa, i) => {
    if (i === 5) lista.append(crear("li", { class: "menu-separador", "aria-hidden": "true" }));
    const item = crear("button", { type: "button" });
    item.append(programa.querySelector("svg").cloneNode(true), crear("span", {}, programa.textContent.trim()));
    item.addEventListener("click", () => {
      programa.click();
      alternar(false);
    });
    lista.append(crear("li", {}, item));
  });

  const alternar = (abrirMenu) => {
    menu.hidden = !abrirMenu;
    boton.setAttribute("aria-expanded", String(abrirMenu));
    if (abrirMenu) lista.querySelector("button")?.focus();
  };

  boton.addEventListener("click", () => alternar(menu.hidden));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && !menu.hidden) {
      alternar(false);
      boton.focus();
    }
  });
  document.addEventListener("pointerdown", (evento) => {
    if (!menu.hidden && !menu.contains(evento.target) && evento.target !== boton) alternar(false);
  });
}

function iniciarReloj() {
  const reloj = document.getElementById("reloj");
  const tic = () => {
    const ahora = new Date();
    reloj.textContent = ahora.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" });
    reloj.setAttribute("datetime", ahora.toISOString());
  };
  tic();
  setInterval(tic, 15000);
}

/* ---------- 5. WINAMP ---------- */

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

  const acciones = {
    play: () => sonar(true),
    pausa: () => sonar(false),
    stop: () => {
      sonar(false);
      segundos = 0;
      mostrar();
    },
    anterior: () => {
      pista = (pista - 1 + pistas.length) % pistas.length;
      segundos = 0;
      mostrar();
    },
    siguiente: () => {
      pista = (pista + 1) % pistas.length;
      segundos = 0;
      mostrar();
    },
  };

  document.querySelectorAll("[data-winamp]").forEach((boton) => {
    boton.addEventListener("click", () => acciones[boton.dataset.winamp]());
  });

  // La playlist de Spotify se carga recién cuando la piden
  const botonPlaylist = document.getElementById("boton-playlist");
  const playlist = document.getElementById("playlist");
  botonPlaylist.addEventListener("click", () => {
    const abrirLista = playlist.hidden;
    if (abrirLista && !playlist.firstChild && d.playlistSpotify) {
      playlist.append(
        crear("iframe", {
          src: `https://open.spotify.com/embed/playlist/${d.playlistSpotify}?utm_source=generator&theme=0`,
          title: "Mi playlist en Spotify",
          height: 352,
          loading: "lazy",
          allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
        })
      );
    }
    playlist.hidden = !abrirLista;
    botonPlaylist.setAttribute("aria-expanded", String(abrirLista));
  });

  mostrar();
  // Arranca "sonando" para que se vea vivo (sin sonido real)
  if (!movimientoReducido.matches) sonar(true);
}

/* ---------- 6. CIELO ESTRELLADO (canvas) ---------- */

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
      tamano: 0.5 + Math.random() * 1.6,
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
        e.y -= e.profundidad * 0.12; // suben lento, como antes
        if (e.y < -4) e.y = alto + 4;
      }
      const brillo = movimientoReducido.matches ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(tiempo / 1400 + e.fase));
      const x = e.x + suave.x * e.profundidad * 18;
      const y = e.y + suave.y * e.profundidad * 18;
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

/* ---------- 7. MONITOS ARRASTRABLES ---------- */

function hacerStickersArrastrables() {
  const guardados = memoria.leer("vanzy-stickers") || {};

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

    sticker.addEventListener("pointerdown", (evento) => {
      if (modoCelular.matches || evento.button !== 0) return;
      evento.preventDefault();

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
      sticker.classList.add("arrastrando");

      const mover = (ev) => {
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
        if (sticker.style.left) {
          guardados[clave] = { left: sticker.style.left, top: sticker.style.top };
          memoria.guardar("vanzy-stickers", guardados);
        }
      };

      sticker.addEventListener("pointermove", mover);
      sticker.addEventListener("pointerup", soltar);
      sticker.addEventListener("pointercancel", soltar);
      sticker.addEventListener("lostpointercapture", soltar);
    });
  });
}

/* ---------- 8. INTRO ---------- */

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

/* ---------- 9. ARRANQUE ---------- */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof datos !== "undefined") {
    pintarPerfil(datos);
    pintarBandas(datos);
    pintarPortadas("panel-pelis", datos.peliculas, "poster");
    pintarPortadas("panel-libros", datos.libros, "portada");
    prepararWinamp(datos);
  }
  activarPestanas();

  ventanas.forEach((ventana) => {
    agregarControles(ventana);
    hacerArrastrable(ventana);
    if (!ventana.hidden) ventana.dataset.estado = "abierta";
  });
  recuperarPosiciones();

  // Íconos del escritorio
  document.querySelectorAll(".icono").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (boton.dataset.aviso) abrirAviso(boton.dataset.aviso);
      else abrir(document.getElementById(boton.dataset.abre));
    });
  });

  prepararMenuInicio();
  iniciarReloj();
  iniciarCielo();

  // perfil.exe es la protagonista: llega activa y arriba de todo
  enfocar(document.getElementById("ventana-perfil"));

  hacerStickersArrastrables();

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
