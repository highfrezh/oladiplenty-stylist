function wireRail(trackId, prevId, nextId, dotsId) {
  const track = document.getElementById(trackId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  const dotsWrap = document.getElementById(dotsId);
  if (!track) return;
  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to item ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function step(dir) {
    const cardWidth = cards[0].getBoundingClientRect().width + 20;
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  }
  if (prev) prev.addEventListener('click', () => step(-1));
  if (next) next.addEventListener('click', () => step(1));

  function syncButtons() {
    if (!prev || !next) return;
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
  }

  let ticking = false;
  track.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const trackRect = track.getBoundingClientRect();
      let closest = 0,
        closestDist = Infinity;
      cards.forEach((c, i) => {
        const dist = Math.abs(c.getBoundingClientRect().left - trackRect.left);
        if (dist < closestDist) { closestDist = dist;
          closest = i; }
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === closest));
      syncButtons();
      ticking = false;
    });
  });
  syncButtons();
}

wireRail('railTrack', 'railPrev', 'railNext', 'railDots');

function initLookbook() {
  const slides = document.querySelectorAll('.lookbook-slide');
  const tabs = document.querySelectorAll('.lookbook-tab');
  if (!slides.length || !tabs.length) return;

  let currentIndex = 0;
  let timer = null;
  let userInteracted = false;
  const intervalTime = 5000;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    tabs.forEach(t => {
      t.classList.remove('active');
      t.classList.remove('paused');
      void t.offsetWidth;
    });

    currentIndex = index;
    slides[currentIndex].classList.add('active');
    tabs[currentIndex].classList.add('active');

    if (userInteracted) {
      tabs[currentIndex].classList.add('paused');
    }
  }

  function nextSlide() {
    let nextIdx = (currentIndex + 1) % slides.length;
    showSlide(nextIdx);
  }

  function startAutoplay() {
    if (userInteracted) return;
    clearInterval(timer);
    timer = setInterval(nextSlide, intervalTime);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      userInteracted = true;
      clearInterval(timer);
      showSlide(index);
    });
  });

  showSlide(0);
  startAutoplay();

  tabs.forEach((tab, index) => {
    const progressEl = tab.querySelector('.tab-progress');
    if (progressEl) {
      progressEl.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'width' && !userInteracted && index === currentIndex) {
          nextSlide();
        }
      });
    }
  });
}

initLookbook();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in');
      observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
