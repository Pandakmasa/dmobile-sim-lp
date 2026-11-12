(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rows = document.querySelectorAll('.reveal tbody tr');
  if (reduce || !('IntersectionObserver' in window)) rows.forEach(r => r.classList.add('in'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { const i = [...rows].indexOf(e.target); setTimeout(() => e.target.classList.add('in'), i * 90); io.unobserve(e.target); }
    }), { threshold: .2 });
    rows.forEach(r => io.observe(r));
  }
  const dock = document.querySelector('.dock'), fv = document.getElementById('fv'), last = document.getElementById('cta');
  const upd = () => {
    const pastFv = fv.getBoundingClientRect().bottom < 0;
    const r = last.getBoundingClientRect();
    const atCta = r.top < innerHeight && r.bottom > 0;
    dock.classList.toggle('show', pastFv && !atCta);
  };
  addEventListener('scroll', upd, { passive: true }); upd();
})();
