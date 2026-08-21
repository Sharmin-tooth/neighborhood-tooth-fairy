// Neighborhood Tooth Fairy — shared behavior

document.addEventListener('DOMContentLoaded', function () {
  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the mobile menu after choosing a link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- Contact form ---------- */
  var form = document.querySelector('#contact-form');
  var status = document.querySelector('#form-status');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // NOTE: This form is not yet connected to a delivery service.
      // Point the form's "action" attribute at Formspree (or a similar
      // form backend) and remove this preventDefault handler — or keep
      // this handler and POST to your endpoint with fetch() — to make
      // submissions actually reach Sharmin. See the README notes.
      status.textContent = "Thanks for reaching out. This form isn't connected to email yet — please call or text Sharmin directly at 916-553-2264 until it is.";
      status.classList.add('is-visible');
      status.setAttribute('role', 'status');
      form.reset();
    });
  }

  /* ---------- Current year in footer ---------- */
  var yearEls = document.querySelectorAll('[data-year]');
  yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });
});
