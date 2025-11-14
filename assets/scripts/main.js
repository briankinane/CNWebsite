const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('#primary-menu');
const yearEl = document.querySelector('#year');
const animatedBlocks = document.querySelectorAll('[data-animate]');

function updateHeaderState() {
  const scrolled = window.scrollY > 60;
  header?.setAttribute('data-scrolled', scrolled ? 'true' : 'false');
}

function toggleNav() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', (!expanded).toString());
  navList.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}

function closeNavOnResize() {
  if (window.innerWidth > 768) {
    navToggle.setAttribute('aria-expanded', 'false');
    navList.setAttribute('aria-hidden', 'false');
  } else {
    navList.setAttribute('aria-hidden', navToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  }
}

function setYear() {
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}

function initObserver() {
  if (!('IntersectionObserver' in window)) {
    animatedBlocks.forEach((block) => block.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  animatedBlocks.forEach((block) => observer.observe(block));
}

if (navToggle) {
  navToggle.addEventListener('click', toggleNav);
}

window.addEventListener('scroll', updateHeaderState);
window.addEventListener('resize', closeNavOnResize);

updateHeaderState();
closeNavOnResize();
setYear();
initObserver();
