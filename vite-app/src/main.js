// ===== PASSWORD SETTINGS =====
// Change your password here:
const CORRECT_PASSWORD = "05082025"; // <-- EDIT THIS

const gate = document.getElementById("gate");
const mainSite = document.getElementById("mainSite");
const enterBtn = document.getElementById("enterBtn");
const passwordInput = document.getElementById("passwordInput");
const gateError = document.getElementById("gateError");
const bgMusicWrap = document.getElementById("bgMusicWrap");
const bgAudio = document.getElementById("bgAudio");
const continueBtn = document.getElementById("continueBtn");
const finalContinue = document.getElementById("finalContinue");
const photosContinue = document.getElementById("photosContinue");
const musicContinue = document.getElementById("musicContinue");
const restartBtn = document.getElementById("restartBtn");

const tryStartBgAudio = () => {
  if (!bgAudio) return;
  bgAudio.play().catch(() => {});
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

const navigateWithFade = (url) => {
  if (!document.body.classList.contains("page-fade")) {
    window.location.href = url;
    return;
  }
  document.body.classList.remove("loaded");
  setTimeout(() => {
    window.location.href = url;
  }, 550);
};

if (bgAudio && localStorage.getItem("bgMusic") === "1") {
  const savedTime = Number(localStorage.getItem("bgMusicTime") || "0");
  if (!Number.isNaN(savedTime) && savedTime > 0) {
    bgAudio.currentTime = savedTime;
  }
  tryStartBgAudio();
}

document.addEventListener("click", tryStartBgAudio, { once: true });
document.addEventListener("touchstart", tryStartBgAudio, { once: true });
document.addEventListener("keydown", tryStartBgAudio, { once: true });

if (bgAudio) {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("bgMusicTime", String(bgAudio.currentTime || 0));
  });
}

if (enterBtn && passwordInput) {
  enterBtn.addEventListener("click", checkPassword);
  passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPassword();
  });
}

function checkPassword() {
  if (!gate || !mainSite || !passwordInput || !gateError) return;
  if (passwordInput.value === CORRECT_PASSWORD) {
    gate.style.opacity = "0";
    gate.style.transition = "opacity 0.8s ease";
    setTimeout(() => {
      gate.style.display = "none";
      mainSite.classList.remove("hidden");
    }, 800);
  } else {
    gateError.textContent = "Hmm… try again, love 💗";
  }
}

// Smooth scroll
if (continueBtn) {
  continueBtn.addEventListener("click", () => {
    localStorage.setItem("bgMusic", "1");
    navigateWithFade("/love.html");
  });
}

if (finalContinue) {
  finalContinue.addEventListener("click", () => {
    navigateWithFade("/final.html");
  });
}

if (photosContinue) {
  photosContinue.addEventListener("click", () => {
    navigateWithFade("/photos.html");
  });
}

if (musicContinue) {
  musicContinue.addEventListener("click", () => {
    navigateWithFade("/music.html");
  });
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    navigateWithFade("/index.html");
  });
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("active")),
  { threshold: 0.2 }
);
reveals.forEach((el) => observer.observe(el));

// Typing effect for love note
const typedNote = document.getElementById("typedNote");

// EDIT THIS MESSAGE:
const noteText =
  "Even in the way you love, there’s a warmth I can almost breathe in. " +
  "In the way you move, your laughter follows like light behind you. " +
  "Knowing that one day moments fade, I gather every piece of you, " +
  "etching them softly into the back of my memory. " +
  "Not because it’s a right I’m owed, " +
  "but because loving you is a promise I choose to keep.";

let noteIndex = 0;
function typeNote() {
  if (noteIndex < noteText.length) {
    typedNote.textContent += noteText.charAt(noteIndex++);
    setTimeout(typeNote, 40);
  }
}

// change
if (typedNote) {
  typeNote();
}

