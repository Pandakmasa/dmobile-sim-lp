// 比較表の行をスクロールで1行ずつ表示（画像なし版 2026-11-12）
// 動き低減設定・IntersectionObserver非対応のときは最初から全部表示する。
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var rows = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = Array.prototype.indexOf.call(rows, e.target);
      e.target.style.transitionDelay = (Math.max(0, i) * 0.12) + 's';
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });
  rows.forEach(function (r) { io.observe(r); });
})();
