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
  escuchando: "Faster — Manic Street Preachers",

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
  quote: "",
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

  // Canciones que pasan por el winamp (la primera siempre es "escuchando")
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
       "konami"  -> código Konami: ↑ ↑ ↓ ↓ ← → ← → B A
       "palabra" -> escribir la palabra secreta con el teclado
       "sticker" -> encontrar el sticker escondido
       ""        -> todavía bloqueado (próximamente)
     ✎ Escribe tu contenido en "lineas" (una línea por cosa). */
  palabraSecreta: "descargado",
  secretos: [
    {
      archivo: "dreams.txt",
      titulo: "Dreams",
      desbloqueo: "konami",
      lineas: ["(escribe aquí tus sueños ♡)", "uno por línea, como una lista :3"],
    },
    {
      archivo: "bucket_list.txt",
      titulo: "Bucket list",
      desbloqueo: "palabra",
      lineas: ["(cosas que quiero hacer antes de morir)", "[ ] completar todos los CDs de Fall Out Boy"],
    },
    {
      archivo: "things_ill_never_forget.txt",
      titulo: "Things I'll never forget",
      desbloqueo: "sticker",
      lineas: ["(momentos que nunca voy a olvidar)"],
    },
    { archivo: "memories.txt", titulo: "Memories", desbloqueo: "", lineas: [] },
    // Amigos solo con apodo (nunca nombres completos ni contactos)
    { archivo: "my_friends.txt", titulo: "My friends", desbloqueo: "", lineas: [] },
  ],
};
