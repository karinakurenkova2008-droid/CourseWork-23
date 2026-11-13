document.addEventListener("DOMContentLoaded", function () {
  const elementsToReveal = document.querySelectorAll(
    ".glass-card, .hero-text, .hero-visual, .footer-grid > div, .section h2, .step-item, .benefit-item"
  );

  elementsToReveal.forEach((el) => {
    el.classList.add("scroll-reveal");
  });

  const checkScroll = () => {
    const triggerBottom = window.innerHeight * 0.92;

    elementsToReveal.forEach((el, idx) => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        setTimeout(() => {
          el.classList.add("visible");
        }, (idx % 4) * 80);
      }
    });
  };

  window.addEventListener("scroll", checkScroll);
  checkScroll();
});
function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

  document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

function cubicEaseInOut(t) {
  return t < 0.5 
    ? 4 * t * t * t 
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothMorph(current, target, factor = 0.08) {
  return current + (target - current) * factor;
}

let currentPosition = 0;
let targetPosition = 0;

window.addEventListener('mousemove', (e) => {
  targetPosition = (e.clientX / window.innerWidth - 0.5) * 40;
});

function animateMorph() {
  currentPosition = smoothMorph(currentPosition, targetPosition, 0.05);
  
  const morphElement = document.querySelector('.hero-visual');
  if (morphElement) {
    morphElement.style.transform = `translateX(${currentPosition}px)`;
  }

  requestAnimationFrame(animateMorph);
}

requestAnimationFrame(animateMorph);