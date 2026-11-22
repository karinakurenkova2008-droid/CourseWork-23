document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Scroll Reveal Animations ---
  const elementsToReveal = document.querySelectorAll(
    ".glass-card, .hero-text, .hero-visual, .footer-grid > div, .section h2, .step-item, .benefit-item"
  );

  elementsToReveal.forEach((el) => {
    el.classList.add("scroll-reveal");
  });

  const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.94;

    elementsToReveal.forEach((el, idx) => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        setTimeout(() => {
          el.classList.add("visible");
        }, (idx % 4) * 60);
      }
    });
  };

  window.addEventListener("scroll", checkScroll, { passive: true });
  window.addEventListener("resize", checkScroll, { passive: true });
  checkScroll();

  // --- 2. Mobile Drawer Navigation ---
  const burgerBtn = document.getElementById("burger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link, .mobile-actions a");

  if (burgerBtn && mobileMenu) {
    function toggleMobileMenu(forceState) {
      const isActive = forceState !== undefined 
        ? forceState 
        : !burgerBtn.classList.contains("is-active");

      burgerBtn.classList.toggle("is-active", isActive);
      burgerBtn.setAttribute("aria-expanded", String(isActive));
      mobileMenu.classList.toggle("is-active", isActive);
      document.body.classList.toggle("no-scroll", isActive);
    }

    burgerBtn.addEventListener("click", () => toggleMobileMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMobileMenu(false));
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burgerBtn.classList.contains("is-active")) {
        toggleMobileMenu(false);
      }
    });

    // Close on resize above tablet breakpoint
    window.addEventListener("resize", () => {
      if (window.innerWidth > 1024 && burgerBtn.classList.contains("is-active")) {
        toggleMobileMenu(false);
      }
    }, { passive: true });
  }
});

// --- 3. Scroll Progress Indicator ---
function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// --- 4. Interactive Hero Parallax (Desktop Only) ---
function smoothMorph(current, target, factor = 0.08) {
  return current + (target - current) * factor;
}

let currentPosition = 0;
let targetPosition = 0;

// Only enable mouse movement on desktop pointer devices
const isDesktopPointer = () => window.innerWidth > 1024 && window.matchMedia("(hover: hover)").matches;

window.addEventListener("mousemove", (e) => {
  if (isDesktopPointer()) {
    targetPosition = (e.clientX / window.innerWidth - 0.5) * 30;
  } else {
    targetPosition = 0;
  }
});

function animateMorph() {
  const morphElement = document.querySelector(".hero-visual");
  if (morphElement) {
    if (isDesktopPointer()) {
      currentPosition = smoothMorph(currentPosition, targetPosition, 0.05);
      morphElement.style.transform = `translateX(${currentPosition}px)`;
    } else {
      currentPosition = 0;
      morphElement.style.transform = "";
    }
  }

  requestAnimationFrame(animateMorph);
}

requestAnimationFrame(animateMorph);
