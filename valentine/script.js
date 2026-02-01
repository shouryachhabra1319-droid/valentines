// ===== PASSWORD SETTINGS =====
// Change your password here:
const CORRECT_PASSWORD = "05082025"; // <-- EDIT THIS

const gate = document.getElementById("gate");
const mainSite = document.getElementById("mainSite");
const enterBtn = document.getElementById("enterBtn");
const passwordInput = document.getElementById("passwordInput");
const gateError = document.getElementById("gateError");

enterBtn.addEventListener("click", checkPassword);
passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkPassword();
});

function checkPassword() {
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
document.getElementById("continueBtn").addEventListener("click", () => {
  document.getElementById("story").scrollIntoView({ behavior: "smooth" });
});

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
const noteText = "Every day with you feels like a soft miracle, and I’m so grateful it’s us.";

let noteIndex = 0;
function typeNote() {
  if (noteIndex < noteText.length) {
    typedNote.textContent += noteText.charAt(noteIndex++);
    setTimeout(typeNote, 40);
  }
}
typeNote();

// Final section buttons
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const yesMessage = document.getElementById("yesMessage");

yesBtn.addEventListener("click", () => {
  yesMessage.classList.remove("hidden");
  launchConfetti();
});

// NO button runs away
function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

// Proximity detection
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const dx = e.clientX - (rect.left + rect.width / 2);
  const dy = e.clientY - (rect.top + rect.height / 2);
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < 120) moveNoButton();
});

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confetti = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  confetti = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 40 + 10,
    color: `hsl(${Math.random() * 360},70%,70%)`,
  }));
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
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

// Easter egg: click anywhere to drop a tiny heart
document.addEventListener("click", (e) => {
  const heart = document.createElement("div");
  heart.textContent = "💗";
  heart.style.position = "fixed";
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  heart.style.transition = "transform 1.2s ease, opacity 1.2s ease";
  document.body.appendChild(heart);
  requestAnimationFrame(() => {
    heart.style.transform = "translateY(-40px) scale(1.2)";
    heart.style.opacity = "0";
  });
  setTimeout(() => heart.remove(), 1200);
});
