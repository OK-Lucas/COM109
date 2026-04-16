// ── Active nav link highlighting ──
const links = document.querySelectorAll('.nav-links a');
links.forEach(function(link) {
  if (link.href === window.location.href) {
    link.style.color = 'white';
    link.style.fontWeight = 'bold';
  }
});

// ── Digital Clock ──
function updateClock() {
  const clock = document.getElementById('clock');
  if (!clock) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = h + ':' + m + ':' + s;
}
updateClock();
setInterval(updateClock, 1000);

// ── Slideshow ──
(function () {
  const track = document.getElementById('slideshowTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('slideDots');

  if (!track) return;

  const slides = track.querySelectorAll('.slide');
  const total = slides.length;
  let current = 0;
  let autoTimer = null;

  // Build dot indicators
  slides.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); resetAuto(); });
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    dotsContainer.querySelectorAll('.slide-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    autoTimer = setInterval(next, 5000);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
  nextBtn.addEventListener('click', function () { next(); resetAuto(); });

  // Keyboard arrow key support
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
    if (e.key === 'ArrowRight') { next(); resetAuto(); }
  });

  startAuto();
})();