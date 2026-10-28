/**
 * ============================================================================
 * 5 MESES A TU LADO - EXPERIENCIA INTERACTIVA 3D Y ROMÁNTICA
 * Para: Yuliana Valentina ("Mi Amor")
 * De: William Esteban
 * Aniversario: 28 de cada mes (5 Meses)
 * ============================================================================
 */

/* ==========================================
   CONFIGURACIÓN PRINCIPAL (FÁCIL DE PERSONALIZAR)
   ========================================== */
const CONFIG = {
  girlfriendName: "Yuliana Valentina",
  girlfriendNickname: "Mi Amor",
  boyfriendName: "William Esteban",
  anniversaryDay: 28,
  // Canción de amor configurada
  song: {
    title: "You & Me (Flume Remix)",
    artist: "Disclosure, Eliza Doolittle & Flume",
    youtubeId: "8x-M7AkTvrQ"
  },
  // Fecha exacta de inicio de la relación: 28 de Mayo de 2026 (mes 4 en JavaScript es Mayo)
  startDate: new Date(2026, 4, 28, 0, 0, 0),

  // Las 5 Cartas de los 5 Meses (con fotos e historias)
  letters: [
    {
      month: 1,
      badge: "Mes 1",
      date: "28 de Junio",
      title: "El Inicio de Nuestra Historia",
      photo: "photos/carta_foto_1.jpg",
      caption: "El día que todo comenzó 🦕💚",
      message: "El día que todo comenzó. Desde que entraste a mi vida, los días grises cambiaron de color. Gracias por permitirme descubrir el inicio de nuestra historia."
    },
    {
      month: 2,
      badge: "Mes 2",
      date: "28 de Julio",
      title: "Descubriendo tu Sonrisa",
      photo: "photos/carta_foto_2.jpg",
      caption: "A tu lado todo se siente en casa 🏡🦕💚",
      message: "Conocer tus risas, tus gestos y tus manías se convirtió rápidamente en mi pasatiempo favorito. Descubrí que a tu lado todo se siente en casa."
    },
    {
      month: 3,
      badge: "Mes 3",
      date: "28 de Agosto",
      title: "Amor Cálido y Seguro",
      photo: "photos/carta_foto_3.jpg",
      caption: "Gracias por cada abrazo sincero 🫂🦕💚",
      message: "Tres meses entendiendo que el amor verdadero no es perfecto, pero sí es bonito, cálido y seguro cuando estoy contigo. Gracias por cada abrazo."
    },
    {
      month: 4,
      badge: "Mes 4",
      date: "28 de Septiembre",
      title: "Mi Lugar Favorito",
      photo: "photos/carta_foto_4.jpg",
      caption: "Eres mi lugar favorito en el mundo 🌍🦕💚",
      message: "El tiempo a tu lado vuela, pero cada segundo deja un recuerdo grabado en mi corazón. Eres mi lugar favorito en el mundo."
    },
    {
      month: 5,
      badge: "Mes 5",
      date: "28 de Octubre",
      title: "¡Felices 5 Meses, Mi Amor!",
      photo: "photos/photo_5.jpg",
      caption: "Esto es solo el comienzo de nosotros 🥂🦕💚",
      message: "¡Felices 5 meses, mi amor! Parecen pocos, pero la intensidad con la que te amo crece cada día. Gracias por ser mi compañera, mi sonrisa y mi amor. Esto es solo el comienzo."
    }
  ],

  // 5 Razones interactivas
  reasons: [
    {
      icon: "✨",
      title: "Tu Sonrisa Mágica",
      desc: "Porque tienes la capacidad de iluminar mis días más difíciles tan solo con sonreírme. Tu alegría me llena el alma."
    },
    {
      icon: "🫂",
      title: "La Paz de tus Abrazos",
      desc: "Porque cuando me abrazas el mundo entero se detiene. En tu pecho encontré el rincón más seguro y cálido del universo."
    },
    {
      icon: "💖",
      title: "Tu Dulzura y Ternura",
      desc: "Por la forma tan hermosa en que me cuidas, tu nobleza de corazón y cada detalle que me demuestra lo maravilloso que es tenerte."
    },
    {
      icon: "🌟",
      title: "Nuestra Complicidad",
      desc: "Por nuestras risas tontas, las anécdotas compartidas y esa conexión tan única donde con una sola mirada ya nos entendemos."
    },
    {
      icon: "👑",
      title: "Simplemente Ser Tú",
      desc: "Porque eres una mujer increíble, hermosa por dentro y por fuera. Te amo exactamente como eres, única e irreemplazable."
    }
  ],

  // Galería de fotos (29 fotos de la carpeta photos)
  gallery: Array.from({ length: 29 }, (_, i) => ({
    url: `photos/photo_${i + 1}.jpg`,
    caption: `Nuestro momento especial #${i + 1} 🦕💚`
  }))
};

