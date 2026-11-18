/* =========================================================
   ✦ datos.js ✦ — TODO lo que se puede cambiar de la página
   Edita este archivo, guarda, sube a GitHub y listo :3
   No hace falta tocar index.html ni estilos.css.

   Reglas rápidas:
   - Los textos van entre comillas "así".
   - Cada cosa de una lista termina con coma ,
   - Las imágenes van en la carpeta img/ (mejor en .webp)
   ========================================================= */

const datos = {
  /* ---------- STATUS (cámbialo seguido) ---------- */
  // Fecha de la última vez que cambiaste algo (año-mes-día)
  actualizado: "2026-11-17",
  mood: "feliz y con sueño :3",

  /* ---------- ABOUT ME ---------- */
  avatar: "img/avatar.webp",
  saludo: "Hola, soy el Vanzy para los nuevos, Pipe para los oldschool.",
  bio: [
    "Toco bajo, guitarra y batería (no soy experto, pero se me da bien). Toco desde el PC con mi interfaz y tengo una pedalera.",
    "Me gusta grabar videos (que algún día subiré), los videojuegos y la música de todo tipo.",
    "Colecciono CDs de bandas que me gustan; ahora estoy buscando todos los de Fall Out Boy y me ha costado más de lo que esperaba.",
  ],

  // ✎ QUOTE FAVORITO: escribe aquí tu línea de "Hum Hallelujah" (Fall Out Boy).
  // Mientras esté vacío, se muestra un espacio marcado.
  quote: "I could write it better than you ever felt it",
  quoteAutor: "Fall Out Boy — Hum Hallelujah",

  // Cositas sobre mí: una por línea
  cositas: [
    "Team verano y playa.",
    "Acuario.",
    "Gamer de corazón.",
    "Bajo • Guitarra • Batería.",
    "Colecciono CDs.",
    "Morado y negro.",
    "Solo capuchino. :3",
    "Hayley, Kuky y Princesa.",
    "Soul Reaver siempre.",
  ],

  // Canciones que pasan por el winamp
  winamp: [
    "Red Flag — Billy Talent",
    "Devil in a Midnight Mass — Billy Talent",
    "My Own Summer (Shove It) — Deftones",
  ],

  /* ---------- ESCUCHANDO AHORA (ventana MSN) ---------- */
  // ✎ PEGA AQUÍ el link de tu playlist de Spotify (el link completo sirve):
  // ej: https://open.spotify.com/playlist/3b2iNp0JaHr6DSoBxhhhUj
  playlistSpotify: "https://open.spotify.com/playlist/3b2iNp0JaHr6DSoBxhhhUj",

  // Estado MSN (lo que sale bajo tu nombre)
  estadoMsn: "mándame un zumbido si te aburres :3",

  // Zumbidos al celu (ntfy, gratis): en la app ntfy suscríbete a este nombre.
  // Cada vez que alguien te manda un zumbido, te llega una notificación.
  // Déjalo "" para apagarlo.
  zumbidoNtfy: "vanzy-zumbido-907579d0",

  // Last.fm (para más adelante): con tu usuario y una API key, la ventana
  // muestra la canción que estás escuchando EN VIVO en vez de "escuchando".
  // La key de Last.fm es de solo lectura, pero igual queda pública en la página.
  // Crea una en https://www.last.fm/api/account/create
  lastfm: {
    usuario: "",
    apiKey: "",
  },

  /* ---------- TOP BANDAS (la tarjeta gira y muestra el disco) ---------- */
  topBandasNota: "(una es falsa es fake)",
  topBandas: [
    {
      nombre: "Fall Out Boy",
      foto: "img/bandas/fall-out-boy.webp",
      disco: "img/bandas/fall-out-boy-album.webp",
      link: "https://open.spotify.com/album/5nkUSlIhtoJZMOUlB0sNCp",
    },
    {
      nombre: "Paramore",
      foto: "img/bandas/paramore.webp",
      disco: "img/bandas/paramore-album.webp",
      link: "https://open.spotify.com/album/27UqZoE1kV6sIV6uQcI28A",
    },
    {
      nombre: "Turnstile",
      foto: "img/bandas/turnstile.webp",
      disco: "img/bandas/turnstile-album.webp",
      link: "https://open.spotify.com/album/1GjjBpY2iDwSQs5bykQI5e",
    },
  ],

  /* ---------- PELÍCULAS FAVORITAS ---------- */
  peliculas: [
    { nombre: "American Beauty", poster: "img/peliculas/american-beauty.webp" },
    { nombre: "Los Infiltrados", poster: "img/peliculas/los-infiltrados.webp" },
    { nombre: "Hereditary", poster: "img/peliculas/hereditary.webp" },
  ],

  /* ---------- LIBROS FAVORITOS ---------- */
  libros: [
    { nombre: "El Psicoanalista", portada: "img/libros/el-psicoanalista.webp" },
    { nombre: "Harry Potter y el Príncipe Mestizo", portada: "img/libros/harry-potter-principe-mestizo.webp" },
    { nombre: "El Retrato de Dorian Gray", portada: "img/libros/el-retrato-de-dorian-gray.webp" },
  ],

  /* ---------- SECRETOS (la papelera) ----------
     Cada archivo se desbloquea de una forma:
       "palabra" -> escribir la palabra secreta con el teclado (abre 3 archivos)
       "konami"  -> código Konami: ↑ ↑ ↓ ↓ ← → ← → B A (abre memories)
       "sticker" -> encontrar el sticker escondido (abre my_friends)
     ✎ Escribe tu contenido en "lineas" (una línea por cosa). */
  palabraSecreta: "descargado",
  secretos: [
    {
      archivo: "dreams.txt",
      titulo: "Dreams",
      desbloqueo: "palabra",
      lineas: ["tocar por el mundo con mi banda", "viajar por el mundo", "(y otras cosas ñoñas que iré agregando)"],
    },
    {
      archivo: "bucket_list.txt",
      titulo: "Bucket list",
      desbloqueo: "palabra",
      lineas: ["[ ] sacar adelante la banda", "[ ] tirarme en paracaídas", "(se irá agregando)"],
    },
    {
      archivo: "things_ill_never_forget.txt",
      titulo: "Things I'll never forget",
      desbloqueo: "palabra",
      lineas: [
        "Nunca olvidaré las cosas malas que hice, pero sé que hoy soy mejor, y eso es lo que importa.",
        "Aprender a perdonar y a perdonarse es lo mejor que uno puede hacer.",
      ],
    },
    {
      // Recuerdos con foto, fecha y una historia corta.
      // foto: "img/recuerdos/archivo.webp" (déjalo "" si no hay)
      archivo: "memories",
      titulo: "Memories",
      desbloqueo: "konami",
      recuerdos: [
        { foto: "", fecha: "AAAA-MM-DD", historia: "✎ (escribe aquí un recuerdo)" },
        { foto: "", fecha: "AAAA-MM-DD", historia: "✎ (escribe aquí otro recuerdo)" },
        { foto: "", fecha: "AAAA-MM-DD", historia: "✎ (y otro más)" },
      ],
    },
    {
      // Amigos SOLO con apodo (nunca nombres completos ni contactos). La foto es opcional.
      archivo: "my_friends",
      titulo: "My friends",
      desbloqueo: "sticker",
      amigos: [
        { apodo: "✎ apodo", linea: "(una línea sobre esta persona)", foto: "" },
        { apodo: "✎ apodo", linea: "(una línea sobre esta persona)", foto: "" },
        { apodo: "✎ apodo", linea: "(una línea sobre esta persona)", foto: "" },
      ],
    },
  ],

  /* =========================================================
     MÚSICA (audio_lab.exe)
     ========================================================= */
  musica: {
    // Lo que "pasa" por la pantalla de arriba
    marquesina: "★ pronto en Spotify y todas las plataformas ★ Vanzy en la batería ★",

    /* ---------- BANDA ACTUAL ---------- */
    bandaActual: {
      nombre: "D'LIRIA",
      foto: "img/musica/banda-actual.webp",
      // ✎ Cuando tengan logo: "img/musica/logo-dliria.webp" (si está vacío se usa el nombre en letras)
      logo: "",
      rol: "batero ♥",
      genero: "pop punk · emo · rock alternativo",
      estado: "grabando el primer disco",
      estampas: ["★ pronto en spotify ★", "100% emo", "♪ batero ♪"],
      // Temas del primer disco: mezcla de 0 a 100. Cuando salgan, pega su link de Spotify.
      temas: [
        { nombre: "???", mezcla: 85, spotify: "" },
        { nombre: "???", mezcla: 85, spotify: "" },
        { nombre: "???", mezcla: 85, spotify: "" },
      ],
    },

    /* ---------- EL HACKEO (entrada) ----------
       Las boletas tocan los adelantos de audio/boleta-1.mp3, -2, -3 */
    hackeo: {
      frases: ["audio_lab.exe ahora nos pertenece.", "el primer disco viene.", "escucha las pistas. vota por tu favorita."],
      firma: "— el primer disco viene. no le digas a nadie.",
    },

    /* ---------- BANDAS MUERTAS ---------- */
    bandasMuertas: [
      {
        nombre: "Clouded",
        rol: "bajista / coros",
        periodo: "2022 – 2024",
        genero: "indie rock / punk",
        portada: "img/musica/clouded-reflejo.jpg",
        cancion: "Reflejo",
        spotify: "https://open.spotify.com/track/3F1sEJs9xCpQSuZpOVrYTf",
        nota: "Clouded fue una buena banda. La recuerdo con mucho cariño y me dejó muy buenos amigos :3",
      },
      {
        nombre: "Pollo Xs",
        rol: "bajo / voz",
        periodo: "2024",
        genero: "alternative",
        portada: "img/musica/pollo-xs-satanas.jpg",
        cancion: "SATANÁS DUERME BAJO MI CAMA",
        spotify: "https://open.spotify.com/track/0GUpzTvN43wzXspUdzytbF",
        nota: "Terminó mal, así que nos quedamos con sus canciones y las tocamos con las letras cambiadas. Venganza musical.",
      },
    ],

    /* ---------- MIS CDS ----------
       tengo: true = lo tengo · fav: true = mi favorito
       color: colores de la cajita (no son las portadas reales) */
    coleccion: [
      {
        banda: "Fall Out Boy",
        destacada: true, // bloque en negro y rojo
        nota: "mi disco favorito… y no lo tengo en CD. lo descargué entero jaja",
        discos: [
          { titulo: "Take This to Your Grave", anio: 2003, tengo: false },
          { titulo: "From Under the Cork Tree", anio: 2005, tengo: true, color: "#b9895a, #5a3a22" },
          { titulo: "Infinity on High", anio: 2007, tengo: true, color: "#e8e8e8, #2a2a2a" },
          { titulo: "Folie à Deux", anio: 2008, tengo: false, fav: true },
          { titulo: "Believers Never Die", anio: 2009, tengo: true, color: "#ff3b3b, #5a0010", extra: "greatest hits" },
          { titulo: "Save Rock and Roll", anio: 2013, tengo: false },
          { titulo: "American Beauty / American Psycho", anio: 2015, tengo: false },
          { titulo: "Mania", anio: 2018, tengo: false },
          { titulo: "Believers Never Die Vol. 2", anio: 2019, tengo: false },
          { titulo: "So Much (for) Stardust", anio: 2023, tengo: false },
        ],
      },
      {
        banda: "Paramore",
        discos: [
          { titulo: "All We Know Is Falling", anio: 2005, tengo: true, color: "#7a8fa6, #1f2a38" },
          { titulo: "Riot!", anio: 2007, tengo: true, color: "#ff9a3b, #7a1d00" },
          { titulo: "Brand New Eyes", anio: 2009, tengo: true, color: "#ffd6a8, #7a3b1d", fav: true },
          { titulo: "Paramore", anio: 2013, tengo: true, color: "#ff5fa8, #3b1d7a" },
          { titulo: "After Laughter", anio: 2017, tengo: true, color: "#ffc0e0, #7ad6ff" },
          { titulo: "This Is Why", anio: 2023, tengo: true, color: "#ffe14d, #222222" },
        ],
      },
    ],

    /* ---------- TOCATAS ---------- */
    tocatas: [
      { foto: "img/musica/tocata-crearock.webp", texto: "CREAROCK — live" },
      { foto: "img/musica/tocata-rbx.webp", texto: "RBX — caos" },
      { foto: "img/musica/tocata-batuta.webp", texto: "BATUTA — 2023" },
    ],

    /* ---------- FAVORITAS: TOP 8 + MENCIONES HONROSAS ----------
       ✎ disco: tu disco favorito · porque: una línea */
    top8: [
      { banda: "Fall Out Boy", disco: "Folie à Deux", porque: "Fue el primer disco que descargué entero y lo escuché mil veces, en especial en paseos fuera de Santiago." },
      { banda: "Paramore", disco: "Brand New Eyes", porque: "Tiene muchas canciones que me recuerdan buenos momentos y amores del pasado que aún recuerdo con cariño." },
      { banda: "Deftones", disco: "", porque: "" },
      { banda: "Linkin Park", disco: "", porque: "" },
      { banda: "Incubus", disco: "", porque: "" },
      { banda: "Basement", disco: "", porque: "" },
      { banda: "Blink-182", disco: "", porque: "" },
      { banda: "Pierce The Veil", disco: "", porque: "" },
    ],
    menciones: ["The Cure", "Gustavo Cerati", "Soda Stereo"],
  },
};
