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

  // Mostrar seção de assinatura ao clicar em "Assinar Plano"
  document.querySelectorAll('a[href="#assinatura"][data-plan]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var plan = el.getAttribute('data-plan') || '';
      var checkout = el.getAttribute('data-checkout') || '#';
      var section = document.getElementById('assinatura');
      if (!section) return;
      section.classList.remove('is-hidden');
      var label = document.getElementById('selected-plan');
      if (label) label.textContent = plan;
      var checkoutBtn = document.getElementById('checkout-link');
      if (checkoutBtn) checkoutBtn.setAttribute('href', checkout);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Ano atual no footer
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