/* ==========================================
   ESTADO GLOBAL DE LA APLICACIÓN
   ========================================== */
let currentModalIndex = 0;
let currentLightboxIndex = 0;
let isAudioPlaying = false;
let audioSynth = null;

/* ==========================================
   INICIALIZACIÓN AL CARGAR LA PÁGINA
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initLoveCounter();
  renderEnvelopes();
  renderReasons();
  renderGallery();
  initModalListeners();
  initLightboxListeners();
  initCelebration();
  initAudioPlayer();
  initThreeJsBackground();
});

/* ==========================================
   0. MENÚ DE NAVEGACIÓN Y RESPONSIVE
   ========================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      navLinks.classList.toggle("mobile-open");
    });

    // Cerrar al hacer clic en un enlace del menú
    const links = navLinks.querySelectorAll(".nav-link-item");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
      });
    });

    // Cerrar al hacer clic fuera del menú en móviles
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBtn.classList.remove("active");
        navLinks.classList.remove("mobile-open");
      }
    });
  }
}

/* ==========================================
   1. CONTADOR DE TIEMPO DE AMOR (PRECISO CON DÍAS REALES)
   ========================================== */
function initLoveCounter() {
  const monthsEl = document.getElementById("count-months");
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minutesEl = document.getElementById("count-minutes");
  const secondsEl = document.getElementById("count-seconds");

  function update() {
    const now = new Date();
    // 28 de Mayo de 2026, 00:00:00 (en JS el mes 4 es Mayo)
    const start = CONFIG.startDate || new Date(2026, 4, 28, 0, 0, 0);

    let years = now.getFullYear() - start.getFullYear();
    let months = (now.getMonth() - start.getMonth()) + (years * 12);
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();
    let minutes = now.getMinutes() - start.getMinutes();
    let seconds = now.getSeconds() - start.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      // Días reales del mes anterior al actual (Septiembre = 30 días)
      const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthDays;
      months--;
    }

    if (monthsEl) monthsEl.textContent = String(Math.max(0, months)).padStart(2, "0");
    if (daysEl) daysEl.textContent = String(Math.max(0, days)).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(Math.max(0, hours)).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(Math.max(0, minutes)).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(Math.max(0, seconds)).padStart(2, "0");
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================
   2. RENDER DE LOS 5 SOBRES / CARTAS
   ========================================== */
function renderEnvelopes() {
  const container = document.getElementById("envelopes-container");
  if (!container) return;

  container.innerHTML = CONFIG.letters.map((letter, index) => `
    <div class="envelope-card" data-index="${index}" onclick="openLetterModal(${index})">
      <div class="envelope-body">
        <div class="envelope-flap"></div>
        <div class="wax-seal" style="background: radial-gradient(circle, #10b981 0%, #047857 100%);">
          <span>💚</span>
        </div>
        <div class="envelope-content">
          <span class="month-badge">${letter.badge}</span>
          <p class="month-date">${letter.date}</p>
          <div class="envelope-tap-hint">
            <span>Abrir Cartita</span>
            <span>🦕💌</span>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

/* ==========================================
   3. MODAL DE CARTA POLAROID
   ========================================== */
function initModalListeners() {
  const modalOverlay = document.getElementById("letter-modal-overlay");
  const closeBtn = document.getElementById("modal-close-btn");
  const prevBtn = document.getElementById("modal-prev-btn");
  const nextBtn = document.getElementById("modal-next-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeLetterModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeLetterModal();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentModalIndex > 0) openLetterModal(currentModalIndex - 1);
      else openLetterModal(CONFIG.letters.length - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentModalIndex < CONFIG.letters.length - 1) openLetterModal(currentModalIndex + 1);
      else openLetterModal(0);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLetterModal();
      closeLightbox();
    }
  });
}

function openLetterModal(index) {
  currentModalIndex = index;
  const letter = CONFIG.letters[index];
  const overlay = document.getElementById("letter-modal-overlay");

  document.getElementById("modal-img").src = letter.photo;
  document.getElementById("modal-caption").textContent = letter.caption;
  document.getElementById("modal-tag").textContent = `${letter.badge} • ${letter.date}`;
  document.getElementById("modal-title").textContent = letter.title;
  document.getElementById("modal-body").textContent = letter.message;
  document.getElementById("modal-signature").textContent = `De: ${CONFIG.boyfriendName} Para: ${CONFIG.girlfriendName} 🦕💚`;

  // Indicadores de puntos (dots)
  const dotsContainer = document.getElementById("modal-dots");
  if (dotsContainer) {
    dotsContainer.innerHTML = CONFIG.letters.map((_, i) => `
      <div class="modal-dot ${i === index ? "active" : ""}" onclick="openLetterModal(${i})"></div>
    `).join("");
  }

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";

  // Efecto de corazoncito flotante al abrir
  launchMiniHearts();
}

function closeLetterModal() {
  const overlay = document.getElementById("letter-modal-overlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

/* ==========================================
   4. SECCIÓN "RAZONES POR LAS QUE TE AMO" (FLIP CARDS)
   ========================================== */
function renderReasons() {
  const container = document.getElementById("reasons-container");
  if (!container) return;

  container.innerHTML = CONFIG.reasons.map((reason, index) => `
    <div class="reason-flip-card" onclick="toggleReasonFlip(this)">
      <div class="flip-card-inner">
        <div class="flip-front">
          <span class="reason-number">0${index + 1}</span>
          <div class="reason-icon">${reason.icon}</div>
          <h3 class="reason-title">${reason.title}</h3>
          <span class="flip-hint">Toca para descubrir ✨</span>
        </div>
        <div class="flip-back">
          <span class="flip-back-quote">“</span>
          <p class="reason-desc">${reason.desc}</p>
          <span class="flip-hint" style="margin-top: 1rem;">❤️ Te Amo</span>
        </div>
      </div>
    </div>
  `).join("");
}

function toggleReasonFlip(card) {
  card.classList.toggle("flipped");
}

/* ==========================================
   5. GALERÍA DE RECUERDOS (FOTOS REALES)
   ========================================== */
function renderGallery() {
  const container = document.getElementById("gallery-container");
  if (!container) return;

  container.innerHTML = CONFIG.gallery.map((item, index) => `
    <div class="gallery-item" onclick="openLightbox(${index})">
      <div class="gallery-img-box">
        <img src="${item.url}" alt="Recuerdo de Amor" loading="lazy" onerror="this.src='photos/photo_1.jpg'">
      </div>
      <p class="gallery-item-caption">${item.caption}</p>
    </div>
  `).join("");
}

function initLightboxListeners() {
  const overlay = document.getElementById("lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLightbox();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentLightboxIndex > 0) openLightbox(currentLightboxIndex - 1);
      else openLightbox(CONFIG.gallery.length - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentLightboxIndex < CONFIG.gallery.length - 1) openLightbox(currentLightboxIndex + 1);
      else openLightbox(0);
    });
  }
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const item = CONFIG.gallery[index];
  const overlay = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lightbox-caption");

  if (img) img.src = item.url;
  if (caption) caption.textContent = `${item.caption} (${index + 1} / ${CONFIG.gallery.length})`;

  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox-modal");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

/* ==========================================
   6. CELEBRACIÓN DE 5 MESES Y CONFETI
   ========================================== */
function initCelebration() {
  const celebrateBtn = document.getElementById("celebrate-btn");
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", launchCelebration);
  }
}

function launchCelebration() {
  // Asegurar reproducción de música si no está activa
  if (!isAudioPlaying) {
    toggleAudio();
  }

  if (typeof confetti === "function") {
    // Ráfaga central con corazones verdes y destellos dorados
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#10b981', '#00e676', '#6ee7b7', '#f3c267', '#ffffff']
    });

    // Ráfagas laterales
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#00e676', '#f3c267']
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#6ee7b7', '#f3c267']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
}

function launchMiniHearts() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ff758f', '#f3c267', '#ffe5ec']
    });
  }
}

/* ==========================================
   7. REPRODUCTOR DE MÚSICA ROMÁNTICA
   (Sintetizador Web Audio API incorporado + audio file fallback)
   ========================================== */
class RomanticMusicSynth {
  constructor() {
    this.ctx = null;
    this.timer = null;
    this.isPlaying = false;
    // Acordes románticos en piano/lo-fi (C maj9, Am9, F maj7, G sus4)
    this.chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7
      [196.00, 246.94, 293.66, 392.00, 523.25]  // G
    ];
    this.currentChord = 0;
    this.noteStep = 0;
  }

  start() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.step();
  }

  stop() {
    this.isPlaying = false;
    clearTimeout(this.timer);
  }

  step() {
    if (!this.isPlaying) return;

    const chord = this.chords[this.currentChord];
    const freq = chord[this.noteStep % chord.length];

    this.playSoftNote(freq, 1.8);

    this.noteStep++;
    if (this.noteStep % 8 === 0) {
      this.currentChord = (this.currentChord + 1) % this.chords.length;
    }

    // Intervalo suave de arpegio romántico
    this.timer = setTimeout(() => this.step(), 420);
  }

  playSoftNote(freq, duration) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Tipo triángulo / seno para sonido cálido y dulce como cajita de música o piano
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Envolvente suave
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }
}

/* ==========================================
   7. REPRODUCTOR DE MÚSICA & CANCIÓN
   "You & Me (Flume Remix) - Disclosure, Eliza Doolittle & Flume"
   ========================================== */
let ytPlayer = null;
let ytReady = false;

// Cargar YouTube IFrame API dinámicamente
(function loadYouTubeAPI() {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('youtube-player', {
    height: '0',
    width: '0',
    videoId: CONFIG.song.youtubeId,
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      playlist: CONFIG.song.youtubeId
    },
    events: {
      onReady: () => {
        ytReady = true;
      },
      onStateChange: (event) => {
        const audioBtn = document.getElementById("audio-toggle-btn");
        if (event.data === YT.PlayerState.PLAYING) {
          isAudioPlaying = true;
          if (audioBtn) audioBtn.classList.add("playing");
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
          isAudioPlaying = false;
          if (audioBtn) audioBtn.classList.remove("playing");
        }
      }
    }
  });
};

function initAudioPlayer() {
  const audioBtn = document.getElementById("audio-toggle-btn");
  const musicModal = document.getElementById("music-modal");
  const musicCloseBtn = document.getElementById("music-modal-close");

  audioSynth = new RomanticMusicSynth();

  // Abrir cuadrito de música SOLO al presionar el botón "Música"
  if (audioBtn) {
    audioBtn.addEventListener("click", openMusicModal);
  }

  // Cerrar cuadrito de música
  if (musicCloseBtn) {
    musicCloseBtn.addEventListener("click", closeMusicModal);
  }

  // Cerrar al hacer clic en el fondo oscuro
  if (musicModal) {
    musicModal.addEventListener("click", (e) => {
      if (e.target === musicModal) {
        closeMusicModal();
      }
    });
  }

  // Tecla Escape para cerrar
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMusicModal();
    }
  });
}

function openMusicModal() {
  const musicModal = document.getElementById("music-modal");
  const audioBtn = document.getElementById("audio-toggle-btn");
  const bgAudio = document.getElementById("bg-audio");

  // Si existe archivo local music.mp3 lo reproducimos directo
  if (bgAudio && bgAudio.src && bgAudio.src.indexOf(".mp3") !== -1) {
    bgAudio.play().catch(() => {});
  }

  if (musicModal) {
    musicModal.classList.add("active");
  }

  if (audioBtn) {
    audioBtn.classList.add("playing");
  }

  isAudioPlaying = true;
}

function closeMusicModal() {
  const musicModal = document.getElementById("music-modal");
  if (musicModal) {
    musicModal.classList.remove("active");
  }
}

function toggleAudio() {
  openMusicModal();
}

/* ==========================================
   FUNCIÓN DINOSAURIO INTERACTIVO 🦕
   ========================================== */
window.triggerDinoRoar = function() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10b981', '#00e676', '#6ee7b7', '#f3c267']
    });
  }

  // Reproducir sonido suave de celebración / corazón
  if (!isAudioPlaying) {
    toggleAudio();
  }

  // Mostrar mensaje emergente tierno
  showToast("¡Rawr! 🦕💚 Significa 'Te Amo' en dinosaurio, mi amor");
};

function showToast(message) {
  let toast = document.getElementById("dino-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "dino-toast";
    toast.style.position = "fixed";
    toast.style.bottom = "2.5rem";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "linear-gradient(135deg, rgba(6, 78, 59, 0.95), rgba(4, 120, 87, 0.95))";
    toast.style.border = "1px solid #34d399";
    toast.style.color = "#ffffff";
    toast.style.padding = "0.9rem 1.8rem";
    toast.style.borderRadius = "30px";
    toast.style.boxShadow = "0 10px 30px rgba(0, 230, 118, 0.4)";
    toast.style.zIndex = "9999";
    toast.style.fontFamily = "var(--font-sans)";
    toast.style.fontSize = "0.95rem";
    toast.style.fontWeight = "600";
    toast.style.transition = "all 0.4s ease";
    toast.style.pointerEvents = "none";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 3500);
}

/* ==========================================
   8. THREE.JS: FONDO 3D CON CORAZONES Y PARTÍCULAS
   ========================================== */
function initThreeJsBackground() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 35;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Luces verdes y doradas románticas
  const ambientLight = new THREE.AmbientLight(0x6ee7b7, 0.9);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x10b981, 2.2, 120);
  pointLight1.position.set(20, 20, 20);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xf3c267, 1.8, 120);
  pointLight2.position.set(-20, -20, 20);
  scene.add(pointLight2);

  // Forma 2D de corazón para extruir en 3D
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x + 2.5, y + 2.5);
  heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y);
  heartShape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5);
  heartShape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5);
  heartShape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5);
  heartShape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y);
  heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

  const extrudeSettings = {
    depth: 1.2,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 2,
    bevelSize: 0.6,
    bevelThickness: 0.6
  };

  const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  // Centrar geometría
  heartGeometry.center();

  // Material de cristal verde esmeralda, menta y dorado (Corazones Verdes 💚)
  const heartColors = [0x10b981, 0x059669, 0x00e676, 0x34d399, 0x6ee7b7, 0xf3c267];
  const hearts = [];
  const heartCount = 20;

  for (let i = 0; i < heartCount; i++) {
    const color = heartColors[i % heartColors.length];
    const material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 100,
      specular: 0xffffff,
      transparent: true,
      opacity: 0.65 + Math.random() * 0.3
    });

    const mesh = new THREE.Mesh(heartGeometry, material);
    const scale = 0.12 + Math.random() * 0.22;
    mesh.scale.set(scale, scale, scale);

    mesh.position.x = (Math.random() - 0.5) * 60;
    mesh.position.y = (Math.random() - 0.5) * 45;
    mesh.position.z = (Math.random() - 0.5) * 35;

    mesh.rotation.x = Math.PI; // Orientar hacia arriba
    mesh.rotation.z = Math.random() * Math.PI;

    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.02,
      rotSpeedZ: (Math.random() - 0.5) * 0.01,
      floatSpeedY: 0.02 + Math.random() * 0.025,
      originalY: mesh.position.y
    };

    scene.add(mesh);
    hearts.push(mesh);
  }

  // Textura suave de dinosaurio 🦕 con halo verde esmeralda para el fondo
  const dinoCanvas = document.createElement("canvas");
  dinoCanvas.width = 128;
  dinoCanvas.height = 128;
  const dinoCtx = dinoCanvas.getContext("2d");
  
  // Halo verde suave
  const dinoGrad = dinoCtx.createRadialGradient(64, 64, 15, 64, 64, 58);
  dinoGrad.addColorStop(0, "rgba(16, 185, 129, 0.45)");
  dinoGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
  dinoCtx.fillStyle = dinoGrad;
  dinoCtx.beginPath();
  dinoCtx.arc(64, 64, 58, 0, Math.PI * 2);
  dinoCtx.fill();

  // Emoji dinosaurio 🦕
  dinoCtx.font = "62px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif";
  dinoCtx.textAlign = "center";
  dinoCtx.textBaseline = "middle";
  dinoCtx.fillText("🦕", 64, 66);

  const dinoTexture = new THREE.CanvasTexture(dinoCanvas);
  const dinoMaterial = new THREE.SpriteMaterial({
    map: dinoTexture,
    transparent: true,
    opacity: 0.85
  });

  const dinos = [];
  const dinoCount = 14;

  for (let i = 0; i < dinoCount; i++) {
    const sprite = new THREE.Sprite(dinoMaterial);
    const scale = 2.4 + Math.random() * 2.0;
    sprite.scale.set(scale, scale, 1);

    sprite.position.x = (Math.random() - 0.5) * 65;
    sprite.position.y = (Math.random() - 0.5) * 50;
    sprite.position.z = (Math.random() - 0.5) * 35;

    sprite.userData = {
      floatSpeedY: 0.016 + Math.random() * 0.022,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.015 + Math.random() * 0.02
    };

    scene.add(sprite);
    dinos.push(sprite);
  }

  // Partículas de estrellas / polvo de hadas
  const particleCount = 450;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 90;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 70;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 60;

    // Colores rosa y dorado
    if (Math.random() > 0.5) {
      particleColors[i * 3] = 1.0; // R
      particleColors[i * 3 + 1] = 0.7; // G
      particleColors[i * 3 + 2] = 0.8; // B
    } else {
      particleColors[i * 3] = 0.95; // R
      particleColors[i * 3 + 1] = 0.8; // G
      particleColors[i * 3 + 2] = 0.4; // B
    }
  }

  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.45,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Parallax con el mouse
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animación del render
  function animate() {
    requestAnimationFrame(animate);

    // Rotación y flotación de los corazones
    hearts.forEach((h) => {
      h.rotation.x += h.userData.rotSpeedX;
      h.rotation.y += h.userData.rotSpeedY;
      h.rotation.z += h.userData.rotSpeedZ;

      h.position.y += h.userData.floatSpeedY;
      if (h.position.y > 30) {
        h.position.y = -30;
      }
    });

    // Flotación y movimiento suave de los dinosaurios 🦕
    dinos.forEach((d) => {
      d.position.y += d.userData.floatSpeedY;
      d.position.x += Math.sin(Date.now() * 0.001 * d.userData.swaySpeed + d.userData.swayOffset) * 0.035;
      if (d.position.y > 32) {
        d.position.y = -32;
        d.position.x = (Math.random() - 0.5) * 65;
      }
    });

    // Movimiento sutil de partículas
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0004;

    // Efecto suave de cámara con el cursor
    camera.position.x += (mouseX * 4 - camera.position.x) * 0.04;
    camera.position.y += (mouseY * 3 - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();

  // Resize adaptativo
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
