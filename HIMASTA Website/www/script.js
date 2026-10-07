document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownButtons = document.querySelectorAll('.dropdown > .nav-link');

  function closeMobileMenu() {
    document.querySelectorAll('.dropdown.open').forEach((item) => item.classList.remove('open'));
    if (navMenu) navMenu.classList.remove('show');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
  }

  function setActiveRoute(page) {
    document.querySelectorAll('[data-page]').forEach((link) => {
      const isActive = link.getAttribute('data-page') === page;
      link.classList.toggle('active-route', isActive);
      if (link.classList.contains('nav-link')) link.classList.toggle('active', isActive);
    });
  }

  function goToPage(page, push = true) {
    if (!page) return;
    if (window.Shiny) {
      Shiny.setInputValue('nav_page', page, { priority: 'event' });
    }
    setActiveRoute(page);
    if (push) history.pushState({ page }, '', '#' + page);
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      mobileToggle.setAttribute('aria-expanded', navMenu.classList.contains('show'));
    });
  }

  dropdownButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (window.innerWidth <= 980) {
        event.preventDefault();
        const parent = button.closest('.dropdown');
        document.querySelectorAll('.dropdown.open').forEach((item) => {
          if (item !== parent) item.classList.remove('open');
        });
        if (parent) parent.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', (event) => {
    const pageLink = event.target.closest('[data-page]');
    if (pageLink) {
      event.preventDefault();
      goToPage(pageLink.getAttribute('data-page'));
      return;
    }

    if (!event.target.closest('.navbar')) {
      closeMobileMenu();
    }
  });

  window.addEventListener('popstate', () => {
    const page = (location.hash || '#home').replace('#', '');
    goToPage(page, false);
  });

  document.addEventListener('shiny:connected', () => {
    const page = (location.hash || '#home').replace('#', '');
    goToPage(page, false);
  });

  setActiveRoute((location.hash || '#home').replace('#', ''));
});
