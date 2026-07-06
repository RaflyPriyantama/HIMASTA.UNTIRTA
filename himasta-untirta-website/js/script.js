const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdownButtons = document.querySelectorAll('.dropdown > .nav-link');

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
      parent.classList.toggle('open');
    }
  });
});

window.addEventListener('click', (event) => {
  if (!event.target.closest('.navbar')) {
    document.querySelectorAll('.dropdown.open').forEach((item) => item.classList.remove('open'));
    if (navMenu) navMenu.classList.remove('show');
  }
});
