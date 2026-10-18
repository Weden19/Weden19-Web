const i18n = {
  ru: {
    title: "Weden19 — дизайн, логотипы, VRChat",
    lead: "Дизайнер. Логотипы, визуал, миры и аватары для VRChat.",
    cta: "Связаться",
    meta: "Логотипы • Дизайн • VRChat",
    status: "Существую. Крутой.",
    scroll: "Листай ↓",
    servicesTitle: "Что я делаю",
    s1t: "Логотипы",
    s1d: "Знаки и шрифтовые логотипы, которые читаются в любом размере.",
    s2t: "Дизайн",
    s2d: "Визуал для брендов, соцсетей и личных проектов.",
    s3t: "VRChat",
    s3d: "Миры и аватары — от идеи до загрузки в игру.",
    contactTitle: "Связь",
    copy: "нажми, чтобы скопировать",
    copied: "Discord-ник скопирован",
    vrcValue: "Профиль",
  },
  en: {
    title: "Weden19 — design, logos, VRChat",
    lead: "Designer. Logos, visuals, VRChat worlds and avatars.",
    cta: "Get in touch",
    meta: "Logos • Design • VRChat",
    status: "I exist. I'm cool.",
    scroll: "Scroll ↓",
    servicesTitle: "What I do",
    s1t: "Logos",
    s1d: "Marks and wordmarks that read at any size.",
    s2t: "Design",
    s2d: "Visuals for brands, socials and personal projects.",
    s3t: "VRChat",
    s3d: "Worlds and avatars — from idea to in-game upload.",
    contactTitle: "Contact",
    copy: "click to copy",
    copied: "Discord username copied",
    vrcValue: "Profile",
  },
};

let lang = "ru";

function storageGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* приватный режим */ }
}

function setLang(next) {
  lang = i18n[next] ? next : "ru";
  const dict = i18n[lang];
  document.documentElement.lang = lang;
  document.title = dict.title;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = dict[el.dataset.i18n];
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });
  storageSet("lang", lang);
}

document.querySelectorAll("[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => setLang(btn.dataset.lang));
});

const browserLang = (navigator.language || "ru").toLowerCase().startsWith("ru") ? "ru" : "en";
setLang(storageGet("lang") || browserLang);

// Тост
const toast = document.getElementById("toast");
let toastTimer;
function showToast(text) {
  toast.textContent = text;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2000);
}

// Discord: ссылки на ник нет, поэтому копируем в буфер
document.getElementById("discordBtn").addEventListener("click", async (e) => {
  const value = e.currentTarget.dataset.copy;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = value;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  showToast(i18n[lang].copied);
});

// Блик на карточке за курсором
const heroCard = document.getElementById("heroCard");
heroCard.addEventListener("pointermove", (e) => {
  const r = heroCard.getBoundingClientRect();
  heroCard.style.setProperty("--mx", `${e.clientX - r.left}px`);
  heroCard.style.setProperty("--my", `${e.clientY - r.top}px`);
});

// Появление блоков при скролле
const revealEls = document.querySelectorAll(".section__title, .card, .contact");
if ("IntersectionObserver" in window) {
  revealEls.forEach((el) => el.classList.add("reveal"));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));
}

document.getElementById("year").textContent = new Date().getFullYear();
