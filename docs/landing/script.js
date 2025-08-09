(function () {
  // Scroll suave para CTAs
  document.querySelectorAll('[data-scroll]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      var target = document.querySelector('#contato');
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Ano atual no footer
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
