document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-sticky");
  if (!nav) return;

  const validModes = [
    "transparent-nav-over-dark-bg",
    "transparent-nav-over-light-bg",
    "filled-dark",
    "filled-light"
  ];

  const sections = Array.from(document.querySelectorAll("[data-header]"));
  if (!sections.length) return;

  let currentMode = null;

  function setMode(mode) {
    if (!validModes.includes(mode) || mode === currentMode) return;
    currentMode = mode;

    validModes.forEach(function (item) {
      nav.classList.remove("mode-" + item);
    });

    nav.classList.add("mode-" + mode);
  }

  function updateNavMode() {
    const detectionPoint = nav.offsetHeight / 2;
    let activeSection = null;

    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= detectionPoint && rect.bottom > detectionPoint) {
        activeSection = section;
      }
    });

    if (activeSection) {
      setMode(activeSection.getAttribute("data-header"));
    }
  }

  let ticking = false;

  function requestNavUpdate() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      updateNavMode();
      ticking = false;
    });
  }

  window.addEventListener("scroll", requestNavUpdate, { passive: true });
  window.addEventListener("resize", requestNavUpdate);
  updateNavMode();
});

document.addEventListener("DOMContentLoaded", function () {
  const backgrounds = document.querySelectorAll(".help-button-bg");
  if (!backgrounds.length) return;

  function updateRotation() {
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const maxScroll = scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
    const rotation = progress * 360 * 4;

    backgrounds.forEach(function (element) {
      element.style.transform = `rotate(${rotation}deg)`;
    });
  }

  let ticking = false;

  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(function () {
      updateRotation();
      ticking = false;
    });
  }, { passive: true });

  updateRotation();
});

document.addEventListener("click", function (event) {
  const link = event.target.closest("a");
  if (link) event.preventDefault();
}, true);

