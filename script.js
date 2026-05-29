/* =========================
   ELEMENTS
========================= */
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

const demoBtn = document.getElementById("demoBtn");
const popup = document.getElementById("demoPopup");
const closePopup = document.getElementById("closePopup");

/* =========================
   MOBILE MENU
========================= */
if (menuBtn && menu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");

    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* =========================
   NAVBAR SCROLL
========================= */
let lastScroll = window.scrollY;
let hideTimer = null;

window.addEventListener("scroll", () => {
  if (!navbar) return;

  const currentScroll = window.scrollY;

  navbar.classList.toggle("solid", currentScroll > 30);

  const isMobile = window.innerWidth <= 820;

  if (!isMobile && currentScroll > lastScroll && currentScroll > 220) {
    clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
      navbar.classList.add("hidden");
    }, 250);
  } else {
    clearTimeout(hideTimer);
    navbar.classList.remove("hidden");
  }

  lastScroll = currentScroll;
});

/* =========================
   POPUP
========================= */
function openPopup() {
  if (!popup) return;

  popup.classList.add("open");
  popup.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closePopupWindow() {
  if (!popup) return;

  popup.classList.remove("open");
  popup.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (demoBtn) {
  demoBtn.addEventListener("click", openPopup);
}

if (closePopup) {
  closePopup.addEventListener("click", closePopupWindow);
}

if (popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopupWindow();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePopupWindow();
  }
});

/* =========================
   FADE-IN ANIMATIONS
========================= */
const faders = document.querySelectorAll(".fade");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
  }
);

faders.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================
   STAT COUNTERS
========================= */
const counters = document.querySelectorAll(".stat-num");

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      animateCount(entry.target);
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.55,
  }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

function animateCount(element) {
  const target = Number(element.dataset.count);

  if (Number.isNaN(target)) return;

  let current = 0;
  const duration = 900;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    current = Math.round(target * progress);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = target;
    }
  }

  requestAnimationFrame(updateCount);
}
