document.addEventListener('DOMContentLoaded', function() {
  // Filter tabs (Digital Resources)
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      document.querySelectorAll('.r-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  // Simulated buy + instant download of a placeholder file
  window.buyGuide = function(btn) {
    if (btn.classList.contains('bought') || btn.classList.contains('processing')) return;
    const title = btn.closest('.r-card').querySelector('h3').textContent;
    btn.textContent = 'Processing…';
    btn.classList.add('processing');
    setTimeout(() => {
      btn.classList.remove('processing');
      btn.classList.add('bought');
      btn.textContent = 'Downloaded ✓';

      const content = title + " (Placeholder Preview)\n\nThis is a demo download standing in for the real PDF guide.\nOladiplenty Stylist Consult — oladiplentystylist@gmail.com";
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title.replace(/[^a-z0-9]+/gi, '-') + '-preview.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, 900);
  };

  // Sub-nav scrollspy — highlight the section currently in view
  const subnavLinks = Array.from(document.querySelectorAll('#subnavTabs a'));
  const trackedSections = ['resources', 'masterclass', 'business'].map(id => document.getElementById(id));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        subnavLinks.forEach(a => a.classList.toggle('current', a.dataset.target === id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  trackedSections.forEach(sec => { if (sec) spy.observe(sec); });
});