// Custom audio controls
const audioButtons = document.querySelectorAll(".audio-btn");
if (audioButtons.length > 0) {
  const audioById = new Map();

  const stopBgMusic = () => {
    if (bgAudio) {
      bgAudio.pause();
      bgAudio.currentTime = 0;
    }
    if (bgMusicWrap) bgMusicWrap.remove();
    localStorage.removeItem("bgMusic");
    localStorage.removeItem("bgMusicTime");
  };

  const setButtonState = (audio, isPlaying) => {
    const btn = audioById.get(audio);
    if (btn) btn.textContent = isPlaying ? "Pause" : "Play";
  };

  const updateProgress = (audio) => {
    const btn = audioById.get(audio);
    if (!btn) return;
    const bar = btn.closest(".song-card")?.querySelector(".audio-progress");
    if (!bar) return;
    const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    bar.style.width = `${Math.min(percent, 100)}%`;
  };

  const pauseAllExcept = (activeAudio) => {
    audioById.forEach((btn, audio) => {
      if (audio === activeAudio) return;
      audio.pause();
      setButtonState(audio, false);
      updateProgress(audio);
    });
  };

  audioButtons.forEach((btn) => {
    const audioId = btn.dataset.audio;
    const audio = audioId ? document.getElementById(audioId) : null;
    if (!audio) return;
    audioById.set(audio, btn);

    btn.addEventListener("click", () => {
      if (audio.paused) {
        pauseAllExcept(audio);
        audio.play().catch(() => {});
        setButtonState(audio, true);
        stopBgMusic();
      } else {
        audio.pause();
        setButtonState(audio, false);
      }
    });

    audio.addEventListener("timeupdate", () => updateProgress(audio));
    audio.addEventListener("ended", () => {
      setButtonState(audio, false);
      updateProgress(audio);
    });
  });
}

// Floating hearts stream on landing page
const floatingStream = document.querySelector(".floating-stream");
if (floatingStream) {
  for (let i = 0; i < 72; i += 1) {
    const heart = document.createElement("span");
    heart.className = "float-heart";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 6}s`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;
    heart.style.fontSize = `${24 + Math.random() * 28}px`;
    floatingStream.appendChild(heart);
  }
}

// Final section buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesMessage = document.getElementById("yesMessage");

if (yesBtn && yesMessage) {
  yesBtn.addEventListener("click", () => {
    yesMessage.textContent = "I LOVE YOU MERI RADHA";
    yesMessage.classList.remove("hidden");
    yesMessage.classList.add("show");
    if (noBtn) noBtn.style.display = "none";
    if (restartBtn) restartBtn.classList.remove("hidden");
    launchConfetti();
    launchHeartShower();
  });
}

// NO button runs away
function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
if (noBtn) {
  noBtn.addEventListener("mouseover", moveNoButton);
  noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

// Proximity detection
document.addEventListener("mousemove", (e) => {
  if (!noBtn) return;
  const rect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 120) moveNoButton();
});

// Confetti
const canvas = document.getElementById("confetti");
let ctx = null;
let confetti = [];

if (canvas) {
  ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
}

function launchConfetti() {
  if (!canvas || !ctx) return;
  confetti = Array.from({ length: 250 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 40 + 10,
    color: `hsl(${Math.random() * 360},70%,70%)`,
  }));
  requestAnimationFrame(updateConfetti);
}

function launchHeartShower() {
  for (let i = 0; i < 60; i += 1) {
    const heart = document.createElement("div");
    heart.textContent = "💗";
    heart.className = "big-heart";
    heart.style.left = `${Math.random() * window.innerWidth}px`;
    heart.style.top = `${window.innerHeight + Math.random() * 200}px`;
    heart.style.transition = "transform 3.2s ease, opacity 3.2s ease";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.style.transform = `translateY(-${window.innerHeight + 200}px) scale(1.3)`;
      heart.style.opacity = "0";
    }, i * 40);
    setTimeout(() => heart.remove(), 3400);
  }
}

function updateConfetti() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((p) => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += Math.cos(p.d) + 2;
  });
  if (confetti.some((p) => p.y < canvas.height + 20)) {
    requestAnimationFrame(updateConfetti);
  }
}

// Click on landing page to release big hearts
const spawnBigHeart = (x, y) => {
  const heart = document.createElement("div");
  heart.textContent = "💗";
  heart.className = "big-heart";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);
  requestAnimationFrame(() => {
    heart.style.transform = "translateY(-60px) scale(1.6)";
    heart.style.opacity = "0";
  });
  setTimeout(() => heart.remove(), 1200);
};

const spawnHeartBurst = (x, y) => {
  for (let i = 0; i < 6; i += 1) {
    const dx = (Math.random() - 0.5) * 60;
    const dy = (Math.random() - 0.5) * 30;
    spawnBigHeart(x + dx, y + dy);
  }
};

document.addEventListener("click", (e) => {
  if (!e.target.closest(".hero")) return;
  spawnHeartBurst(e.clientX, e.clientY);
});

document.addEventListener("touchstart", (e) => {
  const hero = e.target.closest(".hero");
  if (!hero) return;
  const touch = e.touches[0];
  if (!touch) return;
  spawnHeartBurst(touch.clientX, touch.clientY);
});
